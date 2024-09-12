import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployer } from "../../../../Redux/EmployerSlice";
import Spinner from "../../../../static/icons/wheel.svg";
import avater from "../../../../static/images/userIcon.png";
import { Link } from "react-router-dom";
import FeedBackModal from "./component/FeedBackModal";
import {
  setFeedBackModalFalse,
  setFeedBackModalTrue,
} from "../../../../Redux/FeedBackSlice";

const FeedBack = () => {
  const dispatch = useDispatch();
  //getting states from the employerSlice
  const employer = useSelector((state) => state.EmployerSlice.employer);
  const loading = useSelector((state) => state.EmployerSlice.loading);
  const error = useSelector((state) => state.EmployerSlice.error);

  //getting states from feedbackSlice
  const modal = useSelector((state) => state.FeedBackSlice.feedbackModal);

  //open and close modal functions
  const openModal = (id) => {
    dispatch(setFeedBackModalTrue(id));
  };

  useEffect(() => {
    //fetching All Empoyers
    dispatch(fetchEmployer("/api/v1/admin/employer?page=0&size=1000"));
  }, []);
  return (
    <div className="tobe-vetted h-full  overflow-y-scroll ">
      <h2 className="md:text-2xl text-center font-normal mt-4 capitalize">
        View feedbacks from employers.
      </h2>
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
        employer.map((user) => (
          <ul
            className="shadow-sm shadow-[#00000040] flex items-center h-[80px]"
            key={user.user.id}>
            <div className="w-[80%] m-auto flex items-center">
              <img
                className="w-[50px] h-[50px] rounded-full"
                src={
                  user.user.profilePicture ? user.user.profilePicture : avater
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
              <button
                onClick={() => {
                  openModal(user.user.id);
                }}
                className="bg-[#2596BE]  top-4 right-2 md:top-[60px] md:right-5 text-white text-sm px-2 md:px-3 py-2 mr-5 md:mr-5 rounded-lg">
                Feedback
              </button>
            </div>
          </ul>
        ))
      )}
      {modal && (
        <>
          <FeedBackModal />
        </>
      )}
    </div>
  );
};

export default FeedBack;
