import React from "react";

const UserDetailTalent = ({ talent }) => {
  return (
    <div className="user-picsContent">
      <div className="user-pics-container">
        <div className="user-pics-section">
          {/* Conditionally display the restriction icon */}
          {/* {talent.subGroup === "Reactivate" && (
            <div className="user-pics restrict">
              <img src={talent.restricIcon} alt="Restriction-Icon" />
            </div>
          )} */}
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
            Date Joined : <span>{}</span>
          </p>
          <p>
            Subscription : <span>{}</span>
          </p>
        </div>
      </div>
      <div className="user-btn-section  mt-[-20px]">
        <button
          className={talent.subGroup === "Reactivate" ? "reactivate-btn" : ""}>
          {talent.subGroup === "Reactivate"
            ? "Reactivate Account"
            : "Suspend Account"}
        </button>
      </div>
    </div>
  );
};

export default UserDetailTalent;
