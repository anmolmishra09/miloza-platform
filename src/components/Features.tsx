
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  MessageCircle,
  ShieldCheck,
  Users,
  Zap,
  Heart,
  LockKeyhole,
  UserCheck,
  Eye,
  Compass,
  ArrowRight,
  Check,
  Sparkles,
  Globe,
  UserPlus,
} from "lucide-react";

interface Props {
  onGetStarted: () => void;
}

const features = [
  {
    icon: Search,
    title: "Discover People",
    text: "Explore interesting profiles and discover people who share your interests, hobbies and passions.",
    color: "#B5B1DC",
  },
  {
    icon: MessageCircle,
    title: "Free Messaging",
    text: "Enjoy free person-to-person messaging without mandatory subscriptions or unnecessary restrictions.",
    color: "#FBFF62",
  },
  {
    icon: ShieldCheck,
    title: "Privacy First",
    text: "Control your profile visibility and manage your online status according to your preferences.",
    color: "#7C9D8C",
  },
  {
    icon: Users,
    title: "Real Connections",
    text: "Build meaningful one-to-one connections with people from different places and backgrounds.",
    color: "#ADA28C",
  },
  {
    icon: Zap,
    title: "Simple Experience",
    text: "Enjoy a clean, simple and user-friendly social experience designed for effortless connections.",
    color: "#FBFF62",
  },
  {
    icon: Heart,
    title: "Respectful Community",
    text: "Create a comfortable experience with tools to block and report unwanted interactions.",
    color: "#B5B1DC",
  },
];

const extraFeatures = [
  {
    icon: LockKeyhole,
    title: "Private Email",
    text: "Your email address is not displayed publicly.",
  },
  {
    icon: UserCheck,
    title: "Accepted Requests",
    text: "Only accepted chat requests can start conversations.",
  },
  {
    icon: Eye,
    title: "Visibility Controls",
    text: "Manage your available profile visibility settings.",
  },
  {
    icon: ShieldCheck,
    title: "Block & Report",
    text: "Manage unwanted interactions whenever necessary.",
  },
];

const steps = [
  {
    icon: Compass,
    title: "Discover People",
    text: "Browse profiles and find people who share your interests.",
    color: "#B5B1DC",
  },
  {
    icon: UserPlus,
    title: "Send a Request",
    text: "Send a friendly chat request and wait for acceptance.",
    color: "#FBFF62",
  },
  {
    icon: MessageCircle,
    title: "Start Chatting",
    text: "Once accepted, enjoy private conversations.",
    color: "#7C9D8C",
  },
];

