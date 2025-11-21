import React, { useState, useEffect } from "react";
import FeaturedUpload from "./uploadFeatured/FeaturedUpload";
import FeaturedTalent from "./uploadFeatured/FeaturedTalent";
import axios from "axios";
import "./FeaturedTalent.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeaturedTalent } from "../../../../Redux/TalentSlice";
import { toast } from "react-toastify";

const TalentManagement = () => {
  const success = useSelector((state) => state.TalentSlice.featuredSuccess);
  const featuredTalent = useSelector(
    (state) => state.TalentSlice.featuredTalent
  );
  const loading = useSelector((state) => state.TalentSlice.loading);
  const [loader, setLoader] = useState(false);
  const error = useSelector((state) => state.TalentSlice.error);
  const [showUpload, setShowUpload] = useState(false);
  const dispatch = useDispatch();
  const [talents, setTalents] = useState([]);
  const [pictureFile, setPictureFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    if (!success) dispatch(fetchFeaturedTalent());
  }, []);

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
      console.log("Picture Response:", pictureResponse);

      const resumeResponse = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/auth/upload-to-cloudinary`,
        resumeFormData
      );

      const talentDetails = {
        talentName: talentData.name,
        talentTechStack: talentData.techStack,
        talentProfilePic: pictureResponse.data,
        talentResume: resumeResponse.data,
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
      dispatch(fetchFeaturedTalent());
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
        <FeaturedTalent
          talents={featuredTalent}
          onAddTalentClick={handleAddTalentClick}
        />
      )}
    </>
  );
};

export default TalentManagement;
