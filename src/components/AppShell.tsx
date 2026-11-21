import type { ReactNode } from "react";
import type { User, View } from "../types";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  LayoutDashboard,
  Compass,
  UserPlus,
  MessageCircle,
  Bell,
  Settings as SettingsIcon,
  LogOut,
  Sparkles,
  Search,
} from "lucide-react";

interface Props {
  currentUser: User;
  view: View;
  onNavigate: (v: View) => void;
  onLogout: () => void;
  pendingCount: number;
  unreadCount: number;
  children: ReactNode;
}

const navItems: { key: View; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "dashboard", label: "Home", icon: LayoutDashboard },
  { key: "explore", label: "Explore", icon: Compass },
  { key: "requests", label: "Requests", icon: UserPlus },
  { key: "messages", label: "Messages", icon: MessageCircle },
  { key: "notifications", label: "Alerts", icon: Bell },
  { key: "settings", label: "Settings", icon: SettingsIcon },
];

export function AppShell({ currentUser, view, onNavigate, onLogout, pendingCount, unreadCount, children }: Props) {
  const badgeFor = (key: View) => (key === "requests" ? pendingCount : key === "notifications" ? unreadCount : 0);

  return (
    <div className="min-h-screen bg-[#F8F8F5]">
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-64 flex-col border-r border-[#ADA28C]/30 bg-white p-5 lg:flex">
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F0F01] text-[#FBFF62]">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">MILOZA</span>
        </div>

        <nav className="mt-8 flex-1 space-y-1">
          {navItems.map((item) => {
            const active = view === item.key;
            const badge = badgeFor(item.key);
            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  active ? "bg-[#FBFF62] text-[#0F0F01]" : "text-[#0F0F01]/70 hover:bg-[#F0EFEA]"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="flex-1 text-left">{item.label}</span>
                {badge > 0 && (
                  <Badge className="rounded-full border-none bg-[#0F0F01] px-2 py-0.5 text-[10px] text-[#FBFF62] hover:bg-[#0F0F01]">
                    {badge}
                  </Badge>
                )}
              </button>
            );
          })}
        </nav>

        <div className="mt-4 rounded-2xl bg-[#F0EFEA] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-[#0F0F01]" style={{ backgroundColor: currentUser.avatarColor }}>
              {currentUser.name[0]}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{currentUser.name}</p>
              <p className="truncate text-xs text-[#0F0F01]/50">..{currentUser.username}</p>
            </div>
          </div>
          <Button variant="ghost" onClick={onLogout} className="mt-3 w-full justify-start rounded-xl text-[#0F0F01]/70 hover:bg-white">
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </Button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-[#ADA28C]/30 bg-[#F8F8F5]/80 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 py-3 md:px-8">
            <div className="flex items-center gap-2 lg:hidden">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0F0F01] text-[#FBFF62]">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-bold">MILOZA</span>
            </div>
            <div className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm lg:flex lg:w-80">
              <Search className="h-4 w-4 text-[#0F0F01]/40" />
              <input placeholder="Search people..." className="w-full bg-transparent text-sm outline-none placeholder:text-[#0F0F01]/40" />
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => onNavigate("notifications")} className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition hover:bg-[#F0EFEA]">
                <Bell className="h-5 w-5 text-[#0F0F01]/70" />
                {unreadCount > 0 && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#7C9D8C]" />}
              </button>
              <button onClick={() => onNavigate("settings")} className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-[#0F0F01]" style={{ backgroundColor: currentUser.avatarColor }}>
                {currentUser.name[0]}
              </button>
            </div>
          </div>
        </header>

        <main className="px-4 pb-28 pt-6 md:px-8 lg:pb-12">{children}</main>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-[#ADA28C]/30 bg-white/90 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const active = view === item.key;
            const badge = badgeFor(item.key);
            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`relative flex min-h-[44px] flex-1 flex-col items-center justify-center gap-1 rounded-2xl py-1 text-[11px] font-medium transition ${
                  active ? "text-[#0F0F01]" : "text-[#0F0F01]/50"
                }`}
              >
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${active ? "bg-[#FBFF62]" : ""}`}>
                  <item.icon className="h-5 w-5" />
                </div>
                {item.label}
                {badge > 0 && <span className="absolute right-4 top-1 h-2 w-2 rounded-full bg-[#7C9D8C]" />}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}