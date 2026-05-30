import Link from "next/link";
import Header from "../dashboard/_components/Header";
import Footer from "../dashboard/_components/Footer";
import {
  Mic,
  FileText,
  Briefcase,
  Clock,
  ArrowRight,
  Sparkles,
  Star,
  Building2,
  GraduationCap,
  Lock,
} from "lucide-react";

const activeFeatures = [
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: "Role-Based Interview",
    description:
      "Get interviewed for the exact role you're targeting. Enter your desired job position, tech stack, and years of experience — the AI crafts hyper-relevant technical and behavioral questions specific to that role.",
    badge: "Live",
    badgeColor: "bg-green-500/20 text-green-400 border-green-500/40",
    glowColor: "rgba(34,197,94,0.15)",
    borderColor: "border-green-500/30",
    points: [
      "Tailored questions for any tech role",
      "Specify experience level (Fresher to Senior)",
      "AI evaluates answers with detailed scoring",
      "Instant feedback with improvement tips",
    ],
    href: "/dashboard",
    cta: "Start Role Interview",
    gradient: "from-green-500 to-emerald-400",
  },
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: "Experience-Based Interview",
    description:
      "Your experience level shapes everything. Whether you're a fresher or a 10-year veteran, the AI adjusts question complexity, depth, and expectations to match your background and challenge you appropriately.",
    badge: "Live",
    badgeColor: "bg-green-500/20 text-green-400 border-green-500/40",
    glowColor: "rgba(34,197,94,0.15)",
    borderColor: "border-green-500/30",
    points: [
      "Adaptive difficulty based on experience",
      "Fresher to Senior level calibration",
      "Depth of answers evaluated fairly",
      "Build confidence at your own level",
    ],
    href: "/dashboard",
    cta: "Start Experience Interview",
    gradient: "from-cyan-500 to-blue-400",
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Resume-Based Interview",
    description:
      "Upload your resume and let the AI interview you based on your actual projects, skills, and internships. Get asked about your own experience — the most realistic interview preparation possible.",
    badge: "Live",
    badgeColor: "bg-green-500/20 text-green-400 border-green-500/40",
    glowColor: "rgba(34,197,94,0.15)",
    borderColor: "border-green-500/30",
    points: [
      "Upload PDF resume for parsing",
      "AI asks about your real projects",
      "Tests your actual skills and tech",
      "Closest to a real interview experience",
    ],
    href: "/dashboard",
    cta: "Start Resume Interview",
    gradient: "from-purple-500 to-pink-400",
  },
];

const comingSoonFeatures = [
  {
    icon: <Building2 className="w-8 h-8" />,
    title: "Company + Role Specific Questions",
    description:
      "Pick a company like Google, Amazon, or Microsoft and your target role — the AI generates questions that mirror actual interview patterns from that specific company, including their known coding style, system design preferences, and culture-fit questions.",
    points: [
      "Google, Amazon, Microsoft & more",
      "Company-specific interview patterns",
      "Culture-fit and behavioral alignment",
      "Role × Company question combinations",
    ],
    gradient: "from-pink-500 to-orange-400",
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Resume + JD Based Interview",
    description:
      "Upload both your resume and the exact Job Description you are applying for — the AI cross-matches your profile against the JD and generates laser-focused questions that test exactly what the company is looking for in that role.",
    points: [
      "Upload resume + job description together",
      "AI identifies skill gaps between JD and resume",
      "Questions targeting the exact role requirements",
      "Know what to prepare before the real interview",
    ],
    gradient: "from-cyan-500 to-purple-500",
  },
  {
    icon: <Mic className="w-8 h-8" />,
    title: "Voice & Body Language Analysis",
    description:
      "Go beyond just words — our AI analyzes your tone of voice, speaking pace, filler words, and facial expressions via webcam to give you a complete communication score alongside your technical answers.",
    points: [
      "Real-time tone and confidence scoring",
      "Filler word detection (umm, like, basically)",
      "Facial expression and eye contact analysis",
      "Communication improvement roadmap",
    ],
    gradient: "from-pink-500 to-orange-400",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-16 text-center overflow-hidden">
        <div
          className="absolute inset-0 m-auto max-w-xl h-[300px] blur-[120px] -z-10"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.3) 0%, rgba(168,85,247,0.3) 50%, rgba(0,0,0,0) 100%)",
          }}
        />
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-semibold mb-6">
          <Sparkles className="w-4 h-4" />
          Everything ZeroReject Offers
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-4">
          All{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Features
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto px-4">
          From role-based AI interviews to resume-powered sessions — everything
          you need to land your dream job with confidence.
        </p>
      </section>

      {/* Active Features */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="flex items-center gap-3 mb-10">
          <Star className="w-5 h-5 text-green-400" fill="currentColor" />
          <h2 className="text-2xl font-bold text-white">Live Features</h2>
          <span className="px-3 py-0.5 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 text-xs font-bold">
            Available Now
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeFeatures.map((feature, i) => (
            <div
              key={i}
              className={`relative rounded-2xl border ${feature.borderColor} bg-black/40 backdrop-blur-md p-6 flex flex-col gap-5 hover:-translate-y-1 transition-all duration-300`}
              style={{
                boxShadow: `0 0 40px ${feature.glowColor}`,
              }}
            >
              {/* Badge */}
              <span
                className={`absolute top-4 right-4 px-3 py-0.5 rounded-full border text-xs font-bold ${feature.badgeColor}`}
              >
                ● {feature.badge}
              </span>

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${feature.gradient} shadow-lg`}
              >
                {feature.icon}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>
                <ul className="flex flex-col gap-2">
                  {feature.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <Link href={feature.href} className="mt-auto">
                <button
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white font-semibold text-sm bg-gradient-to-r ${feature.gradient} hover:opacity-90 transition-opacity`}
                >
                  {feature.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Coming Soon Features */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="flex items-center gap-3 mb-10">
          <Clock className="w-5 h-5 text-orange-400" />
          <h2 className="text-2xl font-bold text-white">Coming Soon</h2>
          <span className="px-3 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-bold">
            In Development
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {comingSoonFeatures.map((feature, i) => (
            <div
              key={i}
              className="relative rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-6 flex flex-col gap-5 opacity-80"
            >
              {/* Lock Badge */}
              <span className="absolute top-4 right-4 px-3 py-0.5 rounded-full border border-orange-500/40 bg-orange-500/10 text-orange-400 text-xs font-bold flex items-center gap-1">
                <Lock className="w-3 h-3" /> Coming Soon
              </span>

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${feature.gradient} shadow-lg opacity-70`}
              >
                {feature.icon}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-bold text-white/80 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>
                <ul className="flex flex-col gap-2">
                  {feature.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-500">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-orange-400/50 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disabled CTA */}
              <button
                disabled
                className="mt-auto w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-gray-500 font-semibold text-sm bg-white/5 border border-white/10 cursor-not-allowed"
              >
                <Lock className="w-4 h-4" />
                Coming Soon
              </button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
