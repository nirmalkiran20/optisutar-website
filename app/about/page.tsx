import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | AI-First Digital Marketing Agency",
  description:
    "Learn about Optisutar — an AI-first digital marketing agency helping brands win in Google, ChatGPT, Gemini and beyond. Meet our team and discover our mission.",
  alternates: { canonical: "https://optisutar.com/about" },
  openGraph: {
    title: "About Optisutar | AI-First Digital Marketing Agency",
    description:
      "We help brands stay visible and competitive in the age of AI search. Learn about our team, values and approach.",
    url: "https://optisutar.com/about",
  },
};

const stats = [
  { value: "150+", label: "Clients Served" },
  { value: "3x", label: "Average ROI" },
  { value: "9", label: "Core Services" },
  { value: "98%", label: "Client Retention" },
];

const values = [
  {
    icon: "🎯",
    title: "Results First",
    description:
      "Every strategy we build is tied to measurable outcomes. No vanity metrics — just growth that shows up in your revenue and your bottom line.",
    color: "#a78bfa",
  },
  {
    icon: "🤖",
    title: "AI-Native Thinking",
    description:
      "We don't bolt AI onto old strategies. We build from the ground up for a world where ChatGPT, Gemini and Perplexity are how people search.",
    color: "#38bdf8",
  },
  {
    icon: "🔍",
    title: "Radical Transparency",
    description:
      "You'll always know exactly what we're doing and why. Clear reporting, honest timelines, no smoke and mirrors — ever.",
    color: "#4ade80",
  },
  {
    icon: "⚡",
    title: "Speed & Agility",
    description:
      "Digital moves fast. We stay ahead of algorithm updates, platform changes and AI shifts so your brand never falls behind the curve.",
    color: "#fb923c",
  },
  {
    icon: "🤝",
    title: "True Partnership",
    description:
      "We're not a vendor — we're an extension of your team. Your goals become our goals, and we show up every day with that mindset.",
    color: "#f472b6",
  },
  {
    icon: "📈",
    title: "Long-Term Vision",
    description:
      "Quick wins are nice, but we build for compounding growth. Every action we take is a deliberate investment in your brand's long-term future.",
    color: "#facc15",
  },
];

const team = [
  { name: "Alex Carter", role: "CEO & Strategy Lead", emoji: "👨‍💼", color: "#a78bfa" },
  { name: "Priya Sharma", role: "Head of AI & GEO", emoji: "👩‍💻", color: "#38bdf8" },
  { name: "Marcus Lee", role: "PPC & Paid Media", emoji: "👨‍🎨", color: "#fb923c" },
  { name: "Sofia Reyes", role: "SEO & Content", emoji: "👩‍🔬", color: "#4ade80" },
  { name: "James Wu", role: "Web Design Lead", emoji: "🧑‍🎨", color: "#f472b6" },
  { name: "Aisha Patel", role: "Reputation & ORM", emoji: "👩‍💼", color: "#facc15" },
];

const services = [
  "AIO — AI Optimisation",
  "GEO — Generative Engine Optimisation",
  "AEO — Answer Engine Optimisation",
  "AI SEO",
  "PPC Advertising",
  "Google My Business",
  "Reputation Management",
  "Website Design",
  "Social Media Marketing",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#080c1a] text-white">

      {/* Hero */}
      <section className="relative pt-28 pb-20 px-6 text-center overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] opacity-20 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #6366f1, transparent)" }}
        />
        <p className="text-sm font-semibold tracking-widest text-indigo-400 uppercase mb-3">
          About Optisutar
        </p>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight max-w-3xl mx-auto">
          We Help Brands Win in the{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Age of AI Search
          </span>
        </h1>
        <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
          Optisutar is a next-generation digital marketing agency built for brands that want to stay visible, competitive and growing — not just today, but deep into the AI-first future.
        </p>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-1">
                {stat.value}
              </span>
              <span className="text-white/40 text-sm text-center">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-4">
              Our Mission
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug mb-5">
              Built for Brands That Refuse to Be Invisible
            </h2>
            <p className="text-white/50 leading-relaxed mb-4">
              The search landscape is undergoing its biggest shift in two decades. AI-powered tools are now the first stop for millions of consumers — and most brands aren't showing up there at all.
            </p>
            <p className="text-white/50 leading-relaxed mb-4">
              Optisutar exists to change that. We combine deep technical SEO expertise with cutting-edge AI optimisation strategies — helping businesses appear not just in Google, but in ChatGPT, Gemini, Perplexity and every AI surface where your customers are searching.
            </p>
            <p className="text-white/50 leading-relaxed">
              From local businesses to scaling brands, we build strategies that compound over time and deliver results you can actually measure. No fluff. No vanity metrics. Just growth.
            </p>
          </div>

          {/* Services list */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-48 h-48 opacity-10 blur-3xl pointer-events-none"
              style={{ background: "radial-gradient(circle, #a78bfa, transparent)" }}
            />
            <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-5">
              What We Do
            </p>
            <ul className="space-y-3">
              {services.map((service, i) => (
                <li key={i} className="flex items-center gap-3 text-white/70 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="text-center mb-12">
          <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-3">
            How We Work
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Our Core Values</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map((value) => (
            <div
              key={value.title}
              className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-white/25 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-2xl pointer-events-none rounded-full"
                style={{ background: `radial-gradient(circle, ${value.color}, transparent)` }}
              />
              <span className="text-3xl mb-4 block">{value.icon}</span>
              <h3 className="text-white font-semibold text-base mb-2">{value.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="text-center mb-12">
          <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-3">
            The People Behind It
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Meet the Team</h2>
          <p className="text-white/40 mt-3 max-w-lg mx-auto text-sm">
            A tight-knit group of strategists, engineers and creatives who are genuinely obsessed with digital growth.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {team.map((member) => (
            <div
              key={member.name}
              className="group flex flex-col items-center text-center p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-white/25 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 relative overflow-hidden cursor-pointer"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl pointer-events-none"
                style={{ background: `radial-gradient(circle, ${member.color}, transparent)` }}
              />
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-3xl mb-3 border border-white/10"
                style={{ backgroundColor: `${member.color}15` }}
              >
                {member.emoji}
              </div>
              <p className="text-white text-xs font-semibold leading-snug mb-1">{member.name}</p>
              <p className="text-white/35 text-xs leading-snug">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="relative rounded-3xl border border-indigo-500/20 bg-indigo-500/5 px-8 py-14 text-center overflow-hidden">
          <div
            className="absolute inset-0 opacity-10 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, #6366f1, transparent)" }}
          />
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Let's Work Together
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Ready to Grow Your Brand?
          </h2>
          <p className="text-white/40 mb-8 max-w-md mx-auto text-sm">
            Book a free audit and find out exactly where your brand stands in search and AI results — and how we'll get you where you want to be.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 hover:scale-105 transition-all duration-200"
          >
            Get a Free Audit
          </Link>
        </div>
      </section>

    </main>
  );
}