import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../../static/icons/wheel.svg";
import avater from "../../../../static/images/userIcon.png";
import { MdOutlineSearch } from "react-icons/md";
import ReactPaginate from "react-paginate";
import ExternalJobhandleBtn from "./component/ExternalJobhandleBtn";
import { fetchExternalJobs } from "../../../../Redux/ExternalJobSlice";
import { useNavigate } from "react-router-dom";

const ExternalJobs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.ExternalJobSlice.externalJobs);
  const loading = useSelector((state) => state.ExternalJobSlice.loading);
  const error = useSelector((state) => state.ExternalJobSlice.error);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 3;

  useEffect(() => {
    dispatch(fetchExternalJobs("/api/v1/job-posts"));
  }, [dispatch]);

  // Filter jobs by status
  let filteredJobs =
    statusFilter === "ALL"
      ? jobs
      : jobs.filter((job) => job.jobStatus === statusFilter);

  // Filter by search
  if (searchTerm.trim()) {
    filteredJobs = filteredJobs.filter((job) =>
      job.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Pagination
  const indexOfLast = currentPage * jobsPerPage;
  const indexOfFirst = indexOfLast - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirst, indexOfLast);

  const paginate = ({ selected }) => setCurrentPage(selected + 1);

  return (
    <div className="overflow-y-scroll h-full p-4 space-y-6">
      {/* Filters: Search + Status */}

      <div className="flex  items-center gap-4 md:w-[60%]">
        <div className="flex items-center bg-gray-100 rounded-lg px-3 md:w-[60%] py-2 w-[240px]">
          <MdOutlineSearch className="text-gray-500 text-lg" />
          <input
            type="search"
            placeholder="Search by jobtitle or company name"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            className="w-full bg-transparent outline-none ml-2"
          />
        </div>

        {/* POST JOB BUTTON */}
        <button
          onClick={() => navigate("/jobmanagement/postjob")}
          className="px-5 py-2 bg-[#2596be] text-white rounded-lg font-medium shadow hover:bg-[#1e7fa0]">
          Post Job
        </button>

        {/* JOB STATUS FILTER */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border bg-white shadow-sm outline-none text-sm">
          <option value="ALL">All Jobs</option>
          <option value="PENDING">Pending</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="REJECTED">Rejected</option>
          <option value="SUSPENDED">Suspended</option>
        </select>
      </div>
      {loading ? (
        <div className="flex justify-center py-20">
          <img src={Spinner} alt="loading" className="w-16 h-16" />
        </div>
      ) : error ? (
        <div className="text-center text-red-600 py-10">
          Something went wrong. Check your internet connection.
        </div>
      ) : currentJobs.length === 0 ? (
        <div className="text-center text-gray-500 py-10">No jobs found.</div>
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
            <div className="mt-4 flex justify-between  items-center">
              <h3 className="text-lg font-bold">{job.jobTitle}</h3>
              {/* ACTION BUTTONS INLINE */}
              <ExternalJobhandleBtn id={job.id} status={job.jobStatus} />
            </div>

            {/* JOB META INFO */}
            <div className="flex flex-wrap items-center text-sm text-gray-600 gap-x-6 gap-y-2 mt-3">
              <p>
                <span className="font-semibold">Type:</span> {job.jobType}
              </p>
              <p>
                <span className="font-semibold">Salary:</span> ₦{job.salary}
              </p>
              <p>
                <span className="font-semibold">Deadline:</span>
                {new Date(job.deadline).toLocaleDateString()}
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
                    {job.jobDescription}
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
                    {job.companyBio}
                  </p>
                </div>
              </div>
            </details>
          </div>
        ))
      )}
      {/* Pagination */}
      {filteredJobs.length > jobsPerPage && (
        <ReactPaginate
          onPageChange={paginate}
          pageCount={Math.ceil(filteredJobs.length / jobsPerPage)}
          previousLabel="Prev"
          nextLabel="Next"
          containerClassName="flex justify-center gap-2 mt-4"
          pageClassName="px-3 py-1 border rounded"
          activeClassName="bg-blue-500 text-white"
          previousClassName="px-3 py-1 border rounded"
          nextClassName="px-3 py-1 border rounded"
        />
      )}
    </div>
  );
};

export default ExternalJobs;
