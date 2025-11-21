// import React, { useEffect, useState } from "react";
// import restrict from "../../../../../../static/icons/restric-icon.svg";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchSub } from "../../../../../../Redux/SubsriptionSlice";
// import CardBtn from "./CardBtn";
// import { useApiRequest } from "../../../../../../utils/functions/fetchEndPoint";
// import moment from "moment";
// import avater from "../../../../../../static/images/userIcon.png";

// const UserDetailEmployer = ({ employer }) => {
//   const dispatch = useDispatch();
//   const subs = useSelector((state) => state.SubsriptionSlice.sub);
//   const [subStatus, setSubStatus] = useState({});
//   const employerID = employer.user.id;
//   useEffect(() => {
//     //Calling the subscription endPoint to know what subscription plan a user is sunscribed to
//     dispatch(fetchSub("/api/v1/admin/subscriptions"));
//   }, []);
//   //getting employer stats
//   const { data, loading } = useApiRequest(`/api/v1/admin/${employerID}/stats
// `);
//   useEffect(() => {
//     //finding the users subscription by comparing emails
//     const employerSubStatus = subs.find(
//       (user) => user.email === employer.user.email
//     );
//     setSubStatus(employerSubStatus || {});
//   }, []);

//   return (
//     <div className="user-picsContent">
//       <div className="user-pics-container">
//         <div className="user-pics-section">
//           {/* Conditionally display the restriction icon */}
//           {employer.user.enabled === false && (
//             <div className="user-pics restrict">
//               <img src={restrict} alt="Restriction-Icon" />
//             </div>
//           )}
//           <div className="user-pics">
//             <img
//               className="rounded-full"
//               src={
//                 //if no profice picture, display default avatar
//                 employer.user.profilePicture || employer.employer.profilePicture
//                   ? employer.user.profilePicture ||
//                     employer.employer.profilePicture
//                   : avater
//               }
//               alt={employer.user.userName}
//             />
//           </div>
//         </div>
//         <div className="user-pics-detail">
//           <p>
//             Name : <span>{employer.employer.companyName}</span>
//           </p>
//           <p>
//             Date Joined :{" "}
//             <span>
//               {moment(employer.employer.accountCreationDate).format(
//                 "DD/MM/YYYY"
//               )}
//             </span>
//           </p>
//           <p>
//             Subscription : <span>{subStatus.planType}</span>
//           </p>
//         </div>
//       </div>
//       <div className="user-btn-section  w-[80%] mt-[-20px]">
//         <CardBtn id={employer.user.id} restrict={employer.user.enabled} />
//       </div>
//       <section className="application">
//         <div className="contracts user-jobs">
//           <h5>Number of Jobs Posted</h5>
//           <p>
//             {loading ? (
//               <span className="text-xs">Loading...</span>
//             ) : (
//               data.jobCount
//             )}
//           </p>
//         </div>
//         <div className="contracts">
//           <h5>Number of Applicants</h5>
//           <p>
//             {loading ? (
//               <span className="text-xs">Loading...</span>
//             ) : (
//               data.applicantCount
//             )}
//           </p>
//         </div>
//         {/* <div className="contracts">
//           <h5>Number of Contracts Delievered</h5>
//           <p>49</p>
//         </div> */}
//       </section>
//     </div>
//   );
// };

// export default UserDetailEmployer;

import React, { useEffect, useState } from "react";
import restrict from "../../../../../../static/icons/restric-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchSub } from "../../../../../../Redux/SubsriptionSlice";
import CardBtn from "./CardBtn";
import { useApiRequest } from "../../../../../../utils/functions/fetchEndPoint";
import moment from "moment";
import avater from "../../../../../../static/images/userIcon.png";

