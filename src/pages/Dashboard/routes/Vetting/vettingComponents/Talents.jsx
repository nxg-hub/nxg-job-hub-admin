import React, { useEffect, useState } from "react";
import Spinner from "../../../../../static/icons/wheel.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTalent } from "../../../../../Redux/TalentSlice";
import avater from "../../../../../static/images/userIcon.png";

const Talents = ({ handleReview }) => {
  const dispatch = useDispatch();
  const talent = useSelector((state) => state.TalentSlice.talents);
  const loading = useSelector((state) => state.TalentSlice.loading);
  const error = useSelector((state) => state.TalentSlice.error);

  useEffect(() => {
    //fetching talents and displayng on the ui
    dispatch(fetchTalent("/api/v1/admin/techTalent?page=0&size=1000"));
  }, []);
  return (
    <>
      <div className="tobe-vetted h-[300px] overflow-y-scroll ">
        {loading ? (
          <img
            src={Spinner}
            className="w-[80%] md:[w-80%] h-[400px] absolute top-[250px] right-[0] md:h-[500px] m-auto mt-[-150px] ]"
            alt="loading"
          />
        ) : !loading && error ? (
          <div className="w-[80%] m-auto mt-[300px] text-xl">
            <h2>Something went wrong. Check internet connecton</h2>
          </div>
        ) : (
          talent
            ?.filter((user) => {
              return user.user.profileVerified === false;
            })
            .map((user) => (
              <ul className="shadow-sm shadow-[#00000040]" key={user.user.id}>
                <div className="w-[80%] flex items-center">
                  <img
                    className="w-[64px] h-[64px] rounded-full"
                    src={
                      user.user.profilePicture ||
                      user.techTalentUser.profilePicture
                        ? user.user.profilePicture ||
                          user.techTalentUser.profilePicture
                        : avater
                    }
                    alt={user.user.name}></img>
                  <li className="text-[16px] font-normal w-[50%]">
                    <h3>{user.user.name}</h3>
                    <div>
                      <span className="text-sm lowercase font-light">
                        {user.user.jobInterest}
                      </span>
                    </div>
                  </li>
                </div>
                <div className="vet-btns">
                  <Link
                    to={`../review-talent/${user.user.id}`}
                    onClick={() => handleReview(user.user.id)}>
                    <button>Review</button>
                  </Link>
                </div>
              </ul>
            ))
        )}
      </div>
      <div className="vetted h-[250px] overflow-y-scroll">
        {!loading &&
          talent
            ?.filter((user) => {
              return user.user.profileVerified === true;
            })
            .map((user) => (
              <ul className="shadow-sm shadow-[#00000040]" key={user.user.id}>
                <div className="w-[80%] flex  ">
                  <img
                    className="w-[64px] h-[64px] rounded-full"
                    src={
                      user.user.profilePicture ||
                      user.techTalentUser.profilePicture
                        ? user.user.profilePicture ||
                          user.techTalentUser.profilePicture
                        : avater
                    }
                    alt={user.user.name}></img>
                  <li className="text-[16px] font-normal w-[50%]">
                    <h3>{user.user.name}</h3>
                    <div>
                      <span className="text-sm lowercase font-light">
                        {user.techTalentUser.jobInterest}
                      </span>
                    </div>
                  </li>
                </div>
                <p className="pr-[5%] lg:pr-0">Vetted</p>
              </ul>
            ))}
      </div>
    </>
  );
};

export default Talents;
