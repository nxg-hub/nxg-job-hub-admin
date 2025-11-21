// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchSub } from "../../../../../../Redux/SubsriptionSlice";
// import restrict from "../../../../../../static/icons/restric-icon.svg";
// import CardBtn from "./CardBtn";
// import moment from "moment";
// import avater from "../../../../../../static/images/userIcon.png";

// const UserDetailTalent = ({ talent }) => {
//   // console.log(talent);
//   // console.log("hey");
//   const dispatch = useDispatch();
//   const subs = useSelector((state) => state.SubsriptionSlice.sub);
//   const [subStatus, setSubStatus] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [noApplicant, setNoApplicant] = useState(false);
//   const [count, setCount] = useState(0);
//   const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));
//   const [allApplicant, setAllApplicant] = useState([]);
//   // console.log(talent);
//   useEffect(() => {
//     //Calling the subscription endPoint to know what subscription plan a user is subscribed to
//     dispatch(fetchSub("/api/v1/admin/subscriptions"));
//   }, []);

//   useEffect(() => {
//     //finding the users subscription by comparing emails
//     const talentSubStatus = subs.find((user) => {
//       return user.email === talent.user.email;
//     });
//     setSubStatus(talentSubStatus || {});
//   }, []);
//   //fetching applicants for all jobs
//   const fetchData = async () => {
//     try {
//       await fetch(
//         `${
//           import.meta.env.VITE_BASE_URL
//         }/api/v1/admin/get-all-applicants-for-all-jobs?page=0&size=1000`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token.token,
//           },
//         }
//       )
//         .then((response) => {
//           if (response.status === 404) {
//             setNoApplicant(true);
//           }
//           return response.json();
//         })
//         .then((data) => {
//           setAllApplicant(data);
//         });
//     } catch (err) {
//       console.log(error);
//       setError(true);
//     }
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);
//   //getting to know if the talent has applied for a job
//   const applicantTrue = allApplicant?.find((user) => {
//     return user.applicant.email === talent.user.email;
//   });
//   //Getting the application id
//   const applyID = applicantTrue?.applicationId;

//   //getting applicationCount via application id

//   const fetchCount = async () => {
//     setLoading(true);
//     try {
//       await fetch(
//         `${
//           import.meta.env.VITE_BASE_URL
//         }/api/v1/admin/count-by-applicant?applicantId=${applyID}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token.token,
//           },
//         }
//       )
//         .then((response) => {
//           return response.json();
//         })
//         .then((data) => {
//           setCount(data);
//           setLoading(false);
//         });
//     } catch (err) {
//       console.log(error);
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     allApplicant.length > 0 ? fetchCount() : null;
//   }, [applyID]);
//   return (
//     <div className="user-picsContent ">
//       <div className="user-pics-container">
//         <div className="user-pics-section">
//           {/* Conditionally display the restriction icon */}
//           {talent.user.enabled === false && (
//             <div className="user-pics restrict">
//               <img src={restrict} alt="Restriction-Icon" />
//             </div>
//           )}
//           <div className="user-pics">
//             <img
//               className="rounded-full"
//               src={
//                 //if no profice picture, display default avatar
//                 talent.user.profilePicture ||
//                 talent.techTalentUser.profilePicture
//                   ? talent.user.profilePicture ||
//                     talent.techTalentUser.profilePicture
//                   : avater
//               }
//               alt={talent.user.name}
//             />
//           </div>
//         </div>
//         <div className="user-pics-detail w-[150px] ">
//           <p>
//             Name : <span>{talent.user.name}</span>
//           </p>
//           <p>
//             Date Joined :{" "}
//             <span>
//               {moment(talent.techTalentUser.accountCreationDate).format(
//                 "DD/MM/YYYY"
//               )}
//             </span>
//           </p>
//           <p>
//             Subscription : <span>{subStatus.planType}</span>
//           </p>
//         </div>
//       </div>
//       <div className="user-btn-section   mt-[-20px]">
//         {/* <button className={talent.enabled === false ? "reactivate-btn" : ""}>
//           {talent.enabled === false ? "Reactivate Account" : "Suspend Account"}
//         </button> */}
//         <CardBtn id={talent.user.id} restrict={talent.user.enabled} />
//       </div>
//       <section className="application">
//         <div className="contracts user-jobs">
//           <h5>Number of Job Applications</h5>
//           <p>
//             {loading ? <span className="text-xs">loading...</span> : `${count}`}
//           </p>
//         </div>
//         {/* <div className="contracts">
//           <h5>Number of Contracts Secured</h5>
//           <p>49</p>
//         </div>
//         <div className="contracts">
//           <h5>Number of Contracts Delievered</h5>
//           <p>49</p>
//         </div> */}
//       </section>
//     </div>
//   );
// };

// export default UserDetailTalent;

import React, { useEffect, useState } from "react";
import moment from "moment";
import avater from "../../../../../../static/images/userIcon.png";
import restrict from "../../../../../../static/icons/restric-icon.svg";
import CardBtn from "./CardBtn";
import { useDispatch, useSelector } from "react-redux";
import { fetchSub } from "../../../../../../Redux/SubsriptionSlice";
import axios from "axios";

