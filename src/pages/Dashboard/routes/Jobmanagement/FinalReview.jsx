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
  const [accepterror, setAcceptError] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);

  const [rejectSuccess, setRejectSuccess] = useState(false);
  const [rejectError, setRejectError] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  useEffect(() => {
    dispatch(
      fetchApplicants(
        `/api/v1/admin/job-postings/${jobID}/get-all-applicants-for-a-job?page=0&size=1000&sort=string`
      )
    );
  }, []);
  const reviewedApplicant = applicants.find((app) => {
    return app.applicant.id === talentID;
  });
  const appDetails = reviewedApplicant?.techTalent;
  const appDetails2 = reviewedApplicant?.applicant;
  const applyID = reviewedApplicant?.applicationId;

  const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));

  const handleAcceptApplication = async () => {
    setAcceptLoading(true);
    try {
      return await fetch(
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
      )
        .then((res) => {
          res.status === 200
            ? setAcceptSuccess(true) && setAcceptLoading(false)
            : null;
          return res.json();
        })
        .then((data) => {
          return data;
        });
    } catch (err) {
      setAcceptError(true);
      console.log(err);
    } finally {
      setAcceptLoading(false);
    }
  };

  const handleRejectApplication = async () => {
    setRejectLoading(true);
    try {
      return await fetch(
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
      )
        .then((res) => {
          res.status === 200
            ? setRejectSuccess(true) && setRejectLoading(false)
            : null;
          return res.json();
        })
        .then((data) => {
          return data;
        });
    } catch (err) {
      setRejectError(true);
      console.log(err);
    } finally {
      setRejectLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 h-full">
      <Link
        to={".."}
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          fontSize: "12px",
          fontWeight: "400",
          color: "#000",
          margin: "0 0 1rem 1rem",
          paddingTop: ".5rem",
        }}>
        <BsArrowLeft style={{ fontSize: "26px" }} />
        <span>Back</span>
      </Link>
      {loading ? (
        <img
          className="w-[30%] absolute left-[45%] top-[25%]"
          src={Spinner}
          alt="spinner"
        />
      ) : !loading && error ? (
        <div className="w-[80%] m-auto mt-[300px] text-xl">
          <h2>Something went wrong. Check internet connecton</h2>
        </div>
      ) : (
        <>
          <div className="mt-8 h-[150px] w-[250px] m-auto">
            <img
              className="rounded-full m-auto w-[100px] h-[130px]  md:w-[150px]"
              src={appDetails?.profilePicture}
              alt="pic"
            />
            <h3 className="text-center font-bold font-mono md:text-2xl mt-2">
              {appDetails2?.firstName}
            </h3>
          </div>
          <div className=" w-[95%] md:w-[90%] bg-white m-auto h-[400px] rounded-xl pt-4 mt-8">
            <h2 className="md:text-xl py-3 px-4 font-mono md:flex justify-between md:w-[70%] m-auto">
              <span className="font-bold font-mono">Porfolio Link:</span>
              <a
                className="text-blue-600"
                href={appDetails?.portfolioLink}
                target="_blank">
                {appDetails?.portfolioLink}
              </a>
            </h2>
            <h2 className="md:text-xl py-3 px-4 font-mono md:flex justify-between md:w-[70%] m-auto">
              <span className="font-bold font-mono">Email:</span>
              <span>{appDetails?.email}</span>
            </h2>
            <h2 className="md:text-xl py-3 px-4 font-mono md:flex justify-between md:w-[70%] m-auto">
              <span className="font-bold font-mono">
                Highest Qualification:
              </span>
              <span>{appDetails?.highestQualification}</span>
            </h2>
            <h2 className="md:text-xl py-3 px-4 font-mono md:flex justify-between md:w-[70%] m-auto">
              <span className="font-bold font-mono">LinkedIn Link:</span>
              {appDetails?.linkedInUrl ? (
                <a
                  className="text-blue-600"
                  href={appDetails?.linkedInUrl}
                  target="_blank">
                  View LinkedIn
                </a>
              ) : (
                <span>No link provided</span>
              )}
            </h2>
            <h2 className="md:text-xl py-3 px-4 font-mono md:flex justify-between md:w-[70%] m-auto">
              <span className="font-bold font-mono">Cover Letter:</span>
              {appDetails?.coverletter ? (
                <a
                  className="text-blue-600"
                  href={appDetails?.coverletter}
                  target="_blank">
                  View Cover Letter
                </a>
              ) : (
                <span className="capitalize font-bold">
                  No document provided
                </span>
              )}
            </h2>
            <h2 className="md:text-xl py-3 px-4 font-mono md:flex justify-between md:w-[70%] m-auto">
              <span className="font-bold font-mono">Resume:</span>

              {appDetails?.resume ? (
                <a
                  className="text-blue-600"
                  href={appDetails?.resume}
                  target="_blank">
                  View Resume
                </a>
              ) : (
                <span className="capitalize font-bold">
                  No document provided
                </span>
              )}
            </h2>
          </div>
          <div className="mt-5 py-6 space-x-4 m-auto md:w-[60%] text-center">
            <button
              onClick={handleAcceptApplication}
              className="bg-[#126704] text-white py-2 px-6 rounded-lg">
              {acceptLoading ? "loading.." : "Accept"}
            </button>
            <button
              onClick={handleRejectApplication}
              className="bg-[#FF2323] text-white py-2 px-6 rounded-lg">
              {rejectLoading ? "loading.." : "Reject"}
            </button>
          </div>
        </>
      )}
      {acceptSuccess && (
        <>
          <div className="absolute top-[100px] md:text-xl right-[20%] w-[50%] px-3 rounded-md md:w-[50%] m-auto bg-blue-200 z-30 h-[130px] md:h-[100px] py-5 text-center">
            <h2 className="font-bold">Application Accepted Successfully.</h2>
            <span
              onClick={() => {
                setAcceptSuccess(false);
              }}
              className="cursor-pointer font-bold relative bottom-[70px] left-[80px] md:left-[50%] md:bottom-[75px] lg:left-[45%] lg:bottom-[50px] text-red-600">
              x
            </span>
          </div>
          <div
            onClick={() => {
              setAcceptSuccess(false);
            }}
            className="absolute z-20 bg-black bg-opacity-25 top-0 h-full left-0 right-0 bottom-0"
          />
        </>
      )}

      {rejectSuccess && (
        <>
          <div className="absolute top-[100px] md:text-xl right-[20%] w-[50%] px-3 rounded-md md:w-[50%] m-auto bg-blue-200 z-30 h-[130px] md:h-[100px] py-5 text-center">
            <h2 className="font-bold">Application Rejected Successfully.</h2>
            <span
              onClick={() => {
                setRejectSuccess(false);
              }}
              className="cursor-pointer font-bold relative bottom-[70px] left-[80px] md:left-[50%] md:bottom-[75px] lg:left-[45%] lg:bottom-[50px] text-red-600">
              x
            </span>
          </div>
          <div
            onClick={() => {
              setRejectSuccess(false);
            }}
            className="absolute z-20 bg-black bg-opacity-25 top-0 h-full left-0 right-0 bottom-0"
          />
        </>
      )}
    </div>
  );
};

export default FinalReview;
