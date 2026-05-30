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
    const feedbackPrompt = `You are a warm, supportive senior technical interviewer and career coach. Your primary goal is to build the candidate's confidence while giving them constructive feedback. Be VERY generous with scores.

CRITICAL SCORING RULES (follow strictly):
- Any attempt at answering, even if wrong = minimum 35/100
- A partial answer showing any relevant knowledge = 50-65/100
- A decent answer covering some main points = 65-78/100
- A good answer = 78-88/100
- An excellent, detailed answer = 88-100/100
- NEVER go below 35/100 under any circumstances
- When in doubt between two scores, ALWAYS pick the higher one
- Reward enthusiasm, effort, and any correct keywords mentioned
- The goal is to build confidence — a discouraged candidate learns nothing

Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}
Ideal Answer: ${mockInterviewQuestion[activeQuestionIndex]?.answer}
User's Answer: ${userAnswer}

Return ONLY this exact JSON object (no markdown, no extra text):
{
  "score": <number from 35 to 100 following the generous rules above>,
  "rating": "<score>/100",
  "strengths": "<Start with 'Great job!' or 'Excellent effort!' — highlight 1-2 things the candidate mentioned correctly or any relevant knowledge shown. Be warm and specific>",
  "areasOfImprovement": "<Frame as 'To take this to the next level...' — suggest 1-2 specific concepts or details that would strengthen the answer. Never say wrong, say 'you could also mention...'>",
  "feedback": "<Start with 'You are on the right track!' — give 2-3 specific actionable tips: mention key terms to use, concepts to study, or structure improvements for next time>",
  "correctAnswer": "<A clear, concise model answer in 2-4 sentences that the candidate can learn from>"
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

        // Build a rich feedback string combining all fields
        const richFeedback = JSON.stringify({
          score: JsonFeedbackResp?.score,
          strengths: JsonFeedbackResp?.strengths,
          areasOfImprovement: JsonFeedbackResp?.areasOfImprovement,
          feedback: JsonFeedbackResp?.feedback,
        });

        const resp = await db.insert(UserAnswer).values({
          mockIdRef: interviewData?.mockId,
          question: mockInterviewQuestion[activeQuestionIndex]?.question,
          correctAns: JsonFeedbackResp?.correctAnswer || mockInterviewQuestion[activeQuestionIndex]?.answer,
          userAns: userAnswer,
          feedback: richFeedback,
          rating: JsonFeedbackResp?.rating || `${JsonFeedbackResp?.score}/100`,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-yyyy"),
        });

        if (resp) {
          toast("User Answer Recorded successfully.");
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

  return (
    <>
      <div className="flex items-center justify-center flex-col">
        <div className="flex flex-col justify-center items-center rounded-lg p-5 mt-20 bg-black">
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
          className="my-10"
          onClick={StartStopRecording}
        >
          {isRecording ? (
            <h2 className="text-red-1 flex animate-pulse items-center gap-2">
              <StopCircle />
              Stop Recording...
            </h2>
          ) : (
            <h2 className="flex gap-2 items-center">
              <Mic /> Record Answer
            </h2>
          )}
        </Button>
      </div>
    </>
  );
}

export default RecordQuestionSection;
