// import React, { useState } from "react";
// import FeaturedUpload from "./uploadFeatured/FeaturedUpload";
// import FeaturedTalent from "./uploadFeatured/FeaturedTalent";
// import axios from "axios";
// import { API_HOST_URL } from "../../../../utils/api/API_HOST";
// import "./FeaturedTalent.scss";

// const TalentManagement = () => {
//   const [showUpload, setShowUpload] = useState(true);
//   const [talentProfile, setTalentProfile] = useState(null);
//   const [talents, setTalents] = useState([]);

//   const handleUploadSubmit = async (talentData) => {
//     try {
//       // Upload picture and resume to the backend
//       const pictureFormData = new FormData();
//       pictureFormData.append("file", talentData.picture);

//       const resumeFormData = new FormData();
//       resumeFormData.append("file", talentData.resume);

//       const pictureResponse = await axios.post(
//         `${API_HOST_URL}/api/v1/auth/upload-to-cloudinary`,
//         pictureFormData
//       );
//       const resumeResponse = await axios.post(
//         `${API_HOST_URL}/api/v1/auth/upload-to-cloudinary`,
//         resumeFormData
//       );

//       // Upload talent details
//       const talentDetails = {
//         name: talentData.name,
//         title: talentData.title,
//         pictureUrl: pictureResponse.data.url,
//         resumeUrl: resumeResponse.data.url,
//       };

//       const detailsResponse = await axios.post(
//         `${API_HOST_URL}/api/talents/featured`,
//         talentDetails
//       );

//       // Update state
//       setTalentProfile(detailsResponse.data);
//       setTalents([...talents, detailsResponse.data]);
//       setShowUpload(false);
//     } catch (error) {
//       console.error("Error uploading talent", error);
//     }
//   };

//   const handleAddTalentClick = () => {
//     setShowUpload(true);
//   };

//   return (
//     <div>
//       {showUpload ? (
//         <FeaturedUpload onSubmit={handleUploadSubmit} />
//       ) : (
//         <FeaturedTalent
//           talents={talents}
//           onAddTalentClick={handleAddTalentClick}
//         />
//       )}
//     </div>
//   );
// };

// export default TalentManagement;

import React, { useState, useEffect } from "react";
import FeaturedUpload from "./uploadFeatured/FeaturedUpload";
import FeaturedTalent from "./uploadFeatured/FeaturedTalent";
import axios from "axios";
import { API_HOST_URL } from "../../../../utils/api/API_HOST";
import "./FeaturedTalent.scss";

const TalentManagement = () => {
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

  const handleUploadSubmit = async (talentData) => {
    try {
      const pictureFormData = new FormData();
      pictureFormData.append("file", talentData.picture);
      pictureFormData.append("upload_preset", "your_image_preset"); // Add upload_preset if needed

      const resumeFormData = new FormData();
      resumeFormData.append("file", talentData.resume);
      resumeFormData.append("upload_preset", "your_raw_preset"); // Add upload_preset if needed

      const pictureResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/dildznazt/image/upload`, // Use correct endpoint for images
        pictureFormData
      );

      const resumeResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/dildznazt/raw/upload`, // Use correct endpoint for raw files
        resumeFormData
      );

      const talentDetails = {
        talentName: talentData.name,
        talentTitle: talentData.title,
        talentProfilePic: pictureResponse.data.secure_url, // Ensure the field name is correct
        talentResume: resumeResponse.data.secure_url, // Ensure the field name is correct
      };

      const detailsResponse = await axios.post(
        `${API_HOST_URL}/api/talents/featured`,
        talentDetails
      );

      setTalents([...talents, detailsResponse.data]);
      setShowUpload(false);
    } catch (error) {
      console.error(
        "Error uploading talent",
        error.response ? error.response.data : error.message
      );
    }
  };

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
        <FeaturedUpload onSubmit={handleUploadSubmit} />
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
