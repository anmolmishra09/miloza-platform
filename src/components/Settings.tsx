import { useState } from "react";
import type { AppState, User } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Save, RotateCcw, LogOut, ShieldCheck, Bell, Lock, Ban, Eye, Trash2, UserCircle } from "lucide-react";

interface Props {
  currentUser: User;
  onUpdate: (patch: Partial<User>) => void;
  onReset: () => void;
  onLogout: () => void;
  state: AppState;
  onUnblock: (id: string) => void;
}

export function Settings({ currentUser, onUpdate, onReset, onLogout, state, onUnblock }: Props) {
  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio);
  const [location, setLocation] = useState(currentUser.location);
  const [interests, setInterests] = useState(currentUser.interests.join(", "));
  const [notifications, setNotifications] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(false);
  const [isPrivate, setIsPrivate] = useState(currentUser.isPrivate);
  const [showOnline, setShowOnline] = useState(currentUser.showOnline);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const blockedUsers = state.blocks
    .filter((b) => b.blockerId === currentUser.id)
    .map((b) => state.users.find((u) => u.id === b.blockedId))
    .filter(Boolean) as User[];

  const save = () => {
    onUpdate({
      name: name.trim() || currentUser.name,
      bio: bio.trim(),
      location: location.trim(),
      interests: interests.split(",").map((i) => i.trim()).filter(Boolean),
      isPrivate,
      showOnline,
    });
    toast.success("Profile updated.");
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold">Settings</h1>
        <p className="mt-1 text-sm text-[#0F0F01]/50">Manage your account, privacy and preferences.</p>
      </div>

      <Card className="rounded-3xl border-[#ADA28C]/30 bg-white shadow-sm">
        <CardContent className="space-y-5 p-6">
          <div className="flex items-center gap-2">
            <UserCircle className="h-5 w-5 text-[#0F0F01]/60" />
            <h2 className="text-lg font-semibold">Account</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold text-[#0F0F01]" style={{ backgroundColor: currentUser.avatarColor }}>
              {currentUser.name[0]}
            </div>
            <div>
              <p className="font-semibold">{currentUser.name}</p>
              <p className="text-sm text-[#0F0F01]/50">@{currentUser.username}</p>
            </div>
          </div>
          <div>
            <Label htmlFor="s-name">Full name</Label>
            <Input id="s-name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5 rounded-xl" />
          </div>
          <div>
            <Label htmlFor="s-bio">Bio</Label>
            <Textarea id="s-bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className="mt-1.5 rounded-xl" />
          </div>
          <div>
            <Label htmlFor="s-loc">Location</Label>
            <Input id="s-loc" value={location} onChange={(e) => setLocation(e.target.value)} className="mt-1.5 rounded-xl" />
          </div>
          <div>
            <Label htmlFor="s-int">Interests (comma separated)</Label>
            <Input id="s-int" value={interests} onChange={(e) => setInterests(e.target.value)} className="mt-1.5 rounded-xl" />
          </div>
          <div>
            <Label>Email & verification</Label>
            <div className="mt-1.5 flex items-center gap-3 rounded-xl bg-[#F8F8F5] px-4 py-3">
              <span className="flex-1 text-sm text-[#0F0F01]/70">{currentUser.email}</span>
              {currentUser.verified ? (
                <Badge className="rounded-full border-none bg-[#7C9D8C]/20 text-[#7C9D8C] hover:bg-[#7C9D8C]/20">
                  <ShieldCheck className="mr-1 h-3.5 w-3.5" /> Verified
                </Badge>
              ) : (
                <Button size="sm" className="rounded-full bg-[#0F0F01] text-[#FBFF62] hover:bg-[#0F0F01]/90" onClick={() => { onUpdate({ verified: true }); toast.success("Email verified."); }}>
                  Verify now
                </Button>
              )}
            </div>
          </div>
          <Button onClick={save} className="rounded-full bg-[#0F0F01] text-[#FBFF62] hover:bg-[#0F0F01]/90">
            <Save className="mr-2 h-4 w-4" /> Save changes
          </Button>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-[#ADA28C]/30 bg-white shadow-sm">
        <CardContent className="space-y-4 p-6">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-[#0F0F01]/60" />
            <h2 className="text-lg font-semibold">Privacy</h2>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-[#F8F8F5] p-4">
            <div className="flex items-center gap-3">
              <Eye className="h-5 w-5 text-[#0F0F01]/60" />
              <div>
                <p className="text-sm font-medium">Private profile</p>
                <p className="text-xs text-[#0F0F01]/50">Only accepted connections can view your full profile.</p>
              </div>
            </div>
            <Switch checked={isPrivate} onCheckedChange={setIsPrivate} />
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-[#F8F8F5] p-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-[#0F0F01]/60" />
              <div>
                <p className="text-sm font-medium">Show online status</p>
                <p className="text-xs text-[#0F0F01]/50">Let others see when you're online.</p>
              </div>
            </div>
            <Switch checked={showOnline} onCheckedChange={setShowOnline} />
          </div>
          <div className="rounded-2xl bg-[#F8F8F5] p-4">
            <div className="flex items-center gap-3">
              <Ban className="h-5 w-5 text-[#0F0F01]/60" />
              <p className="text-sm font-medium">Blocked users</p>
            </div>
            {blockedUsers.length === 0 ? (
              <p className="mt-2 text-xs text-[#0F0F01]/50">You haven't blocked anyone.</p>
            ) : (
              <div className="mt-3 space-y-2">
                {blockedUsers.map((u) => (
                  <div key={u.id} className="flex items-center gap-3 rounded-xl bg-white p-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold text-[#0F0F01]" style={{ backgroundColor: u.avatarColor }}>
                      {u.name[0]}
                    </div>
                    <span className="flex-1 text-sm">{u.name}</span>
                    <Button size="sm" variant="outline" className="rounded-full border-[#ADA28C]" onClick={() => onUnblock(u.id)}>
                      Unblock
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-[#ADA28C]/30 bg-white shadow-sm">
        <CardContent className="space-y-4 p-6">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-[#0F0F01]/60" />
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-[#F8F8F5] p-4">
            <div>
              <p className="text-sm font-medium">Push notifications</p>
              <p className="text-xs text-[#0F0F01]/50">Get notified about new requests and messages.</p>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-[#F8F8F5] p-4">
            <div>
              <p className="text-sm font-medium">Email notifications</p>
              <p className="text-xs text-[#0F0F01]/50">Receive a digest of activity by email.</p>
            </div>
            <Switch checked={emailNotifs} onCheckedChange={setEmailNotifs} />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-red-200 bg-white shadow-sm">
        <CardContent className="space-y-4 p-6">
          <div className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-red-500" />
            <h2 className="text-lg font-semibold text-red-500">Danger zone</h2>
          </div>
          <p className="text-sm text-[#0F0F01]/50">These actions affect your account. Proceed with care.</p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="rounded-full border-[#ADA28C]" onClick={onReset}>
              <RotateCcw className="mr-2 h-4 w-4" /> Reset demo data
            </Button>
            <Button variant="outline" className="rounded-full border-red-300 text-red-500 hover:bg-red-50" onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Sign out
            </Button>
            {confirmDelete ? (
              <div className="flex items-center gap-2">
                <Button
                  className="rounded-full bg-red-500 text-white hover:bg-red-600"
                  onClick={() => {
                    toast.error("Account deletion is disabled in this demo.");
                    setConfirmDelete(false);
                  }}
                >
                  Confirm delete
                </Button>
                <Button variant="ghost" className="rounded-full" onClick={() => setConfirmDelete(false)}>
                  Cancel
                </Button>
              </div>
            ) : (
              <Button variant="outline" className="rounded-full border-red-300 text-red-500 hover:bg-red-50" onClick={() => setConfirmDelete(true)}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete account
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}