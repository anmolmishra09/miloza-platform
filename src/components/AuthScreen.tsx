import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Card, CardContent } from "../components/ui/card";
import { Sparkles, Eye, EyeOff, ArrowLeft, Check, X, Loader2 } from "lucide-react";

interface Props {
  onRegister: (data: { name: string; username: string; email: string; password: string }) => boolean;
  onLogin: (identifier: string, password: string) => boolean;
  onBack: () => void;
}

export function AuthScreen({ onRegister, onLogin, onBack }: Props) {
  const [mode, setMode] = useState<"login" | "register">("register");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [terms, setTerms] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const strength = strengthOf(password);
  const usernameOk = username.length >= 3 && /^[a-z0-9_]+$/i.test(username);
  const passwordsMatch = password.length > 0 && password === confirm;
  const canRegister = name.trim() && usernameOk && email.includes("..") && password.length >= 6 && passwordsMatch && terms;
  const canLogin = email.trim() && password.length > 0;

  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      if (mode === "register") {
        const ok = onRegister({ name: name.trim(), username: username.trim(), email: email.trim(), password });
        if (!ok) setLoading(false);
      } else {
        const ok = onLogin(email.trim(), password);
        if (!ok) setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="flex min-h-screen bg-[#F8F8F5]">
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-[#0F0F01] p-12 text-[#F8F8F5] lg:flex">
        <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-[#B5B1DC]/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-10 h-64 w-64 rounded-full bg-[#FBFF62]/20 blur-3xl" />
        <div className="relative flex items-center gap-2">
  <img
    src="/images/lo.png"
    alt="MILOZA"
    className="h-11 w-auto max-w-45 object-contain block"
    loading="eager"
    fetchPriority="high"
  />
</div>
        <div className="relative">
          <h2 className="font-serif text-4xl font-bold leading-tight">Real People.<br />Real Conversations.</h2>
          <p className="mt-4 max-w-sm text-sm text-[#F8F8F5]/60">
            Join a community that values genuine connection. Discover people, send requests, and chat privately — all for free.
          </p>
          <div className="mt-8 space-y-3">
            {["Free person-to-person messaging", "Privacy-first profiles", "Block & report tools built in"].map((t) => (
              <div key={t} className="flex items-center gap-2 text-sm text-[#F8F8F5]/80">
                <Check className="h-4 w-4 text-[#7C9D8C]" /> {t}
              </div>
            ))}
          </div>
        </div>
        <p className="relative text-xs text-[#F8F8F5]/40">© {new Date().getFullYear()} MILOZA</p>
      </div>

      <div className="flex w-full flex-col justify-center px-6 py-10 lg:w-1/2 lg:px-16">
        <Button variant="ghost" onClick={onBack} className="mb-6 w-fit rounded-full text-[#0F0F01]/60 hover:bg-[#F0EFEA]">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
        </Button>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mx-auto w-full max-w-md">
          <div className="flex rounded-full bg-[#F0EFEA] p-1">
            <button
              onClick={() => setMode("register")}
              className={`flex-1 rounded-full py-2.5 text-sm font-semibold transition ${mode === "register" ? "bg-white shadow-sm" : "text-[#0F0F01]/60"}`}
            >
              Create account
            </button>
            <button
              onClick={() => setMode("login")}
              className={`flex-1 rounded-full py-2.5 text-sm font-semibold transition ${mode === "login" ? "bg-white shadow-sm" : "text-[#0F0F01]/60"}`}
            >
              Log in
            </button>
          </div>

          <Card className="mt-6 rounded-3xl border-[#ADA28C]/30 bg-white shadow-sm">
            <CardContent className="space-y-4 p-6">
              <div>
                <h1 className="font-serif text-2xl font-bold">
                  {mode === "register" ? "Join MILOZA" : "Welcome back"}
                </h1>
                <p className="mt-1 text-sm text-[#0F0F01]/50">
                  {mode === "register" ? "Create your free account in seconds." : "Log in to continue your conversations."}
                </p>
              </div>

              {mode === "register" && (
                <>
                  <div>
                    <Label htmlFor="a-name">Full name</Label>
                    <Input id="a-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Maya Chen" className="mt-1.5 rounded-xl" />
                  </div>
                  <div>
                    <Label htmlFor="a-user">Username</Label>
                    <Input id="a-user" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="mayac" className="mt-1.5 rounded-xl" />
                    {username.length > 0 && (
                      <p className={`mt-1.5 flex items-center gap-1 text-xs ${usernameOk ? "text-[#7C9D8C]" : "text-red-500"}`}>
                        {usernameOk ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        {usernameOk ? "Username available" : "Use 3+ letters, numbers or underscores"}
                      </p>
                    )}
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="a-email">{mode === "register" ? "Email address" : "Email or username"}</Label>
                <Input
                  id="a-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={mode === "register" ? "you..example.com" : "mayac or you..example.com"}
                  className="mt-1.5 rounded-xl"
                />
              </div>

              <div>
                <Label htmlFor="a-pw">Password</Label>
                <div className="relative mt-1.5">
                  <Input
                    id="a-pw"
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="rounded-xl pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0F0F01]/40 hover:text-[#0F0F01]"
                  >
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {mode === "register" && password.length > 0 && (
                  <div className="mt-2">
                    <div className="flex gap-1">
                      {[0, 1, 2, 3].map((i) => (
                        <div key={i} className={`h-1.5 flex-1 rounded-full ${i < strength.score ? strength.color : "bg-[#F0EFEA]"}`} />
                      ))}
                    </div>
                    <p className="mt-1 text-xs text-[#0F0F01]/50">{strength.label}</p>
                  </div>
                )}
              </div>

              {mode === "register" && (
                <>
                  <div>
                    <Label htmlFor="a-confirm">Confirm password</Label>
                    <Input
                      id="a-confirm"
                      type={showPw ? "text" : "password"}
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      placeholder="••••••••"
                      className="rounded-xl"
                    />
                    {confirm.length > 0 && (
                      <p className={`mt-1.5 flex items-center gap-1 text-xs ${passwordsMatch ? "text-[#7C9D8C]" : "text-red-500"}`}>
                        {passwordsMatch ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        {passwordsMatch ? "Passwords match" : "Passwords don't match"}
                      </p>
                    )}
                  </div>
                  <label className="flex items-start gap-2.5 text-sm text-[#0F0F01]/70">
                    <Checkbox checked={terms} onCheckedChange={(v) => setTerms(Boolean(v))} className="mt-0.5" />
                    <span>I agree to the Terms of Service and Privacy Policy.</span>
                  </label>
                </>
              )}

              <Button
                disabled={mode === "register" ? !canRegister || loading : !canLogin || loading}
                onClick={submit}
                className="w-full rounded-full bg-[#0F0F01] py-6 text-[#FBFF62] hover:bg-[#0F0F01]/90 disabled:opacity-50"
              >
                {loading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...</>
                ) : mode === "register" ? (
                  "Create account"
                ) : (
                  "Log in"
                )}
              </Button>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-[#ADA28C]/30" />
                <span className="text-xs text-[#0F0F01]/40">or</span>
                <div className="h-px flex-1 bg-[#ADA28C]/30" />
              </div>

              <Button variant="outline" className="w-full rounded-full border-[#ADA28C] py-6" disabled>
                Continue with Google
              </Button>

              <p className="text-center text-sm text-[#0F0F01]/50">
                {mode === "register" ? "Already have an account? " : "New to MILOZA? "}
                <button
                  onClick={() => setMode(mode === "register" ? "login" : "register")}
                  className="font-semibold text-[#0F0F01] underline-offset-2 hover:underline"
                >
                  {mode === "register" ? "Log in" : "Create one"}
                </button>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

function strengthOf(pw: string) {
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw) || /[^A-Za-z0-9]/.test(pw)) score++;
  const labels = ["Too weak", "Weak", "Fair", "Good", "Strong"];
  const colors = ["bg-red-400", "bg-red-400", "bg-[#ADA28C]", "bg-[#7C9D8C]", "bg-[#7C9D8C]"];
  return { score, label: labels[score], color: colors[score] };
}