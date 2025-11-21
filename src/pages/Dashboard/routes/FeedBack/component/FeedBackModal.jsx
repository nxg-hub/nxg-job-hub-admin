// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useApiRequest } from "../../../../../utils/functions/fetchEndPoint";
// import { setFeedBackModalFalse } from "../../../../../Redux/FeedBackSlice";

// const FeedBackModal = () => {
//   //getting states from feedbackSlice
//   const dispatch = useDispatch();
//   const employerID = useSelector((state) => state.FeedBackSlice.employerID);
//   const { data, loading, error } = useApiRequest(
//     `/api/employer-feedback/employer/${employerID}/get-feedback`
//   );
//   const closeModal = () => {
//     dispatch(setFeedBackModalFalse());
//   };
//   return (
//     <>
//       <div className="w-[80%] z-30 absolute top-[50px] right-[10%]  ">
//         {loading ? (
//           <h2 className="text-center text-white font-bold m-auto">
//             Loading....
//           </h2>
//         ) : !loading && error ? (
//           <div className="w-[80%] m-auto mt-[300px] text-xl text-center text-white font-bold ">
//             <h2>Something went wrong. Check internet connecton</h2>
//           </div>
//         ) : (
//           <>
//             <div className="relative overflow-x-auto overflow-y-scroll h-[90vh] w-[90%] m-auto border rounded-lg bg-gray-50">
//               <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//                 <thead className="text-[14px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                   <tr>
//                     <th scope="col" className="px-6 py-3">
//                       Job Title
//                     </th>
//                     <th scope="col" className="px-6 py-3">
//                       Employment Status
//                     </th>
//                     <th scope="col" className="px-6 py-3">
//                       Observation
//                     </th>
//                     <th scope="col" className="px-6 py-3">
//                       Recommendation
//                     </th>
//                     <th scope="col" className="px-6 py-3">
//                       Interview Date
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {data.length > 0 ? (
//                     data.map((s, i) => (
//                       <tr
//                         className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
//                         key={i}>
//                         <td className="px-6 py-3">{s.jobTitle}</td>
//                         <td className="px-6 py-3">{s.employmentStatus}</td>
//                         <td className="px-6 py-3">{s.observation}</td>
//                         <td className={`px-6 py-3`}>{s.recommendation}</td>
//                         <td className="px-6 py-3">{s.interviewDate}</td>
//                       </tr>
//                     ))
//                   ) : (
//                     <h2 className="mt-5 text-center font-medium">
//                       No feedback yet from this employer.
//                     </h2>
//                   )}
//                 </tbody>
//               </table>
//               <button
//                 onClick={closeModal}
//                 className="bg-[#2596BE] m-auto absolute bottom-[30px] right-[20%] md:right-5 text-white text-sm px-2 md:px-3 py-2 mr-5 md:mr-0 rounded-lg">
//                 Close Modal
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//       <div
//         onClick={closeModal}
//         className="absolute z-20 bg-black bg-opacity-25 top-0 h-full left-0 right-0 bottom-0"
//       />
//     </>
//   );
// };

// export default FeedBackModal;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useApiRequest } from "../../../../../utils/functions/fetchEndPoint";
import { setFeedBackModalFalse } from "../../../../../Redux/FeedBackSlice";

const FeedBackModal = () => {
  const dispatch = useDispatch();
  const employerID = useSelector((state) => state.FeedBackSlice.employerID);
  const { data, loading, error } = useApiRequest(
    `/api/employer-feedback/employer/${employerID}/get-feedback`
  );

  const closeModal = () => {
    dispatch(setFeedBackModalFalse());
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeModal}
        className="fixed inset-0 z-20 bg-black bg-opacity-50"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-30 flex items-start justify-center pt-10">
        <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Employer Feedback
            </h2>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-800 font-bold text-lg"
              aria-label="Close Modal">
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center h-full p-10">
                <p className="text-gray-700 font-medium">Loading...</p>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-full p-10">
                <p className="text-red-500 font-medium">
                  Something went wrong. Please check your internet connection.
                </p>
              </div>
            ) : data.length === 0 ? (
              <div className="flex justify-center items-center h-full p-10">
                <p className="text-gray-700 font-medium">
                  No feedback yet from this employer.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto p-4">
                <table className="w-full text-left text-gray-700 border-collapse">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      <th className="px-4 py-2">Job Title</th>
                      <th className="px-4 py-2">Employment Status</th>
                      <th className="px-4 py-2">Observation</th>
                      <th className="px-4 py-2">Recommendation</th>
                      <th className="px-4 py-2">Interview Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-2">{item.jobTitle}</td>
                        <td className="px-4 py-2">{item.employmentStatus}</td>
                        <td className="px-4 py-2">{item.observation}</td>
                        <td className="px-4 py-2">{item.recommendation}</td>
                        <td className="px-4 py-2">{item.interviewDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="px-6 py-4 border-t flex justify-end">
            <button
              onClick={closeModal}
              className="bg-[#2596BE] text-white px-4 py-2 rounded-lg hover:bg-[#1e7fa0] transition">
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedBackModal;
