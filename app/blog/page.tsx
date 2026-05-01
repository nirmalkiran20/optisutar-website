import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blog | SEO, AI SEO, GEO & Digital Marketing Insights",
  description:
    "Read the latest insights on AI SEO, GEO, AEO, PPC and digital marketing strategy from the Optisutar team. Actionable guides for the AI-first marketer.",
  alternates: { canonical: "https://optisutar.com/blog" },
  openGraph: {
    title: "Optisutar Blog | AI-First Marketing Insights",
    description: "Strategy, trends and actionable guides on AIO, GEO, AEO, SEO, PPC and beyond.",
    url: "https://optisutar.com/blog",
  },
};

const featuredPost = {
  id: 1,
  slug: "how-ai-is-rewriting-search-optimisation-2025",
  title: "How AI Is Rewriting the Rules of Search Optimisation in 2025",
  excerpt:
    "ChatGPT, Gemini and Perplexity are fundamentally changing how people find information. Here's what that means for your brand — and exactly how to stay visible in an AI-first world.",
  category: "AIO",
  categoryColor: "#a78bfa",
  image: "/blog-aio.jpg",
  date: "April 12, 2025",
  readTime: "8 min read",
};

const posts = [
  {
    id: 2,
    slug: "geo-vs-seo-difference",
    title: "GEO vs SEO: What's the Difference and Why You Need Both",
    excerpt: "Generative Engine Optimisation is not a replacement for SEO — it's the essential next layer. Learn how they work together to maximise your visibility.",
    category: "GEO",
    categoryColor: "#38bdf8",
    image: "/blog-geo.webp",
    date: "April 8, 2025",
    readTime: "6 min read",
  },
  {
    id: 3,
    slug: "complete-guide-answer-engine-optimisation",
    title: "The Complete Guide to Answer Engine Optimisation (AEO)",
    excerpt: "Voice search, featured snippets and AI overviews — AEO ensures your content is the answer, not just another result buried on page one.",
    category: "AEO",
    categoryColor: "#f472b6",
    image: "/blog-aeo.jpg",
    date: "April 3, 2025",
    readTime: "7 min read",
  },
  {
    id: 4,
    slug: "google-ppc-smart-bidding-2025",
    title: "Google PPC in 2025: Smart Bidding Strategies That Actually Work",
    excerpt: "With automation taking over Google Ads, human strategy matters more than ever. Here's how to stay ahead of the algorithm and protect your ROI.",
    category: "PPC",
    categoryColor: "#fb923c",
    image: "/blog-ppc.jpg",
    date: "March 28, 2025",
    readTime: "5 min read",
  },
  {
    id: 5,
    slug: "google-my-business-losing-customers",
    title: "Why Your Google My Business Profile Is Losing You Customers",
    excerpt: "An unoptimised GMB profile is practically invisible. Here's the exact checklist we use to get clients ranking in the local 3-pack.",
    category: "GMB",
    categoryColor: "#4ade80",
    image: "/blog-gmb.webp",
    date: "March 22, 2025",
    readTime: "4 min read",
  },
  {
    id: 6,
    slug: "online-reputation-management-negative-reviews",
    title: "Online Reputation Management: How to Recover from Negative Reviews",
    excerpt: "One bad review doesn't have to define your brand. Here's the proven framework we use to turn reputation crises into trust-building opportunities.",
    category: "ORM",
    categoryColor: "#facc15",
    image: "/blog-orm.webp",
    date: "March 15, 2025",
    readTime: "6 min read",
  },
  {
    id: 7,
    slug: "web-design-principles-convert-visitors",
    title: "Web Design Principles That Convert Visitors into Leads",
    excerpt: "A beautiful website that doesn't convert is just expensive art. Here's how we design for both stunning aesthetics and real business results.",
    category: "Web Design",
    categoryColor: "#818cf8",
    image: "/blog-aio.jpg",
    date: "March 10, 2025",
    readTime: "5 min read",
  },
];

