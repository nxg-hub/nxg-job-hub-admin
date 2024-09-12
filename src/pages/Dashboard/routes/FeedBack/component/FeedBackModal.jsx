import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useApiRequest } from "../../../../../utils/functions/fetchEndPoint";
import { setFeedBackModalFalse } from "../../../../../Redux/FeedBackSlice";

const FeedBackModal = () => {
  //getting states from feedbackSlice
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
      <div className="w-[80%] z-30 absolute top-[50px] right-[10%]  ">
        {loading ? (
          <h2 className="text-center text-white font-bold m-auto">
            Loading....
          </h2>
        ) : !loading && error ? (
          <div className="w-[80%] m-auto mt-[300px] text-xl text-center text-white font-bold ">
            <h2>Something went wrong. Check internet connecton</h2>
          </div>
        ) : (
          <>
            <div className="relative overflow-x-auto overflow-y-scroll h-[90vh] w-[90%] m-auto border rounded-lg bg-gray-50">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-[14px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Job Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Employment Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Observation
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Recommendation
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Interview Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((s, i) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={i}>
                        <td className="px-6 py-3">{s.jobTitle}</td>
                        <td className="px-6 py-3">{s.employmentStatus}</td>
                        <td className="px-6 py-3">{s.observation}</td>
                        <td className={`px-6 py-3`}>{s.recommendation}</td>
                        <td className="px-6 py-3">{s.interviewDate}</td>
                      </tr>
                    ))
                  ) : (
                    <h2 className="mt-5 text-center font-medium">
                      No feedback yet from this employer.
                    </h2>
                  )}
                </tbody>
              </table>
              <button
                onClick={closeModal}
                className="bg-[#2596BE] m-auto absolute bottom-[30px] right-[20%] md:right-5 text-white text-sm px-2 md:px-3 py-2 mr-5 md:mr-0 rounded-lg">
                Close Modal
              </button>
            </div>
          </>
        )}
      </div>
      <div
        onClick={closeModal}
        className="absolute z-20 bg-black bg-opacity-25 top-0 h-full left-0 right-0 bottom-0"
      />
    </>
  );
};

export default FeedBackModal;
