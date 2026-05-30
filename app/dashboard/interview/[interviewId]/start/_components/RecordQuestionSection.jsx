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
    const feedbackPrompt = `You are a supportive and encouraging senior technical interviewer who wants candidates to succeed and grow in confidence. Evaluate the following interview answer generously — reward effort, partial knowledge, and any correct points made.

IMPORTANT SCORING GUIDELINES:
- A blank or completely irrelevant answer = 20-35/100 (still give encouragement)
- A partial answer showing some understanding = 45-65/100
- A decent answer covering main points = 65-80/100  
- A good answer = 80-90/100
- An excellent, detailed answer = 90-100/100
- NEVER give a score below 20. Always find something positive to say.
- Be generous — if in doubt, score higher not lower. The goal is to build confidence.

Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}
Ideal Answer: ${mockInterviewQuestion[activeQuestionIndex]?.answer}
User's Answer: ${userAnswer}

Return ONLY this exact JSON object (no markdown, no extra text):
{
  "score": <number from 20 to 100 following the generous guidelines above>,
  "rating": "<score>/100",
  "strengths": "<Start with 'Great job!' or 'Well done!' — highlight 1-2 specific things the candidate said correctly or showed understanding of, be encouraging and specific>",
  "areasOfImprovement": "<Frame constructively as 'To level up, consider...' — mention 1-2 specific concepts or depth they could add, never say they were wrong, say they could elaborate more>",
  "feedback": "<Give 2-3 actionable, encouraging tips starting with 'You're on the right track!' — specific study suggestions, keywords to use, or concepts to mention next time>",
  "correctAnswer": "<A concise, clear model answer to the question in 2-4 sentences>"
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
