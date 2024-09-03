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
  console.log(talent);

  return (
    <div className="app-users">
      {loading ? (
        <img
          src={Spinner}
          className="w-[100%] h-[500px] md:h-[500px] m-auto"
          alt="loading"
        />
      ) : (
        talent?.map((user) => (
          <div className="user-card" key={user.id}>
            <div className="user-plan">
              <span>{user.subPlan}</span>
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
                  {user.enabled === false && (
                    <div className="user-pics absolute m-auto">
                      <img src={restrict} alt="Restriction-Icon" />
                    </div>
                  )}
                  <img
                    className="rounded-full"
                    src={user.profilePicture}
                    alt={user.userName}
                  />
                </div>
              </div>
              <div className="user-details-contents">
                <h5>{user.name}</h5>
                <p>{user.userType}</p>
                <div className="user-link">
                  <NavLink
                    end
                    to={
                      user.subGroup !== "New account"
                        ? `userdetail/${user.id}/${user.userType}`
                        : `/newaccount/${user.id}`
                    }
                  >
                    <p className="underline">View Details</p>
                  </NavLink>
                </div>
              </div>
            </div>
            <div className=" !w-[98%] m-auto mt-4">
              <CardBtn id={user.id} restrict={user.enabled} />
            </div>
          </div>
        ))
      )}
      {!loading && error ? <h1>Error</h1> : null}
    </div>
  );
}
