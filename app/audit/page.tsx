"use client";

import { useState, useRef } from "react";
import Link from "next/link";

type Scores = { performance: number | null; accessibility: number | null; bestPractices: number | null; seo: number | null };
type Vitals = { lcp?: string | null; lcpScore?: number | null; tbt?: string | null; tbtScore?: number | null; cls?: string | null; clsScore?: number | null; fcp?: string | null; si?: string | null; tti?: string | null; renderBlocking?: number; unusedJS?: number; unusedCSS?: number };
type Report = {
  url: string; generatedAt: string; overallScore: number;
  scores: { desktop: Scores; mobile: Scores };
  vitals: { desktop: Vitals; mobile: Vitals };
  competitor: { url: string | null; scores: Scores } | null;
  crawl: any; issues: any[]; warnings: any[]; passing: any[];
  summary: { totalIssues: number; totalWarnings: number; totalPassing: number };
};

const HIDDEN_ISSUES = [
  "Your site has a critical indexing error blocking Google from key pages...",
  "A competitor outranks you for your 3 most valuable keywords...",
  "Your GMB profile has an error hiding you from local search...",
];

const AI_RESPONSES: Record<string, string> = {
  "meta description": "Your meta description is the first thing users read in Google search results. A well-written one can increase CTR by 20-30% without changing your ranking. Keep it 150-160 characters with your main keyword and a clear call to action.",
  "broken link": "Broken links signal poor site maintenance to Google. Fix them by updating the URL or setting up a 301 redirect. Even 1-2 broken links can hurt your crawl budget significantly.",
  "h1": "Your H1 is the most important on-page SEO element. Every page needs exactly one H1 containing your primary keyword. Think of it as the headline of your page.",
  "image": "Alt text helps Google understand your images and improves accessibility rankings. Add descriptive alt text to every image using natural language with keywords where relevant.",
  "speed": "Page speed is a confirmed Google ranking factor. Start by compressing images to WebP, removing unused JavaScript and enabling browser caching. A 1-second improvement can significantly boost rankings.",
  "fix first": "Start with your meta description — it's the quickest win with highest impact. A good meta description can increase CTR immediately without waiting for Google to re-crawl.",
  "how long": "SEO results typically take 3-6 months. However, technical fixes like meta descriptions and broken links can show results within 2-4 weeks once Google re-crawls your site.",
  "competitor": "Competitor comparison shows where your site stands relative to others in your space. Focus on areas where they score higher — those are your biggest opportunities.",
  "schema": "Schema markup (structured data) helps Google display rich results like star ratings, FAQs and breadcrumbs. These dramatically improve click-through rates from search results.",
  "lcp": "LCP (Largest Contentful Paint) measures how quickly your main content loads. Under 2.5 seconds is good. Common fixes: optimize hero images, preload key resources, reduce server response time.",
  "cls": "CLS (Cumulative Layout Shift) measures visual stability. A score under 0.1 is good. Common causes: images without dimensions, ads that load late, dynamically injected content.",
  "default": "Based on your audit results, focus on your critical issues first — they have the highest impact on your Google rankings. Would you like me to explain any specific issue in more detail?",
};

function getAIResponse(question: string): string {
  const q = question.toLowerCase();
  for (const [key, response] of Object.entries(AI_RESPONSES)) {
    if (q.includes(key)) return response;
  }
  if (q.includes("first") || q.includes("priority") || q.includes("start")) return AI_RESPONSES["fix first"];
  if (q.includes("long") || q.includes("time") || q.includes("result")) return AI_RESPONSES["how long"];
  return AI_RESPONSES["default"];
}

function scoreColor(score: number | null) {
  if (!score) return "#9ca3af";
  if (score >= 90) return "#16a34a";
  if (score >= 50) return "#d97706";
  return "#dc2626";
}

function scoreLabel(score: number | null) {
  if (!score) return "N/A";
  if (score >= 90) return "Good";
  if (score >= 50) return "Needs Improvement";
  return "Poor";
}

function ScoreCircle({ score, label, size = 100 }: { score: number | null; label: string; size?: number }) {
  const color = scoreColor(score);
  const radius = (size / 2) - 6;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = score ? circumference - (score / 100) * circumference : circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
          <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={color} strokeWidth="4"
            strokeDasharray={circumference} strokeDashoffset={dashoffset}
            strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s ease" }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-bold" style={{ fontSize: size * 0.24, color }}>{score ?? "N/A"}</span>
        </div>
      </div>
      <span className="text-xs text-white/60 text-center">{label}</span>
      <span className="text-xs font-semibold" style={{ color }}>{scoreLabel(score)}</span>
    </div>
  );
}

