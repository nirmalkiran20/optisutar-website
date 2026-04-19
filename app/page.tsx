import Hero from "@/components/Hero";
import dynamic from "next/dynamic";
import Clients from "@/components/Clients";
import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import RecentProjects from "@/components/RecentProjects";

const Grid = dynamic(() => import("@/components/Grid"), { ssr: false });

const Separator = () => (
  <div className="relative w-screen left-1/2 -translate-x-1/2 flex items-center justify-center my-6">
    
    {/* Background soft fade (reduced) */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-300/30 to-transparent" />
    
    <div className="relative w-full h-[2px]">
      
      {/* Wide soft glow (reduced intensity + blur) */}
      <div
        className="absolute inset-0 scale-y-[4] blur-sm opacity-40"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #CBACF9 30%, #a855f7 50%, #CBACF9 70%, transparent 100%)",
        }}
      />

      {/* Medium glow (softer) */}
      <div
        className="absolute inset-0 scale-y-[2] blur-[1px] opacity-50"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #CBACF9 30%, #d8b4fe 50%, #CBACF9 70%, transparent 100%)",
        }}
      />

      {/* Crisp line (slightly toned down) */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #CBACF9 25%, #ffffff 50%, #CBACF9 75%, transparent 100%)",
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