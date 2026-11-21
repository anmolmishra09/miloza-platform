import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  ShieldCheck,
  LockKeyhole,
  Eye,
  UserCheck,
  UserX,
  Flag,
  Mail,
  Settings,
  Heart,
  ArrowRight,
  Check,
  Fingerprint,
  KeyRound,
} from "lucide-react";

interface Props {
  onGetStarted: () => void;
}

const features = [
  { icon: LockKeyhole, title: "Private Email", text: "Your email address is never displayed publicly.", color: "#B5B1DC" },
  { icon: Eye, title: "Profile Visibility", text: "Manage your profile visibility and online status.", color: "#FBFF62" },
  { icon: UserCheck, title: "Accepted Connections", text: "Only accepted chat requests can start private conversations.", color: "#7C9D8C" },
  { icon: UserX, title: "Block Users", text: "Block unwanted users whenever you feel uncomfortable.", color: "#ADA28C" },
  { icon: Flag, title: "Report Accounts", text: "Report inappropriate behavior for review.", color: "#B5B1DC" },
  { icon: Settings, title: "Account Controls", text: "Manage your profile and account preferences.", color: "#FBFF62" },
];

const faqs = [
  { q: "Is my email address visible?", a: "No. Your email address is not displayed publicly on your MILOZA profile." },
  { q: "Can someone message me without permission?", a: "No. A person must send a chat request, and you must accept it before private messaging becomes available." },
  { q: "Can I block someone?", a: "Yes. You can block users to prevent unwanted interactions." },
  { q: "How can I report someone?", a: "Use the report option available in user interactions to submit a report for review." },
  { q: "Can I control my online status?", a: "Yes. MILOZA provides an option to manage whether your online status is shown." },
];

