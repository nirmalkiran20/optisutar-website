"use client";

import { FaLocationArrow } from "react-icons/fa6";
import { PinContainer } from "./ui/Pin";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "How AI Is Rewriting the Rules of Search Optimisation in 2025",
    des: "ChatGPT, Gemini, and Perplexity are changing how people find information. Here's what that means for your brand.",
    category: "AIO",
    categoryColor: "#a78bfa",
    emoji: "🤖",
    href: "/blog",
  },
  {
    id: 2,
    title: "GEO vs SEO: What's the Difference and Why You Need Both",
    des: "Generative Engine Optimisation is not a replacement for SEO — it's the next layer. Learn how they work together.",
    category: "GEO",
    categoryColor: "#38bdf8",
    emoji: "🌐",
    href: "/blog",
  },
  {
    id: 3,
    title: "The Complete Guide to Answer Engine Optimisation (AEO)",
    des: "Voice search, featured snippets, and AI overviews — AEO ensures your content is the answer, not just a result.",
    category: "AEO",
    categoryColor: "#f472b6",
    emoji: "🎯",
    href: "/blog",
  },
  {
    id: 4,
    title: "Google PPC in 2025: Smart Bidding Strategies That Actually Work",
    des: "With automation taking over, human strategy matters more than ever. Here's how to stay ahead of the algorithm.",
    category: "PPC",
    categoryColor: "#fb923c",
    emoji: "📈",
    href: "/blog",
  },
  {
    id: 5,
    title: "Why Your Google My Business Profile Is Losing You Customers",
    des: "An unoptimised GMB profile is invisible. Here's the exact checklist we use to get clients ranking in the local 3-pack.",
    category: "GMB",
    categoryColor: "#4ade80",
    emoji: "📍",
    href: "/blog",
  },
  {
    id: 6,
    title: "Online Reputation Management: How to Recover from Negative Reviews",
    des: "One bad review doesn't have to define your brand. Here's the framework we use to turn reputation crises into trust.",
    category: "ORM",
    categoryColor: "#facc15",
    emoji: "⭐",
    href: "/blog",
  },
];

const RecentProjects = () => {
  return (
    <div className="py-20">
      <h1 className="heading">
        Latest from our <span className="text-purple">blog</span>
      </h1>

      <div className="flex flex-wrap items-center justify-center p-4 gap-x-24 gap-y-8 mt-10">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="h-[32rem] w-[22rem] flex items-center justify-center"
          >
            <PinContainer title="Read Article" href={post.href}>
              <div className="flex flex-col w-[20rem] h-[25rem]">
                {/* Image area */}
                <div
                  className="relative w-full h-44 rounded-2xl flex items-center justify-center overflow-hidden mb-4 flex-shrink-0"
                  style={{
                    backgroundColor: `${post.categoryColor}12`,
                    border: `1px solid ${post.categoryColor}25`,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-20 blur-2xl"
                    style={{
                      background: `radial-gradient(circle, ${post.categoryColor}, transparent)`,
                    }}
                  />
                  <span
                    className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full border z-10"
                    style={{
                      backgroundColor: `${post.categoryColor}20`,
                      color: post.categoryColor,
                      borderColor: `${post.categoryColor}40`,
                    }}
                  >
                    {post.category}
                  </span>
                  <span className="text-6xl relative z-10">{post.emoji}</span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-lg text-white leading-snug line-clamp-2 mb-2">
                  {post.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed line-clamp-2 flex-1"
                  style={{ color: "#BEC1DD" }}
                >
                  {post.des}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.08] mt-3">
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full border"
                    style={{
                      backgroundColor: `${post.categoryColor}20`,
                      color: post.categoryColor,
                      borderColor: `${post.categoryColor}40`,
                    }}
                  >
                    {post.category}
                  </span>
                  <div className="flex items-center gap-2 text-purple text-sm font-semibold">
                    Read Article
                    <FaLocationArrow size={12} color="#CBACF9" />
                  </div>
                </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>

      {/* View all */}
      <div className="flex justify-center mt-4">
        <Link
          href="/blog"
          className="text-sm font-medium px-6 py-2.5 rounded-full border border-white/15 text-white/60 hover:border-white/35 hover:text-white transition-all duration-200"
        >
          View All Posts →
        </Link>
      </div>
    </div>
  );
};

export default RecentProjects;