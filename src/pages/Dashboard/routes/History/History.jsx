// import React, { useEffect, useState } from "react";
// import AccountApprovalHistory from "./component/AccountApprovalHistory";
// import JobApprovalHistory from "./component/JobApprovalHistory";

// const History = () => {
//   const [activeTab, setActiveTab] = useState("Account");
//   const handleActiveTabChange = (tab) => {
//     setActiveTab(tab);
//   };
//   return (
//     <div className="vetting h-[95%] w-[100%] rounded-[8px] m-auto shadow-md shadow-[#00000040]">
//       <section className="vetting-header-section w-full">
//         <div className=" w-full flex justify-between md:w-[50%] m-auto">
//           <div
//             className={
//               activeTab === "Account"
//                 ? "user-active text-[#2596BE] border-b-[3px] border-[#2596BE]"
//                 : "user-talent cursor-pointer"
//             }
//             onClick={() => handleActiveTabChange("Account")}>
//             <h3 className="font-bold text-[18px]">Account History</h3>
//           </div>
//           <div
//             className={
//               activeTab === "Job"
//                 ? "user-active text-[#2596BE] border-b-[3px] border-[#2596BE]"
//                 : "user-talent  cursor-pointer"
//             }
//             onClick={() => handleActiveTabChange("Job")}>
//             <h3 className="font-bold text-[18px]">Job History</h3>
//           </div>
//         </div>
//       </section>
//       <section className=" w-full">
//         {activeTab === "Account" && <AccountApprovalHistory />}
//         {activeTab === "Job" && <JobApprovalHistory />}
//       </section>
//     </div>
//   );
// };

// export default History;

import React, { useState } from "react";
import AccountApprovalHistory from "./component/AccountApprovalHistory";
import JobApprovalHistory from "./component/JobApprovalHistory";

const History = () => {
  const [activeTab, setActiveTab] = useState("Account");

  const tabClasses = (tab) =>
    `px-4 py-3 text-sm font-semibold cursor-pointer transition-all ${
      activeTab === tab
        ? "text-[#2596BE] border-b-4 border-[#2596BE]"
        : "text-gray-500 hover:text-[#2596BE]"
    }`;

  return (
    <div className="vetting  w-full rounded-xl bg-white shadow-md h-screen shadow-[#00000020] p-4">
      {/* Tabs */}
      <div className="flex justify-center mb-6 border-b border-gray-200">
        <div className="flex gap-10">
          <div
            className={tabClasses("Account")}
            onClick={() => setActiveTab("Account")}>
            Account History
          </div>
          <div
            className={tabClasses("Job")}
            onClick={() => setActiveTab("Job")}>
            Job History
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-2">
        {activeTab === "Account" && <AccountApprovalHistory />}
        {activeTab === "Job" && <JobApprovalHistory />}
      </div>
    </div>
  );
};

export default History;
