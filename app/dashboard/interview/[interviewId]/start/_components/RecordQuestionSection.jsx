"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "../../../../../../components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "../../../../../../utils/GeminiAIModal";
import { db } from "../../../../../../utils/db";
import { UserAnswer } from "../../../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { AVATARS } from "../../../../_components/AvatarSelector";

// Avatar feedback personality prompts
const AVATAR_PERSONALITY = {
  "Interview Mitra": "You are Interview Mitra — a warm, supportive, and professional mentor. Give feedback like a caring senior colleague who genuinely wants the candidate to succeed. Use encouraging, mentor-like language.",
  "DostAI": "You are DostAI — a casual, friendly AI like a best friend helping the candidate prepare. Use a relaxed, conversational tone. Say things like 'Yaar, this was good!' or 'Dost, next time try mentioning...'",
  "Taiyaar": "You are Taiyaar — sharp, direct, and performance-driven. Challenge the candidate to do better. Give honest, no-nonsense feedback that pushes them to their limits. Still be constructive but don't sugarcoat.",
  "JobYaar": "You are JobYaar — formal, corporate, and professional like a senior HR manager at a Fortune 500 company. Give structured, professional feedback using formal corporate language.",
  "PrepGuru": "You are PrepGuru — analytical, data-driven, and thorough like an expert coach. Break down the answer systematically, highlight gaps in depth, and suggest specific resources or frameworks to study.",
};

function RecordQuestionSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) => {
      setUserAnswer((prevAnswer) => prevAnswer + result?.transcript);
    });
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
    if (!isRecording && userAnswer.length > 0 && userAnswer.length <= 10) {
      toast("Error: Answer is too short. Please record again.");
      setUserAnswer("");
    }
  }, [userAnswer, isRecording]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    console.log(userAnswer);
    setLoading(true);

    const avatarName = interviewData?.avatarName || "Interview Mitra";
    const personalityPrompt =
      AVATAR_PERSONALITY[avatarName] || AVATAR_PERSONALITY["Interview Mitra"];
    const currentQuestion = mockInterviewQuestion[activeQuestionIndex];
    const isIntroQuestion = currentQuestion?.isIntro === true;

    const feedbackPrompt = `${personalityPrompt}

Your primary goal is to build the candidate's confidence while giving constructive feedback.

CRITICAL SCORING RULES (follow strictly):
- Any attempt at answering, even if partial = minimum 35/100
- A partial answer showing any relevant knowledge = 50-65/100
- A decent answer covering main points = 65-78/100
- A good answer = 78-88/100
- An excellent, detailed answer = 88-100/100
- NEVER go below 35/100
- When in doubt between two scores, ALWAYS pick the higher one
- Reward enthusiasm, effort, and any correct keywords
${isIntroQuestion ? "- This is an INTRODUCTION question. Be very warm and give a high score (65-90) as long as the candidate introduces themselves clearly. Focus on communication style and confidence." : ""}

Question: ${currentQuestion?.question}
Ideal Answer: ${currentQuestion?.answer}
User's Answer: ${userAnswer}

Return ONLY this exact JSON object (no markdown, no extra text):
{
  "score": <number from 35 to 100>,
  "rating": "<score>/100",
  "strengths": "<Highlight what the candidate did well — be warm and specific as per your persona>",
  "areasOfImprovement": "<Suggest 1-2 improvements in your persona's unique tone>",
  "feedback": "<Give 2-3 actionable tips in your persona's voice>",
  "correctAnswer": "<A concise model answer in 2-4 sentences>"
}`;

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      const rawResponse = await result.response.text();
      console.log(rawResponse);

      let jsonStart = rawResponse.indexOf("{");
      let jsonEnd = rawResponse.lastIndexOf("}");

      if (jsonStart !== -1 && jsonEnd !== -1) {
        let cleanedResponse = rawResponse.substring(jsonStart, jsonEnd + 1);
        const JsonFeedbackResp = JSON.parse(cleanedResponse);

        const richFeedback = JSON.stringify({
          score: JsonFeedbackResp?.score,
          strengths: JsonFeedbackResp?.strengths,
          areasOfImprovement: JsonFeedbackResp?.areasOfImprovement,
          feedback: JsonFeedbackResp?.feedback,
          avatarName: avatarName,
        });

        const resp = await db.insert(UserAnswer).values({
          mockIdRef: interviewData?.mockId,
          question: currentQuestion?.question,
          correctAns:
            JsonFeedbackResp?.correctAnswer || currentQuestion?.answer,
          userAns: userAnswer,
          feedback: richFeedback,
          rating: JsonFeedbackResp?.rating || `${JsonFeedbackResp?.score}/100`,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-yyyy"),
        });

        if (resp) {
          toast("Answer recorded successfully!");
          setUserAnswer("");
          setResults([]);
        }
      } else {
        toast("Failed to analyze answer. Please try again.");
      }
    } catch (error) {
      console.error("Failed to save answer:", error);
      toast("An error occurred while saving. Please try again.");
    } finally {
      setResults([]);
      setLoading(false);
    }
  };

  const avatarInfo =
    AVATARS.find((a) => a.name === interviewData?.avatarName) || AVATARS[0];

  return (
    <>
      <div className="flex items-center justify-center flex-col">
        {/* Avatar label above webcam */}
        {interviewData && (
          <div className="mb-3 flex items-center gap-2 text-white/70 text-sm">
            <span className="text-xl">{avatarInfo.emoji}</span>
            <span>{avatarInfo.name} is evaluating your answer</span>
          </div>
        )}
        <div className="flex flex-col justify-center items-center rounded-lg p-5 bg-black relative">
          <Image
            src="/webcam3.png"
            alt="WebCAM"
            width={140}
            height={140}
            className="absolute"
          />
          <Webcam
            mirrored={true}
            style={{
              height: 300,
              width: "100%",
              zIndex: 100,
            }}
          />
        </div>
        <Button
          disabled={loading}
          variant="outline"
          className="my-10 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
          onClick={StartStopRecording}
        >
          {isRecording ? (
            <h2 className="text-red-400 flex animate-pulse items-center gap-2">
              <StopCircle />
              Stop Recording...
            </h2>
          ) : (
            <h2 className="flex gap-2 items-center">
              <Mic />
              Record Answer
            </h2>
          )}
        </Button>
      </div>
    </>
  );
}

export default RecordQuestionSection;
