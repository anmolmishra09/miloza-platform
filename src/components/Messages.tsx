import { useMemo, useState } from "react";
import type { AppState, User } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MessageCircle } from "lucide-react";

interface Props {
  state: AppState;
  currentUser: User;
  onOpenConversation: (id: string) => void;
}

export function Messages({ state, currentUser, onOpenConversation }: Props) {
  const [query, setQuery] = useState("");

  const conversations = useMemo(() => {
    const list = state.conversations
      .filter((c) => c.memberIds.includes(currentUser.id))
      .map((c) => {
        const other = state.users.find((u) => u.id === c.memberIds.find((id) => id !== currentUser.id));
        const msgs = state.messages.filter((m) => m.conversationId === c.id);
        const last = msgs[msgs.length - 1];
        return { conv: c, other, last, count: msgs.length };
      })
      .filter((x) => x.other)
      .sort((a, b) => {
        const at = a.last ? new Date(a.last.createdAt).getTime() : new Date(a.conv.createdAt).getTime();
        const bt = b.last ? new Date(b.last.createdAt).getTime() : new Date(b.conv.createdAt).getTime();
        return bt - at;
      });

    const q = query.toLowerCase().trim();
    if (!q) return list;
    return list.filter((x) => x.other!.name.toLowerCase().includes(q) || x.other!.username.toLowerCase().includes(q));
  }, [state, currentUser.id, query]);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold">Messages</h1>
        <p className="mt-1 text-sm text-[#0F0F01]/50">Your private conversations, all in one place.</p>
      </div>

      <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-sm">
        <Search className="h-4 w-4 text-[#0F0F01]/40" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search conversations..."
          className="border-none bg-transparent p-0 shadow-none focus-visible:ring-0"
        />
      </div>

      {conversations.length === 0 ? (
        <Card className="rounded-3xl border-[#ADA28C]/30 bg-white shadow-sm">
          <CardContent className="flex flex-col items-center py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#B5B1DC]/30">
              <MessageCircle className="h-7 w-7 text-[#0F0F01]" />
            </div>
            <p className="mt-4 font-semibold">No conversations yet</p>
            <p className="mt-1 text-sm text-[#0F0F01]/50">Accept a chat request to start messaging.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {conversations.map(({ conv, other, last, count }) => (
            <button
              key={conv.id}
              onClick={() => onOpenConversation(conv.id)}
              className="flex w-full items-center gap-4 rounded-3xl border border-[#ADA28C]/30 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold text-[#0F0F01]" style={{ backgroundColor: other!.avatarColor }}>
                  {other!.name[0]}
                </div>
                {other!.online && other!.showOnline && <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-white bg-[#7C9D8C]" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate font-semibold">{other!.name}</p>
                  {other!.online && other!.showOnline && (
                    <Badge className="rounded-full border-none bg-[#7C9D8C]/15 px-2 py-0 text-[10px] text-[#7C9D8C] hover:bg-[#7C9D8C]/15">Online</Badge>
                  )}
                </div>
                <p className="truncate text-sm text-[#0F0F01]/50">{last ? last.text : "No messages yet — say hi!"}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs text-[#0F0F01]/40">
                  {last ? new Date(last.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
                </span>
                {count > 0 && (
                  <Badge className="rounded-full border-none bg-[#0F0F01] px-2 py-0.5 text-[10px] text-[#FBFF62] hover:bg-[#0F0F01]">
                    {count}
                  </Badge>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}