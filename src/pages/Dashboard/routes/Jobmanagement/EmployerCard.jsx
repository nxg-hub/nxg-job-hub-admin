import React, { useEffect, useState } from "react";
import Spinner from "../../../../static/icons/wheel.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../../../Redux/JobSlice";
import ToggleText from "./components/ToggleText";
import ReactPaginate from "react-paginate";
import JobHandleBtn from "./components/JobHandleBtn";
import avater from "../../../../static/images/userIcon.png";

export const EmployerCard = ({ searchTerm }) => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobSlice.jobs);
  const loading = useSelector((state) => state.jobSlice.loading);
  const error = useSelector((state) => state.jobSlice.error);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(3);

  const filteredJob =
    searchTerm && jobs.length > 0
      ? jobs.filter((job) => job?.job_title?.toLowerCase().includes(searchTerm))
      : jobs;
  useEffect(() => {
    //fecthing All Jobs and displaying them in the ui
    dispatch(fetchJobs("/api/v1/admin/jobs?page=0&size=1000&sort=string"));
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * jobsPerPage;
  const indexOfFirstPost = indexOfLastPost - jobsPerPage;
  const currentJobs = filteredJob.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <div className="job-posted space-y-2 ">
      {loading ? (
        <img
          src={Spinner}
          className="w-[30%] md:w-[10%] h-[400px] absolute top-[250px] right-[35%] md:h-[500px] m-auto mt-[-150px]"
          alt="loading"
        />
      ) : !loading && error ? (
        <div className="w-[80%] m-auto mt-[300px] text-xl">
          <h2>Something went wrong. Check internet connecton</h2>
        </div>
      ) : (
        currentJobs.map((job) => (
          <div
            className="job-post-section bg-white h-[20%] w-[95%] m-auto shadow-md p-[16px] shadow-[#00000040] mb-1 rounded-[8px]"
            key={job.jobID}>
            <div className="jobs-contents space-y-2 md:space-y-0  md:flex gap-[10px]">
              <div className="job-employer-container space-y-2 md:space-y-0  w-[120px]  ">
                <div className="job-poster w-[60px] h-[60px] rounded-full bg-gray-400 ">
                  <img
                    className="rounded-full"
                    src={
                      job.employer_profile_pic
                        ? job.employer_profile_pic
                        : avater
                    }
                    alt="avatar"
                  />
                </div>
                <div className="job-poster-detail w-full">
                  <h4 className="font-extrabold capitalize">{`${job.employer_name}`}</h4>
                  <p className="font-semibold">{job.job_type}</p>
                </div>
              </div>
              <div className=" space-y-2 md:space-y-0  w-[95%]">
                <h5 className="font-extrabold">
                  Job Category:
                  <span className="font-normal capitalize ml-1">
                    {job.job_title}
                  </span>
                </h5>
                <h5 className="font-extrabold">
                  Budget: <span className="font-normal">{job.salary}</span>
                </h5>
                <ToggleText job={job} />
              </div>
            </div>
            <div className="job-posted-btn flex w-[60%] m-auto space-x-4 md:space-x-3 mt-10 md:mt-0">
              <JobHandleBtn id={job.jobID} status={job.jobStatus} />
            </div>
          </div>
        ))
      )}
      <ReactPaginate
        onPageChange={paginate}
        pageCount={Math.ceil(jobs.length / jobsPerPage)}
        previousLabel={"Prev"}
        nextLabel={"Next"}
        containerClassName={"pagination"}
        pageLinkClassName={"page-number"}
        previousLinkClassName={"page-number"}
        nextLinkClassName={"page-number"}
        activeLinkClassName="active bg-[#2596BE] px-3"
        className="flex w-[90%] m-auto justify-between pt-4"
      />
    </div>
  );
};

export default EmployerCard;
