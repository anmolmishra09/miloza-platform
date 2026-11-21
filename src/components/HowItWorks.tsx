
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  Compass,
  UserPlus,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Check,
  LockKeyhole,
  Users,
  Heart,
  Globe,
} from "lucide-react";

interface Props {
  onGetStarted: () => void;
}

const steps = [
  {
    icon: Compass,
    number: "01",
    title: "Discover People",
    text: "Explore interesting profiles, browse different interests and find people who share your vibe.",
    color: "#B5B1DC",
  },
  {
    icon: UserPlus,
    number: "02",
    title: "Send a Request",
    text: "Found someone interesting? Send a friendly chat request and wait for acceptance.",
    color: "#FBFF62",
  },
  {
    icon: MessageCircle,
    number: "03",
    title: "Start Chatting",
    text: "Once your request is accepted, enjoy private one-to-one conversations.",
    color: "#7C9D8C",
  },
];

const benefits = [
  {
    icon: Users,
    title: "Discover New People",
    text: "Meet interesting people from different places and backgrounds.",
  },
  {
    icon: MessageCircle,
    title: "Free Messaging",
    text: "Enjoy person-to-person messaging without mandatory subscriptions.",
  },
  {
    icon: LockKeyhole,
    title: "Privacy First",
    text: "Your email stays private and you control your profile visibility.",
  },
  {
    icon: ShieldCheck,
    title: "Stay in Control",
    text: "Manage your connections with block and report options.",
  },
];

export function HowItWorks({ onGetStarted }: Props) {
  const navigate = useNavigate();

  const navLinks = [
    ["Home", "/"],
    ["Features", "/features"],
    ["How it works", "/HowItWorks"],
    ["Discover", "/discover"],
    ["Safety","/safety"],
    ["FAQ", "/faq"],
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F8F5] text-[#0F0F01]">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-[#ADA28C]/20 bg-[#F8F8F5]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

          <button
            onClick={() => navigate("/")}
            className="flex items-center text-xl font-bold"
          >
            <img
              src="/images/lo.png"
              alt="MILOZA"
              className="h-11 w-auto max-w-[180px] object-contain"
            />
          </button>

          <nav className="hidden items-center gap-7 text-sm font-medium lg:flex">
            {navLinks.map(([label, href]) => (
              <button
                key={href}
                onClick={() => navigate(href)}
                className={`transition hover:text-[#7C9D8C] ${
                  href === "/how-it-works" ? "text-[#7C9D8C]" : ""
                }`}
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

          <span className="rounded-full bg-[#7C9D8C]/15 px-4 py-2 text-xs font-bold tracking-widest text-[#557D69]">
            SIMPLE. FRIENDLY. SOCIAL.
          </span>

          <h1 className="mt-9 font-serif text-5xl font-bold leading-tight md:text-7xl">
            How MILOZA{" "}
            <span className="text-[#7C9D8C]">works.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-black/60 md:text-lg">
            Making genuine connections should be simple.
            Discover people, send a request and start meaningful
            conversations with MILOZA.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              onClick={onGetStarted}
              className="rounded-full bg-[#0F0F01] px-8 text-[#FBFF62]"
            >
              Start connecting
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() =>
                document.getElementById("steps")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="rounded-full"
            >
              Explore steps
            </Button>
          </div>

          <div className="mt-9 flex flex-wrap justify-center gap-6 text-sm text-black/55">
            <span>
              <Check className="mr-1 inline h-4 w-4 text-[#7C9D8C]" />
              Free messaging
            </span>
            <span>
              <Check className="mr-1 inline h-4 w-4 text-[#7C9D8C]" />
              Privacy controls
            </span>
            <span>
              <Check className="mr-1 inline h-4 w-4 text-[#7C9D8C]" />
              Easy connections
            </span>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="steps" className="scroll-mt-24 bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold tracking-widest text-[#7C9D8C]">
              THREE SIMPLE STEPS
            </p>

            <h2 className="mt-4 font-serif text-4xl font-bold md:text-5xl">
              Start your journey.
            </h2>

            <p className="mt-4 text-black/55">
              Your next connection is just a few steps away.
            </p>
          </div>

          <div className="mt-14 grid gap-7 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <Card
                  key={step.number}
                  className="rounded-3xl border-[#ADA28C]/25 bg-[#F8F8F5] transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <CardContent className="p-8">

                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: step.color }}
                    >
                      <Icon className="h-8 w-8" />
                    </div>

                    <p className="mt-8 text-xs font-bold tracking-widest text-black/40">
                      STEP {step.number}
                    </p>

                    <h3 className="mt-3 text-2xl font-bold">
                      {step.title}
                    </h3>

                    <p className="mt-4 text-sm leading-8 text-black/55">
                      {step.text}
                    </p>

                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* DISCOVER CONNECTIONS */}
      <section className="bg-[#0F0F01] px-6 py-24 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">

          <div>
            <p className="text-xs font-bold tracking-widest text-[#FBFF62]">
              YOUR SOCIAL JOURNEY
            </p>

            <h2 className="mt-5 font-serif text-4xl font-bold md:text-6xl">
              Different people.
              <span className="text-[#7C9D8C]"> Real connections.</span>
            </h2>

            <p className="mt-6 max-w-lg leading-8 text-white/60">
              Whether you love music, technology, travel, photography
              or gaming, MILOZA helps you discover people who share
              your interests.
            </p>

            <Button
              onClick={onGetStarted}
              className="mt-9 rounded-full bg-[#FBFF62] px-8 text-black hover:bg-white"
            >
              Join MILOZA
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Heart, title: "Shared Interests", color: "#B5B1DC" },
              { icon: MessageCircle, title: "Private Chats", color: "#FBFF62" },
              { icon: Globe, title: "Discover People", color: "#7C9D8C" },
              { icon: Users, title: "Real Connections", color: "#ADA28C" },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <Card
                  key={item.title}
                  className="rounded-3xl border-white/10 bg-white/5 text-white"
                >
                  <CardContent className="p-7">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: item.color }}
                    >
                      <Icon className="h-7 w-7 text-black" />
                    </div>

                    <h3 className="mt-6 font-bold">
                      {item.title}
                    </h3>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">

          <div className="text-center">
            <p className="text-xs font-bold tracking-widest text-[#7C9D8C]">
              WHY MILOZA
            </p>

            <h2 className="mt-4 font-serif text-4xl font-bold md:text-5xl">
              More than just chatting.
            </h2>

            <p className="mt-4 text-black/55">
              A simple social experience built around people.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item) => {
              const Icon = item.icon;

              return (
                <Card
                  key={item.title}
                  className="rounded-3xl border-[#ADA28C]/25 bg-white"
                >
                  <CardContent className="p-7">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#B5B1DC]/40">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="mt-6 font-bold">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-black/55">
                      {item.text}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-[2rem] bg-[#FBFF62] px-6 py-16 text-center md:px-12">

          <img
            src="/images/lo.png"
            alt="MILOZA"
            className="mx-auto h-14 w-auto object-contain"
          />

          <h2 className="mt-7 font-serif text-4xl font-bold md:text-5xl">
            Your next conversation is waiting.
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-black/60">
            Discover new people, share your interests and start
            building meaningful connections with MILOZA.
          </p>

          <Button
            size="lg"
            onClick={onGetStarted}
            className="mt-9 rounded-full bg-[#0F0F01] px-9 text-[#FBFF62]"
          >
            Create your free account
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <p className="mt-5 text-xs text-black/50">
            Free to get started · No mandatory subscription
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