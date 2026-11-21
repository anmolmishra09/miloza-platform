
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Compass,
  Heart,
  Users,
  MessageCircle,
  Music,
  Camera,
  Gamepad2,
  BookOpen,
  Plane,
  Code,
  Coffee,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Globe,
  UserPlus,
} from "lucide-react";

interface Props {
  onGetStarted: () => void;
}

const interests = [
  { name: "Music", icon: Music, color: "#B5B1DC" },
  { name: "Photography", icon: Camera, color: "#FBFF62" },
  { name: "Gaming", icon: Gamepad2, color: "#7C9D8C" },
  { name: "Books", icon: BookOpen, color: "#ADA28C" },
  { name: "Travel", icon: Plane, color: "#B5B1DC" },
  { name: "Technology", icon: Code, color: "#FBFF62" },
  { name: "Coffee", icon: Coffee, color: "#7C9D8C" },
];

const benefits = [
  {
    icon: Search,
    title: "Explore Profiles",
    text: "Browse interesting profiles and discover people from different backgrounds.",
  },
  {
    icon: Heart,
    title: "Find Shared Interests",
    text: "Connect with people who enjoy the same hobbies and passions as you.",
  },
  {
    icon: MessageCircle,
    title: "Start Conversations",
    text: "Send a chat request and start talking once the other person accepts.",
  },
];

const people = [
  {
    name: "Maya",
    interest: "Design & Photography",
    location: "India",
    color: "#B5B1DC",
    initial: "M",
  },
  {
    name: "Liam",
    interest: "Technology & Gaming",
    location: "Singapore",
    color: "#7C9D8C",
    initial: "L",
  },
  {
    name: "Sofia",
    interest: "Travel & Music",
    location: "London",
    color: "#FBFF62",
    initial: "S",
  },
  {
    name: "Noah",
    interest: "Books & Movies",
    location: "Canada",
    color: "#ADA28C",
    initial: "N",
  },
];

