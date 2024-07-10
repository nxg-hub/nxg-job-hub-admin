import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Spinner from "../../../../../static/icons/wheel.svg";
import { Link } from "react-router-dom";
import { dataEmployer } from "../../../../../Redux/UserSlice";

const Employer = ({ usersToVet, vettedUsers, handleReview }) => {
  const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));
  const [employer, setEmployer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    //fecthing employer
    try {
      setIsLoading(true);
      const res = fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/employer`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
            Authorization: token,
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setEmployer(data);
          setIsLoading(false);
          dispatch(dataEmployer(data));
        });
    } catch (err) {
      console.log(err, err.message);
    } finally {
      // setIsLoading(false);
    }
  }, []);

  return (
    <>
      <div className="tobe-vetted h-full overflow-hidden">
        {employer.map((user) => (
          <ul className="shadow-sm shadow-[#00000040]" key={user.id}>
            <div className="w-[80%] flex ">
              <img
                className="w-[64px] h-[64px] rounded-full"
                src={user.profilePicture}
                alt={user.userName}></img>
              <li className="text-[16px] font-normal space-y-[-15px]">
                <h3 className="pt-[14px]">{user.name}</h3>
                <h3 className="pt-[14px]">{user.role}</h3>
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
        ))}
      </div>
      <div className="vetted">
        {!isLoading &&
          vettedUsers
            .filter((user) => {
              return user.category === "employer";
            })
            .map((user) => (
              <ul className="shadow-sm shadow-[#00000040]" key={user.id}>
                <div className="w-[80%] flex ">
                  <img
                    className="w-[64px] h-[64px]"
                    src={user.userPics}
                    alt={user.userName}></img>
                  <li className="text-[16px] font-normal space-y-[-15px]">
                    <h3 className="pt-[14px]">{user.userName}</h3>
                    <h3 className="pt-[14px]">{user.role}</h3>
                  </li>
                </div>
                <p className="pr-[5%] lg:pr-0">Vetted</p>
              </ul>
            ))}
      </div>
      {isLoading ? (
        <img
          src={Spinner}
          className="w-[100%]  h-[400px] md:h-[500px] m-auto mt-[-150px] ]"
          alt="loading"
        />
      ) : null}
    </>
  );
};

export default Employer;
