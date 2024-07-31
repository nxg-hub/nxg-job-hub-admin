import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../../../static/icons/wheel.svg";
import { Link } from "react-router-dom";
import { dataEmployer } from "../../../../../Redux/UserSlice";
import { fetchEmployer } from "../../../../../Redux/EmployerSlice";

const Employer = ({ handleReview }) => {
  const employers = useSelector((state) => state.EmployerSlice.vettedEmployer);
  const vettedEmployer = employers.map((data) => {
    return data.datavettedEmployer;
  });
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
            className="w-[80%] md:[w-100%] h-[400px] absolute top-[250px] right-[0] md:h-[500px] m-auto mt-[-150px] ]"
            alt="loading"
          />
        ) : !loading && error ? (
          <div className="w-[80%] m-auto mt-[300px] text-xl">
            <h2>Something went wrong. Check internet connecton</h2>
          </div>
        ) : (
          employer
            .filter((user) => {
              return user.profileVerified === false;
            })
            .map((user) => (
              <ul className="shadow-sm shadow-[#00000040]" key={user.id}>
                <div className="w-[80%] flex items-center">
                  <img
                    className="w-[64px] h-[64px] rounded-full"
                    src={user.profilePicture}
                    alt={user.userName}></img>
                  <li className="text-[16px] font-normal space-y-[-15px]">
                    <h3 className="pt-[14px]">{user.name}</h3>
                    <h3 className="pt-[14px] lowercase text-sm font-light">
                      {user.userType}
                    </h3>
                  </li>
                </div>
                <div className="vet-btns">
                  <Link
                    to={`../review-employer/${user.id}`}
                    onClick={() => handleReview(user.id)}>
                    <button>Review</button>
                  </Link>
                </div>
              </ul>
            ))
        )}
      </div>
      <div className="vetted">
        {!loading &&
          employer
            .filter((user) => {
              return user.profileVerified === true;
            })
            .map((user) => (
              <ul className="shadow-sm shadow-[#00000040]" key={user.id}>
                <div className="w-[80%] flex ">
                  <img
                    className="w-[64px] h-[64px]"
                    src={user.profilePicture}
                    alt={user.name}></img>
                  <li className="text-[16px] font-normal space-y-[-15px]">
                    <h3 className="pt-[14px]">{user.name}</h3>
                    <h3 className="pt-[14px] lowercase text-sm font-light">
                      {user.userType}
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
