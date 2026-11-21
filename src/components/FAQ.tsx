import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  ArrowRight,
  ChevronDown,
  MessageCircle,
  ShieldCheck,
  LockKeyhole,
  Users,
  Search,
  Mail,
  HelpCircle,
  UserPlus,
  Menu,
  X,
} from "lucide-react";

interface Props {
  onGetStarted: () => void;
}

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "What is MILOZA?",
        a: "MILOZA is a social platform where people discover profiles, connect and chat privately.",
      },
      {
        q: "How do I create an account?",
        a: "Click Get Started, complete the registration form and create your free account.",
      },
      {
        q: "Can I use MILOZA on mobile?",
        a: "Yes. MILOZA works across mobile, tablet and desktop devices.",
      },
    ],
  },
  {
    category: "Account & Privacy",
    questions: [
      {
        q: "Is MILOZA free?",
        a: "Yes. Person-to-person messaging is free without mandatory subscriptions.",
      },
      {
        q: "Is my email public?",
        a: "No. Your email address is not displayed publicly.",
      },
      {
        q: "Can I control my profile visibility?",
        a: "Yes. You can manage your profile visibility and online status in settings.",
      },
    ],
  },
  {
    category: "Connections & Messaging",
    questions: [
      {
        q: "How do chat requests work?",
        a: "Send a request to someone. They can accept or decline it. Only accepted connections can message each other.",
      },
      {
        q: "Can I cancel a chat request?",
        a: "Yes. You can cancel a pending chat request.",
      },
      {
        q: "How do I discover people?",
        a: "Visit the Discover section to explore profiles and find people with similar interests.",
      },
    ],
  },
  {
    category: "Safety & Security",
    questions: [
      {
        q: "Can I block someone?",
        a: "Yes. You can block users to prevent unwanted interactions.",
      },
      {
        q: "Can I report inappropriate behavior?",
        a: "Yes. Use the report option to submit a report for review.",
      },
      {
        q: "How can I protect my account?",
        a: "Keep your password private and avoid sharing sensitive personal information.",
      },
    ],
  },
];

