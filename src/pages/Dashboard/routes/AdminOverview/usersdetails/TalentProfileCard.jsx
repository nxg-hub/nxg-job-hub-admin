import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Spinner from "../../../../../static/icons/wheel.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchTalent } from "../../../../../Redux/TalentSlice";
import CardBtn from "./components/CardBtn";
import restrict from "../../../../../static/icons/restric-icon.svg";
import avater from "../../../../../static/images/userIcon.png";

export default function TalentProfileCard({
  handleClickNewAccount,
  searchTerm,
}) {
  const dispatch = useDispatch();
  const talent = useSelector((state) => state.TalentSlice.talents);
  const loading = useSelector((state) => state.TalentSlice.loading);
  const error = useSelector((state) => state.TalentSlice.error);

  const filteredTalent =
    searchTerm && talent.length > 0
      ? talent.filter((talent) =>
          talent.techTalentUser?.jobInterest?.toLowerCase().includes(searchTerm)
        )
      : talent;
  useEffect(() => {
    //fetching employers and displaying them on the ui
    dispatch(fetchTalent("/api/v1/admin/techTalent?page=0&size=1000"));
  }, []);
  // console.log(talent);
  return (
    <div className="app-users">
      {loading ? (
        <img
          src={Spinner}
          className="w-[30%] md:w-[10%] h-[400px] absolute top-[200px] right-[35%] md:h-[500px] m-auto mt-[-150px]"
          alt="loading"
        />
      ) : (
        filteredTalent.map((user) => (
          <div className="user-card" key={user.user.id}>
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
                      //if no profice picture, display default avatar
                      user.techTalentUser.profilePicture ||
                      user.user.profilePicture
                        ? user.techTalentUser.profilePicture ||
                          user.user.profilePicture
                        : avater
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
                        ? `userdetail/${user.user.id}/${user.user.userType}`
                        : `/newaccount/${user.user.id}`
                    }>
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
