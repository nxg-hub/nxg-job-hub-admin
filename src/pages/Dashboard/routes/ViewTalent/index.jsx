// import React, { useEffect, useState } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import { BsArrowLeft } from "react-icons/bs";
// import avater from "../../../../static/images/userIcon.png";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTalent } from "../../../../Redux/TalentSlice";
// import { toast } from "react-toastify";
// import { fetchEmployer } from "../../../../Redux/EmployerSlice";

// const ViewTalent = () => {
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [talentVett, setTalentVett] = useState({});
//   const [showRejectForm, setShowRejectForm] = useState(false);
//   const [rejectionReason, setRejectionReason] = useState("");
//   const [showAcceptModal, setShowAcceptModal] = useState(false);
//   const [errMsg, setErrMsg] = useState(false);
//   const [loader, setLoader] = useState(false);
//   const talents = useSelector((state) => state.TalentSlice.talents);
//   useEffect(() => {
//     const talent = talents?.find((t) => t.techTalentUser.techId === id);
//     setTalentVett(talent || {});
//   }, [id, talents]);

//   const handleAccept = async () => {
//     setLoader(true);
//     try {
//       await fetch(
//         `${import.meta.env.VITE_BASE_URL}/api/v1/admin/techtalent/${id}/verify`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
//             Authorization: JSON.parse(localStorage.getItem("ACCESSTOKEN"))
//               .token,
//           },
//         }
//       );
//       dispatch(fetchEmployer({ page: 0, size: 10000 }));
//       toast.success("Verification successful.");
//       navigate("/vetting");
//     } catch (err) {
//       console.log(err);
//       toast.error("Error occured.");
//     } finally {
//       setLoader(false);
//     }
//   };

//   const handleReject = async (e) => {
//     e.preventDefault();
//     if (!rejectionReason) {
//       setErrMsg(true);
//       return;
//     }
//     try {
//       setLoader(true);
//       await fetch(
//         `${
//           import.meta.env.VITE_BASE_URL
//         }/api/v1/admin/${id}/reject-techTalent-verification`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
//             Authorization: JSON.parse(localStorage.getItem("ACCESSTOKEN"))
//               .token,
//           },
//           body: JSON.stringify({ reasonForRejection: rejectionReason }),
//         }
//       );
//       navigate("/vetting");
//       toast.success("Rejection successful.");
//       dispatch(fetchTalent({ page: 0, size: 10000 }));
//     } catch (err) {
//       console.log(err);
//       toast.error("Error occured.");
//     } finally {
//       setLoader(false);
//     }
//   };

//   const {
//     user,
//     techTalentUser: {
//       skills,
//       portfolioLink,
//       linkedInUrl,
//       highestQualification,
//       resume,
//       profilePicture,
//       jobInterest,
//       techId,
//     } = {},
//   } = talentVett;

//   return (
//     <div className="max-w-6xl mx-auto p-4 ">
//       {/* Back Link */}
//       <Link
//         to="/vetting"
//         className="flex items-center gap-2 text-gray-700 mb-6">
//         <BsArrowLeft size={24} /> Back
//       </Link>

//       {/* Profile Section */}
//       <div className="flex flex-col md:flex-row gap-6 bg-white shadow-md rounded-lg p-6 mb-6">
//         <div className="flex flex-col items-center md:items-start md:flex-1">
//           <img
//             src={profilePicture || user?.profilePicture || avater}
//             alt={user?.firstName}
//             className="w-32 h-32 rounded-full object-cover mb-4"
//           />
//           <h2 className="text-2xl font-bold">{user?.name}</h2>
//           <p className="text-gray-500">{jobInterest}</p>
//           <p className="mt-2 text-sm text-gray-400">Talent ID: {techId}</p>
//         </div>

//         <div className="flex flex-col justify-center gap-4 md:flex-1">
//           <button
//             onClick={() => setShowAcceptModal(true)}
//             className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
//             Accept
//           </button>
//           <button
//             onClick={() => setShowRejectForm(true)}
//             className="w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
//             Reject
//           </button>
//         </div>
//       </div>

//       {/* Skills and Documents */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//         <div className="bg-white shadow-md rounded-lg p-4">
//           <h3 className="font-bold mb-2">Skills</h3>
//           {skills?.length ? (
//             <ul className="list-disc list-inside space-y-1">
//               {skills.map((skill, idx) => (
//                 <li key={idx}>{skill}</li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-500">No skills provided</p>
//           )}
//         </div>

