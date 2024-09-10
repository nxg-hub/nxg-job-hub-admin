import React, { useState } from "react";
import { useApiRequest } from "../../../../../utils/functions/fetchEndPoint";
import { useSelector } from "react-redux";

const Task = () => {
  //getting user data from redux store
  const user = useSelector((state) => state.UserSlice.user);
  const userID = user.id;

  const [activeTab, setActiveTab] = useState("new");
  const { data, loading } = useApiRequest(
    `/api/v1/admin/all-interviews-by-an-admin?adminId=${userID}`
  );
  //getting current date
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  //setting current date
  const currentDate = `${year}-${month < 10 ? "0" : null}${month}-${
    day < 10 ? "0" : null
  }${day}`;
  const handleActiveTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="w-[75%] m-auto md:w-[35%]">
      <h2 className="text-[#2596BE] font-bold py-4 text-center">Task</h2>
      <div className="bg-white w-full flex justify-around font-bold rounded-sm">
        <button
          onClick={() => {
            handleActiveTabChange("new");
          }}
          className={
            activeTab === "new"
              ? "user-active bg-blue-500 text-white rounded-sm px-2 outline-none"
              : ""
          }>
          New
        </button>
        <button
          onClick={() => {
            handleActiveTabChange("delayed");
          }}
          className={
            activeTab === "delayed"
              ? "user-active bg-blue-500 text-white rounded-sm px-2 outline-none"
              : ""
          }>
          Updated
        </button>
        <button
          onClick={() => {
            handleActiveTabChange("completed");
          }}
          className={
            activeTab === "completed"
              ? "user-active bg-blue-500 text-white rounded-sm px-2 outline-none"
              : ""
          }>
          Completed
        </button>
      </div>
      {activeTab === "new" && (
        <div className="h-[250px] overflow-y-scroll bg-gray-200">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            data
              .filter((task) => {
                return task.interviewDate > currentDate;
              })
              .map((task, id) => (
                <div
                  className="flex flex-col gap-[5px] border-b-black text-center"
                  key={id}>
                  <p className="task">Interview with {task.talentName}</p>
                  <small>{task.interviewDate}</small>
                </div>
              ))
          )}
        </div>
      )}
      {activeTab === "delayed" && (
        <div className="h-[250px] overflow-y-scroll bg-gray-200">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            data
              .filter((task) => {
                return task.interviewDate === currentDate;
              })
              .map((task, id) => (
                <div
                  className="flex flex-col gap-[5px] border-b-black text-center"
                  key={id}>
                  <p className="task">Interview with {task.talentName}</p>
                  <small>{task.interviewDate}</small>
                </div>
              ))
          )}
        </div>
      )}
      {activeTab === "completed" && (
        <div className="h-[250px] overflow-y-scroll bg-gray-200">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            data
              .filter((task) => {
                return task.interviewDate < currentDate;
              })
              .map((task, id) => (
                <div
                  className="flex flex-col gap-[5px] border-b-black text-center"
                  key={id}>
                  <p className="task">Interview with {task.talentName}</p>
                  <small>{task.interviewDate}</small>
                </div>
              ))
          )}
        </div>
      )}
    </div>
  );
};

export default Task;