const UserDetailEmployer = ({ employer }) => {
  const dispatch = useDispatch();
  const subs = useSelector((state) => state.SubsriptionSlice.sub);
  const [subStatus, setSubStatus] = useState({});
  const employerID = employer.user.id;

  // Load subscription details
  useEffect(() => {
    dispatch(fetchSub("/api/v1/admin/subscriptions"));
  }, []);

  // Get job & applicant stats
  const { data, loading } = useApiRequest(`/api/v1/admin/${employerID}/stats`);

  // Match subscription by email
  useEffect(() => {
    const employerSubStatus = subs.find((u) => u.email === employer.user.email);
    setSubStatus(employerSubStatus || {});
  }, [subs]);

  const company = employer.employer;

  return (
    <div className="p-6 bg-white rounded-xl space-y-8 shadow-md border border-gray-100 h-screen overflow-y-scroll">
      {/* PROFILE HEADER */}
      <div className="flex items-start gap-6">
        {/* Profile image + restriction */}
        <div className="relative">
          {employer.user.enabled === false && (
            <div className="absolute -top-2 -right-2 w-8 h-8">
              <img src={restrict} alt="restricted" />
            </div>
          )}

          <img
            className="w-24 h-24 rounded-full border shadow-sm object-cover"
            src={
              employer.user.profilePicture || employer.employer.companyLogo
                ? employer.user.profilePicture || employer.employer.companyLogo
                : avater
            }
            alt="profile"
          />
        </div>

        {/* Company basic info */}
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-gray-900">
            {company.companyName}
          </h2>

          <p className="text-sm text-gray-500">
            Joined:{" "}
            <span className="font-medium text-gray-700">
              {moment(company.accountCreationDate).format("DD MMM YYYY")}
            </span>
          </p>

          <p className="text-sm text-gray-500">
            Subscription:{" "}
            <span className="font-medium text-blue-700">
              {subStatus?.planType || "None"}
            </span>
          </p>
        </div>
      </div>

      {/* ACTION BUTTON */}
      <div className="w-40">
        <CardBtn id={employer.user.id} restrict={employer.user.enabled} />
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
          <h5 className="text-sm text-gray-600">Jobs Posted</h5>
          <p className="text-2xl font-bold mt-1">
            {loading ? "..." : data.jobCount}
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
          <h5 className="text-sm text-gray-600">Applicants</h5>
          <p className="text-2xl font-bold mt-1">
            {loading ? "..." : data.applicantCount}
          </p>
        </div>
      </div>

      {/* FULL DETAILS SECTION */}
      <div className="border-t pt-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Company Details</h3>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <DetailItem label="Company Name" value={company.companyName} />
          <DetailItem label="Industry" value={company.industryType} />

          <DetailItem label="Company Size" value={company.companySize} />
          <DetailItem label="Country" value={company.country} />

          <DetailItem label="State" value={company.state} />
          <DetailItem label="Phone" value={company.companyPhone} />

          <DetailItem label="Email" value={company.email} />
          <DetailItem label="Website" value={company.companyWebsite} />

          <DetailItem label="Address" value={company.companyAddress} />
          <DetailItem label="Position" value={company.position} />
        </div>

        {/* Directors */}
        {company.namesOfDirectors?.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-800">Directors</h4>
            <ul className="list-disc ml-5 text-sm text-gray-700">
              {company.namesOfDirectors.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Certificates */}
        <div className="space-y-2">
          <h4 className="font-medium text-gray-800">Company Documents</h4>

          <DocLink title="CAC Certificate" url={company.caccertificate} />
          <DocLink
            title="Tax Clearance"
            url={company.taxClearanceCertificate}
          />
          <DocLink title="Company Memorandum" url={company.companyMemorandum} />
        </div>
      </div>
    </div>
  );
};

// Helper small components
const DetailItem = ({ label, value }) => (
  <p className="text-gray-600">
    <span className={`font-semibold text-gray-800 `}>{label}:</span>{" "}
    <span className="text-gray-700">{value || "—"}</span>
  </p>
);

const DocLink = ({ title, url }) => (
  <p className="text-sm">
    <span className="font-semibold">{title}: </span>
    {url ? (
      <a
        href={url}
        target="_blank"
        className="text-blue-600 underline"
        rel="noreferrer">
        View Document
      </a>
    ) : (
      <span className="text-gray-500">Not Provided</span>
    )}
  </p>
);

export default UserDetailEmployer;
