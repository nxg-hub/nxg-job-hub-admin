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
      const pictureFormData = new FormData();
      pictureFormData.append("file", pictureFile);
      pictureFormData.append("upload_preset", "tin4r1lt");
      const resumeFormData = new FormData();
      resumeFormData.append("file", resumeFile);
      resumeFormData.append("upload_preset", "tin4r1lt");

      // console.log("Picture File:", pictureFile);
      // console.log("Resume File:", resumeFile);
      const pictureResponse = await axios.post(
        `${API_HOST_URL}/api/v1/auth/upload-to-cloudinary`,
        pictureFormData
      );
      console.log("Picture Response:", pictureResponse);

      const resumeResponse = await axios.post(
        `${API_HOST_URL}/api/v1/auth/upload-to-cloudinary`,
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

      const detailsResponse = await axios.post(
        `${API_HOST_URL}/api/talents/featured`,
        talentDetails
      );

      setTalents([...talents, detailsResponse.data]);
      setShowUpload(false);
      setPictureFile(null);
      setResumeFile(null);
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
      );
    }
  };

  const handleAddTalentClick = () => {
    setShowUpload(true);
  };
  const handleBackClick = () => {
    setShowUpload(false);
  };

  return (
    <>
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
    </>
  );
};

export default TalentManagement;