const categories = ["All", "AIO", "GEO", "AEO", "PPC", "GMB", "ORM", "Web Design"];

function FeaturedBg() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #a78bfa, transparent)" }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, #38bdf8, transparent)" }} />
      <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
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
    <main className="min-h-screen bg-[#1f2d5a] text-white">

      {/* Hero */}
      <section className="relative pt-28 pb-16 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-20 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #6366f1, transparent)" }} />
        <p className="text-sm font-semibold tracking-widest text-indigo-400 uppercase mb-3">Optisutar Blog</p>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
          Insights for the{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI-First Marketer
          </span>
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          Practical strategy, emerging trends and actionable guides on AIO, GEO, AEO, SEO, PPC and everything in between.
        </p>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-10">
          {categories.map((cat, i) => (
            <button key={cat}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer
                ${i === 0
                  ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300"
                  : "bg-white/5 border-white/10 text-white/50 hover:border-white/30 hover:text-white/80"
                }`}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 pb-24">

        {/* Featured Post */}
        <div className="mb-10">
          <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-4">Featured</p>
          <Link href={`/blog/${featuredPost.slug}`}>
            <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 overflow-hidden group hover:border-white/25 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 cursor-pointer">
              <FeaturedBg />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                <div className="flex-1">
                  <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-5"
                    style={{ backgroundColor: `${featuredPost.categoryColor}22`, color: featuredPost.categoryColor, border: `1px solid ${featuredPost.categoryColor}44` }}>
                    {featuredPost.category}
                  </span>
                  <h2 className="text-2xl md:text-4xl font-bold text-white leading-snug mb-4 group-hover:text-indigo-200 transition-colors duration-200">
                    {featuredPost.title}
                  </h2>
                  <p className="text-white/50 text-base leading-relaxed mb-6 max-w-xl">{featuredPost.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-white/30">
                    <span>{featuredPost.date}</span>
                    <span>·</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>

                {/* Featured image — replaces emoji */}
                <div className="hidden md:block flex-shrink-0 w-56 h-48 rounded-2xl overflow-hidden border border-white/10 relative">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="224px"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              </div>

              <div className="relative z-10 mt-6 flex items-center gap-2 text-indigo-400 text-sm font-semibold group-hover:gap-3 transition-all duration-200">
                Read Article
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Grid Posts */}
        <div>
          <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-4">Latest Posts</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <div className="group flex flex-col h-full rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-white/25 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 transition-all duration-300 cursor-pointer">

                  {/* Post image — replaces color glow */}
                  <div className="relative w-full h-40 overflow-hidden flex-shrink-0">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/25" />
                    {/* Category badge over image */}
                    <span className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full border z-10"
                      style={{
                        backgroundColor: `${post.categoryColor}30`,
                        color: post.categoryColor,
                        borderColor: `${post.categoryColor}50`,
                        backdropFilter: "blur(8px)",
                      }}>
                      {post.category}
                    </span>
                  </div>

                  {/* Card content */}
                  <div className="flex flex-col flex-1 p-5">
                    <h3 className="text-white font-semibold text-base leading-snug mb-3 group-hover:text-indigo-300 transition-colors flex-1">
                      {post.title}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-white/25 pt-3 border-t border-white/5">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
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

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="relative rounded-3xl border border-indigo-500/20 bg-indigo-500/5 px-8 py-12 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-10 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, #6366f1, transparent)" }} />
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">Ready to grow?</p>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">Let's Build Your AI-First Strategy</h2>
          <p className="text-white/40 mb-8 max-w-md mx-auto">
            Get a free audit and see exactly where your brand stands in AI search, local results and beyond — then let's build a plan to get you there.
          </p>
          <Link href="/contact"
            className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 hover:scale-105 transition-all duration-200">
            Get a Free Audit
          </Link>
        </div>
      </section>

    </main>
  );
}