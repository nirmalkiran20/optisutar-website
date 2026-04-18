import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "./MagicButton";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";

const Hero = () => {
  return (
    <div className="pb-20 pt-36">
      <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2] absolute top-0 left-0 flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-20 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #a5b4fc, transparent)" }} />
        <div className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #c4b5fd, transparent)" }} />
      </div>

      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">

          <p className="uppercase tracking-widest text-xs text-center text-purple font-semibold max-w-80 mb-4">
            AI-First Digital Marketing Agency
          </p>

          <TextGenerateEffect
            words="Grow Your Business with SEO, AI Search & Digital Marketing"
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
          />

          <p className="text-center md:tracking-wider mb-8 text-sm md:text-lg lg:text-xl text-white-200">
            We help businesses rank higher, attract more leads and convert visitors into customers - on Google, ChatGPT, Gemini and beyond.
          </p>

          <a href="/contact">
            <MagicButton
              title="Get a Free Audit"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;