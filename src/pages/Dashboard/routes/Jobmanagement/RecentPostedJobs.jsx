import moment from "moment/moment";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApiRequest } from "../../../../utils/functions/fetchEndPoint";
import DeleteJobBtn from "./components/DeleteJobBtn";

const RecentPostedJobs = ({ job }) => {
  const navigate = useNavigate();
  const { data: applicantCoount } = useApiRequest(
    `/api/v1/admin/${job.jobID}/applicants/count`
  );
  const handleReview = function () {
    //navigating to the review job page
    navigate(`/review-posted-job/${job.jobID}`);
  };
  return (
    <div className="w-[90%] md:w-[90%] m-auto bg-white  rounded-md py-4 pl-4 mt-4">
      <div className="w-[90%]">
        <h2 className="font-bold capitalize">Job Type:{job.job_title}</h2>
        <h2 className="font-bold">Job Description:{job.job_description}</h2>
      </div>
      <div className="lg:flex lg:justify-between w-[90%]">
        <div>
          <h3 className="font-semibold">
            Number of Applications:<strong>{applicantCoount}</strong>
          </h3>
        </div>
        <div className="md:flex md:justify-between md:gap-5">
          <p className="text-sm">
            Created at: {moment(job.createdAt).format("DD/MM/YYYY")}
          </p>
          <p className="text-sm">
            Expires at: {moment(job.deadline).format("DD/MM/YYYY")}
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-3 justify-between m-auto">
        <button
          onClick={handleReview}
          className="bg-[#006A90] text-white py-2 px-6 rounded-md">
          Review Application
        </button>
        <DeleteJobBtn jobID={job.jobID} />
      </div>
    </div>
  );
};

export default RecentPostedJobs;