//         <div className="bg-white shadow-md rounded-lg p-4">
//           <h3 className="font-bold mb-2">Documents</h3>
//           <ul className="space-y-2">
//             <li>
//               Resume:{" "}
//               {resume ? (
//                 <a
//                   href={resume}
//                   target="_blank"
//                   className="text-blue-600 underline">
//                   View
//                 </a>
//               ) : (
//                 <span className="text-gray-500">Not provided</span>
//               )}
//             </li>
//             <li>
//               Portfolio:{" "}
//               {portfolioLink ? (
//                 <a
//                   href={portfolioLink}
//                   target="_blank"
//                   className="text-blue-600 underline">
//                   View
//                 </a>
//               ) : (
//                 <span className="text-gray-500">Not provided</span>
//               )}
//             </li>
//             <li>
//               LinkedIn:{" "}
//               {linkedInUrl ? (
//                 <a
//                   href={linkedInUrl}
//                   target="_blank"
//                   className="text-blue-600 underline">
//                   View
//                 </a>
//               ) : (
//                 <span className="text-gray-500">Not provided</span>
//               )}
//             </li>
//           </ul>
//         </div>

//         <div className="bg-white shadow-md rounded-lg p-4">
//           <h3 className="font-bold mb-2">Qualification</h3>
//           <p>{highestQualification || "Not provided"}</p>
//         </div>
//       </div>

//       {/* Reject Form Modal */}
//       {showRejectForm && (
//         <>
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50 z-20"
//             onClick={() => setShowRejectForm(false)}
//           />
//           <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 z-30 rounded-lg shadow-lg w-[90%] md:w-[400px]">
//             <h3 className="font-bold mb-2 text-lg">Reason for Rejection</h3>
//             <textarea
//               value={rejectionReason}
//               onChange={(e) => setRejectionReason(e.target.value)}
//               className="w-full border p-2 rounded mb-2"
//             />
//             {errMsg && <p className="text-red-600 mb-2">Required</p>}
//             <div className="flex justify-between gap-4">
//               <button
//                 onClick={handleReject}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
//                 Submit
//               </button>
//               <button
//                 onClick={() => setShowRejectForm(false)}
//                 className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition">
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </>
//       )}

//       {/* Accept Confirmation Modal */}
//       {showAcceptModal && (
//         <>
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50 z-20"
//             onClick={() => setShowAcceptModal(false)}
//           />
//           <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 z-30 rounded-lg shadow-lg w-[90%] md:w-[400px] text-center">
//             <h3 className="font-bold text-lg mb-4">Verify Talent?</h3>
//             <div className="flex justify-around gap-4">
//               <button
//                 disabled={loader}
//                 onClick={handleAccept}
//                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
//                 Yes
//               </button>
//               <button
//                 disabled={loader}
//                 onClick={() => setShowAcceptModal(false)}
//                 className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition">
//                 No
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ViewTalent;

import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import avater from "../../../../static/images/userIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchTalent } from "../../../../Redux/TalentSlice";
import { fetchEmployer } from "../../../../Redux/EmployerSlice";
import { toast } from "react-toastify";

