import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../../../static/icons/wheel.svg";
import {
  usersToVet,
  vettedUsers,
} from "../AdminOverview/usersdetails/usersdetails";
import "./vetting.scss";
import Talents from "./vettingComponents/Talents";
import Employer from "./vettingComponents/Employer";
// import Agent from "./vettingComponents/Agent";

export default function Vetting() {
  const [activeTab, setActiveTab] = useState("Talent");
  const handleActiveTabChange = (tab) => {
    setActiveTab(tab);
  };
  const navigate = useNavigate();

  const handleReview = (id) => {
    navigate(`../review-talent/${id}`);
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
          {/* <div
            className={
              activeTab === "agent"
                ? "user-active text-[#2596BE] border-b-[3px] border-[#2596BE]"
                : "user-talent  cursor-pointer"
            }
            onClick={() => handleActiveTabChange("agent")}>
            <h3 className="font-bold text-[18px]">Agent</h3>
          </div> */}
        </div>
      </section>
      <section className="vetting-contents">
        {activeTab === "Talent" && (
          <Talents
            usersToVet={usersToVet}
            vettedUsers={vettedUsers}
            handleReview={handleReview}
          />
        )}
        {activeTab === "employer" && (
          <>
            <Employer
              usersToVet={usersToVet}
              vettedUsers={vettedUsers}
              handleReview={handleReview}
            />
          </>
        )}

        {/* {activeTab === "agent" && (
          <Agent
            usersToVet={usersToVet}
            vettedUsers={vettedUsers} 
            handleReview={handleReview}
          />
        )} */}
      </section>
    </div>
  );
}
