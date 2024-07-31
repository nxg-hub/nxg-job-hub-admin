import React, { useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import Select, { components } from "react-select";
import EmployerCard from "./EmployerCard";
import { userrelevance } from "../../../../utils/data/tech-talent";
import { useNavigate } from "react-router-dom";

const Jobmanagement = () => {
  const navigate = useNavigate();
  const [selectedRelevance, setSelectedRelevance] = useState([]);
  const [activeTab, setActiveTab] = useState("employer");
  const handleActiveTabChange = (tab) => {
    setActiveTab(tab);
  };
  const CheckboxOption = (props) => (
    <div>
      <components.Option {...props} className="check-section">
        <input
          type="checkbox"
          className="dash-checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />
        <label className="label-option">{props.label}</label>
      </components.Option>
    </div>
  );

  const relevanceOptions = userrelevance.map((relevanceType) => ({
    value: relevanceType,
    label: relevanceType,
  }));
  const handleMultiSelectRelevance = (selectedOptions) => {
    setSelectedRelevance(selectedOptions);
  };

  return (
    <>
      <section className="header-section">
        <div className="user-types">
          <div
            className={
              activeTab === "employer" ? "user-active " : "user-talent pl-[15%]"
            }
            onClick={() => handleActiveTabChange("employer")}>
            <h3 className="">Employer</h3>
          </div>
          {/* <div
            className={activeTab === "agent" ? "user-active" : "user-talent"}
            onClick={() => handleActiveTabChange("agent")}>
            <h3>Agent</h3>
          </div> */}
        </div>
        <div className="admin-search">
          <input type="search" placeholder="Search" />
          <MdOutlineSearch style={{ fontSize: "1.2rem" }} />
        </div>

        <div className="admin-relevance gap-2 ">
          <div className="w-[150px] rounded-[8px] border-2 border-black z-10 bg-white">
            <button
              onClick={() => {
                navigate("/jobmanagement/postjob");
              }}
              className="text-center p-2">
              Post Job
            </button>
          </div>
          <label className="sort w-[40px]">sort by</label>
          <Select
            options={relevanceOptions}
            components={{ Option: CheckboxOption }}
            onChange={handleMultiSelectRelevance}
            value={selectedRelevance}
            className="relevance-select"
            placeholder="Relevance"
          />
        </div>
      </section>
      <section className="users-details">
        {activeTab === "employer" && <EmployerCard />}
        {/* {activeTab === "agent" && (
          <AgentJobCard jobManagementData={jobManagementData} />
        )} */}
      </section>
    </>
  );
};

export default Jobmanagement;
