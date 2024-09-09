import React, { useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import Select, { components } from "react-select";
import { userrelevance } from "../../../../utils/data/tech-talent";
import { useNavigate } from "react-router-dom";
import TalentProfileCard from "./usersdetails/TalentProfileCard";
import EmployerProfileCard from "./usersdetails/EmployerProfileCard";

const AdminOverview = () => {
  const [selectedRelevance, setSelectedRelevance] = useState();
  const [activeTab, setActiveTab] = useState("talent");
  const [searchTerm, setSearchTerm] = useState("");

  const handleActiveTabChange = (tab) => {
    setActiveTab(tab);
  };
  const navigate = useNavigate();
  // const handleClickNewAccount = (data, id) => {
  //   data === "New account" ? navigate(`/newaccount/${id}`) : null;
  // };
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
            className={activeTab === "talent" ? "user-active" : "user-talent"}
            onClick={() => handleActiveTabChange("talent")}>
            <h3>Talent</h3>
          </div>
          <div
            className={activeTab === "employer" ? "user-active" : "user-talent"}
            onClick={() => handleActiveTabChange("employer")}>
            <h3>Employer</h3>
          </div>
        </div>
        <div className="admin-search">
          <input
            onChange={(e) => {
              setSearchTerm(e.target.value.toLowerCase());
            }}
            type="search"
            placeholder="Search"
          />
          <MdOutlineSearch style={{ fontSize: "1.2rem" }} />
        </div>

        {/* <div className="admin-relevance">
          <label className="sort">sort by</label>
          <Select
            options={relevanceOptions}
            // isMulti
            components={{ Option: CheckboxOption }}
            onChange={handleMultiSelectRelevance}
            value={selectedRelevance}
            className="relevance-select"
            placeholder="Relevance"
          />
        </div> */}
      </section>
      <section className="users-details">
        {activeTab === "talent" && (
          <TalentProfileCard
            searchTerm={searchTerm}
            // handleClickNewAccount={handleClickNewAccount}
          />
        )}
        {activeTab === "employer" && (
          <EmployerProfileCard
          // handleClickNewAccount={handleClickNewAccount}
          />
        )}
      </section>
    </>
  );
};

export default AdminOverview;