const ViewTalent = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const [loader, setLoader] = useState(false);
  const talents = useSelector((state) => state.TalentSlice.talents);
  const [talent, setTalent] = useState({});

  // Load talent data
  useEffect(() => {
    const t = talents?.find((t) => t.techTalentUser.techId === id);
    setTalent(t || {});
  }, [id, talents]);

  const tech = talent?.techTalentUser || {};
  const user = talent?.user || {};

  /** Accept Talent **/
  const handleAccept = async () => {
    setLoader(true);
    try {
      await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/techtalent/${id}/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
            Authorization: JSON.parse(localStorage.getItem("ACCESSTOKEN"))
              .token,
          },
        }
      );
      toast.success("Verification successful.");
      dispatch(fetchEmployer({ page: 0, size: 10000 }));
      navigate("/vetting");
    } catch (err) {
      toast.error("Error occurred");
    } finally {
      setLoader(false);
    }
  };

  /** Reject Talent **/
  const handleReject = async (e) => {
    e.preventDefault();
    if (!rejectionReason) {
      setErrMsg(true);
      return;
    }
    try {
      setLoader(true);
      await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/v1/admin/${id}/reject-techTalent-verification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
            Authorization: JSON.parse(localStorage.getItem("ACCESSTOKEN"))
              .token,
          },
          body: JSON.stringify({ reasonForRejection: rejectionReason }),
        }
      );
      toast.success("Rejection successful.");
      dispatch(fetchTalent({ page: 0, size: 10000 }));
      navigate("/vetting");
    } catch (err) {
      toast.error("Error occurred");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto h-screen overflow-y-scroll">
      {/* Back */}
      <Link
        to="/vetting"
        className="flex items-center gap-2 text-gray-700 mb-6">
        <BsArrowLeft size={24} /> Back
      </Link>

      {/* Profile Block */}
      <div className="flex flex-col md:flex-row gap-6 bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex flex-col items-center md:items-start md:flex-1">
          <img
            src={tech.profilePicture || user.profilePicture || avater}
            alt=""
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <h2 className="text-2xl font-bold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-500">{tech.jobInterest}</p>
          <p className="text-sm text-gray-400 mt-2">Talent ID: {tech.techId}</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col justify-center gap-4 md:flex-1">
          <button
            onClick={() => setShowAcceptModal(true)}
            className="w-full py-2 px-4 bg-green-600 text-white rounded-lg">
            Accept
          </button>
          <button
            onClick={() => setShowRejectForm(true)}
            className="w-full py-2 px-4 bg-red-600 text-white rounded-lg">
            Reject
          </button>
        </div>
      </div>

      {/* SECTIONS */}
      <Section title="Personal Information">
        <Item label="Email" value={tech.email} />
        <Item label="Phone Number" value={user.phoneNumber} />
        <Item
          label="Location"
          value={`${tech.residentialAddress}, ${tech.city}, ${tech.state}`}
        />
        <Item label="Country" value={tech.countryCode} />
        <Item
          label="Account Created"
          value={new Date(tech.accountCreationDate).toLocaleString()}
        />
      </Section>

      <Section title="Professional Information">
        <Item label="Current Job" value={tech.currentJob} />
        <Item label="Experience Level" value={tech.experienceLevel} />
        <Item label="Job Type" value={tech.jobType} />
        <Item label="Work Mode" value={tech.workMode} />
        <Item label="Years of Experience" value={tech.yearsOfExperience} />
      </Section>

      <Section title="Skills">
        <Item label="Skills" value={tech.skills?.join(", ") || "None"} />
      </Section>

      <Section title="Documents">
        <Item
          label="Resume"
          value={
            tech.resume ? (
              <a
                href={tech.resume}
                className="text-blue-600 underline"
                target="_blank">
                View
              </a>
            ) : (
              "Not provided"
            )
          }
        />
        <Item
          label="Cover Letter"
          value={
            tech.coverletter ? (
              <a
                href={tech.coverletter}
                className="text-blue-600 underline"
                target="_blank">
                View
              </a>
            ) : (
              "Not provided"
            )
          }
        />
        <Item
          label="Professional Cert"
          value={
            tech.professionalCert ? (
              <a
                href={tech.professionalCert}
                className="text-blue-600 underline"
                target="_blank">
                View
              </a>
            ) : (
              "Not provided"
            )
          }
        />
        <Item
          label="LinkedIn"
          value={
            tech.linkedInUrl ? (
              <a
                href={tech.linkedInUrl}
                className="text-blue-600 underline"
                target="_blank">
                View
              </a>
            ) : (
              "Not provided"
            )
          }
        />
        <Item
          label="Portfolio"
          value={
            tech.portfolioLink ? (
              <a
                href={tech.portfolioLink}
                className="text-blue-600 underline"
                target="_blank">
                View
              </a>
            ) : (
              "Not provided"
            )
          }
        />
      </Section>

      <Section title="Bio">
        <p className="text-gray-700">{tech.bio || "No bio provided"}</p>
      </Section>

      {/* Reject Modal */}
      {showRejectForm && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20"
            onClick={() => setShowRejectForm(false)}></div>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 z-30 rounded-lg shadow-lg w-[90%] md:w-[400px]">
            <h3 className="font-bold mb-2 text-lg">Reason for Rejection</h3>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full border p-2 rounded mb-2"
            />
            {errMsg && <p className="text-red-600 mb-2">Required</p>}
            <div className="flex justify-between gap-4">
              <button
                onClick={handleReject}
                className="bg-blue-600 text-white px-4 py-2 rounded">
                {loader ? "Processing..." : "Sumbit"}
              </button>
              <button
                onClick={() => setShowRejectForm(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </>
      )}

      {/* Accept Modal */}
      {showAcceptModal && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20"
            onClick={() => setShowAcceptModal(false)}></div>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 z-30 rounded-lg shadow-lg w-[90%] md:w-[400px] text-center">
            <h3 className="font-bold text-lg mb-4">Verify Talent?</h3>
            <div className="flex justify-around gap-4">
              <button
                disabled={loader}
                onClick={handleAccept}
                className="bg-green-600 text-white px-4 py-2 rounded">
                {loader ? "Processing..." : "Yes"}
              </button>
              <button
                disabled={loader}
                onClick={() => setShowAcceptModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded">
                No
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

/** Reusable Block Components **/
const Section = ({ title, children }) => (
  <div className="mb-8 bg-white shadow-md rounded-lg p-6">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div className="grid gap-3">{children}</div>
  </div>
);

const Item = ({ label, value }) => (
  <div className="flex justify-between border-b pb-2">
    <span className="font-medium text-gray-600">{label}:</span>
    <span className="text-gray-800 max-w-[60%] text-right break-words">
      {value}
    </span>
  </div>
);

export default ViewTalent;
