// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./vetting.scss";
// import Talents from "./vettingComponents/Talents";
// import Employer from "./vettingComponents/Employer";
// // import Agent from "./vettingComponents/Agent";

// export default function Vetting() {
//   const [activeTab, setActiveTab] = useState("Talent");
//   const handleActiveTabChange = (tab) => {
//     setActiveTab(tab);
//   };
//   const navigate = useNavigate();

//   const handleReview = (id) => {
//     navigate(`../review-talent/${id}`);
//   };
//   return (
//     <div className="vetting h-[95%] w-[95%] rounded-[8px] m-auto shadow-md shadow-[#00000040]">
//       <section className="vetting-header-section w-full">
//         <div className=" w-full flex justify-between md:w-[50%] m-auto">
//           <div
//             className={
//               activeTab === "Talent"
//                 ? "user-active text-[#2596BE] border-b-[3px] border-[#2596BE]"
//                 : "user-talent cursor-pointer"
//             }
//             onClick={() => handleActiveTabChange("Talent")}>
//             <h3 className="font-bold text-[18px]">Talent</h3>
//           </div>
//           <div
//             className={
//               activeTab === "employer"
//                 ? "user-active text-[#2596BE] border-b-[3px] border-[#2596BE]"
//                 : "user-talent  cursor-pointer"
//             }
//             onClick={() => handleActiveTabChange("employer")}>
//             <h3 className="font-bold text-[18px]">Employer</h3>
//           </div>
//           {/* <div
//             className={
//               activeTab === "agent"
//                 ? "user-active text-[#2596BE] border-b-[3px] border-[#2596BE]"
//                 : "user-talent  cursor-pointer"
//             }
//             onClick={() => handleActiveTabChange("agent")}>
//             <h3 className="font-bold text-[18px]">Agent</h3>
//           </div> */}
//         </div>
//       </section>
//       <section className="vetting-contents">
//         {activeTab === "Talent" && <Talents handleReview={handleReview} />}
//         {activeTab === "employer" && (
//           <>
//             <Employer handleReview={handleReview} />
//           </>
//         )}

//         {/* {activeTab === "agent" && (
//           <Agent
//             usersToVet={usersToVet}
//             vettedUsers={vettedUsers}
//             handleReview={handleReview}
//           />
//         )} */}
//       </section>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Talents from "./vettingComponents/Talents";
import Employer from "./vettingComponents/Employer";
import ServiceProvider from "./vettingComponents/ServiceProvider";

export default function Vetting() {
  const [activeTab, setActiveTab] = useState("Talent");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleReview = (id) => {
    navigate(`../review-talent/${id}`);
  };

  const tabs = [
    { name: "Talent", label: "Talent" },
    { name: "Employer", label: "Employer" },
    { name: "Service Provider", label: "Service Provider" },
  ];

  return (
    <div className="vetting mx-auto my-6 w-full md:w-11/12 rounded-xl shadow-lg bg-white">
      {/* Header Tabs */}
      <div className="flex justify-center md:justify-start border-b border-gray-200 bg-gray-50 rounded-t-xl">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            onClick={() => {
              setActiveTab(tab.name);
              setSearch(""); // reset search on tab change
            }}
            className={`cursor-pointer px-6 py-3 font-semibold text-lg transition-all duration-300 ${
              activeTab === tab.name
                ? "text-[#2596BE] border-b-4 border-[#2596BE]"
                : "text-gray-500 hover:text-[#2596BE]"
            }`}>
            {tab.label}
          </div>
        ))}
      </div>

      {/* Search bar */}
      <div className="px-6 py-4 bg-white border-b border-gray-100">
        <input
          type="text"
          placeholder={`Search ${activeTab}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 bg-gray-100 text-sm px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2596BE]"
        />
      </div>

      {/* Content */}
      <div className="vetting-content p-6 max-h-[75vh] overflow-y-auto">
        {activeTab === "Talent" && (
          <Talents searchTerm={search} handleReview={handleReview} />
        )}

        {activeTab === "Employer" && (
          <Employer searchTerm={search} handleReview={handleReview} />
        )}
        {activeTab === "Service Provider" && (
          <ServiceProvider searchTerm={search} handleReview={handleReview} />
        )}
      </div>
    </div>
  );
}
