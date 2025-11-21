import React, { useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import Select, { components } from "react-select";
import EmployerCard from "./EmployerCard";
import { userrelevance } from "../../../../utils/data/tech-talent";
import { useNavigate } from "react-router-dom";

const Jobmanagement = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [activeTab, setActiveTab] = useState("employer");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="w-full space-y-6 h-screen overflow-y-scroll">
      {/* ✅ HEADER SECTION */}
      <section className="bg-white shadow-sm rounded-xl p-6  gap-6">
        {/* ✅ Tabs */}
        <div className="flex gap-6">
          {/* EMPLOYER TAB */}
          {/* <button
            onClick={() => setActiveTab("employer")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${
                activeTab === "employer"
                  ? "bg-[#2596be] text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }
            `}>
            Employers
          </button> */}

          {/* FUTURE TABS IF NEEDED */}
          {/* <button
            onClick={() => setActiveTab("agent")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${
                activeTab === "agent"
                  ? "bg-[#2596be] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }
            `}
          >
            Agents
          </button> */}
        </div>

        {/* ✅ Search + Post Job Section */}
        <div className="flex  items-center gap-4 md:w-[100%]">
          {/* SEARCH */}
          <div className="flex items-center bg-gray-100 rounded-lg px-3 md:w-[60%] py-2 w-[240px]">
            <MdOutlineSearch className="text-gray-500 text-lg" />
            <input
              type="search"
              placeholder="Search by jobtitle or company name"
              onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              className="w-full bg-transparent outline-none ml-2"
            />
          </div>

          {/* POST JOB BUTTON */}
          <button
            onClick={() => navigate("/jobmanagement/postjob")}
            className="px-5 py-2 bg-[#2596be] text-white w-[250px] rounded-lg font-medium shadow hover:bg-[#1e7fa0]">
            Post Job
          </button>

          {/* JOB STATUS FILTER */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border bg-white shadow-sm outline-none text-sm">
            <option value="ALL">All Jobs</option>
            <option value="PENDING">Pending</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="REJECTED">Rejected</option>
            <option value="SUSPENDED">Suspended</option>
          </select>
        </div>
      </section>

      {/* ✅ CONTENT SECTION */}
      <section className="pt-4">
        {activeTab === "employer" && (
          <EmployerCard searchTerm={searchTerm} statusFilter={statusFilter} />
        )}

        {/* {activeTab === "agent" && <AgentCard />} */}
      </section>
    </div>
  );
};

export default Jobmanagement;
