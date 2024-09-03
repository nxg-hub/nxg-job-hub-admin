import React, { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import uploadLogo from "../../../../../static/icons/Vector.png";
import arrow from "../../../../../static/icons/Arrow 15.png";
// import "../FeaturedTalent.scss";
import FileUploader from "./FileUploader";

const UploadTalent = ({ onSubmit }) => {
  const [talentName, setTalentName] = useState("");
  const [talentTitle, setTalentTitle] = useState("");
  //   const [pictureFile, setPictureFile] = useState(null);
  //   const [resumeFile, setResumeFile] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      name: talentName,
      title: talentTitle,
      //   picture: pictureFile,
      //   resume: resumeFile,
    });
  };

  return (
    <div className="post-featured-talents container">
      <h2>
        <b>Add Featured Talent</b>
      </h2>
      <form className="talentInfor" onSubmit={handleSubmit}>
        <div className="talentName">
          <label htmlFor="talent-name">
            <b>Talent Name:</b>
          </label>
          <input
            className="NameInput"
            type="text"
            value={talentName}
            onChange={(e) => setTalentName(e.target.value)}
          />
        </div>
        <div className="talentName">
          <label htmlFor="talent-title">
            <b>Talent Title:</b>
          </label>
          <input
            className="NameInput"
            type="text"
            value={talentTitle}
            onChange={(e) => setTalentTitle(e.target.value)}
          />
        </div>

        <div className="uploadfile">
          <div className="photo-upload" style={{ margin: ".7rem 0" }}>
            <FileUploader
              title="Upload your passport"
              onFileSelectSuccess={(file) => file} // Pass the success callback function
              onFileSelectError={({ error }) => alert(error)}
            />
          </div>
          <div className="resume">
            <FileUploader
              title="Upload your Resume / CV"
              onFileSelectSuccess={(file) => file}
              onFileSelectError={({ error }) => alert(error)}
            />
          </div>
        </div>

        <div className="uploadButton">
          <button type="submit">Upload</button>
        </div>
      </form>
      <div className="arrow">
        <div className="arrowImg">
          <img src={arrow} alt="" />
        </div>
        <h4>
          <b>Back</b>
        </h4>
      </div>
    </div>
  );
};

// Define prop types
UploadTalent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default UploadTalent;