export function Discover({ onGetStarted }: Props) {
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

          <button
            onClick={() => navigate("/")}
            className="flex shrink-0 items-center"
          >
            <img
              src="/images/lo.png"
              alt="MILOZA"
              className="h-11 w-auto max-w-[180px] object-contain"
            />
          </button>

          <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
            {navLinks.map(([label, href]) => (
              <button
                key={href}
                onClick={() => navigate(href)}
                className={`transition hover:text-[#7C9D8C] ${
                  href === "/discover" ? "text-[#7C9D8C]" : ""
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
            <Sparkles className="mr-2 inline h-3 w-3" />
            FIND YOUR PEOPLE
          </span>

          <h1 className="mt-9 font-serif text-5xl font-bold leading-tight md:text-7xl">
            Discover your{" "}
            <span className="text-[#7C9D8C]">people.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-black/60 md:text-lg">
            Explore interesting profiles, find people who share your
            interests and build genuine connections. Your next great
            conversation could start here.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              onClick={onGetStarted}
              className="rounded-full bg-[#0F0F01] px-8 text-[#FBFF62]"
            >
              Discover People
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() =>
                document.getElementById("interests")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="rounded-full"
            >
              Explore Interests
            </Button>
          </div>

          <div className="mt-9 flex flex-wrap justify-center gap-6 text-sm text-black/55">
            <span>
              <CheckIcon /> Real connections
            </span>
            <span>
              <CheckIcon /> Shared interests
            </span>
            <span>
              <CheckIcon /> Free messaging
            </span>
          </div>
        </div>
      </section>

      {/* INTERESTS */}
      <section id="interests" className="scroll-mt-24 bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold tracking-widest text-[#7C9D8C]">
              EXPLORE YOUR PASSIONS
            </p>

            <h2 className="mt-4 font-serif text-4xl font-bold md:text-5xl">
              Connect through interests.
            </h2>

            <p className="mt-4 text-black/55">
              Start with something you love and discover people
              who love it too.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {interests.map((item) => {
              const Icon = item.icon;

              return (
                <Card
                  key={item.name}
                  className="rounded-3xl border-[#ADA28C]/25 bg-[#F8F8F5] transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardContent className="flex items-center gap-4 p-5">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: item.color }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="text-sm font-bold">
                      {item.name}
                    </h3>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Button
              onClick={onGetStarted}
              className="rounded-full bg-[#0F0F01] px-8 text-[#FBFF62]"
            >
              Explore MILOZA
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* PEOPLE PREVIEW */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold tracking-widest text-[#7C9D8C]">
                MEET NEW PEOPLE
              </p>

              <h2 className="mt-4 font-serif text-4xl font-bold md:text-5xl">
                Every connection starts somewhere.
              </h2>

              <p className="mt-4 text-black/55">
                Explore the kind of profiles you can discover on MILOZA.
              </p>
            </div>

            <Button
              onClick={onGetStarted}
              variant="outline"
              className="rounded-full"
            >
              Explore profiles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {people.map((person) => (
              <Card
                key={person.name}
                className="rounded-3xl border-[#ADA28C]/25 bg-white transition hover:-translate-y-1 hover:shadow-xl"
              >
                <CardContent className="p-6">

                  <div
                    className="flex h-20 w-20 items-center justify-center rounded-3xl text-3xl font-bold"
                    style={{ backgroundColor: person.color }}
                  >
                    {person.initial}
                  </div>

                  <h3 className="mt-6 text-xl font-bold">
                    {person.name}
                  </h3>

                  <p className="mt-2 text-sm text-black/55">
                    {person.interest}
                  </p>

                  <p className="mt-2 text-xs text-black/40">
                    <Globe className="mr-1 inline h-3 w-3" />
                    {person.location}
                  </p>

                  <Button
                    onClick={onGetStarted}
                    variant="outline"
                    className="mt-6 w-full rounded-full"
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Connect
                  </Button>

                </CardContent>
              </Card>
            ))}
          </div>

          <p className="mt-5 text-center text-xs text-black/40">
            Illustrative profile previews. Actual profiles are available after joining.
          </p>
        </div>
      </section>

      {/* WHY DISCOVER */}
      <section className="bg-[#0F0F01] px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold tracking-widest text-[#FBFF62]">
              WHY MILOZA
            </p>

            <h2 className="mt-5 font-serif text-4xl font-bold md:text-5xl">
              A better way to connect.
            </h2>

            <p className="mt-5 leading-8 text-white/60">
              Discover people and create meaningful conversations
              in a simple and comfortable social environment.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {benefits.map((item) => {
              const Icon = item.icon;

              return (
                <Card
                  key={item.title}
                  className="rounded-3xl border-white/10 bg-white/5 text-white"
                >
                  <CardContent className="p-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#B5B1DC] text-black">
                      <Icon className="h-7 w-7" />
                    </div>

                    <h3 className="mt-6 text-xl font-bold">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-white/55">
                      {item.text}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* SAFETY */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#B5B1DC]/30 p-8 md:p-12">

          <div className="grid items-center gap-8 md:grid-cols-2">

            <div>
              <ShieldCheck className="h-12 w-12 text-[#557D69]" />

              <h2 className="mt-5 font-serif text-3xl font-bold md:text-4xl">
                Discover comfortably.
              </h2>

              <p className="mt-5 leading-8 text-black/60">
                Your comfort matters. Take control of your
                interactions and connect at your own pace.
              </p>

              <Button
                onClick={onGetStarted}
                className="mt-7 rounded-full bg-[#0F0F01] px-7 text-[#FBFF62]"
              >
                Get started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                "Privacy controls",
                "Private email",
                "Chat requests",
                "Block and report",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-white/80 p-5"
                >
                  <ShieldCheck className="h-6 w-6 text-[#557D69]" />
                  <p className="mt-4 text-sm font-bold">{item}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-[2rem] bg-[#FBFF62] px-6 py-16 text-center md:px-12">

          <img
            src="/images/lo.png"
            alt="MILOZA"
            className="mx-auto h-14 w-auto object-contain"
          />

          <h2 className="mt-7 font-serif text-4xl font-bold md:text-5xl">
            Your people are waiting.
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-black/60">
            Discover new people, share your interests and
            start building meaningful connections with MILOZA.
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

    {/* BRAND */}
    <div className="lg:col-span-2">
      <button
        onClick={() => navigate("/")}
        className="flex items-center shrink-0"
      >
        <img
          src="/images/lo.png"
          alt="MILOZA"
          className="h-11 w-auto max-w-[180px] object-contain block"
        />
        <span className="ml-2 text-xl font-bold tracking-tight text-[#0F0F01]">
          MILOZA
        </span>
      </button>

      <p className="mt-5 max-w-sm text-sm leading-7 text-black/55">
        A place to discover people, share interests and
        create meaningful one-to-one conversations.
      </p>

      <p className="mt-5 text-sm font-medium">
        Real People. Real Conversations.
      </p>
    </div>

    {/* EXPLORE */}
    <div>
      <h3 className="font-bold">Explore</h3>

      <div className="mt-5 flex flex-col gap-3 text-sm text-black/55">
        <button onClick={() => navigate("/")} className="text-left hover:text-[#7C9D8C]">
          Home
        </button>

        <button onClick={() => navigate("/features")} className="text-left hover:text-[#7C9D8C]">
          Features
        </button>

        <button onClick={() => navigate("/how-it-works")} className="text-left hover:text-[#7C9D8C]">
          How it works
        </button>

        <button onClick={() => navigate("/discover")} className="text-left hover:text-[#7C9D8C]">
          Discover
        </button>
      </div>
    </div>

    {/* ACCOUNT & HELP */}
    <div>
      <h3 className="font-bold">Account & Help</h3>

      <div className="mt-5 flex flex-col gap-3 text-sm text-black/55">
        <button
          onClick={onGetStarted}
          className="text-left hover:text-[#7C9D8C]"
        >
          Log in
        </button>

        <button
          onClick={onGetStarted}
          className="text-left hover:text-[#7C9D8C]"
        >
          Create account
        </button>

        <button
          onClick={() => navigate("/privacy")}
          className="text-left hover:text-[#7C9D8C]"
        >
          Privacy & Safety
        </button>

        <button
          onClick={() => navigate("/faq")}
          className="text-left hover:text-[#7C9D8C]"
        >
          Help & FAQ
        </button>
      </div>
    </div>

  </div>

  {/* BOTTOM FOOTER */}
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

function CheckIcon() {
  return (
    <span className="mr-1 inline-flex items-center justify-center text-[#7C9D8C]">
      ✓
    </span>
  );
}
