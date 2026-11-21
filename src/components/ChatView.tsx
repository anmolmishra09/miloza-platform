import { useEffect, useRef, useState } from "react";
import type { AppState, User } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Phone, Video, MoreVertical } from "lucide-react";

interface Props {
  state: AppState;
  currentUser: User;
  conversationId: string;
  onSend: (conversationId: string, text: string) => void;
  onBack: () => void;
  onOpenUser: (id: string) => void;
}

export function ChatView({ state, currentUser, conversationId, onSend, onBack, onOpenUser }: Props) {
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const conv = state.conversations.find((c) => c.id === conversationId);
  const other = state.users.find((u) => u.id === conv?.memberIds.find((id) => id !== currentUser.id));
  const messages = state.messages.filter((m) => m.conversationId === conversationId);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, typing]);

  useEffect(() => {
    if (!text) {
      setTyping(false);
      return;
    }
    setTyping(true);
    const t = setTimeout(() => setTyping(false), 1200);
    return () => clearTimeout(t);
  }, [text]);

  if (!conv || !other) {
    return (
      <div className="mx-auto max-w-2xl">
        <Button variant="ghost" onClick={onBack} className="rounded-full">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <p className="mt-6 text-sm text-[#0F0F01]/50">Conversation not found.</p>
      </div>
    );
  }

  const submit = () => {
    if (!text.trim()) return;
    onSend(conversationId, text.trim());
    setText("");
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-9rem)] max-w-3xl flex-col overflow-hidden rounded-3xl border border-[#ADA28C]/30 bg-white shadow-sm lg:h-[calc(100vh-7rem)]">
      <div className="flex items-center gap-3 border-b border-[#ADA28C]/30 p-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full lg:hidden">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <button onClick={() => onOpenUser(other.id)} className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-bold text-[#0F0F01]" style={{ backgroundColor: other.avatarColor }}>
              {other.name[0]}
            </div>
            {other.online && <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#7C9D8C]" />}
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold">{other.name}</p>
            <p className="text-xs text-[#0F0F01]/50">{other.online ? "Online now" : "Offline"}</p>
          </div>
        </button>
        <div className="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="icon" className="rounded-full text-[#0F0F01]/60 hover:bg-[#F0EFEA]">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-[#0F0F01]/60 hover:bg-[#F0EFEA]">
            <Video className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-[#0F0F01]/60 hover:bg-[#F0EFEA]">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto bg-[#F8F8F5] p-4">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold text-[#0F0F01]" style={{ backgroundColor: other.avatarColor }}>
              {other.name[0]}
            </div>
            <p className="mt-3 text-sm font-semibold">You're connected with {other.name.split(" ")[0]}</p>
            <p className="mt-1 text-xs text-[#0F0F01]/50">Send the first message to start the conversation.</p>
          </div>
        )}
        {messages.map((m) => {
          const mine = m.senderId === currentUser.id;
          return (
            <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                  mine ? "rounded-br-sm bg-[#FBFF62] text-[#0F0F01]" : "rounded-bl-sm bg-white text-[#0F0F01]"
                }`}
              >
                {m.text}
                <div className={`mt-1 text-[10px] ${mine ? "text-[#0F0F01]/50" : "text-[#0F0F01]/40"}`}>
                  {new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          );
        })}
        {typing && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#0F0F01]/40" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#0F0F01]/40 [animation-delay:0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#0F0F01]/40 [animation-delay:0.3s]" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-center gap-2 border-t border-[#ADA28C]/30 p-3">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
          placeholder="Type a message..."
          className="rounded-full border-[#ADA28C]/40 bg-[#F8F8F5]"
        />
        <Button
          onClick={submit}
          disabled={!text.trim()}
          size="icon"
          className="h-10 w-10 shrink-0 rounded-full bg-[#0F0F01] text-[#FBFF62] hover:bg-[#0F0F01]/90 disabled:opacity-40"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}