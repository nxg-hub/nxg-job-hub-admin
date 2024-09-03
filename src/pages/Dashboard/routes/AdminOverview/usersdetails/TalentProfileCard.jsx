import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Spinner from "../../../../../static/icons/wheel.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchTalent } from "../../../../../Redux/TalentSlice";
import CardBtn from "./components/CardBtn";
import restrict from "../../../../../static/icons/restric-icon.svg";

export default function TalentProfileCard({ handleClickNewAccount }) {
  const dispatch = useDispatch();
  const talent = useSelector((state) => state.TalentSlice.talents);
  const loading = useSelector((state) => state.TalentSlice.loading);
  const error = useSelector((state) => state.TalentSlice.error);

  useEffect(() => {
    //fetching employers and displaying them on the ui
    dispatch(fetchTalent("/api/v1/admin/techTalent?page=0&size=1000"));
  }, []);
<<<<<<< HEAD
  console.log(talent);

=======
  // console.log(talent);
>>>>>>> 3353cd88be71bba2ae172d491f72db1af1320dcf
  return (
    <div className="app-users">
      {loading ? (
        <img
          src={Spinner}
          className="w-[100%] h-[500px] md:h-[500px] m-auto"
          alt="loading"
        />
      ) : (
<<<<<<< HEAD
        talent?.map((user) => (
          <div className="user-card" key={user.id}>
=======
        talent.map((user) => (
          <div className="user-card" key={user.user.id}>
>>>>>>> 3353cd88be71bba2ae172d491f72db1af1320dcf
            <div className="user-plan">
              <span>{user.user.subPlan}</span>
            </div>
            <div className="user-contents">
              <div className="user-pics-section">
                {/* Conditionally display the restriction icon */}
                {/* {user.enabled === false && (
                  <div className="user-pics  m-auto">
                    <img src={restrict} alt="Restriction-Icon" />
                  </div>
                )} */}
                <div className="user-pics">
                  {/* Conditionally display the restriction icon */}
                  {user.user.enabled === false && (
                    <div className="user-pics absolute m-auto">
                      <img src={restrict} alt="Restriction-Icon" />
                    </div>
                  )}
                  <img
                    className="rounded-full"
                    src={
                      user.techTalentUser.profilePicture ||
                      user.user.profilePicture
                    }
                    alt={user.user.userName}
                  />
                </div>
              </div>
              <div className="user-details-contents">
                <h5>{user.user.name}</h5>
                <p>{user.techTalentUser.jobInterest}</p>
                <div className="user-link">
                  <NavLink
                    end
                    to={
                      user.subGroup !== "New account"
<<<<<<< HEAD
                        ? `userdetail/${user.id}/${user.userType}`
                        : `/newaccount/${user.id}`
                    }
                  >
=======
                        ? `userdetail/${user.user.id}/${user.user.userType}`
                        : `/newaccount/${user.user.id}`
                    }>
>>>>>>> 3353cd88be71bba2ae172d491f72db1af1320dcf
                    <p className="underline">View Details</p>
                  </NavLink>
                </div>
              </div>
            </div>
            <div className=" !w-[98%] m-auto mt-4">
              <CardBtn id={user.user.id} restrict={user.user.enabled} />
            </div>
          </div>
        ))
      )}
      {!loading && error ? <h1>Error</h1> : null}
    </div>
  );
}
