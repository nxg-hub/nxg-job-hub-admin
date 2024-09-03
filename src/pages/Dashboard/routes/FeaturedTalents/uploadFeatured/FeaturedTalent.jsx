// import React from "react";
// import "./FeaturedTalent.scss";
// import { TalentProfile } from "./Data";
// import icon from "../../../../static/icons/mi_filter.svg";
// import "./FeaturedTalent.scss";

// function FeaturedTalent() {
//   return (
//     <div className="featured-talents-list container">
//       <h2>Featured Talents</h2>
//       <div className="talent-list">
//         <div className="talentText">
//           <div className="text">
//             <h4>Tech Talents</h4>
//             <h4>Frontend Developer</h4>
//           </div>
//           <div className="icon">
//             <img src={icon} alt="" />
//           </div>
//         </div>
//         {TalentProfile.map((talent) => (
//           <div key={talent.id} className="talent-item">
//             <div className="talent-info">
//               {" "}
//               <img
//                 src={talent.picture}
//                 alt="talentPicture"
//                 className="profile-pic"
//               />
//               <div className="detail">
//                 <h3>{talent.name}</h3>
//                 <h3>{talent.title}</h3>
//               </div>
//             </div>
//             <div className="view-button" to="/">
//               View
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="addbutton">
//         <div className="add-talent">+ Add Talent</div>
//       </div>
//     </div>
//   );
// }

// export default FeaturedTalent;

import React, { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import icon from "../../../../../static/icons/mi_filter.svg";

const FeaturedTalent = ({ talents, onAddTalentClick }) => {
  const [selectedTalent, setSelectedTalent] = useState(null);

  const handleViewClick = (talent) => {
    setSelectedTalent(talent);
  };

  return (
    <div className="featured-talents-list container">
      <h2>Featured Talents</h2>
      <div className="talent-list">
        <div className="talentText">
          <div className="text">
            <h4>Tech Talents</h4>
            <h4>Frontend Developer</h4>
          </div>
          <div className="icon">
            <img src={icon} alt="" />
          </div>
        </div>
        {talents.map((talent) => (
          <div key={talent.id} className="talent-item">
            <div className="talent-info">
              <img
                src={talent.talentProfilePic}
                alt="talentPicture"
                className="profile-pic"
              />
              <div className="detail">
                <h3>{talent.talentName}</h3>
                <h3>{talent.talentTitle}</h3>
              </div>
            </div>
            <div
              className="view-button"
              onClick={() => handleViewClick(talent)}
            >
              View
            </div>
          </div>
        ))}
      </div>
      <div className="addbutton">
        <div className="add-talent" onClick={onAddTalentClick}>
          + Add Talent
        </div>
      </div>
      {selectedTalent && (
        <div className="talent-detail">
          <h3>{selectedTalent.talentName}</h3>
          <h4>{selectedTalent.talentTitle}</h4> {/* Adjust if necessary */}
          <img src={selectedTalent.talentProfilePic} alt="Talent" />
          <a
            href={selectedTalent.talentResume}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resume
          </a>
        </div>
      )}
    </div>
  );
};

// Define prop types
FeaturedTalent.propTypes = {
  talents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      talentName: PropTypes.string,
      talentProfilePic: PropTypes.string,
      talentResume: PropTypes.string,
      talentTitle: PropTypes.string, // If this field is available, otherwise adjust accordingly
    })
  ).isRequired,
  onAddTalentClick: PropTypes.func.isRequired,
};

export default FeaturedTalent;