export function Safety({ onGetStarted }: Props) {
  const navigate = useNavigate();

  const navLinks = [
    ["Home", "/"],
    ["Features", "/features"],
    ["How it works", "/HowItWorks"],
    ["Discover", "/discover"],
    ["Safety", "/safety"],
      ["FAQ", "/faq"],

  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F8F5] text-[#0F0F01]">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-[#ADA28C]/20 bg-[#F8F8F5]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <button onClick={() => navigate("/")}>
            <img src="/images/lo.png" alt="MILOZA" className="h-11 w-auto max-w-[180px] object-contain" />
          </button>

          <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
            {navLinks.map(([label, href]) => (
              <button
                key={href}
                onClick={() => navigate(href)}
                className={`transition hover:text-[#7C9D8C] ${href === "/safety" ? "text-[#7C9D8C]" : ""}`}
              >
                {label}
              </button>
            ))}
          </nav>

     <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={onGetStarted}>
              Log in
            </Button>

            <Button
              onClick={onGetStarted}
              className="rounded-full bg-[#0F0F01] text-[#FBFF62] hover:bg-[#333321]"
            >
              Get started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden px-6 py-24 md:py-32">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#B5B1DC]/40 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#7C9D8C]/15">
            <ShieldCheck className="h-11 w-11 text-[#7C9D8C]" />
          </div>

          <p className="mt-8 text-xs font-bold tracking-widest text-[#557D69]">
            YOUR SAFETY MATTERS
          </p>

          <h1 className="mt-5 font-serif text-5xl font-bold leading-tight md:text-7xl">
            Connect with
            <span className="block text-[#7C9D8C]">confidence.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-black/60 md:text-lg">
            Your comfort comes first. MILOZA provides tools to help
            you manage your privacy, control your connections and
            enjoy a comfortable social experience.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button size="lg" onClick={onGetStarted} className="rounded-full bg-[#0F0F01] px-8 text-[#FBFF62]">
              Get started safely <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-full"
              onClick={() => document.getElementById("safety-features")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore safety features
            </Button>
          </div>

          <div className="mt-9 flex flex-wrap justify-center gap-6 text-sm text-black/55">
            <span><Check className="mr-1 inline h-4 w-4 text-[#7C9D8C]" /> Privacy controls</span>
            <span><Check className="mr-1 inline h-4 w-4 text-[#7C9D8C]" /> Accepted requests</span>
            <span><Check className="mr-1 inline h-4 w-4 text-[#7C9D8C]" /> Block & report</span>
          </div>
        </div>
      </section>

      {/* SAFETY FEATURES */}
      <section id="safety-features" className="scroll-mt-24 bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold tracking-widest text-[#7C9D8C]">SAFETY FEATURES</p>
            <h2 className="mt-4 font-serif text-4xl font-bold md:text-5xl">
              Your comfort. Your control.
            </h2>
            <p className="mt-4 text-black/55">
              Simple tools that help you manage your account and interactions on MILOZA.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="rounded-3xl border-[#ADA28C]/25 bg-[#F8F8F5] transition hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="p-7">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ backgroundColor: item.color }}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-6 text-lg font-bold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-black/55">{item.text}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW SAFETY WORKS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <p className="text-xs font-bold tracking-widest text-[#7C9D8C]">SIMPLE AND COMFORTABLE</p>
          <h2 className="mt-4 font-serif text-4xl font-bold md:text-5xl">Stay in control.</h2>
          <p className="mt-4 text-black/55">Manage your interactions in three simple steps.</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { number: "01", title: "Choose Your Connections", text: "Accept or decline chat requests. You decide who can start a private conversation.", icon: UserCheck },
            { number: "02", title: "Manage Your Privacy", text: "Use available settings to control your profile visibility and online status.", icon: LockKeyhole },
            { number: "03", title: "Take Action When Needed", text: "Block or report users if you experience unwanted interactions.", icon: Flag },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.number} className="rounded-3xl border-[#ADA28C]/30 bg-white">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#B5B1DC]/40">
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="font-serif text-4xl font-bold text-black/10">{item.number}</span>
                  </div>
                  <h3 className="mt-7 text-xl font-bold">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-black/55">{item.text}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* PRIVACY */}
      <section className="bg-[#0F0F01] px-6 py-24 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold tracking-widest text-[#FBFF62]">PRIVACY FIRST</p>
            <h2 className="mt-5 font-serif text-4xl font-bold md:text-5xl">
              Your information belongs to you.
            </h2>
            <p className="mt-6 max-w-lg leading-8 text-white/60">
              Your personal information deserves care. MILOZA keeps your email private
              and provides available controls to help you manage your profile and online presence.
            </p>
            <Button onClick={onGetStarted} className="mt-8 rounded-full bg-[#FBFF62] px-8 text-black hover:bg-white">
              Create your account <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Mail, title: "Email Protection", text: "Your email is not publicly visible." },
              { icon: Fingerprint, title: "Personal Profile", text: "Choose what information you share." },
              { icon: KeyRound, title: "Account Access", text: "Keep your login credentials private." },
              { icon: ShieldCheck, title: "Safety Options", text: "Block and report unwanted interactions." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <Icon className="h-7 w-7 text-[#FBFF62]" />
                  <h3 className="mt-5 text-sm font-bold">{item.title}</h3>
                  <p className="mt-3 text-xs leading-6 text-white/50">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SAFETY REMINDER */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#B5B1DC]/30 p-8 md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <Heart className="h-12 w-12 text-[#557D69]" />
              <h2 className="mt-5 font-serif text-3xl font-bold md:text-4xl">
                Good connections start with respect.
              </h2>
              <p className="mt-5 leading-8 text-black/60">
                Treat others with kindness, respect personal boundaries and never share
                sensitive information with people you do not know or trust.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "Keep your password private.",
                "Think before sharing personal details.",
                "Respect other people's boundaries.",
                "Block or report unwanted interactions.",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/80 p-4">
                  <Check className="h-5 w-5 shrink-0 text-[#557D69]" />
                  <p className="text-sm font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <div className="text-center">
          <p className="text-xs font-bold tracking-widest text-[#7C9D8C]">SAFETY SUPPORT</p>
          <h2 className="mt-4 font-serif text-4xl font-bold">Frequently asked questions</h2>
          <p className="mt-4 text-sm text-black/55">Find answers to common privacy and safety questions.</p>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((faq) => (
            <details key={faq.q} className="group rounded-2xl border border-[#ADA28C]/30 bg-white p-5 open:shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {faq.q}
                <span className="text-xl text-[#7C9D8C] transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-sm leading-7 text-black/60">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-[2rem] bg-[#FBFF62] px-6 py-16 text-center md:px-12">
          <img src="/images/lo.png" alt="MILOZA" className="mx-auto h-14 w-auto object-contain" />
          <h2 className="mt-7 font-serif text-4xl font-bold md:text-5xl">
            Connect with confidence.
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-black/60">
            Join MILOZA, discover interesting people and build meaningful connections at your own pace.
          </p>
          <Button size="lg" onClick={onGetStarted} className="mt-9 rounded-full bg-[#0F0F01] px-9 text-[#FBFF62] hover:bg-[#333321]">
            Create your free account <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <p className="mt-5 text-xs text-black/50">
            Your account · Your choices · Your connections
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#ADA28C]/30 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-2 lg:grid-cols-4">

          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center shrink-0">
  <img
    src="/images/lo.png"
    alt="MILOZA"
    className="h-11 w-auto max-w-[180px] object-contain block"
    loading="eager"
    fetchPriority="high"
  />
  <span className="ml-2 text-xl font-bold tracking-tight text-[#0F0F01]">MILOZA</span>
</a>

            <p className="mt-5 max-w-sm text-sm leading-7 text-black/55">
              A place to discover people, share interests and
              create meaningful one-to-one conversations.
            </p>
            <p className="mt-5 text-sm font-medium">
              Real People. Real Conversations.
            </p>
          </div>

          <div>
            <h3 className="font-bold">Explore</h3>
            <div className="mt-5 flex flex-col gap-3 text-sm text-black/55">
              {[
                ["Home", "#home"],
                ["Features", "#features"],
                ["How it works", "#how"],
                ["Discover", "#discover"],
              ].map(([label, href]) => (
                <a key={href} href={href} className="hover:text-[#7C9D8C]">
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold">Account & Help</h3>
            <div className="mt-5 flex flex-col gap-3 text-sm text-black/55">
              <button onClick={onGetStarted} className="text-left hover:text-[#7C9D8C]">
                Log in
              </button>
              <button onClick={onGetStarted} className="text-left hover:text-[#7C9D8C]">
                Create account
              </button>
              <a href="#safety" className="hover:text-[#7C9D8C]">Privacy & Safety</a>
              <a href="#faq" className="hover:text-[#7C9D8C]">Help & FAQ</a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#ADA28C]/20">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-center sm:flex-row">
            <p className="text-xs text-black/50">
              © {new Date().getFullYear()} MILOZA. All rights reserved.
            </p>
            <p className="text-xs text-black/50">
              Made for real people and real connections.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}