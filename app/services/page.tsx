"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// ── Back to top button ────────────────────────────────────────
function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-[9999] w-12 h-12 rounded-full border border-white/20 bg-[#1f2d5a]/90 backdrop-blur-sm flex items-center justify-center hover:border-purple hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg"
      aria-label="Back to top"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 14V4M4 9l5-5 5 5" stroke="#CBACF9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

// ── Custom SVG icons ──────────────────────────────────────────
const ServiceIcons: Record<number, React.FC<{ color: string }>> = {
  1: ({ color }) => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="4" stroke={color} strokeWidth="1.5"/>
      <circle cx="8" cy="12" r="2.5" stroke={color} strokeWidth="1.5"/>
      <circle cx="32" cy="12" r="2.5" stroke={color} strokeWidth="1.5"/>
      <circle cx="8" cy="28" r="2.5" stroke={color} strokeWidth="1.5"/>
      <circle cx="32" cy="28" r="2.5" stroke={color} strokeWidth="1.5"/>
      <circle cx="20" cy="6" r="2.5" stroke={color} strokeWidth="1.5"/>
      <circle cx="20" cy="34" r="2.5" stroke={color} strokeWidth="1.5"/>
      <line x1="16.2" y1="18.4" x2="10.2" y2="13.8" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="23.8" y1="18.4" x2="29.8" y2="13.8" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="16.2" y1="21.6" x2="10.2" y2="26.2" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="23.8" y1="21.6" x2="29.8" y2="26.2" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="20" y1="16" x2="20" y2="8.5" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="20" y1="24" x2="20" y2="31.5" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  2: ({ color }) => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="13" stroke={color} strokeWidth="1.5"/>
      <ellipse cx="20" cy="20" rx="6" ry="13" stroke={color} strokeWidth="1.5"/>
      <line x1="7" y1="20" x2="33" y2="20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9 13.5 Q20 16 31 13.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <path d="M9 26.5 Q20 24 31 26.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  3: ({ color }) => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M7 8h26a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H14l-7 6V10a2 2 0 0 1 2-2z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M13 17l4 4 10-8" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  4: ({ color }) => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="17" cy="17" r="10" stroke={color} strokeWidth="1.5"/>
      <line x1="24.5" y1="24.5" x2="33" y2="33" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <circle cx="17" cy="17" r="4" stroke={color} strokeWidth="1.2"/>
      <line x1="17" y1="10" x2="17" y2="13" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="17" y1="21" x2="17" y2="24" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="10" y1="17" x2="13" y2="17" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="21" y1="17" x2="24" y2="17" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  5: ({ color }) => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect x="6" y="24" width="6" height="10" rx="1" stroke={color} strokeWidth="1.5"/>
      <rect x="15" y="18" width="6" height="16" rx="1" stroke={color} strokeWidth="1.5"/>
      <rect x="24" y="12" width="6" height="22" rx="1" stroke={color} strokeWidth="1.5"/>
      <path d="M8 14l6-6 6 4 8-8" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 6h6v6" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  6: ({ color }) => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M20 5C14.477 5 10 9.477 10 15c0 8 10 20 10 20s10-12 10-20c0-5.523-4.477-10-10-10z" stroke={color} strokeWidth="1.5"/>
      <path d="M20 12l1.5 3 3.5.5-2.5 2.4.6 3.5L20 19.8l-3.1 1.6.6-3.5L15 15.5l3.5-.5z" stroke={color} strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  ),
  7: ({ color }) => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M20 5L8 10v10c0 7.5 5.4 14.5 12 17 6.6-2.5 12-9.5 12-17V10L20 5z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M20 13l1.8 3.6 4 .6-2.9 2.8.7 4L20 22l-3.6 1.9.7-4-2.9-2.8 4-.6z" stroke={color} strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  ),
  8: ({ color }) => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect x="4" y="6" width="32" height="28" rx="2" stroke={color} strokeWidth="1.5"/>
      <line x1="4" y1="14" x2="36" y2="14" stroke={color} strokeWidth="1.5"/>
      <circle cx="9" cy="10" r="1.5" fill={color}/>
      <circle cx="14" cy="10" r="1.5" fill={color}/>
      <circle cx="19" cy="10" r="1.5" fill={color}/>
      <rect x="9" y="18" width="10" height="10" rx="1" stroke={color} strokeWidth="1.2"/>
      <rect x="22" y="18" width="9" height="4" rx="1" stroke={color} strokeWidth="1.2"/>
      <rect x="22" y="25" width="9" height="3" rx="1" stroke={color} strokeWidth="1.2"/>
    </svg>
  ),
  9: ({ color }) => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="32" cy="10" r="4" stroke={color} strokeWidth="1.5"/>
      <circle cx="32" cy="30" r="4" stroke={color} strokeWidth="1.5"/>
      <circle cx="10" cy="20" r="4" stroke={color} strokeWidth="1.5"/>
      <line x1="13.6" y1="18.2" x2="28.2" y2="11.6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="13.6" y1="21.8" x2="28.2" y2="28.4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};

