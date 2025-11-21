// import React, { useEffect, useState } from "react";
// import { MdOutlineSearch } from "react-icons/md";
// import Select, { components } from "react-select";
// import { userrelevance } from "../../../../utils/data/tech-talent";
// import { useNavigate } from "react-router-dom";
// import TalentProfileCard from "./usersdetails/TalentProfileCard";
// import EmployerProfileCard from "./usersdetails/EmployerProfileCard";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEmployer } from "../../../../Redux/EmployerSlice";
// import ServiceProvider from "./usersdetails/ServiceProvider";
// import { fetchProvider } from "../../../../Redux/ServiceProviderSlice";

// const AdminOverview = () => {
//   const [selectedRelevance, setSelectedRelevance] = useState();
//   const dispatch = useDispatch();
//   const [activeTab, setActiveTab] = useState("talent");
//   const [searchTerm, setSearchTerm] = useState("");
//   const success = useSelector((state) => state.EmployerSlice.success);
//   const handleActiveTabChange = (tab) => {
//     setActiveTab(tab);
//   };
//   const navigate = useNavigate();
//   // const handleClickNewAccount = (data, id) => {
//   //   data === "New account" ? navigate(`/newaccount/${id}`) : null;
//   // };
//   const CheckboxOption = (props) => (
//     <div>
//       <components.Option {...props} className="check-section">
//         <input
//           type="checkbox"
//           className="dash-checkbox"
//           checked={props.isSelected}
//           onChange={() => null}
//         />
//         <label className="label-option">{props.label}</label>
//       </components.Option>
//     </div>
//   );

//   const relevanceOptions = userrelevance.map((relevanceType) => ({
//     value: relevanceType,
//     label: relevanceType,
//   }));
//   const handleMultiSelectRelevance = (selectedOptions) => {
//     setSelectedRelevance(selectedOptions);
//   };

//   useEffect(() => {
//     if (activeTab === "employer")
//       if (success) {
//         return;
//       }
//     //fetching employers and displaying them on the ui
//     dispatch(fetchEmployer("/api/v1/admin/employer?page=0&size=1000"));
//   }, []);

//   // useEffect(() => {
//   //   // if (activeTab === "provider")
//   //   //   //fetching employers and displaying them on the ui
//   //   //   dispatch(fetchProvider("/api/v1/admin/employer?page=0&size=1000"));
//   // }, []);
//   return (
//     <>
//       <section className="header-section">
//         <div className="user-types">
//           <div
//             className={activeTab === "talent" ? "user-active" : "user-talent"}
//             onClick={() => handleActiveTabChange("talent")}>
//             <h3>Talent</h3>
//           </div>
//           <div
//             className={activeTab === "employer" ? "user-active" : "user-talent"}
//             onClick={() => handleActiveTabChange("employer")}>
//             <h3>Employer</h3>
//           </div>
//           <div
//             className={activeTab === "provider" ? "user-active" : "user-talent"}
//             onClick={() => handleActiveTabChange("provider")}>
//             <h3>Service Provider</h3>
//           </div>
//         </div>
//         <div className="admin-search">
//           <input
//             onChange={(e) => {
//               setSearchTerm(e.target.value.toLowerCase());
//             }}
//             type="search"
//             placeholder="Search"
//           />
//           <MdOutlineSearch style={{ fontSize: "1.2rem" }} />
//         </div>

//         {/* <div className="admin-relevance">
//           <label className="sort">sort by</label>
//           <Select
//             options={relevanceOptions}
//             // isMulti
//             components={{ Option: CheckboxOption }}
//             onChange={handleMultiSelectRelevance}
//             value={selectedRelevance}
//             className="relevance-select"
//             placeholder="Relevance"
//           />
//         </div> */}
//       </section>
//       <section className="users-details">
//         {activeTab === "talent" && (
//           <TalentProfileCard
//             searchTerm={searchTerm}
//             // handleClickNewAccount={handleClickNewAccount}
//           />
//         )}
//         {activeTab === "employer" && (
//           <EmployerProfileCard
//           // handleClickNewAccount={handleClickNewAccount}
//           />
//         )}
//         {activeTab === "provider" && (
//           <ServiceProvider
//           // handleClickNewAccount={handleClickNewAccount}
//           />
//         )}
//       </section>
//     </>
//   );
// };

// export default AdminOverview;

import React, { useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import TalentProfileCard from "./usersdetails/TalentProfileCard";
import EmployerProfileCard from "./usersdetails/EmployerProfileCard";
import ServiceProvider from "./usersdetails/ServiceProvider";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployer } from "../../../../Redux/EmployerSlice";
import { fetchTalent } from "../../../../Redux/TalentSlice";

const AdminOverview = () => {
  const [activeTab, setActiveTab] = useState("talent");
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const success = useSelector((state) => state.EmployerSlice.success);
  const successt = useSelector((state) => state.TalentSlice.success);
  const [page, setPage] = useState(0);
  const size = 10000;
  useEffect(() => {
    if (activeTab === "talent") {
      if (!successt) dispatch(fetchTalent({ page, size }));
    }
  }, [page]);
  // Fetch Employers on load
  useEffect(() => {
    if (activeTab === "employer") {
      if (!success) {
        dispatch(fetchEmployer({ page: 0, size: 10000 }));
      }
    }
  }, []);

  return (
    <>
      <section className="w-full bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        {/* TOP BAR */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* TABS */}
          <div className="flex space-x-4">
            {["talent", "employer", "provider"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-4 py-2 rounded-lg font-medium capitalize transition-all 
                  ${
                    activeTab === tab
                      ? "bg-[#2596be] text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }
                `}>
                {tab === "provider" ? "Service Provider" : tab}
              </button>
            ))}
          </div>

          {/* SEARCH BOX */}
          <div className="relative w-full md:w-64">
            <input
              type="search"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-100 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-300 outline-none"
              onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            />
            <MdOutlineSearch className="absolute left-3 top-2.5 text-gray-500 text-xl" />
          </div>
        </div>
      </section>

      {/* CONTENT AREA */}
      <section className="mt-6">
        {activeTab === "talent" && (
          <TalentProfileCard searchTerm={searchTerm} />
        )}
        {activeTab === "employer" && (
          <EmployerProfileCard searchTerm={searchTerm} />
        )}
        {activeTab === "provider" && (
          <ServiceProvider searchTerm={searchTerm} />
        )}
      </section>
    </>
  );
};

export default AdminOverview;
