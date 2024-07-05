import React from "react";
import { NavLink } from "react-router-dom";

export default function UsersDetailsCard({
  talentUsers,
  handleClickNewAccount,
}) {
  return (
    <div className="app-users">
      {talentUsers
        .filter((user) => {
          return user.category === "talent";
        })
        .map((user) => (
          <div className="user-card" key={user.id}>
            <div className="user-plan">
              <span>{user.subPlan}</span>
            </div>
            <div className="user-contents">
              <div className="user-pics-section">
                {/* Conditionally display the restriction icon */}
                {user.subGroup === "Reactivate" && (
                  <div className="user-pics restrict">
                    <img src={user.restricIcon} alt="Restriction-Icon" />
                  </div>
                )}
                <div className="user-pics">
                  <img src={user.userPics} alt={user.userName} />
                </div>
              </div>
              <div className="user-details-contents">
                <h5>{user.userName}</h5>
                <p>{user.userType}</p>
                <div className="user-link">
                  <NavLink
                    end
                    to={
                      user.subGroup !== "New account"
                        ? `userdetail/${user.id}`
                        : `/newaccount/${user.id}`
                    }>
                    {user.detailLink}
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="user-btn-section">
              <button
                onClick={() => handleClickNewAccount(user.subGroup, user.id)}
                className={
                  user.subGroup === "Reactivate" ||
                  user.subGroup === "New account"
                    ? "reactivate-btn"
                    : ""
                }>
                {user.subGroup === "Reactivate"
                  ? "Reactivate"
                  : user.subGroup === "Suspend"
                  ? "Suspend"
                  : "New Account"}
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
