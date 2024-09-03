import React, { useEffect, useState } from "react";
import restrict from "../../../../../../static/icons/restric-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchSub } from "../../../../../../Redux/SubsriptionSlice";
import CardBtn from "./CardBtn";

const UserDetailEmployer = ({ employer }) => {
  const dispatch = useDispatch();
  const subs = useSelector((state) => state.SubsriptionSlice.sub);
  const [subStatus, setSubStatus] = useState({});

  useEffect(() => {
    //Calling the subscription endPoint to know what subscription plan a user is sunscribed to
    dispatch(fetchSub("/api/v1/admin/subscriptions"));
  }, []);

  useEffect(() => {
    //finding the users subscription by comparing emails
    const employerSubStatus = subs.find(
      (user) => user.email === employer.user.email
    );
    setSubStatus(employerSubStatus || {});
  }, []);

  return (
    <div className="user-picsContent">
      <div className="user-pics-container">
        <div className="user-pics-section">
          {/* Conditionally display the restriction icon */}
          {employer.user.enabled === false && (
            <div className="user-pics restrict">
              <img src={restrict} alt="Restriction-Icon" />
            </div>
          )}
          <div className="user-pics">
            <img
              className="rounded-full"
              src={
                employer.user.profilePicture || employer.employer.profilePicture
              }
              alt={employer.user.userName}
            />
          </div>
        </div>
        <div className="user-pics-detail">
          <p>
            Name : <span>{employer.user.name}</span>
          </p>
          <p>
            Date Joined : <span>{subStatus.subscriptionStarts}</span>
          </p>
          <p>
            Subscription : <span>{subStatus.planType}</span>
          </p>
        </div>
      </div>
      <div className="user-btn-section  w-[80%] mt-[-20px]">
        <CardBtn id={employer.user.id} restrict={employer.user.enabled} />
      </div>
      <section className="application">
        <div className="contracts user-jobs">
          <h5>Number of Job Applications</h5>
          <p>49</p>
        </div>
        <div className="contracts">
          <h5>Number of Contracts Secured</h5>
          <p>49</p>
        </div>
        <div className="contracts">
          <h5>Number of Contracts Delievered</h5>
          <p>49</p>
        </div>
      </section>
    </div>
  );
};

export default UserDetailEmployer;
