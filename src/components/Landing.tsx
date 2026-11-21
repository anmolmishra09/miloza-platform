import { useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sparkles, MessageCircle, ShieldCheck, UserPlus,
  Compass, Heart, ArrowRight, Check, Menu, X,
  Users, Search, LockKeyhole, Zap, UserCheck,
  Eye, ChevronDown, Globe, MessageSquare
} from "lucide-react";

interface Props {
  onGetStarted: () => void;
}

const features = [
  { icon: Search, title: "Discover People", text: "Explore interesting profiles and find people who share your interests." },
  { icon: MessageCircle, title: "Free Messaging", text: "Enjoy free person-to-person messaging without mandatory subscriptions." },
  { icon: ShieldCheck, title: "Privacy First", text: "Control your profile visibility and manage your online status." },
  { icon: Users, title: "Real Connections", text: "Build meaningful one-to-one connections with other people." },
  { icon: Zap, title: "Simple Experience", text: "Enjoy a clean, simple and user-friendly social experience." },
  { icon: Heart, title: "Respectful Community", text: "Block and report unwanted interactions whenever necessary." },
];

const steps = [
  { icon: Compass, title: "Discover People", text: "Browse profiles and find people who share your vibe.", color: "#B5B1DC" },
  { icon: UserPlus, title: "Send a Request", text: "Send a friendly chat request and wait for acceptance.", color: "#FBFF62" },
  { icon: MessageCircle, title: "Start Chatting", text: "Once accepted, enjoy private conversations.", color: "#7C9D8C" },
];

const faqs = [
  { q: "What is MILOZA?", a: "MILOZA is a social platform where people discover profiles, connect and chat privately." },
  { q: "Is MILOZA free?", a: "Yes. Person-to-person messaging is free without mandatory subscriptions." },
  { q: "How do chat requests work?", a: "Send a request to someone. They can accept or decline it. Only accepted connections can message each other." },
  { q: "Is my email public?", a: "No. Your email address is not displayed publicly." },
  { q: "Can I block someone?", a: "Yes. You can use block and report options to manage unwanted interactions." },
  { q: "Can I use MILOZA on mobile?", a: "Yes. MILOZA is designed to work across mobile, tablet and desktop screens." },
];

const interests = [
  "Design", "Music", "Travel", "Technology", "Books",
  "Gaming", "Photography", "Fitness", "Movies", "Coffee",
];

