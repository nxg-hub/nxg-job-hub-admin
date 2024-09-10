import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import SuggestedApplicantModal from "./components/SuggestedApplicantModal";
import { getJobID, getTalentID } from "../../../../Redux/JobSlice";

const ReviewJob = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));
  const [applicants, setApplicants] = useState([]);
  //fetching applicants
  useEffect(() => {
    dispatch(getJobID(id));
    fetch(
      `${
        import.meta.env.VITE_BASE_URL
      }/api/v1/admin/job-postings/${id}/get-all-applicants-for-a-job?page=0&size=1000&sort=string`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
          Authorization: token,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setApplicants(data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);
  const pendingApplicants = applicants?.filter(
    (app) => app.applicationStatus === "PENDING"
  );
  const handleReview = (id) => {
    dispatch(getTalentID(id));
  };
  return (
    <div className="h-[100vh] overflow-y-scroll pb-10">
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

      {pendingApplicants.length > 0 && (
        <div className="w-[85%] m-auto my-11">
          <h1 className="text-center text-sm md:text-xl font-extrabold capitalize">
            {`All Applicants For ${applicants[0]?.jobPosting.job_title} position at ${applicants[0]?.jobPosting.employer_name}  `}
          </h1>
        </div>
      )}
      {pendingApplicants.length > 0 ? (
        pendingApplicants?.map((app) => (
          <ul className="shadow-sm shadow-[#00000040] py-2 w-[90%] m-auto pl-5 flex items-center">
            <div className="w-[80%] flex gap-2 ">
              <img
                className="w-[64px] h-[64px] rounded-full"
                src={app.techTalent.profilePicture}
                alt={`profilePic`}></img>
              <li className="text-[16px] font- py-2">
                <h3>
                  Name:
                  <span className="font-bold px-1 capitalize">
                    {app.applicant.firstName}
                  </span>
                </h3>
                <h3>
                  Matching Score:
                  <span className="font-bold px-1">{app.matchingScore}</span>
                </h3>
              </li>
            </div>
            <div className="bg-[#2596BE] text-white txt-sm px-2 md:px-3 py-2 mr-5 md:mr-0  h-[40px] rounded-lg">
              <Link to={`../review-appliedtalent/${app.applicationId}`}>
                <button onClick={() => handleReview(app.applicant.id)}>
                  Review
                </button>
              </Link>
            </div>
          </ul>
        ))
      ) : (
        <div className="w-[80%] m-auto text-center mt-7">
          <h2 className="font-bold capitalize">
            No pending review for this job.
          </h2>
        </div>
      )}
      <SuggestedApplicantModal id={id} />
    </div>
  );
};

export default ReviewJob;
