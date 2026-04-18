import React from "react";

const Approach = () => {
  return (
    <section className="w-full py-20">
      <h1 className="heading">
        Our <span className="text-purple">approach</span>
      </h1>
      <div className="my-20 flex flex-col lg:flex-row items-center justify-center w-full gap-4">
        <div className="border border-white/[0.2] max-w-sm w-full mx-auto p-10 rounded-3xl lg:h-[35rem] flex flex-col items-center justify-center gap-6"
          style={{ background: "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)" }}>
          <div className="px-5 py-2 rounded-full border border-purple text-purple font-bold text-2xl">Phase 1</div>
          <h2 className="text-white text-center text-2xl font-bold">SEO Audit & Strategy</h2>
          <p className="text-center text-sm" style={{ color: "#E4ECFF" }}>
            We start with a deep audit of your website, competitors and market. We map out your target keywords, content gaps and a clear 90-day growth roadmap tailored to your business goals.
          </p>
        </div>

        <div className="border border-white/[0.2] max-w-sm w-full mx-auto p-10 rounded-3xl lg:h-[35rem] flex flex-col items-center justify-center gap-6"
          style={{ background: "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)" }}>
          <div className="px-5 py-2 rounded-full border border-purple text-purple font-bold text-2xl">Phase 2</div>
          <h2 className="text-white text-center text-2xl font-bold">Execution & Campaign Launch</h2>
          <p className="text-center text-sm" style={{ color: "#E4ECFF" }}>
            Once the strategy is approved, we get to work. On-page fixes, content creation, link building, ad campaigns — every task is tracked and you receive weekly progress updates throughout.
          </p>
        </div>

        <div className="border border-white/[0.2] max-w-sm w-full mx-auto p-10 rounded-3xl lg:h-[35rem] flex flex-col items-center justify-center gap-6"
          style={{ background: "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)" }}>
          <div className="px-5 py-2 rounded-full border border-purple text-purple font-bold text-2xl">Phase 3</div>
          <h2 className="text-white text-center text-2xl font-bold">Reporting & Continuous Growth</h2>
          <p className="text-center text-sm" style={{ color: "#E4ECFF" }}>
            This is where results show. We deliver detailed monthly reports covering rankings, traffic, leads and ROI. We then refine and scale what's working to keep your growth compounding.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Approach;