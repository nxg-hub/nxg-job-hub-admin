// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Accepted from "./components/Accepted";
// import InterviewForm from "./components/InterviewForm";
// import Spinner from "../../../../static/icons/wheel.svg";
// import { setInterviewFormFalse } from "../../../../Redux/InterviewSlice";

// const Interview = () => {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [noApplicant, setNoApplicant] = useState(false);
//   const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));
//   const [allApplicant, setAllApplicant] = useState([]);

//   // getting all neccessary states from interviewSlice in the redux store
//   const form = useSelector((state) => state.InterviewSlice.interviewForm);
//   const closeForm = () => {
//     dispatch(setInterviewFormFalse());
//   };

//   //fetching applicants for all jobs
//   const fetchData = async () => {
//     setLoading(true);
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
//     fetchData();
//   }, []);
//   //filtering all accepted applicant
//   const accepted = allApplicant?.filter((app) => {
//     return (
//       app.applicationStatus === "APPROVED" &&
//       app.jobPosting.employerID === "ADMIN"
//     );
//   });
//   return (
//     <div className="h-full overflow-y-scroll">
//       {loading ? (
//         <img
//           className="w-[30%] md:w-[10%] h-[400px] absolute top-[200px] right-[35%] md:h-[500px] m-auto mt-[-150px]"
//           src={Spinner}
//           alt="spinner"
//         />
//       ) : !loading && error && !noApplicant ? (
//         <div>
//           <h2>
//             Something went wrong. <br /> Check Internet Connection.
//           </h2>
//         </div>
//       ) : !loading && noApplicant ? (
//         <h2 className="font-bold mt-11 text-center">
//           You do not have any accepted applicants yet.
//         </h2>
//       ) : (
//         <>
//           <div className="w-[80%] m-auto mt-[50px] font-bold  md:text-3xl font-mono text-center">
//             <h2>Set Up Interview With All Accepted Applicants</h2>
//           </div>
//           {accepted.map((app) => (
//             <div className="mt-[50px]">
//               <Accepted applicant={app} />
//             </div>
//           ))}
//           {form && (
//             <>
//               <InterviewForm accepted={accepted} />
//               <div
//                 onClick={closeForm}
//                 className="absolute z-20 bg-black bg-opacity-25 top-0 h-full left-0 right-0 bottom-0"
//               />
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Interview;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Accepted from "./components/Accepted";
// import InterviewForm from "./components/InterviewForm";
// import Spinner from "../../../../static/icons/wheel.svg";
// import { setInterviewFormFalse } from "../../../../Redux/InterviewSlice";

// const Interview = () => {
//   const dispatch = useDispatch();

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [noApplicant, setNoApplicant] = useState(false);
//   const [allApplicant, setAllApplicant] = useState([]);

//   const token = JSON.parse(localStorage.getItem("ACCESSTOKEN"));
//   // const formOpen = useSelector((state) => state.InterviewSlice.interviewForm);
//   const [formOpen, setFormOpen] = useState(false);
//   const closeForm = () => setFormOpen(false);

//   // Fetch all applicants
//   const fetchApplicants = async () => {
//     try {
//       setLoading(true);

//       const response = await fetch(
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
//       );

//       if (response.status === 404) {
//         setNoApplicant(true);
//         setLoading(false);
//         return;
//       }

//       const data = await response.json();
//       setAllApplicant(data);
//     } catch (err) {
//       console.log(err);
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchApplicants();
//   }, []);

//   // Filter accepted applicants
//   const accepted = allApplicant?.filter(
//     (app) =>
//       app.applicationStatus === "APPROVED" &&
//       app.jobPosting?.employerID === "ADMIN"
//   );

//   return (
//     <div className="h-full overflow-y-auto py-8">
//       {/* Loading State */}
//       {loading && (
//         <div className="flex justify-center items-center h-[70vh]">
//           <img src={Spinner} alt="Loading..." className="w-16" />
//         </div>
//       )}

