import React, { useState, useEffect } from "react";
import FeaturedUpload from "./AddTalent/UploadTalent";
import FeaturedTalent from "./AddTalent/TalentList";
import axios from "axios";
import { API_HOST_URL } from "../../../../utils/api/API_HOST";
import "./Talent.scss";

const Overview = () => {
  const [showUpload, setShowUpload] = useState(false); // Default to false to show featured talents initially
  const [talents, setTalents] = useState([]);

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
  }, []); // Empty dependency array means this runs once on mount

  //   const handleUploadSubmit = async (talentData) => {
  //     try {
  //       const pictureFormData = new FormData();
  //       pictureFormData.append("file", talentData.picture);

  //       const resumeFormData = new FormData();
  //       resumeFormData.append("file", talentData.resume);

  //       const pictureResponse = await axios.post(
  //         `${API_HOST_URL}/api/v1/auth/upload-to-cloudinary`,
  //         pictureFormData
  //       );
  //       const resumeResponse = await axios.post(
  //         `https://api.cloudinary.com/v1_1/dildznazt/raw/upload`,
  //         resumeFormData
  //       );

  //       const talentDetails = {
  //         talentName: talentData.name,
  //         talentTitle: talentData.title,
  //         talentProfilePic: pictureResponse.data.url,
  //         talentResume: resumeResponse.data.url,
  //       };

  //       const detailsResponse = await axios.post(
  //         `${API_HOST_URL}/api/talents/featured`,
  //         talentDetails
  //       );

  //       setTalents([...talents, detailsResponse.data]);
  //       setShowUpload(false);
  //     } catch (error) {
  //       console.error("Error uploading talent", error);
  //     }
  //   };

  const handleAddTalentClick = () => {
    setShowUpload(true);
  };

  return (
    <div>
      {showUpload ? (
        <FeaturedUpload
          onFileSelectSuccess={(file) => file} // Pass the success callback function
          onFileSelectError={({ error }) => alert(error)}
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

export default Overview;