export function Features({ onGetStarted }: Props) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F8F5] text-[#0F0F01]">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-[#ADA28C]/20 bg-[#F8F8F5]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

          <a href="/" className="flex items-center">
            <img
              src="/images/lo.png"
              alt="MILOZA"
              className="h-11 w-auto max-w-45 object-contain"
            />
          </a>

          <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
            <a href="/" className="transition hover:text-[#7C9D8C]">
              Home
            </a>
            <a href="/features" className="font-bold text-[#7C9D8C]">
              Features
            </a>
            <a href="/HowItWorks" className="transition hover:text-[#7C9D8C]">
              How it works
            </a>
            <a href="/#discover" className="transition hover:text-[#7C9D8C]">
              Discover
            </a>
            <a href="/#safety" className="transition hover:text-[#7C9D8C]">
              Safety
            </a>
            <a href="/#faq" className="transition hover:text-[#7C9D8C]">
              FAQ
            </a>
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
      <section className="relative overflow-hidden">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#B5B1DC]/40 blur-3xl" />

        <div className="mx-auto max-w-7xl px-6 py-24 text-center md:py-32">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="rounded-full bg-[#7C9D8C]/15 px-4 py-2 text-xs font-bold text-[#557D69]">
              <Sparkles className="mr-2 inline h-4 w-4" />
              DISCOVER WHAT MAKES US DIFFERENT
            </span>

            <h1 className="mx-auto mt-8 max-w-4xl font-serif text-5xl font-bold leading-tight md:text-7xl">
              Everything you need
              <br />
              <span className="text-[#7C9D8C]">
                to connect better.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-black/60 md:text-lg">
              Discover the features that make MILOZA a simple,
              comfortable and enjoyable place to meet people,
              explore interests and build meaningful connections.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
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
                className="rounded-full"
                onClick={() =>
                  document.getElementById("all-features")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                Explore features
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-black/55">
              <span><Check className="mr-1 inline h-4 w-4 text-[#7C9D8C]" /> Free messaging</span>
              <span><Check className="mr-1 inline h-4 w-4 text-[#7C9D8C]" /> Privacy controls</span>
              <span><Check className="mr-1 inline h-4 w-4 text-[#7C9D8C]" /> Simple experience</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* MAIN FEATURES */}
      <section id="all-features" className="scroll-mt-24 bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold tracking-widest text-[#7C9D8C]">
              OUR FEATURES
            </p>

            <h2 className="mt-4 font-serif text-4xl font-bold md:text-5xl">
              Everything starts with a connection.
            </h2>

            <p className="mt-5 leading-7 text-black/55">
              Thoughtfully designed features to make meeting
              new people easier and more enjoyable.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <Card className="h-full rounded-3xl border-[#ADA28C]/25 bg-[#F8F8F5] transition hover:-translate-y-2 hover:shadow-xl">
                    <CardContent className="p-8">

                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-2xl"
                        style={{ backgroundColor: item.color }}
                      >
                        <Icon className="h-7 w-7" />
                      </div>

                      <h3 className="mt-7 text-xl font-bold">
                        {item.title}
                      </h3>

                      <p className="mt-4 text-sm leading-7 text-black/55">
                        {item.text}
                      </p>

                      <div className="mt-7 flex items-center gap-2 text-xs font-bold text-[#557D69]">
                        <Check className="h-4 w-4" />
                        Designed for better connections
                      </div>

                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* PRIVACY FEATURES */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          <div>
            <p className="text-xs font-bold tracking-widest text-[#7C9D8C]">
              PRIVACY & SAFETY
            </p>

            <h2 className="mt-5 font-serif text-4xl font-bold md:text-5xl">
              Your comfort comes first.
            </h2>

            <p className="mt-6 max-w-lg leading-8 text-black/55">
              Connecting with people should feel comfortable.
              MILOZA gives you tools to manage your profile,
              connections and interactions.
            </p>

            <Button
              onClick={onGetStarted}
              className="mt-8 rounded-full bg-[#0F0F01] px-7 text-[#FBFF62]"
            >
              Join MILOZA
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {extraFeatures.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-3xl bg-white p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7C9D8C]/15">
                    <Icon className="h-6 w-6 text-[#557D69]" />
                  </div>

                  <h3 className="mt-5 font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-xs leading-6 text-black/55">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">

          <div className="text-center">
            <p className="text-xs font-bold tracking-widest text-[#7C9D8C]">
              SIMPLE PROCESS
            </p>

            <h2 className="mt-4 font-serif text-4xl font-bold md:text-5xl">
              How MILOZA works.
            </h2>

            <p className="mt-5 text-black/55">
              Three simple steps to start connecting.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <Card
                  key={step.title}
                  className="rounded-3xl border-[#ADA28C]/30"
                >
                  <CardContent className="p-8">

                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: step.color }}
                    >
                      <Icon className="h-8 w-8" />
                    </div>

                    <p className="mt-7 text-xs font-bold text-black/40">
                      STEP 0{index + 1}
                    </p>

                    <h3 className="mt-3 text-xl font-bold">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-black/55">
                      {step.text}
                    </p>

                  </CardContent>
                </Card>
              );
            })}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-4xl bg-[#FBFF62] px-6 py-16 text-center md:px-12">

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
            className="mt-9 rounded-full bg-[#0F0F01] px-9 text-[#FBFF62] hover:bg-[#333321]"
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
    className="h-11 w-auto max-w-45 object-contain block"
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