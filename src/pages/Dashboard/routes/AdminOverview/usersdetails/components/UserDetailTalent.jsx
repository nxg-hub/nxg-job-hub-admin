import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSub } from "../../../../../../Redux/SubsriptionSlice";
import restrict from "../../../../../../static/icons/restric-icon.svg";
import CardBtn from "./CardBtn";

const UserDetailTalent = ({ talent }) => {
  const dispatch = useDispatch();
  const subs = useSelector((state) => state.SubsriptionSlice.sub);
  const [subStatus, setSubStatus] = useState({});

  useEffect(() => {
    //Calling the subscription endPoint to know what subscription plan a user is sunscribed to
    dispatch(fetchSub("/api/v1/admin/subscriptions"));
  }, []);

  useEffect(() => {
    //finding the users subscription by comparing emails
    const talentSubStatus = subs.find((user) => user.email === talent.email);
    setSubStatus(talentSubStatus || {});
  }, []);
  return (
    <div className="user-picsContent ">
      <div className="user-pics-container">
        <div className="user-pics-section">
          {/* Conditionally display the restriction icon */}
          {talent.enabled === false && (
            <div className="user-pics restrict">
              <img src={restrict} alt="Restriction-Icon" />
            </div>
          )}
          <div className="user-pics">
            <img
              className="rounded-full"
              src={talent.profilePicture}
              alt={talent.name}
            />
          </div>
        </div>
        <div className="user-pics-detail w-[150px] ">
          <p>
            Name : <span>{talent.name}</span>
          </p>
          <p>
            Date Joined : <span>{subStatus.subscriptionStarts}</span>
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
        <CardBtn id={talent.id} restrict={talent.enabled} />
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

export default UserDetailTalent;
