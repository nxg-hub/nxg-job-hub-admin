import React, { useState } from "react";
import PropTypes from "prop-types";
import icon from "../../../../../static/icons/mi_filter.svg";

const talentTechStacks = [
  "All",
  "Frontend Developer",
  "UI/UX Designer",
  "Backend Developer",
  "Project Manager",
  "Data Analyst",
  "Business Analyst",
  "Scrum Master",
  "Others",
];

const FeaturedTalent = ({ talents, onAddTalentClick }) => {
  const [selectedTalentId, setSelectedTalentId] = useState(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedTechStack, setSelectedTechStack] = useState("All");

  const handleViewClick = (talentId) => {
    setSelectedTalentId((prevId) => (prevId === talentId ? null : talentId));
  };

  const toggleFilterVisibility = () => {
    setFilterVisible(!filterVisible);
  };

  const handleTechStackSelect = (techStack) => {
    setSelectedTechStack(techStack);
    setFilterVisible(false);
  };

  const filteredTalents =
    selectedTechStack === "All"
      ? talents
      : talents.filter(
          (talent) => talent.talentTechStack === selectedTechStack
        );

  return (
    <div className="featured-talents-list container-featured">
      <h2>Featured Talents</h2>
      <div className="talent-list">
        <div className="talentText">
          <div className="text">
            <h4>
              <b>Tech Talents</b>
            </h4>
            <h4>{selectedTechStack}</h4>
          </div>
          <div className="icon filter-icon" onClick={toggleFilterVisibility}>
            <h3>
              <b>Filter</b>
            </h3>
            <img src={icon} alt="" />
          </div>
        </div>
        {filterVisible && (
          <div className="filter-dropdown">
            {talentTechStacks.map((techStack) => (
              <div key={techStack} className="filter-item">
                <input
                  type="checkbox"
                  id={techStack}
                  name={techStack}
                  checked={selectedTechStack === techStack}
                  onChange={() => handleTechStackSelect(techStack)}
                />
                <label htmlFor={techStack}>{techStack}</label>
              </div>
            ))}
          </div>
        )}

        {filteredTalents.map((talent) => (
          <div key={talent.id} className="talent-item">
            <div className="talent-row">
              <div className="talent-info">
                <img
                  src={talent.talentProfilePic}
                  alt="talentPicture"
                  className="profile-pic"
                />
                <div className="detail">
                  <h3>{talent.talentName}</h3>
                  <h3>{talent.talentTechStack}</h3>
                </div>
              </div>
              <div
                className="view-button"
                onClick={() => handleViewClick(talent.id)}
              >
                View
              </div>
            </div>
            {selectedTalentId === talent.id && (
              <div className="talent-detail">
                <h3>{talent.talentName}</h3>
                <h4>{talent.talentTechStack}</h4>
                <img src={talent.talentProfilePic} alt="Talent" />
                <a
                  href={talent.talentResume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="addbutton">
        <div className="add-talent" onClick={onAddTalentClick}>
          + Add Talent
        </div>
      </div>
    </div>
  );
};

FeaturedTalent.propTypes = {
  talents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      talentName: PropTypes.string,
      talentProfilePic: PropTypes.string,
      talentResume: PropTypes.string,
      talentTechStack: PropTypes.string,
    })
  ).isRequired,
  onAddTalentClick: PropTypes.func.isRequired,
};

export default FeaturedTalent;
