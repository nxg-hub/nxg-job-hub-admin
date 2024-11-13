import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../../../static/icons/wheel.svg";
import { Link } from "react-router-dom";
import { fetchEmployer } from "../../../../../Redux/EmployerSlice";
import avater from "../../../../../static/images/userIcon.png";

const Employer = ({ handleReview }) => {
  const dispatch = useDispatch();
  const employer = useSelector((state) => state.EmployerSlice.employer);
  const loading = useSelector((state) => state.EmployerSlice.loading);
  const error = useSelector((state) => state.EmployerSlice.error);

  useEffect(() => {
    //fetching All Empoyers
    dispatch(fetchEmployer("/api/v1/admin/employer?page=0&size=1000"));
  }, []);
  return (
    <>
      <div className="tobe-vetted  overflow-y-scroll ">
        {loading ? (
          <img
            src={Spinner}
            className="w-[30%] md:w-[10%] h-[400px] absolute top-[200px] right-[35%] md:h-[500px] m-auto mt-[-150px]"
            alt="loading"
          />
        ) : !loading && error ? (
          <div className="w-[80%] m-auto mt-[300px] text-xl">
            <h2>Something went wrong. Check internet connecton</h2>
          </div>
        ) : (
          employer
            .filter((user) => {
              return user.user.profileVerified === false;
            })
            .map((user) => (
              <ul className="shadow-sm shadow-[#00000040]" key={user.user.id}>
                <div className="w-[80%] flex items-center">
                  <img
                    className="w-[64px] h-[64px] rounded-full"
                    src={
                      //if no profice picture, display default avatar
                      user.user.profilePicture
                        ? user.user.profilePicture
                        : avater
                    }
                    alt={user.user.userName}></img>
                  <li className="text-[16px] font-normal space-y-[-15px]">
                    <h3 className="pt-[14px]">{user.user.name}</h3>
                    <h3 className="pt-[14px]  text-sm capitalize font-bold">
                      {user.employer.companyName}
                    </h3>
                  </li>
                </div>
                <div className="vet-btns">
                  <Link
                    to={`../review-employer/${user.user.id}`}
                    onClick={() => handleReview(user.user.id)}>
                    <button>Review</button>
                  </Link>
                </div>
              </ul>
            ))
        )}
      </div>
      <div className="vetted overflow-y-scroll">
        {!loading &&
          employer
            .filter((user) => {
              return user.user.profileVerified === true;
            })
            .map((user) => (
              <ul className="shadow-sm shadow-[#00000040]" key={user.user.id}>
                <div className="w-[80%] flex ">
                  <img
                    className="w-[64px] h-[64px] rounded-full"
                    src={
                      //if no profice picture, display default avatar
                      user.user.profilePicture
                        ? user.user.profilePicture
                        : avater
                    }
                    alt={user.user.name}></img>
                  <li className="text-[16px] font-normal space-y-[-15px]">
                    <h3 className="pt-[14px]">{user.user.name}</h3>
                    <h3 className="pt-[14px]  text-sm capitalize font-bold">
                      {user.employer.companyName}
                    </h3>
                  </li>
                </div>
                <p className="pr-[5%] lg:pr-0">Vetted</p>
              </ul>
            ))}
      </div>
    </>
  );
};

export default Employer;
