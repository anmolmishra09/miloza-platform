import type { AppState, User, View } from "../types";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Bell, UserPlus, Check, X, MessageCircle, CheckCheck } from "lucide-react";

interface Props {
  state: AppState;
  currentUser: User;
  onMarkAllRead: () => void;
  onNavigate: (v: View) => void;
}

const iconFor = {
  request: UserPlus,
  accepted: Check,
  rejected: X,
  message: MessageCircle,
};

const colorFor = {
  request: "#B5B1DC",
  accepted: "#7C9D8C",
  rejected: "#ADA28C",
  message: "#FBFF62",
};

export function Notifications({ state, currentUser, onMarkAllRead, onNavigate }: Props) {
  const items = state.notifications.filter((n) => n.userId === currentUser.id);
  const unread = items.filter((n) => !n.read).length;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl font-bold">Notifications</h1>
          <p className="mt-1 text-sm text-[#0F0F01]/50">
            {unread > 0 ? `${unread} unread notification${unread === 1 ? "" : "s"}` : "You're all caught up."}
          </p>
        </div>
        {unread > 0 && (
          <Button variant="outline" className="rounded-full border-[#ADA28C]" onClick={onMarkAllRead}>
            <CheckCheck className="mr-2 h-4 w-4" /> Mark all as read
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <Card className="rounded-3xl border-[#ADA28C]/30 bg-white shadow-sm">
          <CardContent className="flex flex-col items-center py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#B5B1DC]/30">
              <Bell className="h-7 w-7 text-[#0F0F01]" />
            </div>
            <p className="mt-4 font-semibold">No notifications yet</p>
            <p className="mt-1 text-sm text-[#0F0F01]/50">Requests and messages will show up here.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {items.map((n) => {
            const Icon = iconFor[n.type];
            return (
              <Card
                key={n.id}
                className={`rounded-3xl border-[#ADA28C]/30 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${n.read ? "bg-white" : "bg-[#FBFF62]/20"}`}
              >
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: colorFor[n.type] }}>
                    <Icon className="h-5 w-5 text-[#0F0F01]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{n.text}</p>
                    <p className="text-xs text-[#0F0F01]/50">{timeAgo(n.createdAt)}</p>
                  </div>
                  {!n.read && <Badge className="rounded-full border-none bg-[#0F0F01] text-[#FBFF62] hover:bg-[#0F0F01]">New</Badge>}
                  <Button
                    variant="ghost"
                    className="rounded-full text-[#0F0F01]/60 hover:bg-[#F0EFEA]"
                    onClick={() => onNavigate(n.type === "message" ? "messages" : "requests")}
                  >
                    View
                  </Button>
                </CardContent>
              </Card>
            );
          })}
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