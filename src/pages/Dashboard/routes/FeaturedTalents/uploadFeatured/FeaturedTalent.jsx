// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import icon from "../../../../../static/icons/mi_filter.svg";
// import avatar from "../../../../../static/images/userIcon.png";

// const FeaturedTalent = ({ talents, onAddTalentClick }) => {
//   const [selectedTalentId, setSelectedTalentId] = useState(null);
//   const [filterVisible, setFilterVisible] = useState(false);
//   const [selectedTechStack, setSelectedTechStack] = useState("All");

//   const handleViewClick = (talentId) => {
//     setSelectedTalentId((prev) => (prev === talentId ? null : talentId));
//   };

//   const toggleFilterVisibility = () => {
//     setFilterVisible((prev) => !prev);
//   };

//   const uniqueTechStacks = [
//     "All",
//     ...new Set(talents.map((t) => t.talentTechStack)),
//   ];

//   const handleTechStackSelect = (tech) => {
//     setSelectedTechStack(tech);
//     setFilterVisible(false);
//   };

//   const filteredTalents =
//     selectedTechStack === "All"
//       ? talents
//       : talents.filter((t) => t.talentTechStack === selectedTechStack);

//   return (
//     <div className="w-full p-4">
//       <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-5 h-[600px] overflow-y-scroll">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 classname="text-xl font-bold">Featured Talents</h2>

//           {/* Filter button */}
//           <div
//             className="flex items-center gap-2 cursor-pointer bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 transition"
//             onClick={toggleFilterVisibility}>
//             <span className="font-semibold text-sm">Filter</span>
//             <img src={icon} alt="Filter" className="w-4" />
//           </div>
//         </div>

//         {/* Selected Tag */}
//         <div className="text-sm text-gray-600 mb-3">
//           Showing: <span className="font-semibold">{selectedTechStack}</span>
//         </div>

//         {/* Dropdown filter */}
//         {filterVisible && (
//           <div className="bg-gray-100 rounded-lg p-3 mb-4 shadow-inner">
//             {uniqueTechStacks.map((tech) => (
//               <div
//                 key={tech}
//                 className="flex items-center gap-2 py-1 cursor-pointer hover:text-blue-600">
//                 <input
//                   type="radio"
//                   name="techStack"
//                   checked={selectedTechStack === tech}
//                   onChange={() => handleTechStackSelect(tech)}
//                 />
//                 <label className="cursor-pointer">{tech}</label>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Talent list */}
//         <div className="space-y-3 ">
//           {filteredTalents.map((talent) => (
//             <div
//               key={talent.id}
//               className="border rounded-lg p-4 shadow-sm bg-gray-50 hover:bg-gray-100 transition ">
//               <div className="flex justify-between items-center">
//                 {/* Talent info */}
//                 <div className="flex items-center gap-3">
//                   <img
//                     src={talent.talentProfilePic || avatar}
//                     alt="Talent"
//                     className="w-12 h-12 rounded-full object-cover border"
//                   />
//                   <div>
//                     <h3 className="font-bold text-lg">{talent.talentName}</h3>
//                     <p className="text-gray-600 text-sm">
//                       {talent.talentTechStack}
//                     </p>
//                   </div>
//                 </div>

//                 {/* View button */}
//                 <button
//                   onClick={() => handleViewClick(talent.id)}
//                   className="text-blue-600 font-semibold hover:underline">
//                   {selectedTalentId === talent.id ? "Hide" : "View"}
//                 </button>
//               </div>

//               {/* Expand section */}
//               {selectedTalentId === talent.id && (
//                 <div className="mt-4 bg-white p-4 rounded-lg shadow-md text-center">
//                   <img
//                     src={talent.talentProfilePic}
//                     alt="Talent"
//                     className="w-28 h-28 rounded-full object-cover mx-auto border mb-3"
//                   />

//                   <h3 className="font-bold text-xl">{talent.talentName}</h3>
//                   <p className="text-gray-600 mb-3">{talent.talentTechStack}</p>

//                   <a
//                     href={talent.talentResume}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-[#2596be] text-white px-4 py-2 rounded-lg text-sm transition inline-block">
//                     View Resume
//                   </a>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Add Talent */}
//         <div className="mt-6 flex justify-center">
//           <button
//             onClick={onAddTalentClick}
//             className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition">
//             + Add Talent
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// FeaturedTalent.propTypes = {
//   talents: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       talentName: PropTypes.string,
//       talentProfilePic: PropTypes.string,
//       talentResume: PropTypes.string,
//       talentTechStack: PropTypes.string,
//     })
//   ).isRequired,
//   onAddTalentClick: PropTypes.func.isRequired,
// };

