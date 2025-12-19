import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { IoMdCloudUpload } from "react-icons/io";
import arrow from "../../../../../static/icons/Arrow 15.png";

const FeaturedUpload = ({
  onSubmit,
  setPictureFile,
  setResumeFile,
  onBackClick,
  loader,
}) => {
  const Options = [
    { label: "Frontend Developer", value: "frontend-dev" },
    { label: "UI/UX Designer", value: "ui/ux" },
    { label: "Backend Developer", value: "backend-dev" },
    { label: "Project Manager", value: "pm" },
    { label: "Data Analyst", value: "data-analyst" },
    { label: "Business Analyst", value: "business-analyst" },
    { label: "Scrum Master", value: "scrum-master" },
    { label: "Others", value: "others" },
  ];

  const [selectedOption, setSelectedOption] = useState("");
  const [manualEntry, setManualEntry] = useState("");
  const [talentName, setTalentName] = useState("");
  const [talentTechStack, setTalentTechStack] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [educationLevel, setEducationLevel] = useState("");

  const [pictureError, setPictureError] = useState("");
  const [resumeError, setResumeError] = useState("");

  const [picturePreview, setPicturePreview] = useState("");
  const [resumePreview, setResumePreview] = useState("");

  // Keep talentTechStack in sync
  useEffect(() => {
    if (selectedOption === "others") {
      setTalentTechStack(manualEntry);
    } else {
      setTalentTechStack(selectedOption);
    }
  }, [selectedOption, manualEntry]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      name: talentName,
      techStack: talentTechStack,
      yearsOfExperience,
      educationLevel,
    });
  };

  // IMAGE UPLOAD HANDLER
  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    const allowed = ["image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024;

    if (!file) return;

    if (!allowed.includes(file.type)) {
      setPictureError("Please upload a valid image file (JPEG, PNG).");
      setPictureFile(null);
      setPicturePreview("");
      return;
    }

    if (file.size > maxSize) {
      setPictureError("File size must be less than 5 MB.");
      setPictureFile(null);
      setPicturePreview("");
      return;
    }

    setPictureError("");
    setPictureFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setPicturePreview(reader.result);
    reader.readAsDataURL(file);
  };

  // RESUME UPLOAD HANDLER
  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxSize = 5 * 1024 * 1024;

    if (!file) return;

    if (!allowed.includes(file.type)) {
      setResumeError("Upload a PDF, DOC, or DOCX file.");
      setResumeFile(null);
      setResumePreview("");
      return;
    }

    if (file.size > maxSize) {
      setResumeError("File size must be less than 5 MB.");
      setResumeFile(null);
      setResumePreview("");
      return;
    }

    setResumeError("");
    setResumeFile(file);
    setResumePreview(URL.createObjectURL(file));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl px-8 h-[600px] overflow-y-scroll py-4 mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Add Featured Talent
      </h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* NAME */}
        <div>
          <label className="font-semibold text-gray-700">Talent Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring-[.8px] focus:ring-blue-500 outline-none"
            placeholder="e.g. John Doe"
            value={talentName}
            onChange={(e) => setTalentName(e.target.value)}
          />
        </div>

        {/* TECH STACK */}
        {/* <div>
          <label className="font-semibold text-gray-700">
            Talent Tech Stack
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring-[.8px] focus:ring-blue-500 outline-none"
            placeholder="e.g. React, Node.js, AWS"
            value={talentTechStack}
            onChange={(e) => setTalentTechStack(e.target.value)}
          />
        </div> */}
        <div>
          <label className="font-semibold text-gray-700">
            Talent Tech Stack
          </label>

          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring-[.8px] focus:ring-blue-500 outline-none"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}>
            <option value="">Select role</option>
            {Options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {selectedOption === "others" && (
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-3 focus:ring-[.8px] focus:ring-blue-500 outline-none"
              placeholder="Enter your role"
              value={manualEntry}
              onChange={(e) => setManualEntry(e.target.value)}
            />
          )}

          <p className="mt-2 text-gray-500">
            <strong>Current value:</strong> {talentTechStack || "None"}
          </p>
        </div>
        {/* YEARS OF EXPERIENCE */}
        <div>
          <label className="font-semibold text-gray-700">
            Years of Experience
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring-[.8px] focus:ring-blue-500 outline-none"
            placeholder="e.g. 3 Years"
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(e.target.value)}
          />
        </div>

        {/* EDUCATION LEVEL */}
        <div>
          <label className="font-semibold text-gray-700">Education Level</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring-[.8px] focus:ring-blue-500 outline-none"
            placeholder="e.g. B.Sc., M.Sc., PhD"
            value={educationLevel}
            onChange={(e) => setEducationLevel(e.target.value)}
          />
        </div>

        {/* UPLOAD SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PICTURE UPLOAD */}
          <div>
            <label className="font-semibold text-gray-700">
              Upload Talent Picture
            </label>

            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 cursor-pointer relative">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/jpeg, image/png"
                onChange={handlePictureChange}
              />

              <IoMdCloudUpload className="mx-auto text-4xl text-gray-500" />
              <p className="font-medium text-gray-700 mt-2">Browse Image</p>
              <p className="text-sm text-gray-500">Drag & Drop supported</p>
            </div>

            {pictureError && (
              <p className="text-red-600 text-sm mt-1">{pictureError}</p>
            )}

            {picturePreview && (
              <img
                src={picturePreview}
                alt="Preview"
                className="w-10 h-10 object-cover rounded-lg mt-3 border"
              />
            )}
          </div>

          {/* RESUME UPLOAD */}
          <div>
            <label className="font-semibold text-gray-700">Upload Resume</label>

            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 cursor-pointer relative">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleResumeChange}
              />

              <IoMdCloudUpload className="mx-auto text-4xl text-gray-500" />
              <p className="font-medium text-gray-700 mt-2">Browse Resume</p>
              <p className="text-sm text-gray-500">PDF, DOC, DOCX</p>
            </div>

            {resumeError && (
              <p className="text-red-600 text-sm mt-1">{resumeError}</p>
            )}

            {resumePreview && (
              <a
                href={resumePreview}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium underline block mt-2">
                View Uploaded Resume
              </a>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loader}
          className="w-full bg-[#2596be] text-white py-3 rounded-lg font-semibold  transition">
          {loader ? "Uploading..." : " Upload Talent"}
        </button>
      </form>

      {/* BACK BUTTON */}
      <div
        className="flex items-center gap-2 mt-6 cursor-pointer hover:opacity-75"
        onClick={onBackClick}>
        <img src={arrow} className="w-5" />
        <h4 className="font-bold text-gray-700">Back</h4>
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
