// import React from "react";
// import uploadLogo from "../../../../../static/icons/Vector.png";
// import arrow from "../../../../../static/icons/Arrow 15.png";
// import "../FeaturedTalent.scss";
// // import { API_HOST_URL } from "../../../../../utils/api/API_HOST";

// function FeaturedUpload() {
//   return (
//     <div className="post-featured-talents container">
//       <h2>
//         <b>Add Featured Talent</b>
//       </h2>
//       <form className="talentInfor">
//         <div className="talentName">
//           <label htmlFor="talent-name">
//             <b>Talent Name:</b>
//           </label>
//           <input className="NameInput" type="text" />
//         </div>
//         <div className="talentName">
//           <label htmlFor="talent-name">
//             <b>Talent Title:</b>
//           </label>
//           <input className="NameInput" type="text" />
//         </div>

//         <div className="uploadfile">
//           <div className="pictureUpload">
//             <label htmlFor="">
//               <b>Upload Talent Picture:</b>
//             </label>

//             <div className="upload-container">
//               <input type="file" className="uploadInput" />
//               <div className="text">
//                 Browsers Files Here{" "}
//                 <span className="subtext">Drag and drop files here</span>
//               </div>
//             </div>

//             <div className="placeholderImg">
//               <img src={uploadLogo} alt="" />
//             </div>
//           </div>

//           <div className="profileUpload">
//             <label htmlFor="" className="profName">
//               <b> Upload Talents Resume:</b>
//             </label>
//             <div className="upload-container">
//               <input type="file" className="uploadInput" />
//               <div className="text">
//                 Browsers Files Here{" "}
//                 <span className="subtext">Drag and drop files here</span>
//               </div>
//             </div>
//             <div className="placeholderlogo">
//               <img src={uploadLogo} alt="" />
//             </div>
//           </div>
//         </div>

//         <div className="uploadButton">
//           <button type="submit">Upload</button>
//         </div>
//       </form>
//       <div className="arrow">
//         <div className="arrowImg">
//           <img src={arrow} alt="" />
//         </div>
//         <h4>
//           <b>Back</b>
//         </h4>
//       </div>
//     </div>
//   );
// }

// export default FeaturedUpload;

import React, { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import uploadLogo from "../../../../../static/icons/Vector.png";
import arrow from "../../../../../static/icons/Arrow 15.png";
// import "../FeaturedTalent.scss";

const FeaturedUpload = ({ onSubmit }) => {
  const [talentName, setTalentName] = useState("");
  const [talentTitle, setTalentTitle] = useState("");
  const [pictureFile, setPictureFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      name: talentName,
      title: talentTitle,
      picture: pictureFile,
      resume: resumeFile,
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
          <div className="pictureUpload">
            <label>
              <b>Upload Talent Picture:</b>
            </label>
            <div className="upload-container">
              <input
                type="file"
                className="uploadInput"
                onChange={(e) => setPictureFile(e.target.files[0])}
              />
              <div className="text">
                Browse Files Here{" "}
                <span className="subtext">Drag and drop files here</span>
              </div>
            </div>
            <div className="placeholderImg">
              <img src={uploadLogo} alt="" />
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
                onChange={(e) => setResumeFile(e.target.files[0])}
              />
              <div className="text">
                Browse Files Here{" "}
                <span className="subtext">Drag and drop files here</span>
              </div>
            </div>
            <div className="placeholderlogo">
              <img src={uploadLogo} alt="" />
            </div>
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
FeaturedUpload.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default FeaturedUpload;
