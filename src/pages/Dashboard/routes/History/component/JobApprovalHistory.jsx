import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../../../static/icons/wheel.svg";
import { fetchJobHistory } from "../../../../../Redux/JobHistorySlice";

const JobApprovalHistory = () => {
  const dispatch = useDispatch();
  const history = useSelector((state) => state.JobHistorySlice.history);
  const loading = useSelector((state) => state.JobHistorySlice.loading);
  const error = useSelector((state) => state.JobHistorySlice.error);
  useEffect(() => {
    //fetching job approval/disapproval history and displaying it on the UI
    dispatch(
      fetchJobHistory(
        "/api/v1/admin/job-application-approval-history/all?page=0&size=10"
      )
    );
  }, []);
  // console.log(history);
  return (
    <div className="w-full">
      {loading ? (
        <img
          src={Spinner}
          className="w-[80%] md:[w-100%] h-[400px] absolute top-[250px] right-[0] md:h-[500px] m-auto mt-[-150px] ]"
          alt="loading"
        />
      ) : !loading && error ? (
        <div className="w-[80%] m-auto mt-[300px] text-xl">
          <h2>Something went wrong. Check internet connecton</h2>
        </div>
      ) : (
        <>
          <div className="relative overflow-x-auto overflow-y-scroll h-[80vh] w-[100%] m-auto border rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-[14px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Job ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Talent ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Talent Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Admin ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Employer ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Employer Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Approval Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {history.map((s) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={s.id}>
                    <th
                      scope="row"
                      className="mx-10 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {s.jobId}
                    </th>
                    <td className="px-6 py-4">{s.id}</td>
                    <td className="px-14 py-4">{s.techTalentName}</td>
                    <td className="mx-8 py-4">{s.adminId}</td>
                    <td className="px-6 py-4">{s.employerId}</td>
                    <td className={`px-20 py-4`}>{s.employerName}</td>
                    <td className="px-6 py-4">{s.approvalStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default JobApprovalHistory;