// export default FeaturedTalent;

import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import icon from "../../../../../static/icons/mi_filter.svg";
import avatar from "../../../../../static/images/userIcon.png";

const FeaturedTalent = ({ talents, onAddTalentClick }) => {
  const [selectedTalentId, setSelectedTalentId] = useState(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedTechStack, setSelectedTechStack] = useState("All");

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    setSelectedTalentId(null); // collapse any open card on page change
  };

  const handleViewClick = (talentId) => {
    setSelectedTalentId((prev) => (prev === talentId ? null : talentId));
  };

  const uniqueTechStacks = [
    "All",
    ...new Set(talents.map((t) => t.talentTechStack)),
  ];

  const handleTechStackSelect = (tech) => {
    setSelectedTechStack(tech);
    setFilterVisible(false);
    setCurrentPage(0); // reset pagination on filter
  };

  const filteredTalents =
    selectedTechStack === "All"
      ? talents
      : talents.filter((t) => t.talentTechStack === selectedTechStack);

  const pageCount = Math.ceil(filteredTalents.length / itemsPerPage);
  const paginatedTalents = filteredTalents.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <div className="w-full p-4">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-5 h-[600px] overflow-y-scroll">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Featured Talents</h2>

          <div
            className="flex items-center gap-2 cursor-pointer bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 transition"
            onClick={() => setFilterVisible(!filterVisible)}>
            <span className="font-semibold text-sm">Filter</span>
            <img src={icon} alt="Filter" className="w-4" />
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-3">
          Showing: <span className="font-semibold">{selectedTechStack}</span>
        </div>

        {filterVisible && (
          <div className="bg-gray-100 rounded-lg p-3 mb-4 shadow-inner">
            {uniqueTechStacks.map((tech) => (
              <div
                key={tech}
                className="flex items-center gap-2 py-1 cursor-pointer hover:text-blue-600">
                <input
                  type="radio"
                  name="techStack"
                  checked={selectedTechStack === tech}
                  onChange={() => handleTechStackSelect(tech)}
                />
                <label>{tech}</label>
              </div>
            ))}
          </div>
        )}

        {/* Talent list */}
        <div className="space-y-3">
          {paginatedTalents.map((talent) => (
            <div
              key={talent.id}
              className="border rounded-lg p-4 shadow-sm bg-gray-50 hover:bg-gray-100 transition">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img
                    src={talent.talentProfilePic || avatar}
                    alt="Talent"
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{talent.talentName}</h3>
                    <p className="text-gray-600 text-sm">
                      {talent.talentTechStack}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleViewClick(talent.id)}
                  className="text-blue-600 font-semibold hover:underline">
                  {selectedTalentId === talent.id ? "Hide" : "View"}
                </button>
              </div>

              {selectedTalentId === talent.id && (
                <div className="mt-4 bg-white p-4 rounded-lg shadow-md text-center">
                  <img
                    src={talent.talentProfilePic}
                    alt="Talent"
                    className="w-28 h-28 rounded-full object-cover mx-auto border mb-3"
                  />

                  <h3 className="font-bold text-xl">{talent.talentName}</h3>
                  <p className="text-gray-600 mb-3">{talent.talentTechStack}</p>

                  <a
                    href={talent.talentResume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#2596be] text-white px-4 py-2 rounded-lg text-sm inline-block">
                    View Resume
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-4">
          <ReactPaginate
            previousLabel={"← Prev"}
            nextLabel={"Next →"}
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName={"flex justify-center gap-2 mt-3"}
            pageClassName={"px-3 py-1 border rounded cursor-pointer"}
            activeClassName={"bg-[#2596be]  text-white"}
            previousClassName={"px-3 py-1 border rounded cursor-pointer"}
            nextClassName={"px-3 py-1 border rounded cursor-pointer"}
            disabledClassName={"opacity-40 cursor-not-allowed"}
          />
        </div>

        {/* Add Talent */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onAddTalentClick}
            className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition">
            + Add Talent
          </button>
        </div>
      </div>
    </div>
  );
};

FeaturedTalent.propTypes = {
  talents: PropTypes.array.isRequired,
  onAddTalentClick: PropTypes.func.isRequired,
};

export default FeaturedTalent;
