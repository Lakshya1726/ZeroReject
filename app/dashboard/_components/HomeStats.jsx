import React from "react";

function HomeStats() {
  return (
    <div className="select-none bg-transparent p-4 min-h-screen relative">
      <div className="flex flex-col md:flex-row items-center justify-between md:gap-20 p-4 md:p-10 max-w-screen-xl mx-auto z-10 relative">
        {/* For Side Image (Using a placeholder styled div as a holographic stand-in if the image isn't AR enough) */}
        <div className="w-full md:w-5/12 flex justify-center md:justify-start mb-8 md:mb-0 relative">
          <div className="absolute inset-0 bg-cyan-500/20 blur-[80px] rounded-full"></div>
          <img
            src="model.png"
            alt="AR Interface Model"
            className="w-3/4 sm:w-2/3 md:w-full max-w-full drop-shadow-[0_0_25px_rgba(6,182,212,0.5)] z-10 relative object-contain"
          />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-7/12">
          <div
            className="py-6 md:py-10 text-center md:text-left"
            id="howitworks"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                SYSTEM PROTOCOL
              </span>
            </h2>
            <p className="text-slate-300 py-4 text-lg">
              Initialize. Calibrate. Execute. The ZeroReject Framework.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mx-auto">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl glass border border-white/5 shadow-lg hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer hover:border-cyan-500/50 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              <h2 className="text-slate-50 font-bold text-lg mb-2">
                <span className="text-cyan-400 font-mono mr-2">01</span> Neural Sync
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Start by syncing with ZeroReject and creating your profile. Your neural imprint helps us tailor the scenarios and feedback matrix.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl glass border border-white/5 shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer hover:border-purple-500/50 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              <h2 className="text-slate-50 font-bold text-lg mb-2">
                <span className="text-purple-400 font-mono mr-2">02</span> Select Simulation
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Select from a wide range of simulation modules. Whether engineering or marketing, we project customized AR scenarios to fit your parameters.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl glass border border-white/5 shadow-lg hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer hover:border-cyan-500/50 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              <h2 className="text-slate-50 font-bold text-lg mb-2">
                <span className="text-cyan-400 font-mono mr-2">03</span> Execute Run
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Experience a real-time, dynamic mock interview powered by our core AI. It adapts to your variables to simulate high-stakes environments.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-2xl glass border border-white/5 shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer hover:border-purple-500/50 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              <h2 className="text-slate-50 font-bold text-lg mb-2">
                <span className="text-purple-400 font-mono mr-2">04</span> Telemetry Analysis
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                After extraction, receive immediate telemetry with insights on your performance metrics. ZeroReject provides quantum-level suggestions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeStats;
