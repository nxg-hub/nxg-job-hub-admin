import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../../../../static/icons/wheel.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployer } from "../../../../../Redux/EmployerSlice";
import restrict from "../../../../../static/icons/restric-icon.svg";
import CardBtn from "./components/CardBtn";

export default function EmployerProfileCard() {
  const dispatch = useDispatch();
  const employer = useSelector((state) => state.EmployerSlice.employer);
  const loading = useSelector((state) => state.EmployerSlice.loading);
  const error = useSelector((state) => state.EmployerSlice.error);

  useEffect(() => {
    //fetching employers and displaying them on the ui
    dispatch(fetchEmployer("/api/v1/admin/employer?page=0&size=1000"));
  }, []);
  return (
    <div className="app-users">
      {loading ? (
        <img
          src={Spinner}
          className="w-[100%] h-[500px] md:h-[500px] m-auto]"
          alt="loading"
        />
      ) : (
        employer.map((user) => (
          <div className="user-card" key={user.id}>
            <div className="user-plan">
              <span>{user.subPlan}</span>
            </div>
            <div className="user-contents">
              <div className="user-pics-section">
                <div className="user-pics">
                  {/* Conditionally display the restriction icon */}
                  {user.enabled === false && (
                    <div className="user-pics absolute m-auto">
                      <img src={restrict} alt="Restriction-Icon" />
                    </div>
                  )}
                  <img
                    className="rounded-full"
                    src={user.userPics}
                    alt={user.userName}
                  />
                </div>
              </div>
              <div className="user-details-contents">
                <h5>{user.name}</h5>
                <p>{user.userType}</p>
                <div className="user-link">
                  <Link
                    to={
                      user.subGroup !== "New account"
                        ? `userdetail/${user.id}/${user.userType}`
                        : `/newaccount/${user.id}`
                    }>
                    <p className="underline">View Details</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className=" w-[98%] m-auto mt-4">
              {!loading && error ? <h1>Error</h1> : null}
              <CardBtn id={user.id} restrict={user.enabled} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
