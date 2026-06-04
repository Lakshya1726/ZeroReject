"use client";

import React, { useEffect, useState } from "react";
import { db } from "../../../../utils/db";
import { MockInterview } from "../../../../utils/schema";
import { eq } from "drizzle-orm";
import Webcam from "react-webcam";
import { FaCircleInfo } from "react-icons/fa6";
import { Button } from "../../../../components/ui/button";
import { MdWorkOutline, MdOutlineVideocam } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";
import { LuCalendarDays, LuClock, LuBot } from "react-icons/lu";
import { VscDebugStart } from "react-icons/vsc";
import Link from "next/link";
import { AVATARS } from "../../_components/AvatarSelector";
import { TIME_SLOTS } from "../../_components/TimeSlotsSelector";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));
      setInterviewData(result[0]);
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  const avatarInfo = AVATARS.find((a) => a.name === interviewData?.avatarName) || AVATARS[0];
  const slotInfo = TIME_SLOTS.find((s) => s.duration === interviewData?.interviewDuration) || TIME_SLOTS[1];

  return (
    <div className="my-10 text-white">
      <div className="flex flex-col md:flex-row flex-wrap gap-10">
        {/* Left Section */}
        <div className="flex flex-col my-5 gap-4 rounded-2xl w-full md:w-[65%]">

          {/* Avatar & Session Banner */}
          {interviewData && (
            <div className={`rounded-xl p-4 bg-gradient-to-r ${avatarInfo.color} bg-opacity-20 border border-white/10`}>
              <div className="flex items-center gap-4">
                <div className="text-5xl">{avatarInfo.emoji}</div>
                <div>
                  <p className="text-xs text-white/70 uppercase tracking-widest">Your AI Interviewer</p>
                  <h2 className="text-xl font-bold text-white">{avatarInfo.name}</h2>
                  <p className="text-sm text-white/80">{avatarInfo.tagline} · {avatarInfo.desc}</p>
                </div>
                <div className="ml-auto text-right hidden sm:block">
                  <span className="text-3xl">{slotInfo.emoji}</span>
                  <p className="text-sm font-bold text-white">{slotInfo.label} Session</p>
                  <p className="text-xs text-white/70">{slotInfo.questions + 1} Questions (incl. intro)</p>
                </div>
              </div>
            </div>
          )}

          <h2 className="font-bold text-2xl text-cyan-400 pl-1">
            Let's Get Started
          </h2>

          {/* Interview Details */}
          <div className="flex flex-col rounded-xl gap-4">
            {interviewData ? (
              <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-white space-y-3">
                <h2 className="flex flex-wrap gap-2 items-center text-base">
                  <MdWorkOutline className="w-5 h-5 text-cyan-400" />
                  <strong className="text-gray-300">Job Position:</strong>
                  <span>{interviewData.jobPosition}</span>
                </h2>
                <h2 className="flex flex-wrap gap-2 items-center text-base">
                  <TbFileDescription className="w-5 h-5 text-cyan-400" />
                  <strong className="text-gray-300">Job Description:</strong>
                  <span>{interviewData.jobDesc}</span>
                </h2>
                <h2 className="flex flex-wrap gap-2 items-center text-base">
                  <LuCalendarDays className="w-5 h-5 text-cyan-400" />
                  <strong className="text-gray-300">Years of Experience:</strong>
                  <span>{interviewData.jobExperience}</span>
                </h2>
                <h2 className="flex flex-wrap gap-2 items-center text-base">
                  <LuClock className="w-5 h-5 text-cyan-400" />
                  <strong className="text-gray-300">Duration:</strong>
                  <span>{slotInfo.label} · {slotInfo.questions + 1} Questions</span>
                </h2>
                <h2 className="flex flex-wrap gap-2 items-center text-base">
                  <LuBot className="w-5 h-5 text-cyan-400" />
                  <strong className="text-gray-300">AI Interviewer:</strong>
                  <span>{avatarInfo.emoji} {interviewData.avatarName}</span>
                </h2>
              </div>
            ) : (
              <p className="text-gray-400">Loading interview details...</p>
            )}
          </div>

          {/* Information Box */}
          <div className="p-5 border rounded-xl border-blue-500/30 bg-blue-900/20 text-white">
            <h2 className="flex gap-2 items-center text-cyan-300 font-bold mb-2">
              <FaCircleInfo className="w-5 h-5" />
              Information
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              {process.env.NEXT_PUBLIC_INFORMATION ||
                "Enable your webcam and microphone to begin. The first question will ask you to introduce yourself. Answer each question clearly and click 'Stop Recording' when done."}
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center w-full md:w-auto gap-4">
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              className="rounded-xl border border-white/20"
              style={{ height: 300, width: 300 }}
            />
          ) : (
            <div className="w-[300px] h-[300px] rounded-xl bg-gray-900 border border-white/10 flex flex-col items-center justify-center gap-3 text-gray-400">
              <MdOutlineVideocam className="w-16 h-16 text-gray-600" />
              <p className="text-sm">Camera is off</p>
            </div>
          )}

          <div className="flex flex-col gap-3 w-full items-center">
            <Button
              onClick={() => setWebCamEnabled(true)}
              className="w-full md:w-[300px] gap-2 rounded-full bg-sky-600 hover:bg-sky-500 text-white"
            >
              <MdOutlineVideocam className="w-5 h-5" />
              Enable Web Cam and Microphone
            </Button>
            <Link href={`/dashboard/interview/${params.interviewId}/start`}>
              <Button className="w-full rounded-full md:w-[300px] gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <VscDebugStart className="w-5 h-5" />
                Start Interview
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Interview;
