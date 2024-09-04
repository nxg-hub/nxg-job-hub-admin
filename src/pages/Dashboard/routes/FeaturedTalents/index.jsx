import React, { useState, useEffect } from "react";
import FeaturedUpload from "./uploadFeatured/FeaturedUpload";
import FeaturedTalent from "./uploadFeatured/FeaturedTalent";
import axios from "axios";
import "./FeaturedTalent.scss";
import { API_HOST_URL } from "../../../../utils/api/API_HOST";

const TalentManagement = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [talents, setTalents] = useState([]);
  const [pictureFile, setPictureFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    const fetchTalents = async () => {
      try {
        const response = await axios.get(
          `${API_HOST_URL}/api/talents/featured`
          // `https://nxg-job-hub-8758c68a4346.herokuapp.com/api/talents/featured`
        );
        setTalents(response.data);
      } catch (error) {
        console.error("Error fetching talents", error);
      }
    };

    fetchTalents();
  }, []);

  const handleUploadSubmit = async (talentData) => {
    try {
      // Preparing data for picture upload
      const pictureFormData = new FormData();
      pictureFormData.append("file", pictureFile);
      pictureFormData.append("upload_preset", "tin4r1lt");

      // Preparing data for resume upload
      const resumeFormData = new FormData();
      resumeFormData.append("file", resumeFile);
      resumeFormData.append("upload_preset", "tin4r1lt");

      console.log("Picture File:", pictureFile);
      console.log("Resume File:", resumeFile);

      // Uploading to Cloudinary (or equivalent service)
      const pictureResponse = await axios.post(
        `${API_HOST_URL}/api/v1/auth/upload-to-cloudinary`,
        // `https://nxg-job-hub-8758c68a4346.herokuapp.com/api/v1/auth/upload-to-cloudinary`,
        pictureFormData
      );
      console.log("Picture Response:", pictureResponse);

      const resumeResponse = await axios.post(
        `${API_HOST_URL}/api/v1/auth/upload-to-cloudinary`,
        // `https://nxg-job-hub-8758c68a4346.herokuapp.com/api/v1/auth/upload-to-cloudinary`,
        resumeFormData
      );
      console.log("Resume Response:", resumeResponse);

      const talentDetails = {
        talentName: talentData.name,
        talentTechStack: talentData.techStack,
        talentProfilePic: pictureResponse.data,
        talentResume: resumeResponse.data,
      };

      console.log("Uploaded talent details:", talentDetails);

      // Sending talent details to the server
      const detailsResponse = await axios.post(
        `${API_HOST_URL}/api/talents/featured`,
        // `https://nxg-job-hub-8758c68a4346.herokuapp.com/api/talents/featured`,
        talentDetails
      );

      // Updating the talents state with the new talent
      setTalents([...talents, detailsResponse.data]);
      setShowUpload(false); // Hide upload form
      setPictureFile(null); // Reset picture file state
      setResumeFile(null); // Reset resume file state
      console.log("Current talents in state:", talents);
    } catch (error) {
      console.error(
        "Error uploading talent",
        error.response
          ? {
              status: error.response.status,
              data: error.response.data,
              headers: error.response.headers,
            }
          : error.message
      ); // Logging any errors
    }
  };

  const handleAddTalentClick = () => {
    setShowUpload(true); // Show upload form
  };

  // function to handle back navigation
  const handleBackClick = () => {
    setShowUpload(false); // Hide upload form
  };

  return (
    <div>
      {showUpload ? (
        <FeaturedUpload
          onSubmit={handleUploadSubmit}
          setPictureFile={setPictureFile}
          setResumeFile={setResumeFile}
          onBackClick={handleBackClick}
        />
      ) : (
        <FeaturedTalent
          talents={talents}
          onAddTalentClick={handleAddTalentClick}
        />
      )}
    </div>
  );
};

export default TalentManagement;
