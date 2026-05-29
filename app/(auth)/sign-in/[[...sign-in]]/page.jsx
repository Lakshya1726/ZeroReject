import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="bg-background min-h-screen">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gradient-to-br from-black via-slate-900 to-purple-900/20 lg:col-span-5 lg:h-full xl:col-span-6 overflow-hidden border-r border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/40 via-background to-background"></div>

          <div className="hidden lg:relative lg:block lg:p-12 z-10 w-full">
            <a href="/" className="flex items-center gap-2 mb-10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.6)]">
                <span className="text-white font-bold text-2xl">Z</span>
              </div>
              <span className="text-3xl font-bold tracking-wider neon-text">ZeroReject</span>
            </a>

            <div className="glass p-8 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
              <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl tracking-tight">
                Welcome to <span className="text-cyan-400">ZeroReject</span>
              </h2>

              <p className="mt-4 leading-relaxed text-gray-300 text-lg">
                Elevate your career with intelligent AR mock interviews and
                quantum-level feedback. Transform your job search and stand
                out to employers with our advanced neural technology.
              </p>
            </div>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 bg-background relative">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
             <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px]"></div>
          </div>
          <div className="max-w-xl lg:max-w-3xl relative z-10">
            <div className="relative -mt-16 block lg:hidden mb-10 text-center">
              <a href="/" className="inline-flex items-center gap-2 justify-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.6)]">
                  <span className="text-white font-bold text-2xl">Z</span>
                </div>
              </a>

              <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                Welcome to ZeroReject
              </h1>

              <p className="mt-4 leading-relaxed text-gray-400">
                Elevate your career with intelligent AR mock interviews and
                quantum-level feedback.
              </p>
            </div>

            <div className="glass p-6 sm:p-8 rounded-2xl border border-white/5 shadow-2xl">
              <SignIn afterSignOutUrl="/dashboard" appearance={{
                elements: {
                  card: "bg-transparent shadow-none w-full",
                  headerTitle: "text-white hidden",
                  headerSubtitle: "text-gray-400 hidden",
                  socialButtonsBlockButton: "border-white/10 text-white hover:bg-white/5",
                  dividerLine: "bg-white/10",
                  dividerText: "text-gray-500",
                  formFieldLabel: "text-gray-300",
                  formFieldInput: "bg-white/5 border-white/10 text-white focus:border-cyan-400",
                  formButtonPrimary: "bg-cyan-500 hover:bg-cyan-400 text-white font-bold",
                  footerActionText: "text-gray-400",
                  footerActionLink: "text-cyan-400 hover:text-cyan-300"
                }
              }} />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
