import type { Metadata } from "next";

export const blogMetadata: Metadata = {
  title: "Blog | SEO, AI SEO, GEO & Digital Marketing Insights",
  description:
    "Read the latest insights on AI SEO, GEO, AEO, PPC and digital marketing strategy from the Optisutar team.",
  alternates: { canonical: "https://optisutar.com/blog" },
  openGraph: {
    title: "Optisutar Blog | AI-First Marketing Insights",
    description: "Strategy, trends and actionable guides on AIO, GEO, AEO, SEO, PPC and beyond.",
    url: "https://optisutar.com/blog",
  },
};

import Link from "next/link";

const featuredPost = {
  id: 1,
  title: "How AI Is Rewriting the Rules of Search Optimisation in 2025",
  excerpt:
    "ChatGPT, Gemini, and Perplexity are changing how people find information. Here's what that means for your brand and how to stay visible in an AI-first world.",
  category: "AIO",
  categoryColor: "#a78bfa",
  date: "April 12, 2025",
  readTime: "8 min read",
  image: null,
};

const posts = [
  {
    id: 2,
    title: "GEO vs SEO: What's the Difference and Why You Need Both",
    excerpt:
      "Generative Engine Optimisation is not a replacement for SEO — it's the next layer. Learn how they work together.",
    category: "GEO",
    categoryColor: "#38bdf8",
    date: "April 8, 2025",
    readTime: "6 min read",
  },
  {
    id: 3,
    title: "The Complete Guide to Answer Engine Optimisation (AEO)",
    excerpt:
      "Voice search, featured snippets, and AI overviews — AEO ensures your content is the answer, not just a result.",
    category: "AEO",
    categoryColor: "#f472b6",
    date: "April 3, 2025",
    readTime: "7 min read",
  },
  {
    id: 4,
    title: "Google PPC in 2025: Smart Bidding Strategies That Actually Work",
    excerpt:
      "With automation taking over, human strategy matters more than ever. Here's how to stay ahead of the algorithm.",
    category: "PPC",
    categoryColor: "#fb923c",
    date: "March 28, 2025",
    readTime: "5 min read",
  },
  {
    id: 5,
    title: "Why Your Google My Business Profile Is Losing You Customers",
    excerpt:
      "An unoptimised GMB profile is invisible. Here's the exact checklist we use to get clients ranking in the local 3-pack.",
    category: "GMB",
    categoryColor: "#4ade80",
    date: "March 22, 2025",
    readTime: "4 min read",
  },
  {
    id: 6,
    title: "Online Reputation Management: How to Recover from Negative Reviews",
    excerpt:
      "One bad review doesn't have to define your brand. Here's the framework we use to turn reputation crises into trust-building opportunities.",
    category: "ORM",
    categoryColor: "#facc15",
    date: "March 15, 2025",
    readTime: "6 min read",
  },
  {
    id: 7,
    title: "Web Design Principles That Convert Visitors into Leads",
    excerpt:
      "Beautiful sites that don't convert are just expensive art. Here's how we design for both aesthetics and results.",
    category: "Web Design",
    categoryColor: "#818cf8",
    date: "March 10, 2025",
    readTime: "5 min read",
  },
];

const categories = ["All", "AIO", "GEO", "AEO", "PPC", "GMB", "ORM", "Web Design"];

// Decorative abstract blobs for featured card background
function FeaturedBg() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
      <div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #a78bfa, transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, #38bdf8, transparent)" }}
      />
      {/* Grid pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-5"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#080c1a] text-white">
      {/* Hero Header */}
      <section className="relative pt-28 pb-16 px-6 text-center overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-20 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #6366f1, transparent)" }}
        />
        <p className="text-sm font-semibold tracking-widest text-indigo-400 uppercase mb-3">
          Optisutar Blog
        </p>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
          Insights for the{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI-First Marketer
          </span>
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          Strategy, trends, and actionable guides on AIO, GEO, AEO, SEO, PPC and beyond.
        </p>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-10">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer
                ${
                  i === 0
                    ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300"
                    : "bg-white/5 border-white/10 text-white/50 hover:border-white/30 hover:text-white/80"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        {/* Featured Post */}
        <div className="mb-10">
          <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-4">
            Featured
          </p>
          <Link href={`/blog/${featuredPost.id}`}>
            <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 overflow-hidden group hover:border-white/25 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 cursor-pointer">
              <FeaturedBg />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                {/* Text */}
                <div className="flex-1">
                  <span
                    className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-5"
                    style={{
                      backgroundColor: `${featuredPost.categoryColor}22`,
                      color: featuredPost.categoryColor,
                      border: `1px solid ${featuredPost.categoryColor}44`,
                    }}
                  >
                    {featuredPost.category}
                  </span>
                  <h2 className="text-2xl md:text-4xl font-bold text-white leading-snug mb-4 group-hover:text-indigo-200 transition-colors duration-200">
                    {featuredPost.title}
                  </h2>
                  <p className="text-white/50 text-base leading-relaxed mb-6 max-w-xl">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-white/30">
                    <span>{featuredPost.date}</span>
                    <span>·</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>

                {/* Decorative visual block */}
                <div className="hidden md:flex flex-shrink-0 w-56 h-48 rounded-2xl border border-white/10 bg-white/5 items-center justify-center relative overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-30 blur-2xl"
                    style={{
                      background: `radial-gradient(circle at center, ${featuredPost.categoryColor}, transparent)`,
                    }}
                  />
                  <span className="text-6xl relative z-10">🤖</span>
                </div>
              </div>

              {/* Read more arrow */}
              <div className="relative z-10 mt-6 flex items-center gap-2 text-indigo-400 text-sm font-semibold group-hover:gap-3 transition-all duration-200">
                Read Article
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Grid Posts */}
        <div>
          <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-4">
            Latest Posts
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <div className="group flex flex-col h-full rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-white/25 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 transition-all duration-300 cursor-pointer relative overflow-hidden">
                  {/* Subtle color glow top-right */}
                  <div
                    className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-2xl pointer-events-none rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${post.categoryColor}, transparent)`,
                    }}
                  />

                  {/* Category badge */}
                  <span
                    className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 self-start"
                    style={{
                      backgroundColor: `${post.categoryColor}22`,
                      color: post.categoryColor,
                      border: `1px solid ${post.categoryColor}44`,
                    }}
                  >
                    {post.category}
                  </span>

                  <h3 className="text-white font-semibold text-base leading-snug mb-3 group-hover:text-white/90 transition-colors flex-1">
                    {post.title}
                  </h3>

                  <p className="text-white/40 text-sm leading-relaxed mb-5 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-white/25 mt-auto pt-4 border-t border-white/5">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-14">
          <button className="px-8 py-3 rounded-full border border-white/15 text-white/60 text-sm font-medium hover:border-white/35 hover:text-white transition-all duration-200 cursor-pointer">
            Load More Posts
          </button>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="relative rounded-3xl border border-indigo-500/20 bg-indigo-500/5 px-8 py-12 text-center overflow-hidden">
          <div
            className="absolute inset-0 opacity-10 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, #6366f1, transparent)" }}
          />
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Ready to grow?
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Let's Build Your AI-First Strategy
          </h2>
          <p className="text-white/40 mb-8 max-w-md mx-auto">
            Get a free audit and see exactly where your brand stands in AI search, local results, and beyond.
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