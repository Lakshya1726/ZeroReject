"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../../../utils/db";
import { UserAnswer } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import { Button } from "../../../../../components/ui/button";
import { useRouter } from "next/navigation";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import {
  ChevronDown,
  ChevronUp,
  Trophy,
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  BookOpen,
  Star,
} from "lucide-react";

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [overallScore, setOverallScore] = useState(0);
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    console.log(result);
    setFeedbackList(result);

    // Calculate overall score from ratings
    if (result.length > 0) {
      let totalScore = 0;
      let validCount = 0;
      result.forEach((item) => {
        const parsed = tryParseRichFeedback(item.feedback);
        const score = parsed?.score || parseInt(item.rating);
        if (!isNaN(score)) {
          totalScore += score;
          validCount++;
        }
      });
      if (validCount > 0) setOverallScore(Math.round(totalScore / validCount));
    }
  };

  const tryParseRichFeedback = (feedbackStr) => {
    try {
      if (feedbackStr && feedbackStr.startsWith("{")) {
        return JSON.parse(feedbackStr);
      }
    } catch {}
    return null;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    if (score >= 40) return "text-orange-400";
    return "text-red-400";
  };

  const getScoreBg = (score) => {
    if (score >= 80) return "bg-green-500/20 border-green-500/40";
    if (score >= 60) return "bg-yellow-500/20 border-yellow-500/40";
    if (score >= 40) return "bg-orange-500/20 border-orange-500/40";
    return "bg-red-500/20 border-red-500/40";
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Needs Work";
    return "Poor";
  };

  const getScoreBarWidth = (score) => `${Math.min(score, 100)}%`;

  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      {feedbackList?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <AlertCircle className="w-16 h-16 text-gray-500" />
          <h2 className="font-bold text-xl text-gray-400">
            No Interview Feedback Record Found
          </h2>
          <p className="text-gray-500 text-sm">
            Please complete the interview first to see your feedback.
          </p>
          <Button
            onClick={() => router.replace("/dashboard")}
            className="bg-cyan-600 hover:bg-cyan-500 text-white"
          >
            Go to Dashboard
          </Button>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <Trophy className="w-14 h-14 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
            </div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
              Interview Complete!
            </h1>
            <p className="text-gray-400 mt-2 text-sm">
              Great work completing the interview! Here's how you performed 🚀
            </p>
          </div>

          {/* Overall Score Card */}
          <div className="max-w-3xl mx-auto mb-10 rounded-2xl border border-cyan-500/30 bg-black/40 backdrop-blur-md p-6 shadow-[0_0_30px_rgba(34,211,238,0.1)]">
            <h2 className="text-center text-gray-400 text-sm uppercase tracking-widest mb-4">
              Overall Performance Score
            </h2>
            <div className="flex flex-col items-center gap-3">
              <div
                className={`text-7xl font-extrabold ${getScoreColor(overallScore)}`}
              >
                {overallScore}
                <span className="text-3xl text-gray-500">/100</span>
              </div>
            <span
                className={`px-4 py-1 rounded-full text-sm font-semibold border ${getScoreBg(overallScore)} ${getScoreColor(overallScore)}`}
              >
                {overallScore >= 80 ? "🏆 Excellent" : overallScore >= 60 ? "👍 Good" : overallScore >= 40 ? "📈 Keep Going" : "💪 Keep Practicing"}
              </span>
              <div className="w-full bg-gray-800 rounded-full h-3 mt-2">
                <div
                  className={`h-3 rounded-full transition-all duration-1000 ${
                    overallScore >= 80
                      ? "bg-gradient-to-r from-green-500 to-emerald-400"
                      : overallScore >= 60
                        ? "bg-gradient-to-r from-yellow-500 to-amber-400"
                        : overallScore >= 40
                          ? "bg-gradient-to-r from-orange-500 to-orange-400"
                          : "bg-gradient-to-r from-red-600 to-red-400"
                  }`}
                  style={{ width: getScoreBarWidth(overallScore) }}
                />
              </div>
              <p className="text-gray-500 text-xs mt-1">
                Based on {feedbackList.length} question
                {feedbackList.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* Per-question feedback */}
          <div className="max-w-3xl mx-auto flex flex-col gap-4 mb-10">
            <h2 className="text-white font-bold text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              Detailed Question Analysis
            </h2>
            {feedbackList.map((item, index) => {
              const richFeedback = tryParseRichFeedback(item.feedback);
              const score =
                richFeedback?.score ||
                parseInt(item.rating?.split("/")[0]) ||
                0;
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className={`rounded-xl border backdrop-blur-md transition-all duration-300 ${isOpen ? "border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.1)]" : "border-white/10"} bg-black/40`}
                >
                  {/* Question Header */}
                  <button
                    className="w-full p-4 flex items-start justify-between gap-4 text-left"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <span
                        className={`mt-0.5 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${getScoreBg(score)} ${getScoreColor(score)}`}
                      >
                        {index + 1}
                      </span>
                      <span className="text-white text-sm font-medium leading-relaxed">
                        {item.question}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="flex items-center gap-1">
                        <Star
                          className={`w-4 h-4 ${getScoreColor(score)}`}
                          fill="currentColor"
                        />
                        <span
                          className={`font-bold text-sm ${getScoreColor(score)}`}
                        >
                          {score}/100
                        </span>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {isOpen && (
                    <div className="px-4 pb-5 flex flex-col gap-4 border-t border-white/5 pt-4">
                      {/* Score bar */}
                      <div>
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Score</span>
                          <span className={getScoreColor(score)}>
                            {score}/100 — {getScoreLabel(score)}
                          </span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              score >= 80
                                ? "bg-gradient-to-r from-green-500 to-emerald-400"
                                : score >= 60
                                  ? "bg-gradient-to-r from-yellow-500 to-amber-400"
                                  : score >= 40
                                    ? "bg-gradient-to-r from-orange-500 to-orange-400"
                                    : "bg-gradient-to-r from-red-600 to-red-400"
                            }`}
                            style={{ width: getScoreBarWidth(score) }}
                          />
                        </div>
                      </div>

                      {/* Your Answer */}
                      <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                        <h3 className="text-xs text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                          Your Answer
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {item.userAns || "No answer recorded"}
                        </p>
                      </div>

                      {/* Correct/Model Answer */}
                      <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4">
                        <h3 className="text-xs text-green-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          Model Answer
                        </h3>
                        <p className="text-green-200 text-sm leading-relaxed">
                          {item.correctAns}
                        </p>
                      </div>

                      {/* Strengths */}
                      {richFeedback?.strengths && (
                        <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-4">
                          <h3 className="text-xs text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            Strengths
                          </h3>
                          <p className="text-cyan-200 text-sm leading-relaxed">
                            {richFeedback.strengths}
                          </p>
                        </div>
                      )}

                      {/* Areas of Improvement */}
                      {richFeedback?.areasOfImprovement && (
                        <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 p-4">
                          <h3 className="text-xs text-orange-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                            <Target className="w-4 h-4" />
                            Level Up On
                          </h3>
                          <p className="text-orange-200 text-sm leading-relaxed">
                            {richFeedback.areasOfImprovement}
                          </p>
                        </div>
                      )}

                      {/* Actionable Feedback */}
                      <div className="rounded-lg border border-pink-500/30 bg-pink-500/10 p-4">
                        <h3 className="text-xs text-pink-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          How to Improve
                        </h3>
                        <p className="text-pink-200 text-sm leading-relaxed">
                          {richFeedback?.feedback || item.feedback}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Return Button */}
          <div className="max-w-3xl mx-auto flex justify-center">
            <Button
              onClick={() => router.replace("/dashboard")}
              className="flex gap-2 bg-gradient-to-r from-cyan-600 to-pink-600 hover:from-cyan-500 hover:to-pink-500 text-white font-bold px-8 py-3 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.3)]"
            >
              Return to Dashboard
              <MdOutlineDashboardCustomize className="w-5 h-5" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Feedback;
