// import React, { useState } from "react";
// import NewTalents from "./components/NewTalents";
// import NewEmployers from "./components/NewEmployers";

// const NewUsers = () => {
//   const [activeTab, setActiveTab] = useState("Talent");
//   const handleActiveTabChange = (tab) => {
//     setActiveTab(tab);
//   };
//   return (
//     <div className="vetting h-[95%] w-[95%]  rounded-[8px] m-auto shadow-md shadow-[#00000040]">
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
//         </div>
//       </section>
//       <section className="">
//         {activeTab === "Talent" && <NewTalents />}
//         {activeTab === "employer" && <NewEmployers />}
//       </section>
//     </div>
//   );
// };

// export default NewUsers;

import React, { useState } from "react";
import NewTalents from "./components/NewTalents";
import NewEmployers from "./components/NewEmployers";
import NewServiceProviders from "./components/NewServiceProviders";

const TABS = [
  { key: "Talent", label: "Talent" },
  { key: "Employer", label: "Employer" },
  { key: "Provider", label: "Provider" },
];

const NewUsers = () => {
  const [activeTab, setActiveTab] = useState("Talent");

  return (
    <div className="vetting w-[95%] h-[95%] m-auto rounded-lg shadow-md shadow-black/25 bg-white flex flex-col">
      {/* ---- HEADER TABS ---- */}
      <section className="border-b bg-gray-50 rounded-t-lg">
        <div className="w-full md:w-[50%] m-auto flex justify-center gap-10 py-4">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-2 text-lg font-semibold relative transition-all
                ${
                  activeTab === tab.key
                    ? "text-[#2596BE]"
                    : "text-gray-600 hover:text-[#2596BE]"
                }
              `}>
              {tab.label}

              {/* Active underline */}
              {activeTab === tab.key && (
                <span className="absolute left-0 right-0 -bottom-1 h-[3px] bg-[#2596BE] rounded-full animate-[fadeIn_0.2s]"></span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* ---- CONTENT ---- */}
      <section className="flex-1 overflow-auto p-4">
        {activeTab === "Talent" && <NewTalents />}
        {activeTab === "Employer" && <NewEmployers />}
        {activeTab === "Provider" && <NewServiceProviders />}
      </section>
    </div>
  );
};

export default NewUsers;
