import React from "react";
import AddNewInterView from "./_components/AddNewInterview";
import AddResumeInterview from "./_components/AddResumeInterview";
import InterviewHistory from "./_components/InterviewHistory";
function Dashboard() {
  return (
    <div className="p-10">
      <h2 className="font-extrabold text-2xl text-cyan-400">Dashboard</h2>
      <h2 className="text-gray-400">
        Create and Start your AI Mockup Interview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-5">
        <AddNewInterView />
        <AddResumeInterview />
      </div>
      {/* Previous Interview List */}
      <InterviewHistory />
    </div>
  );
}

export default Dashboard;
