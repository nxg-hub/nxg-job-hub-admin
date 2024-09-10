import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Accepted from "./components/Accepted";
import InterviewForm from "./components/InterviewForm";
import Spinner from "../../../../static/icons/wheel.svg";
import { setInterviewFormFalse } from "../../../../Redux/InterviewSlice";

const Interview = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [noApplicant, setNoApplicant] = useState(false);
  const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));
  const [allApplicant, setAllApplicant] = useState([]);

  // getting all neccessary states from interviewSlice in the redux store
  const form = useSelector((state) => state.InterviewSlice.interviewForm);
  const closeForm = () => {
    dispatch(setInterviewFormFalse());
  };

  //fetching applicants for all jobs
  const fetchData = async () => {
    setLoading(true);
    try {
      await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/v1/admin/get-all-applicants-for-all-jobs?page=0&size=1000`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token.token,
          },
        }
      )
        .then((response) => {
          if (response.status === 404) {
            setNoApplicant(true);
          }
          return response.json();
        })
        .then((data) => {
          setAllApplicant(data);
          setLoading(false);
        });
    } catch (err) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  //filtering all accepted applicant
  const accepted = allApplicant?.filter((app) => {
    return (
      app.applicationStatus === "APPROVED" &&
      app.jobPosting.employerID === "ADMIN"
    );
  });
  return (
    <div className="h-full overflow-y-scroll">
      {loading ? (
        <img
          className="w-[30%] absolute left-[45%] top-[25%]"
          src={Spinner}
          alt="spinner"
        />
      ) : !loading && error && !noApplicant ? (
        <div>
          <h2>
            Something went wrong. <br /> Check Internet Connection.
          </h2>
        </div>
      ) : !loading && noApplicant ? (
        <h2 className="font-bold mt-11 text-center">
          You do not have any accepted applicants yet.
        </h2>
      ) : (
        <>
          <div className="w-[80%] m-auto mt-[50px] font-bold  md:text-3xl font-mono text-center">
            <h2>Set Up Interview With All Accepted Applicants</h2>
          </div>
          {accepted.map((app) => (
            <div className="mt-[50px]">
              <Accepted applicant={app} />
            </div>
          ))}
          {form && (
            <>
              <InterviewForm accepted={accepted} />
              <div
                onClick={closeForm}
                className="absolute z-20 bg-black bg-opacity-25 top-0 h-full left-0 right-0 bottom-0"
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Interview;
