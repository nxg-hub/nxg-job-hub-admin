import React, { useState } from "react";
import NewTalents from "./components/NewTalents";
import NewEmployers from "./components/NewEmployers";

const NewUsers = () => {
  const [activeTab, setActiveTab] = useState("Talent");
  const handleActiveTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="vetting h-[95%] w-[95%] rounded-[8px] m-auto shadow-md shadow-[#00000040]">
      <section className="vetting-header-section w-full">
        <div className=" w-full flex justify-between md:w-[50%] m-auto">
          <div
            className={
              activeTab === "Talent"
                ? "user-active text-[#2596BE] border-b-[3px] border-[#2596BE]"
                : "user-talent cursor-pointer"
            }
            onClick={() => handleActiveTabChange("Talent")}>
            <h3 className="font-bold text-[18px]">Talent</h3>
          </div>
          <div
            className={
              activeTab === "employer"
                ? "user-active text-[#2596BE] border-b-[3px] border-[#2596BE]"
                : "user-talent  cursor-pointer"
            }
            onClick={() => handleActiveTabChange("employer")}>
            <h3 className="font-bold text-[18px]">Employer</h3>
          </div>
        </div>
      </section>
      <section className="vetting-contents">
        {activeTab === "Talent" && <NewTalents />}
        {activeTab === "employer" && <NewEmployers />}
      </section>
    </div>
  );
};

export default NewUsers;
