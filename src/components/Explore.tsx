import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { AppState, User } from "../types";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  Search,
  UserPlus,
  MapPin,
  Check,
  SlidersHorizontal,
  Clock,
  Sparkles,
} from "lucide-react";

interface Props {
  state: AppState;
  currentUser: User;
  onOpenUser: (id: string) => void;
  onSendRequest: (id: string) => void;
}

type SortKey = "recent" | "name" | "online";

export function Explore({ state, currentUser, onOpenUser, onSendRequest }: Props) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "online" | "recent">("all");
  const [interest, setInterest] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("recent");

  const allInterests = useMemo(() => {
    const set = new Set<string>();
    state.users.forEach((u) => u.interests.forEach((i) => set.add(i)));
    return Array.from(set).sort();
  }, [state.users]);

  const people = useMemo(() => {
    const q = query.toLowerCase().trim();
    let list = state.users
      .filter((u) => u.id !== currentUser.id)
      .filter((u) => !state.blocks.some((b) => (b.blockerId === currentUser.id && b.blockedId === u.id) || (b.blockerId === u.id && b.blockedId === currentUser.id)))
      .filter((u) => (filter === "online" ? u.online : true))
      .filter((u) => (interest === "all" ? true : u.interests.includes(interest)))
      .filter((u) => {
        if (!q) return true;
        return (
          u.name.toLowerCase().includes(q) ||
          u.username.toLowerCase().includes(q) ||
          u.interests.some((i) => i.toLowerCase().includes(q))
        );
      });

    if (filter === "recent") {
      list = [...list].sort((a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime());
    } else if (sort === "name") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "online") {
      list = [...list].sort((a, b) => Number(b.online) - Number(a.online));
    } else {
      list = [...list].sort((a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime());
    }
    return list;
  }, [state.users, state.blocks, currentUser.id, query, filter, interest, sort]);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold">Explore people</h1>
          <p className="mt-1 text-sm text-[#0F0F01]/50">Find someone new and send a friendly chat request.</p>
        </div>
        <Badge className="rounded-full border-none bg-[#B5B1DC]/30 px-4 py-1.5 text-[#0F0F01] hover:bg-[#B5B1DC]/30">
          <Sparkles className="mr-1.5 h-3.5 w-3.5" /> {people.length} people
        </Badge>
      </div>

      <Card className="rounded-3xl border-[#ADA28C]/30 bg-white shadow-sm">
        <CardContent className="space-y-4 p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-2 rounded-full bg-[#F8F8F5] px-4 py-2.5">
              <Search className="h-4 w-4 text-[#0F0F01]/40" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, username or interest..."
                className="border-none bg-transparent p-0 shadow-none focus-visible:ring-0"
              />
            </div>
            <div className="flex items-center gap-2 rounded-full bg-[#F8F8F5] px-4 py-2.5">
              <SlidersHorizontal className="h-4 w-4 text-[#0F0F01]/40" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="bg-transparent text-sm outline-none"
              >
                <option value="recent">Recently joined</option>
                <option value="name">Name (A–Z)</option>
                <option value="online">Online first</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-[#0F0F01]/50">Filter:</span>
            {(["all", "online", "recent"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium capitalize transition ${
                  filter === f ? "bg-[#0F0F01] text-[#FBFF62]" : "bg-[#F0EFEA] text-[#0F0F01]/70 hover:bg-[#e8e7e1]"
                }`}
              >
                {f === "recent" ? "Recently joined" : f}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-[#0F0F01]/50">Interest:</span>
            <button
              onClick={() => setInterest("all")}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                interest === "all" ? "bg-[#7C9D8C] text-white" : "bg-[#F0EFEA] text-[#0F0F01]/70 hover:bg-[#e8e7e1]"
              }`}
            >
              All
            </button>
            {allInterests.slice(0, 10).map((i) => (
              <button
                key={i}
                onClick={() => setInterest(i)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  interest === i ? "bg-[#7C9D8C] text-white" : "bg-[#F0EFEA] text-[#0F0F01]/70 hover:bg-[#e8e7e1]"
                }`}
              >
                {i}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {people.length === 0 ? (
        <Card className="rounded-3xl border-[#ADA28C]/30 bg-white shadow-sm">
          <CardContent className="flex flex-col items-center py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#B5B1DC]/30">
              <Search className="h-7 w-7 text-[#0F0F01]" />
            </div>
            <p className="mt-4 font-semibold">No people found</p>
            <p className="mt-1 text-sm text-[#0F0F01]/50">Try a different search or filter.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {people.map((u, idx) => {
            const sent = state.requests.some((r) => r.fromId === currentUser.id && r.toId === u.id && r.status === "pending");
            const connected = state.conversations.some((c) => c.memberIds.includes(u.id) && c.memberIds.includes(currentUser.id));
            return (
              <motion.div
                key={u.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(idx * 0.04, 0.3) }}
              >
                <Card className="group h-full overflow-hidden rounded-3xl border-[#ADA28C]/30 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="h-20 transition group-hover:h-24" style={{ backgroundColor: u.avatarColor }} />
                  <CardContent className="p-5">
                    <div className="-mt-12 flex items-end justify-between">
                      <button
                        onClick={() => onOpenUser(u.id)}
                        className="flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-white text-xl font-bold text-[#0F0F01] transition group-hover:scale-105"
                        style={{ backgroundColor: u.avatarColor }}
                      >
                        {u.name[0]}
                      </button>
                      {u.online && u.showOnline && (
                        <Badge className="mb-1 rounded-full border-none bg-[#7C9D8C]/20 text-[#7C9D8C] hover:bg-[#7C9D8C]/20">
                          <span className="mr-1 h-1.5 w-1.5 rounded-full bg-[#7C9D8C]" /> Online
                        </Badge>
                      )}
                    </div>
                    <button onClick={() => onOpenUser(u.id)} className="mt-3 block text-left text-lg font-semibold hover:underline">
                      {u.name}
                    </button>
                    <p className="text-xs text-[#0F0F01]/50">..{u.username}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-[#0F0F01]/50">
                      <MapPin className="h-3 w-3" /> {u.location}
                    </p>
                    <p className="mt-3 line-clamp-2 min-h-10 text-sm text-[#0F0F01]/60">{u.bio}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {u.interests.slice(0, 3).map((i) => (
                        <span key={i} className="rounded-full bg-[#F0EFEA] px-2.5 py-1 text-[11px] font-medium text-[#0F0F01]/70">
                          {i}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => onOpenUser(u.id)}
                        className="flex-1 rounded-full border-[#ADA28C] text-[#0F0F01] hover:bg-[#F0EFEA]"
                      >
                        View profile
                      </Button>
                      <Button
                        disabled={sent || connected}
                        onClick={() => onSendRequest(u.id)}
                        className={`flex-1 rounded-full ${connected ? "bg-[#7C9D8C] text-white hover:bg-[#7C9D8C]" : "bg-[#0F0F01] text-[#FBFF62] hover:bg-[#0F0F01]/90"} disabled:opacity-100`}
                      >
                        {connected ? (
                          <><Check className="mr-1.5 h-4 w-4" /> Connected</>
                        ) : sent ? (
                          <><Clock className="mr-1.5 h-4 w-4" /> Pending</>
                        ) : (
                          <><UserPlus className="mr-1.5 h-4 w-4" /> Request</>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}