function VitalBar({ label, value, score }: { label: string; value: string | null | undefined; score: number | null | undefined }) {
  const color = !score ? "#9ca3af" : score >= 0.9 ? "#16a34a" : score >= 0.5 ? "#d97706" : "#dc2626";
  const status = !score ? "N/A" : score >= 0.9 ? "Good" : score >= 0.5 ? "Needs Improvement" : "Poor";
  return (
    <div className="flex flex-col gap-1.5 p-4 rounded-xl bg-white/5 border border-white/10">
      <div className="flex items-center justify-between">
        <span className="text-xs text-white/50">{label}</span>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${color}22`, color }}>{status}</span>
      </div>
      <span className="text-lg font-bold text-white">{value || "N/A"}</span>
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${(score || 0) * 100}%`, background: color }} />
      </div>
    </div>
  );
}

function IssueRow({ item, type }: { item: any; type: "issue" | "warning" | "passing" }) {
  const [open, setOpen] = useState(false);
  const dot = type === "issue" ? "#dc2626" : type === "warning" ? "#d97706" : "#16a34a";
  return (
    <div className="border-b border-white/5 last:border-0">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-3 p-4 text-left hover:bg-white/5 transition-colors duration-150 group">
        <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: dot }} />
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-white">{item.title}</span>
            {item.impact && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/50">{item.impact}</span>
            )}
          </div>
          {open && (
            <div className="mt-3 space-y-2">
              <p className="text-sm text-white/60 leading-relaxed">{item.description}</p>
              {item.fix && (
                <div className="mt-2 p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                  <p className="text-xs font-semibold text-indigo-400 mb-1">How to fix:</p>
                  <p className="text-xs text-white/60 leading-relaxed">{item.fix}</p>
                </div>
              )}
            </div>
          )}
        </div>
        <span className="text-white/20 text-xs group-hover:text-white/50 transition-colors">{open ? "▲" : "▼"}</span>
      </button>
    </div>
  );
}

function CompareBar({ label, yourScore, theirScore }: { label: string; yourScore: number | null; theirScore: number | null }) {
  const yourColor = scoreColor(yourScore);
  const theirColor = scoreColor(theirScore);
  const youWin = (yourScore || 0) >= (theirScore || 0);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-white/60">{label}</span>
        <div className="flex items-center gap-3">
          <span style={{ color: yourColor }} className="font-bold">{yourScore ?? "N/A"}</span>
          <span className="text-white/20">vs</span>
          <span style={{ color: theirColor }} className="font-bold">{theirScore ?? "N/A"}</span>
        </div>
      </div>
      <div className="flex gap-1 items-center">
        <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${yourScore || 0}%`, background: yourColor }} />
        </div>
        <span className="text-xs">{youWin ? "✅" : "❌"}</span>
        <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${theirScore || 0}%`, background: theirColor }} />
        </div>
      </div>
    </div>
  );
}

