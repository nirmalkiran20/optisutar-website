import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | Optisutar Blog`,
    description: post.excerpt,
    alternates: { canonical: `https://optisutar.com/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://optisutar.com/blog/${post.slug}`,
      type: "article",
    },
  };
}

const relatedPosts = [
  {
    title: "How AI Is Rewriting Search Optimisation in 2025",
    slug: "how-ai-is-rewriting-search-optimisation-2025",
    category: "AIO",
    categoryColor: "#a78bfa",
  },
  {
    title: "GEO vs SEO: What's the Difference?",
    slug: "geo-vs-seo-difference",
    category: "GEO",
    categoryColor: "#38bdf8",
  },
  {
    title: "The Complete Guide to AEO",
    slug: "complete-guide-answer-engine-optimisation",
    category: "AEO",
    categoryColor: "#f472b6",
  },
];

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-[#080c1a] text-white">

      {/* Hero */}
      <section className="relative pt-28 pb-10 px-6 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-20 blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${post.categoryColor}, transparent)` }}
        />
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/30 mb-8">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white/60 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white/50 truncate max-w-xs">{post.title}</span>
          </div>

          {/* Category */}
          <span
            className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-5 border"
            style={{
              backgroundColor: `${post.categoryColor}22`,
              color: post.categoryColor,
              borderColor: `${post.categoryColor}44`,
            }}
          >
            {post.category}
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-snug mb-6 max-w-4xl">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/40">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                style={{ backgroundColor: `${post.categoryColor}25`, color: post.categoryColor }}
              >
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="text-white/70 text-xs font-medium">{post.author}</p>
                <p className="text-white/30 text-xs">{post.authorRole}</p>
              </div>
            </div>
            <span>&middot;</span>
            <span>{post.date}</span>
            <span>&middot;</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Hero image */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div
          className="w-full h-64 md:h-96 rounded-3xl flex items-center justify-center border border-white/10 relative overflow-hidden"
          style={{ backgroundColor: `${post.categoryColor}10` }}
        >
          <div
            className="absolute inset-0 opacity-20 blur-3xl"
            style={{ background: `radial-gradient(circle, ${post.categoryColor}, transparent)` }}
          />
          <span className="text-8xl relative z-10">{post.emoji}</span>
        </div>
      </div>

      {/* Content + Sidebar */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Article content */}
          <article className="lg:col-span-2">
            <div className="prose prose-invert prose-lg max-w-none
              prose-headings:text-white prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-white/70 prose-p:leading-relaxed prose-p:mb-5
              prose-li:text-white/70
              prose-strong:text-white
              prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:text-indigo-300
              prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-500/10 prose-blockquote:rounded-xl prose-blockquote:px-6 prose-blockquote:py-4
              prose-code:text-purple-300 prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-hr:border-white/10
            ">
              <MDXRemote source={post.content} />
            </div>

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span
                className="inline-block text-xs font-bold px-3 py-1 rounded-full border"
                style={{
                  backgroundColor: `${post.categoryColor}22`,
                  color: post.categoryColor,
                  borderColor: `${post.categoryColor}44`,
                }}
              >
                {post.category}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-white/30 text-xs">Share:</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://optisutar.com/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-white/25 transition-all duration-200"
                >
                  🐦 Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://optisutar.com/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-white/25 transition-all duration-200"
                >
                  💼 LinkedIn
                </a>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1 flex flex-col gap-6">

            {/* Newsletter */}
            <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-10 blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, #6366f1, transparent)" }}
              />
              <div className="relative z-10">
                <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">Newsletter</p>
                <h3 className="text-white font-bold text-lg mb-2">Stay Ahead of AI Search</h3>
                <p className="text-white/50 text-sm mb-5 leading-relaxed">
                  Get weekly insights on AIO, GEO, AEO and digital marketing strategy — straight to your inbox.
                </p>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-indigo-500/50 transition-all duration-200 mb-3"
                />
                <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold py-2.5 rounded-xl hover:opacity-90 transition-all duration-200">
                  Subscribe Free →
                </button>
                <p className="text-white/25 text-xs text-center mt-3">No spam. Unsubscribe anytime.</p>
              </div>
            </div>

            {/* Free Audit CTA */}
            <div
              className="rounded-2xl border border-white/10 p-6 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)" }}
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 opacity-20 blur-2xl pointer-events-none"
                style={{ background: "radial-gradient(circle, #10b981, transparent)" }}
              />
              <div className="relative z-10">
                <span className="text-3xl mb-3 block">🚀</span>
                <h3 className="text-white font-bold text-lg mb-2">Get a Free Audit</h3>
                <p className="text-white/50 text-sm mb-5 leading-relaxed">
                  Find out exactly where your brand stands in Google and AI search — and how to improve it.
                </p>
                <Link
                  href="/contact"
                  className="block text-center bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold py-2.5 rounded-xl hover:opacity-90 transition-all duration-200"
                >
                  Get Started Free →
                </Link>
              </div>
            </div>

            {/* Related posts */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-white font-bold text-base mb-4">Related Posts</h3>
              <div className="flex flex-col gap-4">
                {relatedPosts
                  .filter((p) => p.slug !== post.slug)
                  .slice(0, 3)
                  .map((related) => (
                    <Link key={related.slug} href={`/blog/${related.slug}`} className="group">
                      <div className="flex items-start gap-3">
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5 border"
                          style={{
                            backgroundColor: `${related.categoryColor}20`,
                            color: related.categoryColor,
                            borderColor: `${related.categoryColor}40`,
                          }}
                        >
                          {related.category}
                        </span>
                        <p className="text-white/60 text-sm leading-snug group-hover:text-white transition-colors duration-200 line-clamp-2">
                          {related.title}
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>

          </aside>
        </div>
      </section>

    </main>
  );
}