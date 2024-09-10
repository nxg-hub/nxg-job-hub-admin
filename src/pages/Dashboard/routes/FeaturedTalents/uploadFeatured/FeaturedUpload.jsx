import React, { useState } from "react";
import PropTypes from "prop-types";
import arrow from "../../../../../static/icons/Arrow 15.png";
import { IoMdCloudUpload } from "react-icons/io";

const FeaturedUpload = ({
  onSubmit,
  setPictureFile,
  setResumeFile,
  onBackClick,
}) => {
  const [talentName, setTalentName] = useState("");
  const [talentTechStack, setTalentTechStack] = useState("");
  const [pictureError, setPictureError] = useState("");
  const [resumeError, setResumeError] = useState("");
  const [picturePreview, setPicturePreview] = useState("");
  const [resumePreview, setResumePreview] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name: talentName, techStack: talentTechStack });
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024;

    if (file) {
      if (!allowedTypes.includes(file.type)) {
        setPictureError("Please upload a valid image file (JPEG, PNG).");
        setPictureFile(null);
        setPicturePreview("");
      } else if (file.size > maxSize) {
        setPictureError("File size must be less than 5 MB.");
        setPictureFile(null);
        setPicturePreview("");
      } else {
        setPictureError("");
        setPictureFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
          setPicturePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxSize = 5 * 1024 * 1024;

    if (file) {
      if (!allowedTypes.includes(file.type)) {
        setResumeError("Please upload a valid resume file (PDF, DOC, DOCX).");
        setResumeFile(null);
        setResumePreview("");
      } else if (file.size > maxSize) {
        setResumeError("File size must be less than 5 MB.");
        setResumeFile(null);
        setResumePreview("");
      } else {
        setResumeError("");
        setResumeFile(file);

        setResumePreview(URL.createObjectURL(file));
      }
    }
  };

  return (
    <div className="post-featured-talents post-container">
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
            <b>Talent TechStack:</b>
          </label>
          <input
            className="NameInput"
            type="text"
            value={talentTechStack}
            onChange={(e) => setTalentTechStack(e.target.value)}
          />
        </div>

        <div className="uploadfile">
          <div className="pictureUpload">
            <label>
              <b>Upload Talent Picture:</b>
            </label>
            <div className="upload-container">
              <input
                type="file"
                className="uploadInput"
                accept="image/jpeg, image/png, image/gif"
                onChange={handlePictureChange}
              />
              <div className="text">
                <IoMdCloudUpload className="upload-img" />
                Browse Files Here{" "}
                <span className="subtext">Drag and drop files here</span>
              </div>
              {pictureError && <p className="error-message">{pictureError}</p>}
              {picturePreview && (
                <img
                  src={picturePreview}
                  alt="Talent Preview"
                  className="preview-image small-preview"
                />
              )}{" "}
              {/* Image Preview */}
            </div>
          </div>

          <div className="profileUpload">
            <label className="profName">
              <b>Upload Talent Resume:</b>
            </label>
            <div className="upload-container">
              <input
                type="file"
                className="uploadInput"
                accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" // Acceptable file types
                onChange={handleResumeChange}
              />
              <div className="text">
                <IoMdCloudUpload className="upload-img" />
                Browse Files Here{" "}
                <span className="subtext">Drag and drop files here</span>
              </div>
              {resumeError && <p className="error-message">{resumeError}</p>}
              {resumePreview && (
                <a
                  href={resumePreview}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume
                </a>
              )}{" "}
              {/* Resume Preview Link */}
            </div>
          </div>
        </div>
        <div className="uploadButton">
          <button type="submit">Upload</button>
        </div>
      </form>
      <div
        className="arrow"
        onClick={onBackClick}
        style={{ cursor: "pointer" }}
      >
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

FeaturedUpload.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  setPictureFile: PropTypes.func.isRequired,
  setResumeFile: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default FeaturedUpload;
