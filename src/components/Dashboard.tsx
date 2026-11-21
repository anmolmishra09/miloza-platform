import type { AppState, User, View } from "../types";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  UserPlus,
  MessageCircle,
  Compass,
  ArrowRight,
  Check,
  Clock,
  Sparkles,
  TrendingUp,
} from "lucide-react";

interface Props {
  state: AppState;
  currentUser: User;
  onOpenUser: (id: string) => void;
  onSendRequest: (id: string) => void;
  onOpenConversation: (id: string) => void;
  onNavigate: (v: View) => void;
}

export function Dashboard({ state, currentUser, onOpenUser, onSendRequest, onOpenConversation, onNavigate }: Props) {
  const others = state.users.filter((u) => u.id !== currentUser.id);
  const suggested = others.slice(0, 4);
  const online = others.filter((u) => u.online && u.showOnline).slice(0, 6);
  const incoming = state.requests.filter((r) => r.toId === currentUser.id && r.status === "pending");
  const conversations = state.conversations.filter((c) => c.memberIds.includes(currentUser.id));

  const completion = computeCompletion(currentUser);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold">Hey, welcome back {currentUser.name.split(" ")[0]}! 👋</h1>
          <p className="mt-1 text-sm text-[#0F0F01]/50">Here's what's happening on MILOZA today.</p>
        </div>
        <Button className="rounded-full bg-[#0F0F01] text-[#FBFF62] hover:bg-[#0F0F01]/90" onClick={() => onNavigate("explore")}>
          <Compass className="mr-2 h-4 w-4" /> Discover people
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={UserPlus} label="Incoming requests" value={incoming.length} color="#B5B1DC" onClick={() => onNavigate("requests")} />
        <StatCard icon={MessageCircle} label="Conversations" value={conversations.length} color="#7C9D8C" onClick={() => onNavigate("messages")} />
        <StatCard icon={TrendingUp} label="People online" value={online.length} color="#FBFF62" onClick={() => onNavigate("explore")} />
        <StatCard icon={Sparkles} label="Profile complete" value={`${completion}%`} color="#ADA28C" onClick={() => onNavigate("settings")} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="rounded-3xl border-[#ADA28C]/30 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Suggested people</h2>
                <Button variant="ghost" className="rounded-full text-[#0F0F01]/60 hover:bg-[#F0EFEA]" onClick={() => onNavigate("explore")}>
                  View all <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {suggested.map((u) => {
                  const sent = state.requests.some((r) => r.fromId === currentUser.id && r.toId === u.id && r.status === "pending");
                  return (
                    <div key={u.id} className="flex items-center gap-3 rounded-2xl bg-[#F8F8F5] p-3">
                      <button onClick={() => onOpenUser(u.id)} className="flex h-12 w-12 items-center justify-center rounded-2xl text-base font-bold text-[#0F0F01]" style={{ backgroundColor: u.avatarColor }}>
                        {u.name[0]}
                      </button>
                      <div className="min-w-0 flex-1">
                        <button onClick={() => onOpenUser(u.id)} className="truncate text-sm font-semibold hover:underline">{u.name}</button>
                        <p className="truncate text-xs text-[#0F0F01]/50">..{u.username}</p>
                      </div>
                      <Button
                        size="sm"
                        disabled={sent}
                        onClick={() => onSendRequest(u.id)}
                        className="rounded-full bg-[#0F0F01] text-[#FBFF62] hover:bg-[#0F0F01]/90 disabled:opacity-100"
                      >
                        {sent ? <Check className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-[#ADA28C]/30 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Recent conversations</h2>
                <Button variant="ghost" className="rounded-full text-[#0F0F01]/60 hover:bg-[#F0EFEA]" onClick={() => onNavigate("messages")}>
                  Open inbox <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              {conversations.length === 0 ? (
                <div className="mt-4 flex flex-col items-center rounded-2xl bg-[#F8F8F5] py-10 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#B5B1DC]/30">
                    <MessageCircle className="h-6 w-6 text-[#0F0F01]" />
                  </div>
                  <p className="mt-3 text-sm font-semibold">No conversations yet</p>
                  <p className="mt-1 text-xs text-[#0F0F01]/50">Send a chat request to get started.</p>
                </div>
              ) : (
                <div className="mt-4 space-y-2">
                  {conversations.slice(0, 4).map((c) => {
                    const other = state.users.find((u) => u.id === c.memberIds.find((id) => id !== currentUser.id));
                    if (!other) return null;
                    const last = state.messages.filter((m) => m.conversationId === c.id).slice(-1)[0];
                    return (
                      <button
                        key={c.id}
                        onClick={() => onOpenConversation(c.id)}
                        className="flex w-full items-center gap-3 rounded-2xl bg-[#F8F8F5] p-3 text-left transition hover:bg-[#F0EFEA]"
                      >
                        <div className="relative">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-bold text-[#0F0F01]" style={{ backgroundColor: other.avatarColor }}>
                            {other.name[0]}
                          </div>
                          {other.online && other.showOnline && <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-[#7C9D8C]" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">{other.name}</p>
                          <p className="truncate text-xs text-[#0F0F01]/50">{last ? last.text : "Say hi!"}</p>
                        </div>
                        <MessageCircle className="h-4 w-4 text-[#0F0F01]/40" />
                      </button>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="rounded-3xl border-[#ADA28C]/30 bg-white shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold">Online now</h2>
              {online.length === 0 ? (
                <p className="mt-3 text-sm text-[#0F0F01]/50">No one is online right now.</p>
              ) : (
                <div className="mt-4 flex flex-wrap gap-3">
                  {online.map((u) => (
                    <button key={u.id} onClick={() => onOpenUser(u.id)} className="relative">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-base font-bold text-[#0F0F01]" style={{ backgroundColor: u.avatarColor }}>
                        {u.name[0]}
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 animate-pulse rounded-full border-2 border-white bg-[#7C9D8C]" />
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-[#ADA28C]/30 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Chat requests</h2>
                {incoming.length > 0 && <Badge className="rounded-full border-none bg-[#FBFF62] text-[#0F0F01] hover:bg-[#FBFF62]">{incoming.length}</Badge>}
              </div>
              {incoming.length === 0 ? (
                <p className="mt-3 text-sm text-[#0F0F01]/50">No pending requests.</p>
              ) : (
                <div className="mt-4 space-y-3">
                  {incoming.slice(0, 3).map((r) => {
                    const from = state.users.find((u) => u.id === r.fromId);
                    if (!from) return null;
                    return (
                      <div key={r.id} className="flex items-center gap-3 rounded-2xl bg-[#F8F8F5] p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-[#0F0F01]" style={{ backgroundColor: from.avatarColor }}>
                          {from.name[0]}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">{from.name}</p>
                          <p className="flex items-center gap-1 text-xs text-[#0F0F01]/50">
                            <Clock className="h-3 w-3" /> wants to chat
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <Button className="w-full rounded-full bg-[#0F0F01] text-[#FBFF62] hover:bg-[#0F0F01]/90" onClick={() => onNavigate("requests")}>
                    Review requests
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-none bg-[#FBFF62] shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-[#0F0F01]">Profile completion</h2>
              <p className="mt-1 text-sm text-[#0F0F01]/70">Complete your profile to get more connections.</p>
              <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-[#0F0F01]/10">
                <div className="h-full rounded-full bg-[#0F0F01] transition-all" style={{ width: `${completion}%` }} />
              </div>
              <p className="mt-2 text-sm font-semibold text-[#0F0F01]">{completion}% complete</p>
              <Button className="mt-4 w-full rounded-full bg-[#0F0F01] text-[#FBFF62] hover:bg-[#0F0F01]/90" onClick={() => onNavigate("settings")}>
                Edit profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  onClick,
}: {
  icon: typeof UserPlus;
  label: string;
  value: number | string;
  color: string;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="text-left">
      <Card className="rounded-3xl border-[#ADA28C]/30 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
        <CardContent className="p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: color }}>
            <Icon className="h-5 w-5 text-[#0F0F01]" />
          </div>
          <p className="mt-3 text-2xl font-bold">{value}</p>
          <p className="text-xs text-[#0F0F01]/50">{label}</p>
        </CardContent>
      </Card>
    </button>
  );
}

function computeCompletion(u: User) {
  let score = 0;
  if (u.name) score += 20;
  if (u.bio && u.bio.length > 10) score += 20;
  if (u.location) score += 15;
  if (u.interests.length >= 2) score += 20;
  if (u.verified) score += 15;
  if (u.avatarColor) score += 10;
  return Math.min(score, 100);
}