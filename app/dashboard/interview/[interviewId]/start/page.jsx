"use client";
import React, { useEffect, useState } from "react";
import { MockInterview } from "../../../../../utils/schema";
import { db } from "../../../../../utils/db";
import { eq } from "drizzle-orm";
import QuestionSection from "./_components/QuestionSection";
import RecordQuestionSection from "./_components/RecordQuestionSection";
import { Button } from "../../../../../components/ui/button";
import { MdNavigateNext } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { AVATARS } from "../../../_components/AvatarSelector";

// Intro question always prepended as question 0
const INTRO_QUESTION = {
  question: "Please introduce yourself — tell us your name, educational background, and what motivated you to apply for this role.",
  answer: "A strong intro covers: full name, educational qualifications, relevant experience or projects, key skills, and genuine motivation for the role.",
  isIntro: true,
};

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      const jsonMockResp = JSON.parse(result[0].jsonMockResp);

      // Always prepend the intro question at index 0
      const questionsWithIntro = [INTRO_QUESTION, ...jsonMockResp];
      setMockInterviewQuestion(questionsWithIntro);
      setInterviewData(result[0]);
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  const avatarInfo = AVATARS.find((a) => a.name === interviewData?.avatarName) || AVATARS[0];

  return (
    <>
      <div>
        {/* Avatar Banner */}
        {interviewData && (
          <div className={`mb-6 rounded-xl p-3 bg-gradient-to-r ${avatarInfo.color} bg-opacity-10 border border-white/10 flex items-center gap-3`}>
            <span className="text-3xl">{avatarInfo.emoji}</span>
            <div>
              <p className="text-xs text-white/60 uppercase tracking-widest">Interviewing with</p>
              <p className="text-white font-bold">{avatarInfo.name} <span className="font-normal text-white/70">· {avatarInfo.tagline}</span></p>
            </div>
            <div className="ml-auto text-xs text-white/60">
              Question {activeQuestionIndex + 1} of {mockInterviewQuestion?.length}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Questions */}
          <QuestionSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            interviewData={interviewData}
          />
          {/* Video / Audio Recording */}
          <RecordQuestionSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            interviewData={interviewData}
          />
        </div>
        <div className="flex justify-end gap-6 mt-4">
          {activeQuestionIndex !== 0 && (
            <Button
              variant="outline"
              onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
              className="text-white border-gray-600"
            >
              <IoIosArrowBack className="w-5 h-5 mr-1" />
              Prev
            </Button>
          )}
          {activeQuestionIndex !== mockInterviewQuestion?.length - 1 && (
            <Button
              onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
              className="bg-cyan-600 hover:bg-cyan-500 text-white"
            >
              Next Question
              <MdNavigateNext className="w-5 h-5" />
            </Button>
          )}
          {activeQuestionIndex === mockInterviewQuestion?.length - 1 && (
            <Link
              href={"/dashboard/interview/" + interviewData?.mockId + "/feedback"}
            >
              <Button className="bg-green-600 hover:bg-green-500 text-white font-bold">
                End Interview 🎉
              </Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default StartInterview;
