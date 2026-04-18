import Hero from "@/components/Hero";
import dynamic from "next/dynamic";
import Clients from "@/components/Clients";
import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import RecentProjects from "@/components/RecentProjects";

const Grid = dynamic(() => import("@/components/Grid"), { ssr: false });

const Separator = () => (
  <div className="w-full flex items-center justify-center my-6">
    <div className="relative w-full max-w-5xl h-[2px]">
      {/* Wide soft glow */}
      <div
        className="absolute inset-0 scale-y-[6] blur-md"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #CBACF9 25%, #a855f7 50%, #CBACF9 75%, transparent 100%)",
        }}
      />
      {/* Medium glow */}
      <div
        className="absolute inset-0 scale-y-[3] blur-[2px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #CBACF9 25%, #d8b4fe 50%, #CBACF9 75%, transparent 100%)",
        }}
      />
      {/* Sharp crisp line */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #CBACF9 20%, #ffffff 50%, #CBACF9 80%, transparent 100%)",
        }}
      />
    </div>
  </div>
);

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <Hero />
        <Separator />
        <Grid />
        <Separator />
        <RecentProjects />
        <Separator />
        <Clients />
        <Separator />
        <Experience />
        <Separator />
        <Approach />
      </div>
    </main>
  );
}