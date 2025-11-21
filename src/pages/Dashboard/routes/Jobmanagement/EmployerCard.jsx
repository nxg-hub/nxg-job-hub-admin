import React, { useEffect, useState } from "react";
import Spinner from "../../../../static/icons/wheel.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../../../Redux/JobSlice";
import ReactPaginate from "react-paginate";
import JobHandleBtn from "./components/JobHandleBtn";
import avater from "../../../../static/images/userIcon.png";

export const EmployerCard = ({ searchTerm, statusFilter }) => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobSlice.jobs);

  const loading = useSelector((state) => state.jobSlice.loading);
  const error = useSelector((state) => state.jobSlice.error);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  let filteredJob = jobs;

  // ✅ Filter by status
  if (statusFilter !== "ALL") {
    filteredJob = filteredJob.filter((job) => job.jobStatus === statusFilter);
  }

  // ✅ Search filter
  if (searchTerm.trim()) {
    filteredJob = filteredJob.filter(
      (job) =>
        job.job_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.employer_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  useEffect(() => {
    dispatch(fetchJobs("/api/v1/admin/jobs?page=0&size=10000&sort=string"));
  }, []);

  // ✅ Paginate
  const indexOfLast = currentPage * jobsPerPage;
  const indexOfFirst = indexOfLast - jobsPerPage;
  const currentJobs = filteredJob.slice(indexOfFirst, indexOfLast);

  const paginate = ({ selected }) => setCurrentPage(selected + 1);

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="flex justify-center py-20">
          <img src={Spinner} className="w-16 h-16 " alt="loading" />
        </div>
      ) : error ? (
        <div className="text-center text-red-600 py-10">
          Something went wrong. Check your internet connection.
        </div>
      ) : (
        currentJobs.map((job) => (
          <div
            key={job.jobID}
            className="bg-white rounded-xl shadow-md p-5 w-[96%] mx-auto border border-gray-100">
            {/* HEADER AREA */}
            <div className="flex items-center justify-between">
              {/* EMPLOYER INFO */}
              <div className="flex items-center gap-3">
                <img
                  src={job.employer_profile_pic || avater}
                  alt="avatar"
                  className="w-12 h-12 rounded-full object-cover border"
                />

                <div>
                  <p className="text-sm font-semibold">{job.employer_name}</p>
                  <p className="text-xs text-gray-500">{job.job_location}</p>
                </div>
              </div>

              {/* STATUS BADGE */}
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  job.jobStatus === "ACCEPTED"
                    ? "bg-green-100 text-green-700"
                    : job.jobStatus === "PENDING"
                    ? "bg-yellow-100 text-yellow-700"
                    : job.jobStatus === "SUSPENDED"
                    ? "bg-gray-100 text-gray-700"
                    : "bg-red-100 text-red-700"
                }`}>
                {job.jobStatus}
              </span>
            </div>

            {/* JOB TITLE */}
            <div className="mt-4 flex justify-between items-center">
              <h3 className="text-lg font-bold">{job.job_title}</h3>

              {/* ACTION BUTTONS INLINE */}
              <JobHandleBtn id={job.jobID} status={job.jobStatus} />
            </div>

            {/* JOB META INFO */}
            <div className="flex flex-wrap items-center text-sm text-gray-600 gap-x-6 gap-y-2 mt-3">
              <p>
                <span className="font-semibold">Type:</span> {job.job_type}
              </p>
              <p>
                <span className="font-semibold">Salary:</span> ₦{job.salary}
              </p>
              <p>
                <span className="font-semibold">Deadline:</span>{" "}
                {new Date(job.deadline).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Posted:</span>{" "}
                {new Date(job.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* TAGS */}
            {job.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {job.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* COLLAPSIBLE DETAILS */}
            <details className="mt-5 group">
              <summary className="cursor-pointer text-blue-600 font-medium">
                View Job Details
              </summary>

              <div className="mt-4 space-y-4 text-sm leading-relaxed">
                {/* DESCRIPTION */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Job Description:
                  </h4>
                  <p className="text-gray-700 whitespace-pre-line">
                    {job.job_description}
                  </p>
                </div>

                {/* REQUIREMENTS */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Requirements:
                  </h4>
                  <p className="text-gray-700 whitespace-pre-line">
                    {job.requirements}
                  </p>
                </div>

                {/* COMPANY BIO */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Company Bio:
                  </h4>
                  <p className="text-gray-700 whitespace-pre-line">
                    {job.company_bio}
                  </p>
                </div>
              </div>
            </details>
          </div>
        ))
      )}

      {/* PAGINATION */}
      <ReactPaginate
        onPageChange={paginate}
        pageCount={Math.ceil(filteredJob.length / jobsPerPage)}
        previousLabel={"Prev"}
        nextLabel={"Next"}
        containerClassName="flex justify-center gap-3 mt-4"
        pageClassName="px-3 py-1 border rounded"
        activeClassName="bg-[#2596be] text-white"
        previousClassName="px-3 py-1 border rounded"
        nextClassName="px-3 py-1 border rounded"
      />
    </div>
  );
};

export default EmployerCard;
