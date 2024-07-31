import React, { useEffect, useState } from "react";
import AccountApprovalHistory from "./component/AccountApprovalHistory";
import JobApprovalHistory from "./component/JobApprovalHistory";

const History = () => {
  const [activeTab, setActiveTab] = useState("Account");
  const handleActiveTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="vetting h-[95%] w-[95%] rounded-[8px] m-auto shadow-md shadow-[#00000040]">
      <section className="vetting-header-section w-full">
        <div className=" w-full flex justify-between md:w-[50%] m-auto">
          <div
            className={
              activeTab === "Account"
                ? "user-active text-[#2596BE] border-b-[3px] border-[#2596BE]"
                : "user-talent cursor-pointer"
            }
            onClick={() => handleActiveTabChange("Account")}>
            <h3 className="font-bold text-[18px]">Account History</h3>
          </div>
          <div
            className={
              activeTab === "Job"
                ? "user-active text-[#2596BE] border-b-[3px] border-[#2596BE]"
                : "user-talent  cursor-pointer"
            }
            onClick={() => handleActiveTabChange("Job")}>
            <h3 className="font-bold text-[18px]">Job History</h3>
          </div>
        </div>
      </section>
      <section className="vetting-contents">
        {activeTab === "Account" && <AccountApprovalHistory />}
        {activeTab === "Job" && <JobApprovalHistory />}
      </section>
    </div>
  );
};

export default History;