export function Landing({ onGetStarted }: Props) {
  const [mobileMenu, setMobileMenu] = useState(false);
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

    {/* LOGO */}
<a href="/" className="flex items-center shrink-0">
  <img
    src="/images/lo.png"
    alt="MILOZA"
    className="h-11 w-auto max-w-45 object-contain block"
    loading="eager"
    fetchPriority="high"
  />
</a>

    {/* DESKTOP NAVIGATION */}
    <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
      {navLinks.map(([label, href]) => (
        <a
          key={href}
          href={href}
          className="transition hover:text-[#7C9D8C]"
        >
          {label}
        </a>
      ))}
    </nav>

    {/* DESKTOP BUTTONS */}
    <div className="hidden items-center gap-3 sm:flex">
      <Button
        variant="ghost"
        onClick={onGetStarted}
      >
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

    {/* MOBILE MENU BUTTON */}
    <button
      type="button"
      className="rounded-xl border border-[#ADA28C]/30 p-2 lg:hidden"
      onClick={() => setMobileMenu(!mobileMenu)}
      aria-label="Toggle menu"
      aria-expanded={mobileMenu}
    >
      {mobileMenu ? <X /> : <Menu />}
    </button>
  </div>

  {/* MOBILE NAVIGATION */}
  {mobileMenu && (
    <div className="border-t border-[#ADA28C]/20 bg-[#F8F8F5] p-5 lg:hidden">
      <nav className="flex flex-col gap-2">
        {navLinks.map(([label, href]) => (
          <a
            key={href}
            href={href}
            onClick={() => setMobileMenu(false)}
            className="rounded-xl p-3 text-sm hover:bg-[#7C9D8C]/10"
          >
            {label}
          </a>
        ))}
      </nav>

      <Button
        className="mt-4 w-full rounded-full bg-[#0F0F01] text-[#FBFF62]"
        onClick={() => {
          setMobileMenu(false);
          onGetStarted();
        }}
      >
        Get started
      </Button>
    </div>
  )}
</header>


{/* HERO */}
<section id="home" className="relative scroll-mt-24 overflow-hidden">
  <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#B5B1DC]/40 blur-3xl" />

  <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">

    {/* LEFT CONTENT */}
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative"
    >
      <span className="rounded-full bg-[#7C9D8C]/15 px-4 py-2 text-xs font-bold text-[#557D69]">
        ● REAL PEOPLE. REAL CONVERSATIONS.
      </span>

      
<h1 className="mt-7 font-serif text-5xl font-bold leading-tight md:text-7xl">
  <TypeAnimation
    sequence={[
      "Your world.",
      1200,
      "Your people.",
      1200,
      "Your conversations.",
      2000,
    ]}
    speed={45}
    deletionSpeed={35}
    repeat={Infinity}
    cursor={true}
    wrapper="span"
    className="text-[#7C9D8C]"
  />
</h1>


      <p className="mt-6 max-w-xl text-base leading-8 text-black/60 md:text-lg">
        Discover interesting people, explore shared interests
        and build genuine connections. MILOZA makes meeting
        new people simple and enjoyable.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button
          size="lg"
          onClick={onGetStarted}
          className="rounded-full bg-[#0F0F01] px-8 text-[#FBFF62]"
        >
          Start meeting people
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="rounded-full"
          onClick={() =>
            document.getElementById("features")?.scrollIntoView({
              behavior: "smooth",
            })
          }
        >
          Explore features
        </Button>
      </div>

      <div className="mt-8 flex flex-wrap gap-5 text-sm text-black/55">
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
          No mandatory subscription
        </span>
      </div>
    </motion.div>

    {/* RIGHT SIDE CARDS ANIMATION */}
    <div className="mx-auto w-full max-w-lg space-y-4 overflow-hidden">

      {/* CARD 1 */}
      <motion.div
        initial={{ y: -500, opacity: 0, rotate: 0 }}
        animate={{ y: 0, opacity: 1, rotate: 2 }}
        transition={{
          delay: 0.3,
          type: "spring",
          stiffness: 90,
          damping: 12,
          mass: 1.2,
        }}
      >
        <Card className="ml-auto w-[85%] rotate-2 rounded-3xl bg-white shadow-xl">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#B5B1DC] text-xl font-bold">
              M
            </div>
            <div>
              <p className="font-bold">Maya Chen</p>
              <p className="text-xs text-black/50">Designer · India</p>
            </div>
            <span className="ml-auto h-3 w-3 rounded-full bg-[#7C9D8C]" />
          </CardContent>
        </Card>
      </motion.div>

      {/* CARD 2 */}
      <motion.div
        initial={{ y: -500, opacity: 0, rotate: 0 }}
        animate={{ y: 0, opacity: 1, rotate: -1 }}
        transition={{
          delay: 0.8,
          type: "spring",
          stiffness: 90,
          damping: 12,
          mass: 1.2,
        }}
      >
        <Card className="-rotate-1 rounded-3xl border-none bg-[#FBFF62] shadow-lg">
          <CardContent className="p-6">
            <MessageCircle className="h-5 w-5" />
            <p className="mt-4 text-lg font-semibold">
              "Hey! Loved your playlist 🎧"
            </p>
            <p className="mt-2 text-xs text-black/50">
              A new connection starts with hello.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* CARD 3 */}
      <motion.div
        initial={{ y: -500, opacity: 0, rotate: 0 }}
        animate={{ y: 0, opacity: 1, rotate: 1 }}
        transition={{
          delay: 1.3,
          type: "spring",
          stiffness: 90,
          damping: 12,
          mass: 1.2,
        }}
      >
        <Card className="ml-8 w-[85%] rotate-1 rounded-3xl bg-white shadow-xl">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7C9D8C] text-xl font-bold text-white">
              L
            </div>
            <div>
              <p className="font-bold">Liam Okafor</p>
              <p className="text-xs text-black/50">Runner · Singapore</p>
            </div>
            <UserCheck className="ml-auto text-[#7C9D8C]" />
          </CardContent>
        </Card>
      </motion.div>

      {/* CARD 4 */}
      <motion.div
        initial={{ y: -500, opacity: 0, rotate: 0 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{
          delay: 1.8,
          type: "spring",
          stiffness: 90,
          damping: 12,
          mass: 1.2,
        }}
      >
        <Card className="rounded-3xl bg-[#B5B1DC] shadow-lg">
          <CardContent className="flex items-center gap-3 p-5">
            <Check className="h-6 w-6" />
            <div>
              <p className="font-bold">Request accepted!</p>
              <p className="text-xs text-black/60">
                You can now start chatting.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

    </div>
  </div>
</section>

       {/* FEATURES */}
      <section id="features" className="scroll-mt-24 bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold tracking-widest text-[#7C9D8C]">WHY MILOZA</p>
            <h2 className="mt-4 font-serif text-4xl font-bold md:text-5xl">
              Everything starts with a connection.
            </h2>
            <p className="mt-4 text-black/55">
              A social experience designed around people and conversations.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item) => (
              <Card key={item.title} className="rounded-3xl border-[#ADA28C]/25 bg-[#F8F8F5] transition hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#B5B1DC]/40">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-lg font-bold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-black/55">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="scroll-mt-24 mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <p className="text-xs font-bold tracking-widest text-[#7C9D8C]">GET STARTED</p>
          <h2 className="mt-4 font-serif text-4xl font-bold">How MILOZA works</h2>
          <p className="mt-4 text-black/55">Three simple steps to start connecting.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={step.title} className="rounded-3xl border-[#ADA28C]/30 bg-white">
              <CardContent className="p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ backgroundColor: step.color }}>
                  <step.icon className="h-7 w-7" />
                </div>
                <p className="mt-7 text-xs font-bold text-black/40">STEP 0{index + 1}</p>
                <h3 className="mt-3 text-xl font-bold">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-black/55">{step.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* DISCOVER */}
<section
  id="discover"
  className="relative scroll-mt-24 overflow-hidden bg-[#0F0F01] px-6 py-24 text-white md:py-32"
>
  {/* Background decoration */}
  <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#FBFF62]/6 blur-[120px]" />
  <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#7C9D8C]/8 blur-[120px]" />

  <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-20">

    {/* LEFT CONTENT */}
    <div>
      <div className="inline-flex items-center gap-3 rounded-full border border-[#FBFF62]/20 bg-[#FBFF62]/[0.07] px-4 py-2">
        <span className="h-2 w-2 rounded-full bg-[#FBFF62] shadow-[0_0_10px_#FBFF62]" />
        <p className="text-[10px] font-bold tracking-[0.25em] text-[#FBFF62]">
          FIND YOUR COMMUNITY
        </p>
      </div>

      <h2 className="mt-8 max-w-xl font-serif text-5xl font-bold leading-[1.12] tracking-tight md:text-6xl lg:text-7xl">
        Different interests.
        <span className="mt-2 block text-[#FBFF62]">
          One place
        </span>
        to connect.
      </h2>

      <p className="mt-7 max-w-lg text-sm leading-8 text-white/50 md:text-base">
        Whether you love music, technology, travel, photography or gaming,
        discover people who share your interests. Start with a common
        passion and let the conversation grow.
      </p>

      {/* INTEREST TAGS */}
      <div className="mt-9 flex max-w-xl flex-wrap gap-3">
        {interests.map((interest) => (
          <span
            key={interest}
            className="cursor-default rounded-full border border-white/10 bg-white/4 px-5 py-2.5 text-xs text-white/70 transition-all duration-300 hover:border-[#FBFF62]/50 hover:bg-[#FBFF62]/10 hover:text-[#FBFF62]"
          >
            {interest}
          </span>
        ))}
      </div>

      {/* CTA */}
      <Button
        onClick={onGetStarted}
        className="mt-10 h-14 rounded-full bg-[#FBFF62] px-8 font-bold text-black shadow-[0_8px_30px_rgba(251,255,98,0.12)] transition-all duration-300 hover:-translate-y-1 hover:bg-white"
      >
        Discover MILOZA
        <ArrowRight className="ml-3 h-4 w-4" />
      </Button>

      <p className="mt-5 text-xs tracking-wide text-white/30">
        Your interests. Your people. Your community.
      </p>
    </div>

    {/* RIGHT PROFILE GRID */}
    <div className="relative">
    {/* Decorative circle */}
<div className="absolute inset-8 rounded-full border border-[#FBFF62]/10" />
<div className="absolute inset-16 rounded-full border border-white/4" />

<div className="relative grid grid-cols-2 gap-4 md:gap-5">
  {[
    {
      name: "Sidhu",
      interest: "Design",
      color: "#B5B1DC",
      number: "01",
      emoji: "✳",
      image: "/images/am.jpg"
    },
     {
    name: "Aarvi",
    interest: "Design",
    color: "#B5B1DC",
    number: "02",
    emoji: "✳",
    image: "/images/ae.jpg"
  },
    {
      name: "Liam",
      interest: "Technology",
      color: "#7C9D8C",
      number: "03",
      emoji: "⌘",
      image: "/images/aq.jpg"
    },
    {
      name: "Nishant",
      interest: "Gaming",
      color: "#FBFF62",
      number: "04",
      emoji: "✈",
      image: "/images/aw.jpg"
    },
    // {
    //   name: "Noah",
    //   interest: "Gaming",
    //   color: "#ADA28C",
    //   number: "05",
    //   emoji: "◈",
    //   image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop"
    // },
  ].map((person, index) => (
    <Card
      key={person.name}
      className={`group relative overflow-hidden rounded-[28px] border border-white/10 bg-[#19190D] text-white shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#FBFF62]/40 ${
        index % 2 === 1 ? "mt-10" : ""
      }`}
    >
      <CardContent className="relative p-5 md:p-7">

        <div className="flex items-center justify-between">
          <span className="text-[10px] tracking-[0.2em] text-white/30">
            MILOZA MEMBER
          </span>
          <span className="text-xs text-white/20">
            {person.number}
          </span>
        </div>

        {/* Avatar Image */}
        <div className="mt-7 h-16 w-16 overflow-hidden rounded-[22px] shadow-lg transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 md:h-20 md:w-20">
          <img
            src={person.image}
            alt={person.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        <p className="mt-6 text-lg font-bold tracking-tight">
          {person.name}
        </p>

        <p className="mt-1 text-xs text-white/40">
          {person.interest} enthusiast
        </p>

        <div className="my-5 h-px bg-white/10" />

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[10px] text-[#7C9D8C] md:text-xs">
            <Heart className="h-4 w-4 fill-[#7C9D8C]/20" />
            Shared interests
          </div>
          <span
            className="text-lg transition-transform duration-300 group-hover:scale-125"
            style={{ color: person.color }}
          >
            {person.emoji}
          </span>
        </div>

        {/* Hover decoration */}
        <div
          className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
          style={{ backgroundColor: person.color }}
        />

      </CardContent>
    </Card>
  ))}
</div>

      {/* Floating label */}
      <div className="absolute -bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-full border border-white/10 bg-[#222217] px-5 py-3 shadow-2xl">
        <div className="flex -space-x-2">
          {["#B5B1DC", "#7C9D8C", "#FBFF62", "#ADA28C"].map((color, i) => (
            <div
              key={i}
              className="h-6 w-6 rounded-full border-2 border-[#222217]"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <span className="text-[10px] font-medium text-white/70">
          Different people. Shared passions.
        </span>
      </div>
    </div>
  </div>
</section>

      {/* SAFETY */}
      <section id="safety" className="scroll-mt-24 mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <ShieldCheck className="mx-auto h-12 w-12 text-[#7C9D8C]" />
          <h2 className="mt-5 font-serif text-4xl font-bold">Your comfort comes first.</h2>
          <p className="mt-5 leading-7 text-black/55">
            Connecting with people should feel comfortable.
            MILOZA provides tools to help manage your interactions.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { icon: LockKeyhole, title: "Your privacy matters", text: "Your email is not displayed publicly. Manage available profile visibility and online status settings." },
            { icon: UserCheck, title: "You control connections", text: "People must accept your chat request before messaging becomes available." },
            { icon: ShieldCheck, title: "Block and report", text: "Use available block and report options to manage unwanted interactions." },
          ].map((item) => (
            <Card key={item.title} className="rounded-3xl border-[#ADA28C]/30 bg-white">
              <CardContent className="p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7C9D8C]/15">
                  <item.icon className="h-6 w-6 text-[#7C9D8C]" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-black/55">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* PRIVACY */}
      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-7xl items-center gap-8 rounded-4xl bg-[#B5B1DC]/30 p-8 md:p-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold tracking-widest text-[#557D69]">YOUR ACCOUNT. YOUR CHOICE.</p>
            <h2 className="mt-4 font-serif text-3xl font-bold md:text-4xl">
              Connect on your own terms.
            </h2>
            <p className="mt-5 max-w-lg leading-8 text-black/60">
              Decide how you present yourself and manage your connections.
              Take your time, choose who you interact with and build
              conversations at your own pace.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Eye, title: "Visibility controls" },
              { icon: LockKeyhole, title: "Private email" },
              { icon: UserCheck, title: "Accepted requests" },
              { icon: ShieldCheck, title: "Safety options" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-white/80 p-5">
                <item.icon className="h-6 w-6 text-[#557D69]" />
                <p className="mt-4 text-sm font-bold">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 mx-auto max-w-3xl px-6 py-20">
        <div className="text-center">
          <p className="text-xs font-bold tracking-widest text-[#7C9D8C]">NEED HELP?</p>
          <h2 className="mt-4 font-serif text-4xl font-bold">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-sm text-black/55">
            Everything you need to know about MILOZA.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((faq) => (
            <details key={faq.q} className="group rounded-2xl border border-[#ADA28C]/30 bg-white p-5 open:shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {faq.q}
                <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-4 text-sm leading-7 text-black/60">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
<section className="mx-auto max-w-7xl px-6 pb-20">
  <div className="rounded-4xl bg-[#FBFF62] px-6 py-16 text-center md:px-12">

    <a
      href="#home"
      className="mx-auto flex items-center justify-center shrink-0"
    >
      <img
        src="/images/lo.png"
        alt="MILOZA"
        className="h-14 w-auto max-w-45 object-contain block"
        loading="eager"
        fetchPriority="high"
      />
    </a>

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