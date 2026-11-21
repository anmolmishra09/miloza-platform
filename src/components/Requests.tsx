import { useState } from "react";
import type { AppState, User } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, UserPlus, Inbox, Send, Clock } from "lucide-react";

interface Props {
  state: AppState;
  currentUser: User;
  onRespond: (id: string, accept: boolean) => void;
  onCancel: (id: string) => void;
  onOpenUser: (id: string) => void;
}

export function Requests({ state, currentUser, onRespond, onCancel, onOpenUser }: Props) {
  const [tab, setTab] = useState<"incoming" | "sent">("incoming");
  const incoming = state.requests.filter((r) => r.toId === currentUser.id && r.status === "pending");
  const outgoing = state.requests.filter((r) => r.fromId === currentUser.id && r.status === "pending");

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold">Chat requests</h1>
        <p className="mt-1 text-sm text-[#0F0F01]/50">Accept to start a private conversation.</p>
      </div>

      <div className="flex rounded-full bg-[#F0EFEA] p-1">
        <button
          onClick={() => setTab("incoming")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold transition ${tab === "incoming" ? "bg-white shadow-sm" : "text-[#0F0F01]/60"}`}
        >
          <Inbox className="h-4 w-4" /> Incoming
          {incoming.length > 0 && <Badge className="rounded-full border-none bg-[#FBFF62] text-[#0F0F01] hover:bg-[#FBFF62]">{incoming.length}</Badge>}
        </button>
        <button
          onClick={() => setTab("sent")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold transition ${tab === "sent" ? "bg-white shadow-sm" : "text-[#0F0F01]/60"}`}
        >
          <Send className="h-4 w-4" /> Sent
          {outgoing.length > 0 && <Badge className="rounded-full border-none bg-[#F0EFEA] text-[#0F0F01]/60 hover:bg-[#F0EFEA]">{outgoing.length}</Badge>}
        </button>
      </div>

      {tab === "incoming" ? (
        <div className="space-y-3">
          {incoming.map((r) => {
            const from = state.users.find((u) => u.id === r.fromId);
            if (!from) return null;
            return (
              <Card key={r.id} className="rounded-3xl border-[#ADA28C]/30 bg-white shadow-sm">
                <CardContent className="flex flex-wrap items-center gap-4 p-5">
                  <button onClick={() => onOpenUser(from.id)} className="flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold text-[#0F0F01]" style={{ backgroundColor: from.avatarColor }}>
                    {from.name[0]}
                  </button>
                  <div className="min-w-0 flex-1">
                    <button onClick={() => onOpenUser(from.id)} className="text-base font-semibold hover:underline">{from.name}</button>
                    <p className="text-xs text-[#0F0F01]/50">@{from.username} · {from.location}</p>
                    <p className="mt-1 line-clamp-1 text-sm text-[#0F0F01]/60">{from.bio}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-[#0F0F01]/40">
                      <Clock className="h-3 w-3" /> {timeAgo(r.createdAt)}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" className="rounded-full border-[#ADA28C]" onClick={() => onOpenUser(from.id)}>
                      View profile
                    </Button>
                    <Button className="rounded-full bg-[#7C9D8C] text-white hover:bg-[#7C9D8C]/90" onClick={() => onRespond(r.id, true)}>
                      <Check className="mr-1.5 h-4 w-4" /> Accept
                    </Button>
                    <Button variant="outline" className="rounded-full border-[#ADA28C]" onClick={() => onRespond(r.id, false)}>
                      <X className="mr-1.5 h-4 w-4" /> Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {incoming.length === 0 && (
            <Card className="rounded-3xl border-[#ADA28C]/30 bg-white shadow-sm">
              <CardContent className="flex flex-col items-center py-14 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#B5B1DC]/30">
                  <UserPlus className="h-7 w-7 text-[#0F0F01]" />
                </div>
                <p className="mt-4 font-semibold">No incoming requests</p>
                <p className="mt-1 text-sm text-[#0F0F01]/50">When someone wants to chat, it'll show up here.</p>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {outgoing.map((r) => {
            const to = state.users.find((u) => u.id === r.toId);
            if (!to) return null;
            return (
              <Card key={r.id} className="rounded-3xl border-[#ADA28C]/30 bg-white shadow-sm">
                <CardContent className="flex flex-wrap items-center gap-4 p-5">
                  <button onClick={() => onOpenUser(to.id)} className="flex h-12 w-12 items-center justify-center rounded-2xl text-base font-bold text-[#0F0F01]" style={{ backgroundColor: to.avatarColor }}>
                    {to.name[0]}
                  </button>
                  <div className="min-w-0 flex-1">
                    <button onClick={() => onOpenUser(to.id)} className="text-sm font-semibold hover:underline">{to.name}</button>
                    <p className="text-xs text-[#0F0F01]/50">@{to.username}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-[#0F0F01]/40">
                      <Clock className="h-3 w-3" /> Sent {timeAgo(r.createdAt)}
                    </p>
                  </div>
                  <Badge className="rounded-full border-none bg-[#F0EFEA] text-[#0F0F01]/60 hover:bg-[#F0EFEA]">Pending</Badge>
                  <Button variant="outline" className="rounded-full border-[#ADA28C] text-red-500 hover:bg-red-50" onClick={() => onCancel(r.id)}>
                    <X className="mr-1.5 h-4 w-4" /> Cancel
                  </Button>
                </CardContent>
              </Card>
            );
          })}
          {outgoing.length === 0 && (
            <Card className="rounded-3xl border-[#ADA28C]/30 bg-white shadow-sm">
              <CardContent className="flex flex-col items-center py-14 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0EFEA]">
                  <Send className="h-7 w-7 text-[#0F0F01]/50" />
                </div>
                <p className="mt-4 font-semibold">No sent requests</p>
                <p className="mt-1 text-sm text-[#0F0F01]/50">Explore people and send your first request.</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}