export default function AuditPage() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [competitorUrl, setCompetitorUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [report, setReport] = useState<Report | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"desktop" | "mobile">("desktop");
  const [chatMessages, setChatMessages] = useState<{ role: "ai" | "user"; text: string }[]>([
    { role: "ai", text: "Hi! I've analysed your site. Ask me anything about your results and I'll explain what it means and how to fix it." }
  ]);
  const [chatInput, setChatInput] = useState("");
  const reportRef = useRef<HTMLDivElement>(null);

  const progressSteps = [
    "Checking SSL certificate...",
    "Crawling your homepage...",
    "Analysing meta tags...",
    "Scanning heading structure...",
    "Checking for broken links...",
    "Auditing images...",
    "Running PageSpeed analysis...",
    "Analysing Core Web Vitals...",
    "Checking competitor...",
    "Generating your report...",
  ];

  const runAudit = async () => {
    if (!url || !email) { setError("Please enter both your website URL and email address."); return; }
    if (!email.includes("@")) { setError("Please enter a valid email address."); return; }
    setError(""); setLoading(true); setProgress(0); setReport(null);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setProgress(Math.min(step * 9, 88));
      setProgressLabel(progressSteps[Math.min(step - 1, progressSteps.length - 1)]);
    }, 700);

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, competitorUrl: competitorUrl || null }),
      });
      const data = await res.json();
      clearInterval(interval);

      if (!data.success) {
        setError("Failed to audit this site. Please check the URL and try again.");
        setLoading(false);
        return;
      }

      setProgress(100);
      setProgressLabel("Report ready!");

      setTimeout(async () => {
        setReport(data.report);
        setLoading(false);
        setTimeout(() => reportRef.current?.scrollIntoView({ behavior: "smooth" }), 100);

        try {
          await fetch("/api/send-report", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, report: data.report }),
          });
          setEmailSent(true);
        } catch {}
      }, 500);

    } catch {
      clearInterval(interval);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const handleChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatInput("");
    setChatMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: "ai", text: getAIResponse(userMsg) }]);
    }, 600);
  };

  const activeScores = report?.scores[activeTab];
  const activeVitals = report?.vitals[activeTab];

  return (
    <main className="min-h-screen bg-[#1f2d5a] text-white">

      {/* Hero */}
      <section className="relative pt-28 pb-10 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-20 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #6366f1, transparent)" }} />
        <p className="text-sm font-semibold tracking-widest text-indigo-400 uppercase mb-3">Free SEO Audit Tool</p>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
          Find Out Why Your Site{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Isn't Ranking
          </span>
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          Instant SEO audit — PageSpeed scores, Core Web Vitals, meta tags, broken links, competitor comparison and more. Free, instant, no credit card.
        </p>
      </section>

      {/* Input */}
      {!report && (
        <section className="max-w-2xl mx-auto px-6 pb-16">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 opacity-10 blur-3xl pointer-events-none"
              style={{ background: "radial-gradient(circle, #6366f1, transparent)" }} />
            <div className="relative z-10 space-y-4">
              <div>
                <label className="text-xs text-white/40 uppercase tracking-wider mb-1.5 block">Your Website URL</label>
                <input type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://yourbusiness.com"
                  disabled={loading}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-indigo-500/50 transition-all duration-200" />
              </div>
              <div>
                <label className="text-xs text-white/40 uppercase tracking-wider mb-1.5 block">
                  Competitor URL <span className="text-white/20 normal-case">(optional — we'll compare scores)</span>
                </label>
                <input type="url" value={competitorUrl} onChange={e => setCompetitorUrl(e.target.value)}
                  placeholder="https://competitor.com" disabled={loading}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-indigo-500/50 transition-all duration-200" />
              </div>
              <div>
                <label className="text-xs text-white/40 uppercase tracking-wider mb-1.5 block">Your Email — to receive the full report</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com"
                  disabled={loading}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-indigo-500/50 transition-all duration-200" />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              {loading ? (
                <div className="space-y-3">
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-700"
                      style={{ width: `${progress}%` }} />
                  </div>
                  <p className="text-center text-white/50 text-sm animate-pulse">{progressLabel}</p>
                </div>
              ) : (
                <button onClick={runAudit}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-3.5 rounded-xl hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 text-sm">
                  Analyse My Website Free →
                </button>
              )}
              <p className="text-center text-white/25 text-xs">No spam. Report emailed instantly. Unsubscribe anytime.</p>
            </div>
          </div>
        </section>
      )}

      {/* Report */}
      {report && (
        <section ref={reportRef} className="max-w-4xl mx-auto px-6 pb-24 space-y-6">

          {/* Header + overall score */}
          <div className="rounded-3xl border border-white/10 overflow-hidden">
            <div className="bg-[#1f2d5a] p-6 border-b border-white/10">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <p className="text-white/40 text-xs">Audit complete</p>
                  </div>
                  <p className="text-white font-bold text-xl">{report.url}</p>
                  <p className="text-white/30 text-xs mt-1">
                    {new Date(report.generatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-400">{report.summary.totalIssues} Critical</span>
                  <span className="text-xs px-3 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400">{report.summary.totalWarnings} Warnings</span>
                  <span className="text-xs px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400">{report.summary.totalPassing} Passing</span>
                </div>
              </div>
            </div>

            {/* Desktop/Mobile toggle */}
            <div className="px-6 pt-5 flex gap-2">
              {(["desktop", "mobile"] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 capitalize ${activeTab === tab ? "bg-indigo-500 text-white" : "bg-white/5 text-white/50 hover:text-white hover:bg-white/10"}`}>
                  {tab === "desktop" ? "🖥 Desktop" : "📱 Mobile"}
                </button>
              ))}
            </div>

            {/* Score circles — Google style */}
            <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-6 justify-items-center">
              <ScoreCircle score={activeScores?.performance ?? null} label="Performance" />
              <ScoreCircle score={activeScores?.accessibility ?? null} label="Accessibility" />
              <ScoreCircle score={activeScores?.bestPractices ?? null} label="Best Practices" />
              <ScoreCircle score={activeScores?.seo ?? null} label="SEO" />
            </div>

            {/* Score legend */}
            <div className="px-6 pb-4 flex items-center gap-4 text-xs text-white/40">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" />0–49</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-500" />50–89</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500" />90–100</span>
            </div>
          </div>

          {/* Core Web Vitals */}
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <div className="px-5 py-3 border-b border-white/10 bg-white/5">
              <p className="text-sm font-semibold text-white">Core Web Vitals — {activeTab === "desktop" ? "Desktop" : "Mobile"}</p>
            </div>
            <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <VitalBar label="Largest Contentful Paint (LCP)" value={activeVitals?.lcp} score={activeVitals?.lcpScore} />
              <VitalBar label="Total Blocking Time (TBT)" value={activeVitals?.tbt} score={activeVitals?.tbtScore} />
              <VitalBar label="Cumulative Layout Shift (CLS)" value={activeVitals?.cls} score={activeVitals?.clsScore} />
            </div>
            {activeVitals?.fcp && (
              <div className="px-5 pb-5 grid grid-cols-3 gap-3">
                {[
                  { label: "First Contentful Paint", val: activeVitals.fcp },
                  { label: "Speed Index", val: activeVitals.si },
                  { label: "Time to Interactive", val: activeVitals.tti },
                ].map(v => v.val && (
                  <div key={v.label} className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                    <p className="text-sm font-semibold text-white">{v.val}</p>
                    <p className="text-xs text-white/40 mt-1">{v.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Competitor comparison */}
          {report.competitor && (
            <div className="rounded-2xl border border-white/10 overflow-hidden">
              <div className="px-5 py-3 border-b border-white/10 bg-white/5 flex items-center justify-between">
                <p className="text-sm font-semibold text-white">Competitor Comparison</p>
                <div className="flex items-center gap-4 text-xs text-white/40">
                  <span className="text-indigo-400 font-semibold">You</span>
                  <span>vs</span>
                  <span className="text-white/60 truncate max-w-32">{report.competitor.url}</span>
                </div>
              </div>
              <div className="p-5 space-y-4">
                {[
                  { label: "Performance", your: report.scores.desktop.performance, their: report.competitor.scores.performance },
                  { label: "SEO", your: report.scores.desktop.seo, their: report.competitor.scores.seo },
                  { label: "Accessibility", your: report.scores.desktop.accessibility, their: report.competitor.scores.accessibility },
                  { label: "Best Practices", your: report.scores.desktop.bestPractices, their: report.competitor.scores.bestPractices },
                ].map(item => (
                  <CompareBar key={item.label} label={item.label} yourScore={item.your ?? null} theirScore={item.their ?? null} />
                ))}
              </div>
            </div>
          )}

          {/* Email confirmation */}
          {emailSent && (
            <div className="flex items-center gap-3 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl px-5 py-3">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="#a5b4fc" strokeWidth="1.2"/>
                <path d="M1 5l7 5 7-5" stroke="#a5b4fc" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <p className="text-sm text-indigo-300">Full report sent to <span className="font-semibold">{email}</span></p>
            </div>
          )}

          {/* Issues */}
          {report.issues.length > 0 && (
            <div className="rounded-2xl border border-red-500/20 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-red-500/20 bg-red-500/5">
                <p className="text-sm font-semibold text-white">Critical Issues</p>
                <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-red-500/20 text-red-400 border border-red-500/30">{report.issues.length}</span>
              </div>
              {report.issues.map((item, i) => <IssueRow key={i} item={item} type="issue" />)}
            </div>
          )}

          {/* Warnings */}
          {report.warnings.length > 0 && (
            <div className="rounded-2xl border border-yellow-500/20 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-yellow-500/20 bg-yellow-500/5">
                <p className="text-sm font-semibold text-white">Warnings</p>
                <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">{report.warnings.length}</span>
              </div>
              {report.warnings.map((item, i) => <IssueRow key={i} item={item} type="warning" />)}
            </div>
          )}

          {/* Passing */}
          {report.passing.length > 0 && (
            <div className="rounded-2xl border border-green-500/20 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-green-500/20 bg-green-500/5">
                <p className="text-sm font-semibold text-white">Passing Checks</p>
                <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-green-500/20 text-green-400 border border-green-500/30">{report.passing.length}</span>
              </div>
              {report.passing.map((item, i) => <IssueRow key={i} item={item} type="passing" />)}
            </div>
          )}

          {/* Hook */}
          <div className="rounded-3xl p-8 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)", border: "1.5px solid #6366f1" }}>
            <div className="absolute top-0 right-0 w-48 h-48 opacity-20 blur-3xl pointer-events-none"
              style={{ background: "radial-gradient(circle, #818cf8, transparent)" }} />
            <div className="relative z-10">
              <p className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-3">We found something more important</p>
              <h2 className="text-2xl font-bold text-white mb-4 leading-snug">
                We know these issues sound familiar — but that's not what's really holding you back.
              </h2>
              <p className="text-indigo-200 text-sm leading-relaxed mb-6">
                We found 3 deeper issues most agencies never catch. These are silently costing you leads every single day. We'd rather show you in 10 minutes than explain it in an email.
              </p>
              <div className="space-y-3 mb-6">
                {HIDDEN_ISSUES.map((issue, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                    <p className="text-sm text-indigo-200 blur-sm select-none flex-1">{issue}</p>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect x="3" y="6" width="8" height="7" rx="1" stroke="#818cf8" strokeWidth="1.2"/>
                      <path d="M5 6V4.5a2 2 0 014 0V6" stroke="#818cf8" strokeWidth="1.2"/>
                    </svg>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-indigo-200 text-sm font-medium">Free, no pressure, 10 minutes. We'll walk through everything live.</p>
                <Link href="/contact">
                  <button className="bg-white text-indigo-700 font-bold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors duration-200 text-sm whitespace-nowrap">
                    Book Free Call →
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* 90-day roadmap */}
          <div className="rounded-2xl bg-[#1f2d5a] border border-white/10 p-6">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-5">Your AI-generated 90-day roadmap</p>
            <div className="space-y-5">
              {[
                { period: "Week 1–2", task: report.issues[0] ? `Fix: ${report.issues[0].title}` : "Fix all critical issues from your audit", blurred: false },
                { period: "Week 3–4", task: report.warnings[0] ? `Address: ${report.warnings[0].title}` : "Work through medium-priority warnings", blurred: false },
                { period: "Month 2", task: "Build topical content clusters targeting competitor keywords and AI search visibility", blurred: true },
                { period: "Month 3", task: "Scale with AI Optimisation (AIO/GEO), backlink building and GMB domination", blurred: true },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-xs font-bold text-indigo-400">{i + 1}</div>
                    {i < 3 && <div className="w-px h-6 bg-indigo-500/20 mt-1" />}
                  </div>
                  <div className="flex-1 pt-1">
                    <span className="text-xs font-bold text-indigo-400">{item.period}</span>
                    <p className={`text-sm mt-1 leading-relaxed ${item.blurred ? "text-white/20 blur-sm select-none" : "text-white/70"}`}>{item.task}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-white/20 text-xs mt-5 pt-4 border-t border-white/5">Full roadmap revealed on your free strategy call</p>
          </div>

          {/* AI Chat */}
          <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
            <div className="px-5 py-3 border-b border-white/10 bg-white/5 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <p className="text-sm font-semibold text-white">Ask AI about your report</p>
            </div>
            <div className="p-5 space-y-4 max-h-72 overflow-y-auto">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${msg.role === "ai" ? "bg-indigo-500/20 text-indigo-400" : "bg-white/10 text-white/60"}`}>
                    {msg.role === "ai" ? "AI" : "U"}
                  </div>
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.role === "ai" ? "bg-white/10 text-white/80 rounded-tl-none" : "bg-indigo-500 text-white rounded-tr-none"}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 pb-3 flex flex-wrap gap-2">
              {["Which issue first?", "How to fix meta description?", "What's hurting score most?", "How long for results?", "What is LCP?", "How to beat competitor?"].map(q => (
                <button key={q} onClick={() => setChatInput(q)}
                  className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-white/25 transition-all duration-200">
                  {q}
                </button>
              ))}
            </div>
            <div className="px-5 pb-5 flex gap-3">
              <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleChat()}
                placeholder="Ask about your report..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-indigo-500/50 transition-all duration-200" />
              <button onClick={handleChat}
                className="px-5 py-2.5 bg-indigo-500 text-white text-sm font-semibold rounded-xl hover:bg-indigo-600 transition-colors duration-200">
                Send
              </button>
            </div>
          </div>

          {/* Audit another */}
          <div className="text-center">
            <button onClick={() => { setReport(null); setUrl(""); setEmail(""); setCompetitorUrl(""); setEmailSent(false); setChatMessages([{ role: "ai", text: "Hi! Ready to analyse another site. What would you like to check?" }]); }}
              className="text-sm text-white/40 hover:text-white/70 transition-colors duration-200 underline underline-offset-4">
              Audit another website
            </button>
          </div>

        </section>
      )}
    </main>
  );
}