import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSub } from "../../../../../../Redux/SubsriptionSlice";
import restrict from "../../../../../../static/icons/restric-icon.svg";
import CardBtn from "./CardBtn";
import moment from "moment";
import avater from "../../../../../../static/images/userIcon.png";

const UserDetailTalent = ({ talent }) => {
  const dispatch = useDispatch();
  const subs = useSelector((state) => state.SubsriptionSlice.sub);
  const [subStatus, setSubStatus] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [noApplicant, setNoApplicant] = useState(false);
  const [count, setCount] = useState(0);
  const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));
  const [allApplicant, setAllApplicant] = useState([]);
  // console.log(talent);
  useEffect(() => {
    //Calling the subscription endPoint to know what subscription plan a user is subscribed to
    dispatch(fetchSub("/api/v1/admin/subscriptions"));
  }, []);

  useEffect(() => {
    //finding the users subscription by comparing emails
    const talentSubStatus = subs.find((user) => {
      return user.email === talent.user.email;
    });
    setSubStatus(talentSubStatus || {});
  }, []);
  //fetching applicants for all jobs
  const fetchData = async () => {
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
        });
    } catch (err) {
      console.log(error);
      setError(true);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  //getting to know if the talent has applied for a job
  const applicantTrue = allApplicant?.find((user) => {
    return user.applicant.email === talent.user.email;
  });
  //Getting the application id
  const applyID = applicantTrue?.applicationId;

  //getting applicationCount via application id

  const fetchCount = async () => {
    setLoading(true);
    try {
      await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/v1/admin/count-by-applicant?applicantId=${applyID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token.token,
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setCount(data);
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
    allApplicant.length > 0 ? fetchCount() : null;
  }, [applyID]);
  return (
    <div className="user-picsContent ">
      <div className="user-pics-container">
        <div className="user-pics-section">
          {/* Conditionally display the restriction icon */}
          {talent.user.enabled === false && (
            <div className="user-pics restrict">
              <img src={restrict} alt="Restriction-Icon" />
            </div>
          )}
          <div className="user-pics">
            <img
              className="rounded-full"
              src={
                talent.user.profilePicture ||
                talent.techTalentUser.profilePicture
                  ? talent.user.profilePicture ||
                    talent.techTalentUser.profilePicture
                  : avater
              }
              alt={talent.user.name}
            />
          </div>
        </div>
        <div className="user-pics-detail w-[150px] ">
          <p>
            Name : <span>{talent.user.name}</span>
          </p>
          <p>
            Date Joined :{" "}
            <span>
              {moment(talent.techTalentUser.accountCreationDate).format(
                "DD/MM/YYYY"
              )}
            </span>
          </p>
          <p>
            Subscription : <span>{subStatus.planType}</span>
          </p>
        </div>
      </div>
      <div className="user-btn-section   mt-[-20px]">
        {/* <button className={talent.enabled === false ? "reactivate-btn" : ""}>
          {talent.enabled === false ? "Reactivate Account" : "Suspend Account"}
        </button> */}
        <CardBtn id={talent.user.id} restrict={talent.user.enabled} />
      </div>
      <section className="application">
        <div className="contracts user-jobs">
          <h5>Number of Job Applications</h5>
          <p>
            {loading ? <span className="text-xs">loading...</span> : `${count}`}
          </p>
        </div>
        {/* <div className="contracts">
          <h5>Number of Contracts Secured</h5>
          <p>49</p>
        </div>
        <div className="contracts">
          <h5>Number of Contracts Delievered</h5>
          <p>49</p>
        </div> */}
      </section>
    </div>
  );
};

export default UserDetailTalent;
