import React from "react";

const phases = [
  {
    phase: "Phase 1",
    number: "01",
    title: "SEO Audit & Strategy",
    description:
      "We start with a deep audit of your website, competitors and market. We map out your target keywords, content gaps and a clear 90-day growth roadmap tailored to your business goals.",
    color: "#CBACF9",
    bg: "linear-gradient(135deg, rgba(4,7,29,1) 0%, rgba(20,10,50,1) 100%)",
    icon: "🔍",
    steps: ["Website audit", "Keyword research", "Competitor analysis", "90-day roadmap"],
  },
  {
    phase: "Phase 2",
    number: "02",
    title: "Execution & Campaign Launch",
    description:
      "Once the strategy is approved, we get to work. On-page fixes, content creation, link building, ad campaigns — every task is tracked and you receive weekly progress updates throughout.",
    color: "#10b981",
    bg: "linear-gradient(135deg, rgba(4,7,29,1) 0%, rgba(5,25,20,1) 100%)",
    icon: "🚀",
    steps: ["On-page fixes", "Content creation", "Link building", "Weekly updates"],
  },
  {
    phase: "Phase 3",
    number: "03",
    title: "Reporting & Continuous Growth",
    description:
      "This is where results show. We deliver detailed monthly reports covering rankings, traffic, leads and ROI. We then refine and scale what's working to keep your growth compounding.",
    color: "#38bdf8",
    bg: "linear-gradient(135deg, rgba(4,7,29,1) 0%, rgba(5,15,35,1) 100%)",
    icon: "📈",
    steps: ["Monthly reports", "ROI tracking", "Strategy refinement", "Scale what works"],
  },
];

const Approach = () => {
  return (
    <section className="w-full py-20">
      <h1 className="heading">
        Our <span className="text-purple">approach</span>
      </h1>

      {/* Outer wrapper with overflow visible so arrows don't clip */}
      <div className="my-20 flex flex-col lg:flex-row items-stretch justify-center w-full gap-0">
        {phases.map((item, index) => (
          <div key={item.phase} className="relative flex items-stretch flex-1 max-w-sm mx-auto lg:mx-0">

            {/* Card */}
            <div
              className="relative w-full rounded-3xl overflow-hidden border border-white/[0.15] hover:border-white/30 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 lg:h-[38rem] flex flex-col mx-3"
              style={{ background: item.bg }}
            >
              {/* Watermark number */}
              <div
                className="absolute top-4 right-6 text-8xl font-black opacity-[0.06] select-none pointer-events-none"
                style={{ color: item.color }}
              >
                {item.number}
              </div>

              <div className="relative z-10 flex flex-col h-full p-8 gap-5">
                {/* Phase badge */}
                <div className="flex items-center gap-3">
                  <div
                    className="px-4 py-1.5 rounded-full font-bold text-sm border"
                    style={{ color: item.color, borderColor: `${item.color}50`, backgroundColor: `${item.color}15` }}
                  >
                    {item.phase}
                  </div>
                  <span className="text-2xl">{item.icon}</span>
                </div>

                {/* Title */}
                <h2 className="text-white text-xl font-bold leading-snug">{item.title}</h2>

                {/* Description */}
                <p className="text-white/60 text-sm leading-relaxed flex-1">{item.description}</p>

                {/* Step checklist */}
                <div className="mt-auto pt-5 border-t border-white/10">
                  <p className="text-white/30 text-xs uppercase tracking-widest mb-3 font-medium">What we do</p>
                  <ul className="space-y-2">
                    {item.steps.map((step, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Arrow connector — sits OUTSIDE the card, between cards */}
            {index < phases.length - 1 && (
              <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full border border-white/20 bg-[#04071d] items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Approach;