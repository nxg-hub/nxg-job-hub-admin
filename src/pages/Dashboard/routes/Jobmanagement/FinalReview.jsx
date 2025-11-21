import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../../../static/icons/wheel.svg";
import { fetchApplicants } from "../../../../Redux/ApplicantSlice";

const FinalReview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const talentID = useSelector((state) => state.jobSlice.talentID);
  const jobID = useSelector((state) => state.jobSlice.jobID);
  const applicants = useSelector((state) => state.ApplicantSlice.applicants);
  const loading = useSelector((state) => state.ApplicantSlice.loading);
  const error = useSelector((state) => state.ApplicantSlice.error);

  const [acceptSuccess, setAcceptSuccess] = useState(false);
  const [rejectSuccess, setRejectSuccess] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  useEffect(() => {
    dispatch(
      fetchApplicants(
        `/api/v1/admin/job-postings/${jobID}/get-all-applicants-for-a-job?page=0&size=1000&sort=string`
      )
    );
  }, []);

  const reviewedApplicant = applicants.find(
    (app) => app.applicant.id === talentID
  );

  const appDetails = reviewedApplicant?.techTalent;
  const appUser = reviewedApplicant?.applicant;
  const applyID = reviewedApplicant?.applicationId;

  const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));

  const handleAccept = async () => {
    setAcceptLoading(true);
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/v1/admin/${applyID}/review-applicant/accept`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
            Authorization: token.token,
          },
        }
      );

      if (res.status === 200) setAcceptSuccess(true);
    } catch {
      console.log("Error accepting applicant");
    } finally {
      setAcceptLoading(false);
    }
  };

  const handleReject = async () => {
    setRejectLoading(true);
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/v1/admin/${applyID}/review-applicant/reject`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
            Authorization: token.token,
          },
        }
      );

      if (res.status === 200) setRejectSuccess(true);
    } catch {
      console.log("Error rejecting applicant");
    } finally {
      setRejectLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 h-screen overflow-y-scroll pb-20">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-sm gap-2 px-4 py-4 text-gray-600 hover:text-black">
        <BsArrowLeft className="text-xl" />
        Back
      </button>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center mt-20">
          <img src={Spinner} className="w-16" alt="Loading" />
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="text-center text-lg text-red-600 mt-40">
          Something went wrong. Check internet connection.
        </div>
      )}

      {/* MAIN UI */}
      {!loading && !error && reviewedApplicant && (
        <div className="w-[90%] md:w-[70%] mx-auto">
          {/* Profile Section */}
          <div className="flex flex-col items-center mt-6">
            <img
              src={appDetails?.profilePicture}
              className="w-32 h-32 rounded-full object-cover shadow-md"
              alt="profile"
            />
            <h2 className="text-xl md:text-2xl font-semibold mt-4">
              {appUser?.firstName} {appUser?.lastName}
            </h2>
          </div>

          {/* Details Card */}
          <div className="bg-white shadow-md rounded-xl mt-8 p-6 space-y-5">
            <DetailItem label="Portfolio" link={appDetails?.portfolioLink} />

            <DetailItem label="Email" text={appDetails?.email} />

            <DetailItem
              label="Highest Qualification"
              text={appDetails?.highestQualification}
            />

            <DetailItem label="LinkedIn" link={appDetails?.linkedInUrl} />

            <DetailItem
              label="Cover Letter"
              link={appDetails?.coverletter}
              emptyText="No document provided"
            />

            <DetailItem
              label="Resume"
              link={appDetails?.resume}
              emptyText="No document provided"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-6 mt-10">
            <button
              onClick={handleAccept}
              className="bg-green-700 px-6 py-2 text-white rounded-lg hover:bg-green-800 transition">
              {acceptLoading ? "Processing..." : "Accept"}
            </button>

            <button
              onClick={handleReject}
              className="bg-red-600 px-6 py-2 text-white rounded-lg hover:bg-red-700 transition">
              {rejectLoading ? "Processing..." : "Reject"}
            </button>
          </div>
        </div>
      )}

      {/* SUCCESS MODALS */}
      {acceptSuccess && (
        <SuccessModal
          message="Application Accepted Successfully."
          onClose={() => setAcceptSuccess(false)}
        />
      )}

      {rejectSuccess && (
        <SuccessModal
          message="Application Rejected Successfully."
          onClose={() => setRejectSuccess(false)}
        />
      )}
    </div>
  );
};

/* ---------------- REUSABLE DETAIL COMPONENT ---------------- */
const DetailItem = ({ label, text, link, emptyText }) => (
  <div className="flex justify-between border-b pb-3 text-gray-700">
    <span className="font-semibold">{label}:</span>

    {link ? (
      <a
        href={link}
        target="_blank"
        className="text-blue-600 hover:underline break-all">
        View
      </a>
    ) : text ? (
      <span className="break-all">{text}</span>
    ) : (
      <span className="text-red-500 font-medium">
        {emptyText || "Not provided"}
      </span>
    )}
  </div>
);

/* -------------------- SUCCESS MODAL -------------------- */
const SuccessModal = ({ message, onClose }) => (
  <>
    <div
      className="fixed inset-0 bg-black bg-opacity-40 z-20"
      onClick={onClose}
    />

    <div className="fixed top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 bg-white px-8 py-6 rounded-lg shadow-lg w-[80%] md:w-[40%] text-center">
      <h2 className="text-lg font-semibold">{message}</h2>
      <button
        onClick={onClose}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
        Close
      </button>
    </div>
  </>
);

export default FinalReview;
