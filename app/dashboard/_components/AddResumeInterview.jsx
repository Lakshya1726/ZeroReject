"use client";
import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
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

function AddResumeInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!resumeFile) {
      alert("Please upload a resume PDF first.");
      return;
    }

    setLoading(true);

    try {
      // 1. Parse the resume PDF
      const formData = new FormData();
      formData.append("resume", resumeFile);
      
      const parseRes = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData,
      });

      const parseData = await parseRes.json();
      if (!parseRes.ok || parseData.error) {
        throw new Error(parseData.error || "Failed to parse resume");
      }

      const resumeText = parseData.text;

      // 2. Generate questions via Gemini
      const questionCount = process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT || 5;
      const InputPrompt = `Job Position: ${jobPosition}. The candidate has provided the following resume text: "${resumeText.substring(0, 3000)}". Based on the target Job Position and the candidate's actual resume (experience, skills, projects), give me ${questionCount} highly tailored interview questions along with suggested answers in JSON format. Return ONLY a valid JSON array of objects with 'question' and 'answer' fields.`;

      const result = await chatSession.sendMessage(InputPrompt);
      const rawResponse = await result.response.text();
      
      let jsonStart = rawResponse.indexOf("[");
      let jsonEnd = rawResponse.lastIndexOf("]");
      
      if (jsonStart !== -1 && jsonEnd !== -1) {
        let cleanedResponse = rawResponse.substring(jsonStart, jsonEnd + 1);
        const MockJsonResp = JSON.parse(cleanedResponse);

        // 3. Insert into DB
        const resp = await db
          .insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResp: cleanedResponse,
            jobPosition: jobPosition,
            jobDesc: "Resume-Based Mock Interview",
            jobExperience: "From Resume",
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD-MM-yyyy"),
          })
          .returning({ mockId: MockInterview.mockId });

        if (resp) {
          setOpenDialog(false);
          router.push("/dashboard/interview/" + resp[0]?.mockId);
        }
      } else {
        alert("AI did not return a valid format. Please try again.");
      }
    } catch (error) {
      console.error("Error during resume processing:", error);
      alert("An error occurred: " + error.message);
    }

    setLoading(false);
  };

  return (
    <>
      <div>
        <div className="p-4 shadow-sm rounded-lg border-2 border-cyan-500/50 bg-black/40 backdrop-blur-md">
          <Button
            onClick={() => setOpenDialog(true)}
            className="w-full rounded-md bg-cyan-600 hover:bg-cyan-500 text-white font-bold"
          >
            Upload Resume for Mock Interview
          </Button>
        </div>

        <Dialog open={openDialog}>
          <DialogContent className="max-w-2xl bg-gray-900 text-white border-cyan-500/30">
            <DialogHeader>
              <DialogTitle className="text-2xl text-cyan-400">
                Generate Interview from Resume
              </DialogTitle>
              <DialogDescription>
                <form onSubmit={onSubmit}>
                  <div>
                    <h2 className="text-gray-300">
                      Upload your PDF resume and specify your target role to get personalized questions.
                    </h2>
                    <div className="mt-7 my-3">
                      <label className="text-cyan-400 font-bold">
                        Target Job Role
                      </label>
                      <Input
                        list="job-roles"
                        placeholder="Ex. Software Engineer, Data Scientist"
                        required
                        autoComplete="off"
                        onChange={(event) => setJobPosition(event.target.value)}
                        className="mt-2 bg-gray-800 text-white border-gray-700"
                      />
                      <datalist id="job-roles">
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
                    <div className="my-3 mb-5">
                      <label className="text-cyan-400 font-bold">
                        Upload Resume (PDF)
                      </label>
                      <Input
                        type="file"
                        accept="application/pdf"
                        required
                        onChange={handleFileChange}
                        className="mt-2 bg-gray-800 text-white border-gray-700 file:text-cyan-400 file:bg-gray-800 file:border-0"
                      />
                    </div>
                  </div>
                  <div className="flex gap-5 justify-end">
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
                          Analyzing Resume...
                        </>
                      ) : (
                        "Generate Interview"
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

export default AddResumeInterview;
