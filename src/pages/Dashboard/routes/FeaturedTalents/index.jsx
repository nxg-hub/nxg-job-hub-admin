import React, { useState, useEffect } from "react";
import FeaturedUpload from "./uploadFeatured/FeaturedUpload";
import FeaturedTalent from "./uploadFeatured/FeaturedTalent";
import axios from "axios";
import "./FeaturedTalent.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchFeaturedTalent } from "../../../../Redux/FeaturedTalentSlice";

const TalentManagement = () => {
  const { page } = useSelector((state) => state.FeaturedTalent);
  const [loader, setLoader] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const dispatch = useDispatch();
  const [talents, setTalents] = useState([]);
  const [pictureFile, setPictureFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);

  const handleUploadSubmit = async (talentData) => {
    setLoader(true);
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
        `${import.meta.env.VITE_BASE_URL}/api/v1/auth/upload-to-cloudinary`,
        pictureFormData
      );

      const resumeResponse = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/auth/upload-to-cloudinary`,
        resumeFormData
      );

      const talentDetails = {
        talentName: talentData.name,
        talentTechStack: talentData.techStack,
        talentProfilePic: pictureResponse.data,
        talentResume: resumeResponse.data,
        educationLevel: talentData.educationLevel,
        yearsOfExperience: talentData.yearsOfExperience,
      };
      const detailsResponse = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/talents/featured`,
        talentDetails
      );

      setTalents([...talents, detailsResponse.data]);
      setShowUpload(false);
      setPictureFile(null);
      setResumeFile(null);
      toast.success("Talent Uploaded Successfully!");
      dispatch(fetchFeaturedTalent({ page, size: 5 }));
    } catch (error) {
      toast.error("Failed to Upload Talent");
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
    } finally {
      setLoader(false);
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
          loader={loader}
        />
      ) : (
        <FeaturedTalent onAddTalentClick={handleAddTalentClick} />
      )}
    </>
  );
};

export default TalentManagement;
