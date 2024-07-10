import React from "react";

const UserDetailEmployer = ({ employer }) => {
  return (
    <div className="user-picsContent">
      <div className="user-pics-container">
        <div className="user-pics-section">
          {/* Conditionally display the restriction icon */}
          {/* {employer.subGroup === "Reactivate" && (
            <div className="user-pics restrict">
              <img src={employer.restricIcon} alt="Restriction-Icon" />
            </div>
          )} */}
          <div className="user-pics">
            <img
              className="rounded-full"
              src={employer.userPics}
              alt={employer.userName}
            />
          </div>
        </div>
        <div className="user-pics-detail">
          <p>
            Name : <span>{employer.name}</span>
          </p>
          <p>
            Date Joined : <span>{employer.userDate}</span>
          </p>
          <p>
            Subscription : <span>{employer.subPlan}</span>
          </p>
        </div>
      </div>
      <div className="user-btn-section  mt-[-20px]">
        <button
          className={
            employer.subGroup === "Reactivate" ? "reactivate-btn" : ""
          }>
          {employer.subGroup === "Reactivate"
            ? "Reactivate Account"
            : "Suspend Account"}
        </button>
      </div>
    </div>
  );
};

export default UserDetailEmployer;
