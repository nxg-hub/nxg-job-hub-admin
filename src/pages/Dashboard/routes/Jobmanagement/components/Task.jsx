import React, { useState } from "react";

const Task = () => {
  const [activeTab, setActiveTab] = useState("new");
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
          Delayed
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
        <div className="bg-[#E0E0E0]">
          <div className=" border-b border-b-gray-400 text-center">
            <span>Meeting with UX Designer</span>
            <span className="block">23/10/23</span>
          </div>
          <div className=" border-b h-[50px] border-b-gray-400 text-center"></div>
          <div className=" border-b h-[50px] border-b-gray-400 text-center"></div>
          <div className=" border-b h-[50px] border-b-gray-400 text-center"></div>
          <div className=" border-b h-[50px] border-b-gray-400 text-center"></div>
        </div>
      )}
      {activeTab === "delayed" && (
        <div className="bg-[#E0E0E0]">
          <div className=" border-b border-b-gray-400 text-center">
            <span>Meeting with UX Delayed</span>
            <span className="block">23/10/23</span>
          </div>
          <div className=" border-b h-[50px] border-b-gray-400 text-center"></div>
          <div className=" border-b h-[50px] border-b-gray-400 text-center"></div>
          <div className=" border-b h-[50px] border-b-gray-400 text-center"></div>
          <div className=" border-b h-[50px] border-b-gray-400 text-center"></div>
        </div>
      )}
      {activeTab === "completed" && (
        <div className="bg-[#E0E0E0]">
          <div className=" border-b border-b-gray-400 text-center">
            <span>Meeting with UX Completed</span>
            <span className="block">23/10/23</span>
          </div>
          <div className=" border-b h-[50px] border-b-gray-400 text-center"></div>
          <div className=" border-b h-[50px] border-b-gray-400 text-center"></div>
          <div className=" border-b h-[50px] border-b-gray-400 text-center"></div>
          <div className=" border-b h-[50px] border-b-gray-400 text-center"></div>
        </div>
      )}
    </div>
  );
};

export default Task;