//       {/* Error State */}
//       {!loading && error && !noApplicant && (
//         <div className="text-center mt-10 text-red-600 font-semibold">
//           <p>Something went wrong.</p>
//           <p>Check your internet connection and try again.</p>
//         </div>
//       )}

//       {/* Empty State */}
//       {!loading && noApplicant && (
//         <div className="text-center font-semibold mt-10 text-gray-600">
//           You do not have any accepted applicants yet.
//         </div>
//       )}

//       {/* Main UI */}
//       {!loading && !error && !noApplicant && (
//         <>
//           <h2 className="w-[80%] mx-auto text-center mt-4 font-bold text-2xl md:text-3xl font-mono">
//             Set Up Interview With Accepted Applicants
//           </h2>

//           <div className="mt-10 space-y-8">
//             {accepted.map((app, index) => (
//               <Accepted
//                 key={app.applicant?.id || index}
//                 applicant={app}
//                 setFormOpen={setFormOpen}
//               />
//             ))}
//           </div>

//           {/* Overlay + Form Modal */}
//           {formOpen && (
//             <>
//               <InterviewForm accepted={accepted} setFormOpen={setFormOpen} />

//               <div
//                 className="fixed inset-0 bg-black bg-opacity-30 z-10"
//                 onClick={closeForm}
//               />
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Interview;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Accepted from "./components/Accepted";
import InterviewForm from "./components/InterviewForm";
import Spinner from "../../../../static/icons/wheel.svg";

const Interview = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [noApplicant, setNoApplicant] = useState(false);
  const [allApplicants, setAllApplicants] = useState([]);
  const [activeTab, setActiveTab] = useState("APPROVED");
  const [formOpen, setFormOpen] = useState(false);

  const token = JSON.parse(localStorage.getItem("ACCESSTOKEN"));
  const closeForm = () => setFormOpen(false);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/v1/admin/get-all-applicants-for-all-jobs?page=0&size=100000`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token.token,
          },
        }
      );

      if (response.status === 404) {
        setNoApplicant(true);
        return;
      }

      const data = await response.json();
      setAllApplicants(data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const statuses = ["APPROVED", "PENDING", "REJECTED"];
  const filteredApplicants = allApplicants.filter(
    (app) =>
      app.applicationStatus === activeTab &&
      app.jobPosting?.employerID === "ADMIN"
  );
  return (
    <div className="h-full py-8">
      {loading && (
        <div className="flex justify-center items-center h-[70vh]">
          <img src={Spinner} alt="Loading..." className="w-16" />{" "}
        </div>
      )}
      {!loading && error && !noApplicant && (
        <div className="text-center mt-10 text-red-600 font-semibold">
          <p>Something went wrong.</p>
          <p>Check your internet connection and try again.</p>
        </div>
      )}
      {!loading && noApplicant && (
        <div className="text-center font-semibold mt-10 text-gray-600">
          No applicants found.
        </div>
      )}
      {!loading && !error && !noApplicant && (
        <>
          <h2 className="text-center font-bold text-2xl md:text-3xl mb-6">
            Applicants
          </h2>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-6">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setActiveTab(status)}
                className={`px-4 py-2 rounded-md font-semibold ${
                  activeTab === status
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}>
                {status.charAt(0) + status.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          {/* Applicant List */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto px-4">
            {filteredApplicants.length === 0 ? (
              <p className="text-center text-gray-600">
                No applicants in this category.
              </p>
            ) : (
              filteredApplicants.map((app) => (
                <div
                  key={app.applicationId}
                  className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
                  <Accepted
                    key={app.applicant?.id || index}
                    applicant={app}
                    setFormOpen={setFormOpen}
                  />
                </div>
              ))
            )}
          </div>

          {/* Interview Form Modal */}
          {formOpen && (
            <>
              <InterviewForm
                accepted={filteredApplicants}
                setFormOpen={setFormOpen}
              />
              <div
                className="fixed inset-0 bg-black bg-opacity-30 z-10"
                onClick={closeForm}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Interview;
