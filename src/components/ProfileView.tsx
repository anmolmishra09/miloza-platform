import { useState } from "react";
import type { AppState, User } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  UserPlus,
  Check,
  MessageCircle,
  ShieldCheck,
  Ban,
  Flag,
  Clock,
  X,
  Lock,
} from "lucide-react";

interface Props {
  state: AppState;
  currentUser: User;
  userId: string;
  onBack: () => void;
  onSendRequest: (id: string) => void;
  onCancelRequest: (requestId: string) => void;
  onBlock: (id: string) => void;
  onUnblock: (id: string) => void;
  onReport: (id: string, reason: string) => void;
  onOpenConversation: (id: string) => void;
}

export function ProfileView({
  state,
  currentUser,
  userId,
  onBack,
  onSendRequest,
  onCancelRequest,
  onBlock,
  onUnblock,
  onReport,
  onOpenConversation,
}: Props) {
  const [showReport, setShowReport] = useState(false);
  const [reason, setReason] = useState("");

  const user = state.users.find((u) => u.id === userId);

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl">
        <Button variant="ghost" onClick={onBack} className="rounded-full">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Card className="mt-6 rounded-3xl border-[#ADA28C]/30 bg-white shadow-sm">
          <CardContent className="flex flex-col items-center py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0EFEA]">
              <Lock className="h-7 w-7 text-[#0F0F01]/50" />
            </div>
            <p className="mt-4 font-semibold">Profile unavailable</p>
            <p className="mt-1 text-sm text-[#0F0F01]/50">This profile is private, deleted or inaccessible.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isSelf = user.id === currentUser.id;
  const blockedByMe = state.blocks.some((b) => b.blockerId === currentUser.id && b.blockedId === user.id);
  const blockedMe = state.blocks.some((b) => b.blockerId === user.id && b.blockedId === currentUser.id);
  const blocked = blockedByMe || blockedMe;
  const pendingReq = state.requests.find((r) => r.fromId === currentUser.id && r.toId === user.id && r.status === "pending");
  const incomingReq = state.requests.find((r) => r.fromId === user.id && r.toId === currentUser.id && r.status === "pending");
  const conversation = state.conversations.find(
    (c) => c.memberIds.includes(user.id) && c.memberIds.includes(currentUser.id)
  );

  const canView = isSelf || !user.isPrivate || Boolean(conversation) || Boolean(pendingReq) || Boolean(incomingReq);

  if (!canView) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <Button variant="ghost" onClick={onBack} className="rounded-full text-[#0F0F01]/70 hover:bg-[#F0EFEA]">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Card className="overflow-hidden rounded-3xl border-[#ADA28C]/30 bg-white shadow-sm">
          <div className="h-32" style={{ backgroundColor: user.avatarColor }} />
          <CardContent className="flex flex-col items-center py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F0EFEA]">
              <Lock className="h-8 w-8 text-[#0F0F01]/50" />
            </div>
            <p className="mt-4 text-lg font-semibold">This profile is private</p>
            <p className="mt-1 max-w-sm text-sm text-[#0F0F01]/50">
              {user.name} keeps their profile private. Send a chat request to connect.
            </p>
            {!blocked && (
              <Button
                disabled={Boolean(pendingReq)}
                className="mt-5 rounded-full bg-[#0F0F01] text-[#FBFF62] hover:bg-[#0F0F01]/90 disabled:opacity-100"
                onClick={() => onSendRequest(user.id)}
              >
                {pendingReq ? (
                  <><Clock className="mr-1.5 h-4 w-4" /> Request pending</>
                ) : (
                  <><UserPlus className="mr-1.5 h-4 w-4" /> Send request</>
                )}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Button variant="ghost" onClick={onBack} className="rounded-full text-[#0F0F01]/70 hover:bg-[#F0EFEA]">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <Card className="overflow-hidden rounded-3xl border-[#ADA28C]/30 bg-white shadow-sm">
        <div className="h-32" style={{ backgroundColor: user.avatarColor }} />
        <CardContent className="p-6">
          <div className="-mt-16 flex flex-wrap items-end justify-between gap-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-white text-3xl font-bold text-[#0F0F01]" style={{ backgroundColor: user.avatarColor }}>
              {user.name[0]}
            </div>
            {!isSelf && !blocked && (
              <div className="flex flex-wrap gap-2">
                {conversation ? (
                  <Button className="rounded-full bg-[#0F0F01] text-[#FBFF62] hover:bg-[#0F0F01]/90" onClick={() => onOpenConversation(conversation.id)}>
                    <MessageCircle className="mr-1.5 h-4 w-4" /> Message
                  </Button>
                ) : pendingReq ? (
                  <Button variant="outline" className="rounded-full border-[#ADA28C]" onClick={() => onCancelRequest(pendingReq.id)}>
                    <X className="mr-1.5 h-4 w-4" /> Cancel request
                  </Button>
                ) : incomingReq ? (
                  <Button className="rounded-full bg-[#7C9D8C] text-white hover:bg-[#7C9D8C]/90" onClick={() => onOpenConversation("")}>
                    <Check className="mr-1.5 h-4 w-4" /> Respond in Requests
                  </Button>
                ) : (
                  <Button className="rounded-full bg-[#0F0F01] text-[#FBFF62] hover:bg-[#0F0F01]/90" onClick={() => onSendRequest(user.id)}>
                    <UserPlus className="mr-1.5 h-4 w-4" /> Send request
                  </Button>
                )}
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h1 className="font-serif text-2xl font-bold">{user.name}</h1>
            {user.verified && (
              <Badge className="rounded-full border-none bg-[#7C9D8C]/20 text-[#7C9D8C] hover:bg-[#7C9D8C]/20">
                <ShieldCheck className="mr-1 h-3.5 w-3.5" /> Verified
              </Badge>
            )}
            {user.online && user.showOnline && (
              <Badge className="rounded-full border-none bg-[#7C9D8C]/20 text-[#7C9D8C] hover:bg-[#7C9D8C]/20">
                <span className="mr-1 h-1.5 w-1.5 rounded-full bg-[#7C9D8C]" /> Online
              </Badge>
            )}
            {user.isPrivate && (
              <Badge className="rounded-full border-none bg-[#F0EFEA] text-[#0F0F01]/60 hover:bg-[#F0EFEA]">
                <Lock className="mr-1 h-3.5 w-3.5" /> Private
              </Badge>
            )}
          </div>
          <p className="text-sm text-[#0F0F01]/50">@{user.username}</p>

          <p className="mt-4 text-sm text-[#0F0F01]/70">{user.bio}</p>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-[#0F0F01]/60">
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {user.location}</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> Joined {new Date(user.joinedAt).toLocaleDateString([], { month: "short", year: "numeric" })}
            </span>
          </div>

          <div className="mt-5">
            <p className="text-sm font-semibold">Interests</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {user.interests.map((i) => (
                <span key={i} className="rounded-full bg-[#F0EFEA] px-3 py-1.5 text-xs font-medium text-[#0F0F01]/70">
                  {i}
                </span>
              ))}
            </div>
          </div>

          {!isSelf && (
            <div className="mt-6 flex flex-wrap gap-2 border-t border-[#ADA28C]/30 pt-5">
              {blockedByMe ? (
                <Button variant="outline" className="rounded-full border-[#ADA28C]" onClick={() => onUnblock(user.id)}>
                  <Ban className="mr-1.5 h-4 w-4" /> Unblock user
                </Button>
              ) : (
                <Button variant="outline" className="rounded-full border-[#ADA28C] text-[#0F0F01]/70 hover:bg-[#F0EFEA]" onClick={() => onBlock(user.id)}>
                  <Ban className="mr-1.5 h-4 w-4" /> Block
                </Button>
              )}
              <Button variant="outline" className="rounded-full border-[#ADA28C] text-red-500 hover:bg-red-50" onClick={() => setShowReport(true)}>
                <Flag className="mr-1.5 h-4 w-4" /> Report
              </Button>
            </div>
          )}

          {showReport && (
            <div className="mt-4 rounded-2xl bg-[#F8F8F5] p-4">
              <p className="text-sm font-semibold">Report {user.name}</p>
              <Textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Tell us what's wrong with this profile..."
                rows={3}
                className="mt-2 rounded-xl bg-white"
              />
              <div className="mt-3 flex gap-2">
                <Button
                  disabled={!reason.trim()}
                  className="rounded-full bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
                  onClick={() => {
                    onReport(user.id, reason.trim());
                    setReason("");
                    setShowReport(false);
                  }}
                >
                  Submit report
                </Button>
                <Button variant="ghost" className="rounded-full" onClick={() => setShowReport(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}