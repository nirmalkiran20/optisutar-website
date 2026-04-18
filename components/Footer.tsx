"use client";

import Link from "next/link";

const footerLinks = {
  Services: [
    { label: "AIO — AI Optimisation", href: "/services#service-1" },
    { label: "GEO", href: "/services#service-2" },
    { label: "AEO", href: "/services#service-3" },
    { label: "AI SEO", href: "/services#service-4" },
    { label: "PPC Advertising", href: "/services#service-5" },
    { label: "Google My Business", href: "/services#service-6" },
    { label: "Reputation Management", href: "/services#service-7" },
    { label: "Website Design", href: "/services#service-8" },
    { label: "Social Media Marketing", href: "/services#service-9" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Free Audit", href: "/contact" },
  ],
  Resources: [
    { label: "AI SEO Guide", href: "/blog" },
    { label: "GEO vs SEO", href: "/blog" },
    { label: "AEO Explained", href: "/blog" },
    { label: "PPC Strategy", href: "/blog" },
  ],
};

const socialLinks = [
  { label: "LinkedIn", emoji: "💼", href: "#" },
  { label: "Twitter", emoji: "🐦", href: "#" },
  { label: "Instagram", emoji: "📸", href: "#" },
];

const Footer = () => {
  return (
    <footer className="w-full bg-[#080c1a] border-t border-white/10 mt-20">
      {/* CTA Banner */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="relative rounded-3xl border border-indigo-500/20 bg-indigo-500/5 px-8 py-12 text-center overflow-hidden mb-16">
          <div
            className="absolute inset-0 opacity-10 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, #6366f1, transparent)" }}
          />
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Ready to grow?
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Let's Build Your AI-First Strategy
          </h2>
          <p className="text-white/40 mb-7 max-w-md mx-auto text-sm">
            Get a free audit and see exactly where your brand stands in AI search, local results, and beyond.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 hover:scale-105 transition-all duration-200"
          >
            Get a Free Audit →
          </Link>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
  <img
    src="/logo.png"
    alt="Optisutar Logo"
    className="h-8 w-auto object-contain"
  />
</Link>
            <p className="text-white/40 text-sm leading-relaxed mb-5">
              Next-generation digital marketing for brands that want to win in AI search, local results, and beyond.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center hover:border-white/25 hover:bg-white/10 transition-all duration-200 text-base"
                >
                  {s.emoji}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">
                {heading}
              </p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/40 text-sm hover:text-white/80 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
          <p className="text-white/25 text-xs">
            © 2025 Optisutar. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/about" className="text-white/25 text-xs hover:text-white/50 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="text-white/25 text-xs hover:text-white/50 transition-colors">
              Terms of Service
            </Link>
            <span className="text-white/25 text-xs">
              Made in Pune 🇮🇳
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