export function FAQ({ onGetStarted }: Props) {
  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Getting Started");
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const navLinks = [
    ["Home", "/"],
    ["Features", "/features"],
    ["How it works", "/HowItWorks"],
    ["Discover", "/discover"],
    ["Safety", "/safety"],
    ["FAQ", "/faq"],
  ];

  const allQuestions = faqs.flatMap((group) =>
    group.questions.map((item) => ({
      ...item,
      category: group.category,
    }))
  );

  const filteredQuestions = search
    ? allQuestions.filter(
        (item) =>
          item.q.toLowerCase().includes(search.toLowerCase()) ||
          item.a.toLowerCase().includes(search.toLowerCase())
      )
    : allQuestions.filter(
        (item) => item.category === activeCategory
      );

  return (
    <main className="min-h-screen bg-[#F8F8F5] text-[#0F0F01]">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-[#ADA28C]/20 bg-[#F8F8F5]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

          <button onClick={() => navigate("/")}>
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
                className="transition hover:text-[#7C9D8C]"
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <Button variant="ghost" onClick={onGetStarted}>
              Log in
            </Button>

            <Button
              onClick={onGetStarted}
              className="rounded-full bg-[#0F0F01] text-[#FBFF62]"
            >
              Get started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="rounded-xl border p-2 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenu && (
          <div className="border-t p-5 lg:hidden">
            <nav className="flex flex-col gap-3">
              {navLinks.map(([label, href]) => (
                <button
                  key={href}
                  onClick={() => {
                    navigate(href);
                    setMobileMenu(false);
                  }}
                  className="rounded-xl p-3 text-left"
                >
                  {label}
                </button>
              ))}
            </nav>

            <Button
              onClick={onGetStarted}
              className="mt-4 w-full rounded-full bg-[#0F0F01] text-[#FBFF62]"
            >
              Get started
            </Button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="px-6 py-24 text-center md:py-32">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#B5B1DC]/40">
          <MessageCircle className="h-10 w-10 text-[#7C9D8C]" />
        </div>

        <p className="mt-8 text-xs font-bold tracking-widest text-[#557D69]">
          HELP CENTER
        </p>

        <h1 className="mt-5 font-serif text-5xl font-bold md:text-7xl">
          Got questions?
          <span className="block text-[#7C9D8C]">
            We've got answers.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl leading-8 text-black/60">
          Everything you need to know about MILOZA.
          Find answers about your account, privacy,
          connections and messaging.
        </p>

        <div className="mx-auto mt-9 flex max-w-xl items-center gap-3 rounded-full border bg-white px-5 py-4">
          <Search className="h-5 w-5 text-[#7C9D8C]" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your questions..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      </section>

      {/* FAQ CONTENT */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">

          <div className="text-center">
            <p className="text-xs font-bold tracking-widest text-[#7C9D8C]">
              FREQUENTLY ASKED QUESTIONS
            </p>

            <h2 className="mt-4 font-serif text-4xl font-bold">
              How can we help you?
            </h2>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-[280px_1fr]">

            {/* CATEGORIES */}
            <aside>
              <h3 className="mb-5 font-bold">
                Browse Categories
              </h3>

              <div className="space-y-3">
                {faqs.map((group, index) => {
                  const icons = [
                    UserPlus,
                    LockKeyhole,
                    MessageCircle,
                    ShieldCheck,
                  ];

                  const Icon = icons[index];

                  return (
                    <button
                      key={group.category}
                      onClick={() => {
                        setActiveCategory(group.category);
                        setSearch("");
                        setOpenQuestion(null);
                      }}
                      className={`flex w-full items-center gap-3 rounded-2xl p-4 text-left ${
                        activeCategory === group.category && !search
                          ? "bg-[#B5B1DC]/40"
                          : "bg-[#F8F8F5] hover:bg-[#7C9D8C]/10"
                      }`}
                    >
                      <Icon className="h-5 w-5 text-[#7C9D8C]" />

                      <span className="text-sm font-semibold">
                        {group.category}
                      </span>

                      <ArrowRight className="ml-auto h-4 w-4" />
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 rounded-3xl bg-[#B5B1DC]/30 p-6">
                <HelpCircle className="h-9 w-9 text-[#557D69]" />

                <h3 className="mt-4 font-bold">
                  Need more help?
                </h3>

                <p className="mt-3 text-sm leading-6 text-black/55">
                  Learn more about how MILOZA works.
                </p>

                <button
                  onClick={() => navigate("/how-it-works")}
                  className="mt-5 flex items-center gap-2 text-sm font-bold text-[#557D69]"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </aside>

            {/* QUESTIONS */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold">
                  {search ? "Search Results" : activeCategory}
                </h3>

                <span className="rounded-full bg-[#7C9D8C]/10 px-4 py-2 text-xs text-[#557D69]">
                  {filteredQuestions.length} Questions
                </span>
              </div>

              {filteredQuestions.length === 0 ? (
                <div className="rounded-3xl bg-[#F8F8F5] p-12 text-center">
                  <Search className="mx-auto h-10 w-10 text-[#7C9D8C]" />

                  <h3 className="mt-4 font-bold">
                    No results found
                  </h3>

                  <p className="mt-2 text-sm text-black/55">
                    Try different keywords.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredQuestions.map((item, index) => {
                    const isOpen = openQuestion === item.q;

                    return (
                      <div
                        key={item.q}
                        className="rounded-2xl border border-[#ADA28C]/30 bg-[#F8F8F5]"
                      >
                        <button
                          onClick={() =>
                            setOpenQuestion(isOpen ? null : item.q)
                          }
                          className="flex w-full items-center justify-between gap-4 p-5 text-left"
                          aria-expanded={isOpen}
                        >
                          <span className="flex items-center gap-4 text-sm font-semibold md:text-base">
                            <span className="text-[#7C9D8C]">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            {item.q}
                          </span>

                          <ChevronDown
                            className={`h-5 w-5 shrink-0 text-[#7C9D8C] transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {isOpen && (
                          <div className="px-6 pb-6 pl-12">
                            <p className="border-l-2 border-[#7C9D8C]/40 pl-4 text-sm leading-7 text-black/60">
                              {item.a}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-8 rounded-[2rem] bg-[#B5B1DC]/30 p-8 md:grid-cols-2 md:p-14">

          <div>
            <Mail className="h-12 w-12 text-[#7C9D8C]" />

            <h2 className="mt-6 font-serif text-3xl font-bold md:text-4xl">
              Still have questions?
            </h2>

            <p className="mt-5 leading-8 text-black/60">
              We want your MILOZA experience to be simple
              and enjoyable. Discover people and build
              meaningful connections.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8">
            <Users className="h-9 w-9 text-[#7C9D8C]" />

            <h3 className="mt-5 text-xl font-bold">
              Ready to connect?
            </h3>

            <p className="mt-3 text-sm leading-7 text-black/55">
              Create your free account and start discovering people.
            </p>

            <Button
              onClick={onGetStarted}
              className="mt-7 w-full rounded-full bg-[#0F0F01] text-[#FBFF62]"
            >
              Get started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
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