const services = [
  {
    id: 1,
    title: "AIO — AI Optimisation",
    shortDesc: "Optimise your brand to appear in AI-generated answers across ChatGPT, Gemini, Perplexity and more.",
    color: "#4285F4",
    description: "AIO (AI Optimisation) is the process of structuring your content, brand mentions and authority signals so that AI tools like ChatGPT, Google Gemini, Perplexity and Microsoft Copilot recommend your business when users ask relevant questions. As more users turn to AI for answers instead of traditional search, being present in AI responses is the new page 1. Businesses that invest in AIO now will have a significant head start over competitors who wait.",
    benefits: ["Get recommended by ChatGPT, Gemini and Perplexity", "Build brand authority that AI models trust and cite", "Structured content optimised for AI comprehension", "Monitor and track AI brand mentions across platforms", "Future-proof your entire digital marketing strategy"],
    faqs: [
      { q: "What is AIO?", a: "AIO stands for AI Optimisation — the practice of making your brand visible and recommendable within AI-generated responses from tools like ChatGPT, Gemini and Perplexity." },
      { q: "How is AIO different from SEO?", a: "Traditional SEO targets Google's search algorithm. AIO targets AI language models that increasingly answer user questions directly, bypassing traditional search results entirely." },
      { q: "How long does AIO take to show results?", a: "AIO is a long-term strategy. Initial improvements in AI brand mentions can be seen in 3-6 months with consistent content and authority building." },
    ],
  },
  {
    id: 2,
    title: "GEO — Generative Engine Optimisation",
    shortDesc: "Structure your content to get cited in AI-generated search results on Google SGE, Bing Copilot and beyond.",
    color: "#34A853",
    description: "GEO (Generative Engine Optimisation) focuses on making your content the source that AI-powered search engines cite when generating answers. Google AI Overviews, Bing Copilot and other generative engines pull from authoritative, well-structured sources. GEO ensures your website is one of them — positioning your brand at the very top of the new search landscape before your competitors even know it exists.",
    benefits: ["Appear as a cited source in Google AI Overviews", "Structured data and schema markup implementation", "E-E-A-T signals to establish deep topical authority", "Content formatted specifically for AI citation and extraction", "Competitive analysis of AI-cited competitors in your niche"],
    faqs: [
      { q: "What is GEO?", a: "GEO stands for Generative Engine Optimisation — optimising your content so AI-powered search engines like Google SGE cite your website as a trusted source in their generated answers." },
      { q: "Why does GEO matter in 2025?", a: "Google AI Overviews now appear at the top of most search results. If your site is not being cited as a source, you are losing visibility to competitors who are." },
      { q: "What does a GEO strategy include?", a: "A GEO strategy includes structured data markup, E-E-A-T content development, authoritative backlink building and content formatted specifically for AI extraction." },
    ],
  },
  {
    id: 3,
    title: "AEO — Answer Engine Optimisation",
    shortDesc: "Win featured snippets, People Also Ask boxes and voice search results by optimising for direct answers.",
    color: "#FF6B35",
    description: "AEO (Answer Engine Optimisation) is the practice of structuring content to directly answer user questions in a format that search engines and voice assistants can extract and display. This includes winning Google featured snippets, People Also Ask boxes, and voice search results from Siri, Alexa and Google Assistant. Brands that dominate these answer positions get traffic without anyone even clicking on competitors.",
    benefits: ["Win Google featured snippets for high-value keywords", "Appear consistently in People Also Ask (PAA) boxes", "Optimise content for voice search queries", "FAQ schema markup for enhanced rich results", "Question-based content strategy tailored to your audience"],
    faqs: [
      { q: "What is AEO?", a: "AEO stands for Answer Engine Optimisation — optimising your content to directly answer user questions so search engines display your site in featured snippets, PAA boxes and voice search results." },
      { q: "How do I get a featured snippet?", a: "Featured snippets are won by providing clear, concise answers to specific questions with proper formatting such as lists, tables and definitions, combined with strong topical authority." },
      { q: "Does AEO help with voice search?", a: "Yes. Voice search results almost exclusively come from featured snippets and position zero results. AEO directly improves your chances of appearing in voice search answers." },
    ],
  },
  {
    id: 4,
    title: "AI SEO — AI-Powered Search Optimisation",
    shortDesc: "Combine traditional SEO with AI-driven insights to outrank competitors faster and more efficiently.",
    color: "#9333EA",
    description: "AI SEO uses artificial intelligence tools and data analysis to supercharge traditional SEO. We use AI to identify ranking opportunities, analyse competitor strategies at scale, generate optimised content briefs and predict algorithm changes — giving your website a significant competitive advantage. The result is faster rankings, better content and smarter use of your marketing budget.",
    benefits: ["AI-powered keyword research and opportunity identification", "Automated competitor gap analysis at scale", "Content optimisation using NLP and semantic SEO techniques", "Predictive ranking and algorithm change analysis", "Faster results through AI-assisted execution and monitoring"],
    faqs: [
      { q: "What makes AI SEO different from regular SEO?", a: "AI SEO uses machine learning tools to process vastly more data — identifying patterns, opportunities and threats that human analysis would miss or take much longer to find." },
      { q: "Do you use AI to write content?", a: "We use AI to research, outline and optimise content — but all final content is human-reviewed and edited for quality, accuracy and brand voice before publication." },
      { q: "How much faster are results with AI SEO?", a: "AI SEO can reduce the time to identify and act on opportunities by 60-70%, which typically accelerates ranking improvements by 2-3 months compared to traditional approaches." },
    ],
  },
  {
    id: 5,
    title: "PPC — Pay-Per-Click Advertising",
    shortDesc: "Data-driven Google Ads and paid search campaigns that maximise ROI and drive qualified leads.",
    color: "#EA4335",
    description: "Our PPC service manages your Google Ads campaigns from strategy to execution. We build, optimise and scale paid search, display, shopping and YouTube campaigns focused on one goal — maximum return on your ad spend. Every campaign is built with conversion tracking from day one, and every rupee is accounted for in transparent weekly and monthly reports.",
    benefits: ["Full Google Ads account setup and ongoing management", "Search, Display, Shopping and YouTube campaign types", "Conversion tracking and ROI reporting from day one", "Weekly bid management and campaign optimisation", "Landing page recommendations to improve conversion rates"],
    faqs: [
      { q: "What is the minimum budget for Google Ads?", a: "We recommend a minimum ad spend of ₹15,000 per month to generate meaningful data and results. Our management fee is separate from your ad budget." },
      { q: "How quickly do PPC campaigns show results?", a: "Unlike SEO, PPC shows results immediately. You can receive leads on day one of your campaign going live, with optimisation improving results week by week." },
      { q: "Do you manage Meta Ads too?", a: "Yes, we manage Meta Ads as part of our Social Media Marketing service. We can run both Google and Meta campaigns simultaneously for maximum reach." },
    ],
  },
  {
    id: 6,
    title: "GMB — Google My Business Optimisation",
    shortDesc: "Dominate local search results and Google Maps with a fully optimised Google Business Profile.",
    color: "#34A853",
    description: "Your Google Business Profile is the most powerful free tool for local visibility. We optimise every element of your profile — from categories and attributes to posts, photos and review management — to ensure you rank at the top of local search results and Google Maps. For any business that serves customers locally, GMB optimisation delivers one of the highest ROIs in digital marketing.",
    benefits: ["Complete GMB profile audit and optimisation", "Category, attribute and service area optimisation", "Regular posts, offers and update publishing", "Photo and video upload strategy for maximum engagement", "Review generation campaigns and professional response management"],
    faqs: [
      { q: "How important is Google My Business for local SEO?", a: "Extremely important. For local searches, Google Maps results appear above organic results. A well-optimised GMB profile is the single biggest factor in local search rankings." },
      { q: "Can you help get more Google reviews?", a: "Yes. We implement ethical review generation strategies including follow-up sequences, QR codes and direct review links to consistently grow your review count." },
      { q: "How long does it take to rank on Google Maps?", a: "With a fully optimised profile and consistent effort, most businesses see improved Google Maps rankings within 2-4 months." },
    ],
  },
  {
    id: 7,
    title: "Reputation Management",
    shortDesc: "Monitor, protect and improve your online reputation across Google, social media and review platforms.",
    color: "#FF9500",
    description: "Your online reputation directly impacts customer trust and revenue. We monitor your brand mentions across the web, respond to and suppress negative content, amplify positive reviews and build a strong reputation that converts visitors into customers. Whether you are recovering from a reputation crisis or proactively building brand trust, we have a strategy for you.",
    benefits: ["24/7 brand mention monitoring across all major platforms", "Negative review response and professional mitigation", "Positive review generation campaigns to build trust", "Social media reputation monitoring and management", "Crisis response strategy and rapid execution"],
    faqs: [
      { q: "Can you remove negative Google reviews?", a: "We can flag reviews that violate Google's policies for removal. For reviews that cannot be removed, we develop professional response strategies and build positive review volume to dilute their impact." },
      { q: "How do you monitor our online reputation?", a: "We use professional monitoring tools to track mentions of your brand across Google, social media, news sites, forums and review platforms in real time." },
      { q: "How long does reputation recovery take?", a: "Minor reputation issues can be addressed in 1-3 months. Significant reputation damage may require 6-12 months of consistent effort to fully recover." },
    ],
  },
  {
    id: 8,
    title: "Website Design",
    shortDesc: "Fast, SEO-friendly, conversion-optimised websites that look stunning and rank on Google.",
    color: "#4285F4",
    description: "We design and build websites that are fast, mobile-first and built with SEO baked in from day one. Every website we create is optimised for Core Web Vitals, structured data, proper heading hierarchy and conversion — so your site not only looks great but actually generates business. A beautiful website that doesn't rank or convert is just expensive art.",
    benefits: ["Mobile-first responsive design for all devices", "Core Web Vitals optimisation for speed and performance", "Full on-page SEO built in from day one", "Conversion-focused layouts, CTAs and user journeys", "Fast loading — under 2 second load time target"],
    faqs: [
      { q: "Do you build on WordPress or custom code?", a: "We build on both — WordPress for content-heavy sites that need easy management, and Next.js for high-performance custom projects. We recommend the best platform for your specific needs." },
      { q: "Is SEO included in website design?", a: "Yes. Every website we build includes full on-page SEO setup — meta tags, schema markup, sitemap, robots.txt, image optimisation and proper URL structure." },
      { q: "How long does a website project take?", a: "A standard business website takes 3-6 weeks. Larger e-commerce or custom projects may take 8-12 weeks depending on scope and complexity." },
    ],
  },
  {
    id: 9,
    title: "Social Media Marketing",
    shortDesc: "Build your brand and generate leads through strategic organic and paid social media campaigns.",
    color: "#E1306C",
    description: "We manage your social media presence across Instagram, LinkedIn, Facebook and YouTube — creating content that builds your brand, engages your audience and generates real business leads. From monthly content calendars and professional design to paid social campaigns and community management, we handle everything end to end so you can focus on running your business.",
    benefits: ["Content strategy and monthly content calendar creation", "Professional graphic design and brand-aligned copywriting", "Community management and audience engagement", "Paid social campaigns on Meta, LinkedIn and YouTube", "Monthly performance reporting with actionable insights"],
    faqs: [
      { q: "Which social media platforms do you manage?", a: "We primarily manage Instagram, LinkedIn, Facebook and YouTube. We recommend platforms based on where your target audience is most active." },
      { q: "How many posts per week do you create?", a: "Our standard package includes 3-4 posts per week per platform. Custom packages are available for higher frequency requirements." },
      { q: "Do you run paid ads on social media?", a: "Yes. We run Meta and LinkedIn Ads as part of our paid social service, with full campaign management, creative production and reporting." },
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full py-20">

        {/* Hero */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-widest text-xs text-purple font-semibold mb-4">What we offer</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Our <span className="text-purple">Services</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            From traditional SEO to cutting-edge AI Optimisation — we offer every digital marketing service your business needs to dominate online in 2025 and beyond.
          </p>
          <Link href="/contact">
            <button className="mt-8 px-8 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition duration-200"
              style={{ background: "linear-gradient(90deg, #10b981, #059669)" }}>
              Get a Free Consultation
            </button>
          </Link>
        </div>

        {/* Service nav grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mb-16">
          {services.map((service) => {
            const Icon = ServiceIcons[service.id];
            return (
              <a key={service.id} href={`#service-${service.id}`}
                className="group flex flex-col items-center gap-3 p-4 rounded-2xl border border-white/10 bg-white/5 hover:border-white/40 hover:bg-white/10 hover:scale-105 hover:-translate-y-2 hover:shadow-xl active:scale-95 transition-all duration-300 ease-out cursor-pointer"
                style={{ backgroundColor: `${service.color}11` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${service.color}18` }}>
                  <Icon color={service.color} />
                </div>
                <span className="text-white text-xs text-center font-medium leading-tight">
                  {service.title.split("—")[0].trim()}
                </span>
              </a>
            );
          })}
        </div>

        {/* Service sections */}
        {services.map((service) => {
          const Icon = ServiceIcons[service.id];
          return (
            <div key={service.id} id={`service-${service.id}`} className="mb-20 scroll-mt-24">
              <div className="rounded-3xl border border-white/10 overflow-hidden" style={{ backgroundColor: "rgba(4,7,29,0.8)" }}>
                <div className="p-8 md:p-12"
                  style={{ borderBottom: `1px solid ${service.color}33`, background: `linear-gradient(135deg, ${service.color}11 0%, transparent 60%)` }}>
                  <div className="flex items-start gap-6">
                    <div className="w-20 h-20 p-4 rounded-2xl flex-shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: `${service.color}18`, border: `1px solid ${service.color}33`, boxShadow: `0 0 30px ${service.color}20` }}>
                      <Icon color={service.color} />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">{service.title}</h2>
                      <p className="text-lg font-medium" style={{ color: service.color }}>{service.shortDesc}</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 md:p-12">
                  <div className="grid md:grid-cols-2 gap-10">
                    <div>
                      <h3 className="text-white font-bold text-xl mb-4">What is {service.title.split("—")[0].trim()}?</h3>
                      <p className="text-white/70 leading-relaxed">{service.description}</p>
                      <h3 className="text-white font-bold text-xl mt-8 mb-4">What you get</h3>
                      <ul className="space-y-3">
                        {service.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="mt-1 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                              style={{ backgroundColor: `${service.color}22`, color: service.color, border: `1px solid ${service.color}44` }}>✓</span>
                            <span className="text-white/70">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl mb-4">Frequently asked questions</h3>
                      <div className="space-y-4">
                        {service.faqs.map((faq, i) => (
                          <div key={i} className="rounded-xl p-4 border border-white/10" style={{ backgroundColor: `${service.color}0A` }}>
                            <p className="font-semibold mb-2" style={{ color: service.color }}>{faq.q}</p>
                            <p className="text-white/60 text-sm leading-relaxed">{faq.a}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-8 p-6 rounded-2xl text-center"
                        style={{ background: `linear-gradient(135deg, ${service.color}22 0%, transparent 100%)`, border: `1px solid ${service.color}33` }}>
                        <p className="text-white font-semibold mb-4">Interested in {service.title.split("—")[0].trim()}?</p>
                        <Link href="/contact">
                          <button className="px-6 py-2 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition duration-200"
                            style={{ backgroundColor: service.color }}>
                            Get Started →
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Bottom CTA */}
        <div className="text-center rounded-3xl p-12 border border-white/10"
          style={{ background: "linear-gradient(135deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)" }}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Not sure which service you need?</h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Book a free 30-minute consultation and we will analyse your business, competitors and goals — then recommend the exact services that will drive the best results for you.
          </p>
          <Link href="/contact">
            <button className="px-10 py-4 rounded-lg text-white font-bold text-lg hover:opacity-90 transition duration-200"
              style={{ background: "linear-gradient(90deg, #10b981, #059669)" }}>
              Book a Free Consultation
            </button>
          </Link>
        </div>

      </div>

      {/* Back to top */}
      <BackToTop />
    </main>
  );
}