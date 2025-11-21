import React from "react";
import { useDispatch } from "react-redux";
import { setInterviewFormTrue } from "../../../../../Redux/InterviewSlice";

const Accepted = ({ applicant, setFormOpen }) => {
  const applicantDetails = applicant.applicant;
  const applicantTalent = applicant.techTalent;
  const applicantJobDetail = applicant.jobPosting;
  const dispatch = useDispatch();
  const openForm = (id) => {
    dispatch(setInterviewFormTrue(id));
  };
  return (
    <div className="w-[90%] m-auto mb-4 bg-white shadow-md rounded-xl p-4 flex flex-col md:flex-row items-start gap-4 relative">
      {/* Profile Image */}
      <img
        className="h-[70px] w-[70px] rounded-full object-cover border"
        src={applicantTalent?.profilePicture || "/placeholder-profile.png"}
        alt="profilePic"
      />

      {/* Info */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="font-semibold capitalize">
            {applicantDetails?.firstName}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Role</p>
          <p className="font-semibold capitalize">
            {applicantJobDetail?.job_title}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Job Location</p>
          <p className="font-semibold capitalize">
            {applicantJobDetail?.job_location}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-semibold break-all">{applicantDetails?.email}</p>
        </div>
      </div>

      {/* Button */}
      {applicant.applicationStatus === "APPROVED" && (
        <button
          onClick={() => {
            openForm(applicantDetails?.id);
            setFormOpen(true);
          }}
          className="md:absolute md:right-4 md:top-4 bg-[#2596BE] hover:bg-[#1f7fa0] transition text-white text-sm px-4 py-2 rounded-lg">
          Set Up Interview
        </button>
      )}
    </div>
  );
};

export default Accepted;
