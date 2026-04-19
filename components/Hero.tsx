import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "./MagicButton";

const Hero = () => {
  return (
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] pb-20 pt-36 overflow-hidden">

      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ opacity: 0.55 }}
      >
        <source src="/optisutar-bgvideo.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 z-[1]"
        style={{
          background: "linear-gradient(to bottom, rgba(4,7,29,0.4) 0%, rgba(4,7,29,0.3) 50%, rgba(4,7,29,0.85) 100%)"
        }}
      />

      {/* Subtle color blobs on top */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[2] overflow-hidden">
        <div className="absolute -top-40 -left-20 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, #a5b4fc, transparent)" }}
        />
        <div className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #c4b5fd, transparent)" }}
        />
      </div>

      {/* Content */}
      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">

          {/* Eyebrow */}
          <p className="uppercase tracking-widest text-xs text-center text-purple font-semibold max-w-80 mb-4">
            AI-First Digital Marketing Agency
          </p>

          {/* Headline */}
          <h1 className="text-center text-[40px] md:text-5xl lg:text-6xl font-bold text-white leading-snug mb-6">
            Grow Your Business with{" "}
            <span className="text-purple">
              SEO, AI Search & Digital Marketing
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-center md:tracking-wider mb-8 text-sm md:text-lg lg:text-xl text-white-200">
            We help businesses rank higher, attract more leads and convert visitors into customers - on Google, ChatGPT, Gemini and beyond.
          </p>

          {/* CTA */}
          <a href="/contact">
            <MagicButton
              title="Get a Free Audit"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;