"use client";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import { TbVolume } from "react-icons/tb";
import React, { useState } from "react";
import Image from "next/image";

// Avatar image and voice configuration
const AVATAR_CONFIG = {
  "Interview Mitra": {
    image: "/avatar_interview_mitra.png",
    voiceSettings: { pitch: 1.0, rate: 0.92, lang: "en-IN" },
    voiceKeywords: ["Google हिन्दी", "Rishi", "en-IN", "en_IN"],
    borderColor: "border-cyan-400",
    glowColor: "shadow-[0_0_30px_rgba(6,182,212,0.8)]",
    speakingLabel: "Interview Mitra is Speaking...",
    idleLabel: "Interview Mitra",
  },
  "DostAI": {
    image: "/avatar_dostai.png",
    voiceSettings: { pitch: 1.15, rate: 1.05, lang: "en-IN" },
    voiceKeywords: ["en-IN", "en_IN", "Google"],
    borderColor: "border-emerald-400",
    glowColor: "shadow-[0_0_30px_rgba(16,185,129,0.8)]",
    speakingLabel: "DostAI is Speaking...",
    idleLabel: "DostAI",
  },
  "Taiyaar": {
    image: "/avatar_taiyaar.png",
    voiceSettings: { pitch: 0.8, rate: 0.88, lang: "en-US" },
    voiceKeywords: ["Daniel", "Google US English", "en-US"],
    borderColor: "border-orange-400",
    glowColor: "shadow-[0_0_30px_rgba(249,115,22,0.8)]",
    speakingLabel: "Taiyaar is Speaking...",
    idleLabel: "Taiyaar",
  },
  "JobYaar": {
    image: "/avatar_jobyaar.png",
    voiceSettings: { pitch: 1.1, rate: 0.85, lang: "en-GB" },
    voiceKeywords: ["Google UK English Female", "Serena", "en-GB"],
    borderColor: "border-violet-400",
    glowColor: "shadow-[0_0_30px_rgba(139,92,246,0.8)]",
    speakingLabel: "JobYaar is Speaking...",
    idleLabel: "JobYaar",
  },
  "PrepGuru": {
    image: "/avatar_prepguru.png",
    voiceSettings: { pitch: 0.9, rate: 0.82, lang: "en-US" },
    voiceKeywords: ["Google US English", "Alex", "en-US"],
    borderColor: "border-rose-400",
    glowColor: "shadow-[0_0_30px_rgba(236,72,153,0.8)]",
    speakingLabel: "PrepGuru is Speaking...",
    idleLabel: "PrepGuru",
  },
};

function QuestionSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const avatarName = interviewData?.avatarName || "Interview Mitra";
  const config = AVATAR_CONFIG[avatarName] || AVATAR_CONFIG["Interview Mitra"];

  const getBestVoice = (voices, keywords) => {
    for (const keyword of keywords) {
      const match = voices.find(
        (v) =>
          v.name.includes(keyword) ||
          v.lang === keyword ||
          v.lang.startsWith(keyword.split("-")[0])
      );
      if (match) return match;
    }
    return null;
  };

  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const speech = new SpeechSynthesisUtterance(text);

      const voices = window.speechSynthesis.getVoices();
      const bestVoice = getBestVoice(voices, config.voiceKeywords);
      if (bestVoice) speech.voice = bestVoice;

      speech.pitch = config.voiceSettings.pitch;
      speech.rate = config.voiceSettings.rate;
      speech.lang = config.voiceSettings.lang;

      speech.onstart = () => setIsSpeaking(true);
      speech.onend = () => setIsSpeaking(false);
      speech.onerror = () => setIsSpeaking(false);

      // Voices may load async, retry once if empty
      if (voices.length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          const v2 = window.speechSynthesis.getVoices();
          const bv = getBestVoice(v2, config.voiceKeywords);
          if (bv) speech.voice = bv;
          window.speechSynthesis.speak(speech);
        };
      } else {
        window.speechSynthesis.speak(speech);
      }
    } else {
      alert("Sorry! Your browser does not support text to speech.");
    }
  };

  return (
    mockInterviewQuestion && (
      <>
        <div className="p-5 border border-cyan-500/30 rounded-lg bg-black/40 backdrop-blur-md text-white my-8">

          {/* AI Interviewer Avatar */}
          <div className="flex flex-col items-center justify-center mb-8">
            <div
              className={`relative rounded-full overflow-hidden w-32 h-32 border-4 transition-all duration-300 ${
                isSpeaking
                  ? `${config.borderColor} ${config.glowColor} scale-110`
                  : "border-slate-600 shadow-none scale-100"
              }`}
            >
              <Image
                src={config.image}
                alt={avatarName}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm mt-3 flex items-center gap-2 font-medium" style={{ color: isSpeaking ? "rgba(6,182,212,1)" : "rgba(156,163,175,1)" }}>
              {isSpeaking ? (
                <>
                  <span className={`w-2 h-2 rounded-full animate-pulse ${config.borderColor.replace("border-", "bg-")}`} />
                  {config.speakingLabel}
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-slate-500" />
                  {config.idleLabel} (Idle)
                </>
              )}
            </p>
          </div>

          {/* Question Numbers */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {mockInterviewQuestion &&
              mockInterviewQuestion.map((question, index) => (
                <h2
                  key={index}
                  className={`p-2 rounded-full cursor-default text-xs md:text-sm text-center transition-colors
                  ${
                    activeQuestionIndex === index
                      ? "bg-cyan-500 text-black border-2 border-cyan-500 font-bold"
                      : "border border-slate-600 text-slate-400"
                  }`}
                >
                  {index === 0 ? "🎤 Intro" : `Q #${index}`}
                </h2>
              ))}
          </div>

          {/* Current Question */}
          <h2 className="my-5 text-md md:text-lg font-medium text-slate-100">
            {mockInterviewQuestion[activeQuestionIndex]?.question}
          </h2>

          {/* Speak Button */}
          <Button
            className="flex gap-2 cursor-pointer bg-cyan-600 hover:bg-cyan-500 text-white border-0"
            onClick={() =>
              textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
            }
          >
            🔊 {avatarName} Read Question
            <TbVolume className="w-5 h-5" />
          </Button>

          {/* Tip box */}
          <div className="border border-cyan-500/30 rounded-lg p-5 bg-cyan-950/30 mt-8">
            <h2 className="flex gap-2 items-center text-cyan-400">
              <Lightbulb className="text-cyan-400" />
              <strong>Note:</strong>
            </h2>
            <h2 className="text-sm text-cyan-200/80 my-2">
              {process.env.NEXT_PUBLIC_QUESTION_NOTE ||
                "Click on Record Answer to start. Speak clearly, then click Stop Recording. Your answer is automatically saved and evaluated."}
            </h2>
          </div>
        </div>
      </>
    )
  );
}

export default QuestionSection;
