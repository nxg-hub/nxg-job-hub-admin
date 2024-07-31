import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useSelector } from "react-redux";
import SuggestedApplicantModal from "./components/SuggestedApplicantModal";

const ReviewJob = () => {
  const [reviewJob, setReviewJob] = useState({});
  const { id } = useParams();
  const jobs = useSelector((state) => state.jobSlice.jobs);
  const loading = useSelector((state) => state.jobSlice.loading);

  useEffect(() => {
    const selectedJob = jobs.find((job) => job.jobID === id);
    setReviewJob(selectedJob || {});
  }, []);
  // const handleReview = (id) => {
  //   navigate(`../review-appliedtalent/${id}`);
  // };
  return (
    <div className="h-[100vh] overflow-y-scroll pb-10">
      <div className="w-[85%] m-auto my-11">
        <h1 className="text-center text-sm md:text-xl font-extrabold">
          All Applicants For JobPosition at companyName
        </h1>
      </div>

      <ul className="shadow-sm shadow-[#00000040] w-[90%] m-auto pl-5 flex items-center">
        <div className="w-[80%] flex ">
          {/* <img
            className="w-[64px] h-[64px] rounded-full"
            src={profilePicture}
            alt={usename}></img> */}
          <li className="text-[16px] font- py-2">
            <h3>
              <span className="font-bold">Name</span>
            </h3>
            <h3>
              <span className="font-bold">Skill</span>
            </h3>
          </li>
        </div>
        <div className="bg-[#2596BE] text-white txt-sm px-2 md:px-3 py-2 mr-5 md:mr-0  h-[40px] rounded-lg">
          <Link
          // to={`../review-appliedtalent/${user.id}`
          >
            <button>Review</button>
          </Link>
        </div>
      </ul>
      <SuggestedApplicantModal />
    </div>
  );
};

export default ReviewJob;
