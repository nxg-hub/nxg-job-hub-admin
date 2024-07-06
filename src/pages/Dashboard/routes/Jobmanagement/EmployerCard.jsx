import { Axios } from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export const EmployerCard = ({ jobManagementData }) => {
  const url =
    "https://job-hub-91sr.onrender.com/api/v1/admin/employer?page=0&size=5";
  useEffect(() => {
    fetch(
      "https://job-hub-91sr.onrender.com/api/v1/admin/employer?page=0&size=5"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  }, []);
  return (
    <div className="job-posted space-y-2 ">
      {jobManagementData
        .filter((job) => {
          return job.category === "Employer";
        })
        .map((job) => (
          <div
            className="job-post-section bg-white lg:h-[20%] w-[95%] m-auto shadow-md p-[16px] shadow-[#00000040] mb-1 rounded-[8px]"
            key={job.id}>
            <div className="jobs-contents space-y-2 md:space-y-0  md:flex gap-[20px]">
              <div className="job-employer-container space-y-2 md:space-y-0  w-[120px]  ">
                <div className="job-poster ">
                  <img src={job.employerPics} alt={job.employerName} />
                </div>
                <div className="job-poster-detail w-full">
                  <h4 className="font-extrabold">{job.employerName}</h4>
                  <p className="font-semibold">{job.category}</p>
                </div>
              </div>
              <div className="posted-job-container space-y-2 md:space-y-0  w-[95%]">
                <h5 className="font-extrabold">
                  Job Category:
                  <span className="font-normal ml-1">{job.jobCategory}</span>
                </h5>
                <h5 className="font-extrabold">
                  Budget: <span className="font-normal">{job.budget}</span>
                </h5>
                <div className="job-description w-full">
                  <h5 className="font-extrabold">Description:</h5>
                  <p className="font-normal">{job.description}</p>
                </div>
                <Link className="float-end mr-[5%] mt-[-150px] underline text-blue-600">
                  {job.detailLink}
                </Link>
              </div>
            </div>
            <div className="job-posted-btn flex w-[60%] m-auto space-x-4 md:space-x-3 mt-10 md:mt-0">
              <button className="w-[45%] bg-[#3B862F] h-[32px] rounded-[8px] pb-[2px]  text-white hover:bg-green-800">
                Accept
              </button>
              <button className="decline-btn w-[45%] h-[32px] rounded-[8px] pb-[2px] border border-[#CB3C3C] text-[#CB3C3C] hover:text-red-900 hover:border-red-900">
                Decline
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default EmployerCard;