const TalentDetailUI = ({ talent }) => {
  const tech = talent.techTalentUser;
  const user = talent.user;

  const dispatch = useDispatch();
  const subs = useSelector((state) => state.SubsriptionSlice.sub);
  const [subStatus, setSubStatus] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [noApplicant, setNoApplicant] = useState(false);
  const [count, setCount] = useState(0);
  const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));
  const [allApplicant, setAllApplicant] = useState([]);
  // console.log(talent);
  useEffect(() => {
    //Calling the subscription endPoint to know what subscription plan a user is subscribed to
    dispatch(fetchSub("/api/v1/admin/subscriptions"));
  }, []);

  useEffect(() => {
    //finding the users subscription by comparing emails
    const talentSubStatus = subs.find((user) => {
      return user.email === talent.user.email;
    });
    setSubStatus(talentSubStatus || {});
  }, []);

  return (
    <div className="px-6 pt-6 space-y-6 h-screen overflow-y-scroll">
      {/* ✅ HEADER CARD */}
      <div className="bg-white p-6 rounded-xl shadow-sm border flex gap-6">
        {/* Profile Image */}
        <div className="relative">
          <img
            src={user.profilePicture || tech.profilePicture || avater}
            className="w-28 h-28 rounded-full object-cover border"
            alt="profile"
          />

          {!user.enabled && (
            <img
              src={restrict}
              className="absolute top-0 right-0 w-28 h-28"
              alt="restricted"
            />
          )}
        </div>

        {/* Basic Details */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-600">{tech.jobInterest}</p>

          <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Email:</span> {tech.email}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {user.phoneNumber}
            </p>
            <p>
              <span className="font-semibold">Joined:</span>
              {moment(tech.accountCreationDate).format("DD MMM YYYY")}
            </p>
            <p>
              <span className="font-semibold">Subscription:</span>
              {subStatus?.planType || "No Plan"}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-start">
          <CardBtn id={user.id} restrict={user.enabled} />
        </div>
      </div>

      {/* ✅ ABOUT SECTION */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-xl font-semibold mb-3">About</h3>
        <p className="text-gray-700 whitespace-pre-wrap">
          {tech.bio || "No bio provided"}
        </p>
      </div>

      {/* ✅ SKILLS */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-xl font-semibold mb-4">Skills</h3>

        {tech.skills?.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tech.skills.map((skill) => (
              <span
                key={skill}
                className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No skills available</p>
        )}
      </div>

      {/* ✅ WORK & EDUCATION */}
      <div className="bg-white p-6 rounded-xl shadow-sm border grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Work Information</h3>
          <p>
            <span className="font-semibold">Current Job:</span>{" "}
            {tech.currentJob}
          </p>
          <p>
            <span className="font-semibold">Experience:</span>{" "}
            {tech.experienceLevel}
          </p>
          <p>
            <span className="font-semibold">Work Mode:</span> {tech.workMode}
          </p>
          <p>
            <span className="font-semibold">Job Type:</span> {tech.jobType}
          </p>
          <p>
            <span className="font-semibold">Years of Experience:</span>{" "}
            {tech.yearsOfExperience}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Location Details</h3>
          <p>
            <span className="font-semibold">Address:</span>{" "}
            {tech.residentialAddress}
          </p>
          <p>
            <span className="font-semibold">City:</span> {tech.city}
          </p>
          <p>
            <span className="font-semibold">State:</span> {tech.state}
          </p>
          <p>
            <span className="font-semibold">Zip Code:</span> {tech.zipCode}
          </p>
          <p>
            <span className="font-semibold">Country:</span> {tech.countryCode}
          </p>
        </div>
      </div>

      {/* ✅ DOCUMENTS */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-xl font-semibold mb-4">Documents</h3>

        <div className="grid md:grid-cols-3 gap-4">
          <a
            href={tech.resume}
            target="_blank"
            className="p-4 border rounded-lg hover:bg-gray-50 w-[250px] md:w-full">
            <h4 className="font-semibold">Resume</h4>
            <p className="text-gray-600 truncate">{tech.resume}</p>
          </a>

          <a
            href={tech.coverletter}
            target="_blank"
            className="p-4 border rounded-lg hover:bg-gray-50 w-[250px] md:w-full">
            <h4 className="font-semibold">Cover Letter</h4>
            <p className="text-gray-600 truncate ">{tech.coverletter}</p>
          </a>

          <a
            href={tech.professionalCert}
            target="_blank"
            className="p-4 border rounded-lg hover:bg-gray-50 w-[250px] md:w-full">
            <h4 className="font-semibold">Certifications</h4>
            <p className="text-gray-600 truncate">{tech.professionalCert}</p>
          </a>
        </div>
      </div>

      {/* ✅ ACTIVITY */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-xl font-semibold mb-3">Platform Activity</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {/* <div className="p-4 border rounded-lg">
            <h4 className="font-semibold">Applications</h4>
            <p className="text-blue-600 text-2xl">{loading ? "..." : count}</p>
          </div> */}

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold">Verified</h4>
            <p className="text-green-600 text-xl">
              {tech.verified ? "Yes" : "No"}
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold">Profile Status</h4>
            <p
              className={`${
                user.enabled ? "text-green-600" : "text-red-600"
              } text-xl`}>
              {user.enabled ? "Active" : "Suspended"}
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold">Last Login</h4>
            <p className="text-gray-700">
              {moment(user.lastLoginTime).fromNow()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentDetailUI;
