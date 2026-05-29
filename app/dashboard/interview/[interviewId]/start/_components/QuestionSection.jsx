import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import { TbVolume } from "react-icons/tb";
import React, { useState } from "react";
import Image from "next/image";

function QuestionSection({ mockInterviewQuestion, activeQuestionIndex }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const speech = new SpeechSynthesisUtterance(text);
      speech.onstart = () => setIsSpeaking(true);
      speech.onend = () => setIsSpeaking(false);
      speech.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(speech);
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
            <div className={`relative rounded-full overflow-hidden w-32 h-32 border-4 transition-all duration-300 ${isSpeaking ? 'border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.8)] scale-110' : 'border-slate-600 shadow-none scale-100'}`}>
              <Image src="/ai_interviewer.png" alt="AI Interviewer" fill className="object-cover" />
            </div>
            <p className="text-cyan-400 font-mono text-sm mt-3 flex items-center gap-2">
              {isSpeaking ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  AI Interviewer (Speaking)
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                  AI Interviewer (Idle)
                </>
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {mockInterviewQuestion &&
              mockInterviewQuestion.map((question, index) => (
                <h2
                  key={index}
                  className={`p-2 rounded-full cursor-default text-xs md:text-sm text-center transition-colors
                  ${
                    activeQuestionIndex == index
                      ? "bg-cyan-500 text-black border-2 border-cyan-500 font-bold"
                      : "border border-slate-600 text-slate-400"
                  }`}
                >
                  Question #{index + 1}
                </h2>
              ))}
          </div>
          <h2 className="my-5 text-md md:text-lg font-medium text-slate-100">
            {mockInterviewQuestion[activeQuestionIndex]?.question}
          </h2>
          <Button
            className="flex gap-2 cursor-pointer bg-cyan-600 hover:bg-cyan-500 text-white border-0"
            onClick={() =>
              textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
            }
          >
            Question Audio
            <TbVolume className="w-5 h-5" />
          </Button>
          <div className="border border-cyan-500/30 rounded-lg p-5 bg-cyan-950/30 mt-14">
            <h2 className="flex gap-2 items-center text-cyan-400">
              <Lightbulb className="text-cyan-400" />
              <strong>Note:</strong>
            </h2>
            <h2 className="text-sm text-cyan-200/80 my-2">
              {process.env.NEXT_PUBLIC_QUESTION_NOTE}
            </h2>
          </div>
        </div>
      </>
    )
  );
}

export default QuestionSection;
