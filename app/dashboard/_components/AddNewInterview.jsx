"use client";
import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { chatSession } from "../../../utils/GeminiAIModal";
import { db } from "../../../utils/db";
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "../../../utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { useRouter } from "next/navigation";
import AvatarSelector from "./AvatarSelector";
import TimeSlotsSelector, { getQuestionCount } from "./TimeSlotsSelector";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("Interview Mitra");
  const [selectedDuration, setSelectedDuration] = useState("30");
  const router = useRouter();
  const { isSignedIn, user } = useUser();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const questionCount = getQuestionCount(selectedDuration);
    const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Based on this, give me ${questionCount} interview questions along with answers in JSON format. Return ONLY a valid JSON array of objects with 'question' and 'answer' fields. Do not include any intro/self-introduction question.`;

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const rawResponse = await result.response.text();
      console.log("Raw Response:", rawResponse);

      let jsonStart = rawResponse.indexOf("[");
      let jsonEnd = rawResponse.lastIndexOf("]");

      if (jsonStart !== -1 && jsonEnd !== -1) {
        let cleanedResponse = rawResponse.substring(jsonStart, jsonEnd + 1);

        try {
          const MockJsonResp = JSON.parse(cleanedResponse);
          console.log("Parsed Response:", MockJsonResp);

          const resp = await db
            .insert(MockInterview)
            .values({
              mockId: uuidv4(),
              jsonMockResp: cleanedResponse,
              jobPosition: jobPosition,
              jobDesc: jobDesc,
              jobExperience: jobExperience,
              createdBy: user?.primaryEmailAddress?.emailAddress,
              createdAt: moment().format("DD-MM-yyyy"),
              avatarName: selectedAvatar,
              interviewDuration: selectedDuration,
            })
            .returning({ mockId: MockInterview.mockId });

          if (resp) {
            setOpenDialog(false);
            router.push("/dashboard/interview/" + resp[0]?.mockId);
          }
        } catch (parseError) {
          console.error("JSON Parsing Error:", parseError);
          alert("Failed to parse AI response. Please try again.");
        }
      } else {
        alert("AI did not return a valid format. Please try again.");
      }
    } catch (error) {
      console.error("Error during AI session or DB insertion:", error);
      alert("An error occurred: " + error.message);
    }

    setLoading(false);
  };

  return (
    <>
      <div>
        <div className="p-4 shadow-sm rounded-lg border-2 border-gray-200">
          <Button
            onClick={() => setOpenDialog(true)}
            className="w-full rounded-md bg-slate-600 hover:bg-slate-700"
          >
            Create New Interview +
          </Button>
        </div>

        <Dialog open={openDialog}>
          <DialogContent className="max-w-2xl bg-gray-900 text-white border-cyan-500/30 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl text-cyan-400">
                Tell us more about your job interview
              </DialogTitle>
              <DialogDescription asChild>
                <form onSubmit={onSubmit}>
                  <div>
                    <p className="text-gray-300 mt-1">
                      Add details about your job position, description, and years of experience
                    </p>

                    {/* Avatar Selection */}
                    <AvatarSelector
                      selectedAvatar={selectedAvatar}
                      onSelect={setSelectedAvatar}
                    />

                    {/* Time Slot Selection */}
                    <TimeSlotsSelector
                      selectedDuration={selectedDuration}
                      onSelect={setSelectedDuration}
                    />

                    <div className="mt-5 my-3">
                      <label className="text-cyan-400 font-bold">
                        Job Role / Job Position
                      </label>
                      <Input
                        list="job-roles-new"
                        placeholder="Ex. Full Stack Developer"
                        required
                        autoComplete="off"
                        onChange={(event) => setJobPosition(event.target.value)}
                        className="mt-2 bg-gray-800 text-white border-gray-700"
                      />
                      <datalist id="job-roles-new">
                        <option value="Software Engineer" />
                        <option value="Frontend Developer" />
                        <option value="Backend Developer" />
                        <option value="Full Stack Developer" />
                        <option value="Data Scientist" />
                        <option value="Data Analyst" />
                        <option value="Machine Learning Engineer" />
                        <option value="AI Engineer" />
                        <option value="Product Manager" />
                        <option value="UX/UI Designer" />
                        <option value="DevOps Engineer" />
                        <option value="Cloud Architect" />
                        <option value="Cybersecurity Analyst" />
                        <option value="Business Analyst" />
                      </datalist>
                    </div>
                    <div className="my-3">
                      <label className="text-cyan-400 font-bold">
                        Job Description / Tech Stack
                      </label>
                      <Textarea
                        className="mt-2 bg-gray-800 text-white border-gray-700"
                        placeholder="Ex. ReactJS, NextJS, TypeScript, Java, Python etc."
                        autoComplete="off"
                        required
                        onChange={(event) => setJobDesc(event.target.value)}
                      />
                    </div>
                    <div className="my-3">
                      <label className="text-cyan-400 font-bold">
                        Years of Experience
                      </label>
                      <Input
                        className="mt-2 bg-gray-800 text-white border-gray-700 mb-5"
                        placeholder="Ex. 5"
                        type="number"
                        required
                        max="50"
                        onChange={(event) => setJobExperience(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-5 justify-end mt-2">
                    <Button
                      variant="ghost"
                      onClick={() => setOpenDialog(false)}
                      type="button"
                      className="text-gray-300 hover:text-white hover:bg-gray-800"
                    >
                      Close
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-cyan-600 hover:bg-cyan-500 text-white"
                    >
                      {loading ? (
                        <>
                          <LoaderCircle className="animate-spin mr-2" />
                          Generating from AI...
                        </>
                      ) : (
                        "Start Interview"
                      )}
                    </Button>
                  </div>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default AddNewInterview;
