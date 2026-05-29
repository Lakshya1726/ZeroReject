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
    const feedbackPrompt = `You are an expert technical interviewer. Evaluate the following interview answer and return ONLY a valid JSON object (no markdown, no extra text).

Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}
Ideal Answer: ${mockInterviewQuestion[activeQuestionIndex]?.answer}
User's Answer: ${userAnswer}

Return this exact JSON structure:
{
  "score": <number from 0 to 100>,
  "rating": "<score>/100",
  "strengths": "<1-2 sentences on what the user did well>",
  "areasOfImprovement": "<2-3 specific areas where the user lacked or was incorrect>",
  "feedback": "<3-5 actionable improvement tips to help the user answer better next time>",
  "correctAnswer": "<a concise model answer to the question>"
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
