"use client";
export default () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Background Gradients for AR Dashboard Vibe */}
      <div
        className="absolute inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.4) 0%, rgba(168,85,247,0.4) 50%, rgba(0,0,0,0) 100%)",
        }}
      ></div>

      <section className="relative z-10">
        <div className="max-w-screen-xl mx-auto px-4 py-28 md:px-8">
          <div className="space-y-8 max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-1.5 rounded-full glass border border-cyan-500/30 text-cyan-400 text-sm font-semibold mb-4 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              Welcome to the Future of Interviewing
            </div>
            
            <h2 className="text-5xl text-white font-extrabold mx-auto md:text-7xl tracking-tight leading-tight">
              Eliminate Rejections with{" "}
              <br className="hidden md:block"/>
              <span className="neon-text">
                ZeroReject
              </span>
            </h2>
            
            <p className="max-w-2xl mx-auto text-gray-300 text-lg md:text-xl leading-relaxed">
              Experience an AI-powered AR dashboard that simulates real-world interviews, provides instant feedback, and guarantees your success.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6">
              <a href="/features" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-3.5 text-gray-300 bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 rounded-xl shadow-lg backdrop-blur-md">
                  Explore Features
                </button>
              </a>
              <a href="/dashboard" className="w-full sm:w-auto">
                <button className="flex items-center justify-center gap-x-2 w-full sm:w-auto px-8 py-3.5 text-white font-bold bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 rounded-xl neon-border">
                  Launch Dashboard
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </a>
            </div>
            
            <div className="pt-10 flex justify-center items-center gap-x-4 text-gray-400 text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-pulse"></div>
                <p>
                  <span className="text-white">Active System</span> | 99.9% Uptime
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
