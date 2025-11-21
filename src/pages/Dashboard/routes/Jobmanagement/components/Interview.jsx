import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useApiRequest } from "../../../../../utils/functions/fetchEndPoint";

const Interview = () => {
  const user = useSelector((state) => state.UserSlice.user);
  const userID = user?.id;

  const [activeTab, setActiveTab] = useState("new");

  const { data = [], loading } = useApiRequest(
    userID ? `/api/v1/admin/all-interviews-by-an-admin?adminId=${userID}` : null
  );

  const date = new Date();
  const pad = (n) => n.toString().padStart(2, "0");
  const currentDate = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;
  const today = new Date(currentDate);

  const handleActiveTabChange = (tab) => setActiveTab(tab);

  const newInterviews = data.filter(
    (task) => new Date(task.interviewDate) > today
  );
  const todaysInterviews = data.filter(
    (task) =>
      new Date(task.interviewDate).toDateString() === today.toDateString()
  );
  const completedInterviews = data.filter(
    (task) => new Date(task.interviewDate) < today
  );

  let filteredInterviews = [];
  if (activeTab === "new") filteredInterviews = newInterviews;
  else if (activeTab === "delayed") filteredInterviews = todaysInterviews;
  else if (activeTab === "completed") filteredInterviews = completedInterviews;

  return (
    <div className="w-[90%] md:w-[60%] lg:w-[50%] m-auto">
      <h2 className="text-[#2596BE] font-bold py-4 text-center text-xl">
        Interviews
      </h2>

      {/* Tabs */}
      <div className="bg-white w-full flex justify-around font-bold rounded-sm mb-3">
        {["new", "delayed", "completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleActiveTabChange(tab)}
            className={`px-3 py-1 rounded-sm outline-none ${
              activeTab === tab ? "bg-blue-500 text-white" : ""
            }`}>
            {tab === "new" ? "New" : tab === "delayed" ? "Today" : "Completed"}
          </button>
        ))}
      </div>
      {/* Interview List */}
      <div className="h-[300px] overflow-y-auto bg-gray-100 p-2 rounded-lg">
        {loading ? (
          <p className="text-center py-4">Loading...</p>
        ) : filteredInterviews.length === 0 ? (
          <p className="text-center py-4">No interviews found</p>
        ) : (
          filteredInterviews.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-lg shadow p-3 mb-2 border-b">
              <p className="font-semibold text-blue-700">{task.talentName}</p>
              <p className="text-sm text-gray-600">Job: {task.jobTitle}</p>
              <p className="text-sm text-gray-600">
                Company: {task.employerName}
              </p>
              <p className="text-sm text-gray-600">
                Date: {task.interviewDate} | Time: {task.time}
              </p>
              <p className="text-sm text-gray-600">
                Mode: {task.modeOfInterview}
              </p>
              {task.modeOfInterview === "REMOTE" && task.meetingLink && (
                <p className="text-sm text-green-600">
                  Meeting Link: {task.meetingLink}
                </p>
              )}
              {task.modeOfInterview === "PHYSICAL" && task.interviewAddress && (
                <p className="text-sm text-green-600">
                  Location: {task.interviewAddress}
                </p>
              )}
              {task.description && (
                <p className="text-sm mt-1 text-gray-800">
                  Notes: {task.description}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Interview;
