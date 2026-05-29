import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const AIpower = () => {
  return (
    <section
      id="insights"
      className="min-h-screen w-full px-4 sm:px-6 md:px-8 xl:px-20 text-white bg-transparent flex items-center relative overflow-hidden"
    >
      {/* Decorative gradient blob */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="flex container flex-col md:flex-row items-center md:items-start gap-5 sm:gap-12 md:gap-16 w-full relative z-10">
        {/* Left Side */}
        <div className="w-full md:w-1/2 relative sm:px-10 md:p-0">
          <div className="text-white sm:p-6 sm:pl-10 md:pr-20">
            {/* Vertical Text */}
            <div className="absolute hidden -left-2 sm:left-8 md:-left-12 xl:-left-16 top-14 sm:top-20 md:top-16 xl:top-24 rotate-[-90deg] text-xs sm:text-sm tracking-widest md:flex flex-row gap-2">
              <div className="w-6 sm:w-8 md:w-10 xl:w-16 h-[2px] bg-cyan-400 mt-2 mx-auto shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
              <p className="select-none text-cyan-400 font-bold uppercase">System Architecture</p>
            </div>

            {/* Main Heading */}
            <h2 className="select-none text-3xl md:text-left text-center sm:text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight">
              <span className="neon-text block mb-2">Neural Core</span>
              The Tech Behind ZeroReject
            </h2>
          </div>

          <p className="select-none md:mt-4 mt-5 text-center sm:p-3 text-gray-300 text-lg leading-relaxed md:text-left">
            ZeroReject utilizes a combination of cutting-edge tools and quantum-inspired technologies to provide an immersive, AI-powered mock interview experience. Here's a deep dive into the core components that power the matrix.
          </p>
        </div>

        {/* Right Side (Static Icons Grid) */}
        <div className="select-none w-full md:w-1/2 flex justify-center items-center">
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 w-full">
            {/* Static Icons */}
            {[
              { src: "/nextjs.png", name: "Next.js" },
              { src: "/gemini.png", name: "Gemini AI" },
              { src: "/react.png", name: "React" },
              { src: "/js.png", name: "JavaScript" },
              { src: "/drizzle.png", name: "Drizzle" },
              { src: "/nodejs.png", name: "Node.js" },
              { src: "/tailwind.png", name: "Tailwind" },
              { src: "/git.png", name: "Git" },
            ].map((tech, idx) => (
              <div className="text-center group" key={idx}>
                <div className="p-4 glass rounded-2xl flex flex-col justify-center items-center transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-white/5 group-hover:border-purple-500/50">
                  <div className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-full mb-3 backdrop-blur-sm">
                    <img
                      src={tech.src}
                      className="w-8 h-8 object-contain drop-shadow-lg"
                      alt={tech.name}
                    />
                  </div>
                  <p className="text-xs text-gray-300 font-semibold group-hover:text-white transition-colors">
                    {tech.name}
                  </p>
                </div>
              </div>
            ))}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center col-span-3 md:mt-4 mt-2 md:col-span-4 justify-center md:justify-start w-full">
              <Link href={"https://github.com/Lakshya1726"} target="_blank">
                <Button className="rounded-full bg-white/10 hover:bg-cyan-500 hover:text-white border border-white/20 hover:border-cyan-400 transition-all shadow-[0_0_10px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] w-full sm:w-auto px-8">
                  GitHub
                </Button>
              </Link>
              <Link
                href={"https://www.linkedin.com/in/lakshya-aryan-963115256"}
                target="_blank"
              >
                <Button className="rounded-full bg-white/10 hover:bg-purple-500 hover:text-white border border-white/20 hover:border-purple-400 transition-all shadow-[0_0_10px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] w-full sm:w-auto px-8">
                  LinkedIn
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIpower;
