import React from "react";

const JobStatusCard = ({ job }) => {
  return (
    <div className="w-full  py-5 bg-secondary border-2 border-[#fff] shadow-lg shadow-[#a0a0a0] rounded-lg ">
      <img
        className="w-[40%] m-auto rounded-full"
        src={job.companyLogo}
        alt=""
      />
      <article className="text-primary px-3 ">
        <h2 className="text-center  mt-3 ">
          ID:
          <span className="font-bold">{`${job.id} `}</span>
        </h2>
        <h2 className="text-center mt-3  ">
          Company: <span className="font-bold">{job.companyName}</span>
        </h2>
        <h2 className="text-center mt-3 ">
          Job Title: <span className="font-bold">{job.jobTitle}</span>
        </h2>
        <h2 className="text-center mt-3 ">
          Job Status:{" "}
          <span
            className={
              job.jobStatus === "ACCEPTED"
                ? "text-green-600 font-bold"
                : job.jobStatus === "REJECTED"
                ? "text-red-600 font-bold"
                : "text-gray-500 font-bold"
            }>{`${job.jobStatus}`}</span>
        </h2>
        <h2 className="text-center mt-3 ">
          Email: <span className="font-bold">{job.companyEmail}</span>
        </h2>
      </article>
    </div>
  );
};

export default JobStatusCard;
