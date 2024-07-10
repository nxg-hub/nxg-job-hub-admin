import React, { useEffect, useState } from "react";
import Spinner from "../../../../../static/icons/wheel.svg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dataTalent } from "../../../../../Redux/UserSlice";

const Talents = ({ usersToVet, vettedUsers, handleReview }) => {
  const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));
  const [talent, setTalent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    //fecthing talents
    try {
      setIsLoading(true);
      const res = fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/techTalent`,
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
          setTalent(data);
          setIsLoading(false);
          dispatch(dataTalent(data));
        });
    } catch (err) {
      console.log(err, err.message);
    } finally {
      // setIsLoading(false);
    }
  }, []);

  return (
    <>
      <div className="tobe-vetted h-[400px] ">
        {talent.map((user) => (
          <ul className="shadow-sm shadow-[#00000040]" key={user.id}>
            <div className="w-[80%] flex ">
              <img
                className="w-[64px] h-[64px] rounded-full"
                src={user.profilePicture}
                alt={user.name}></img>
              <li className="text-[16px] font-normal w-[50%]">
                <h3>{user.name}</h3>
                <div>{user.skill}</div>
              </li>
            </div>
            <div className="vet-btns">
              <Link
                to={`../review-talent/${user.id}`}
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
              return user.category === "talent";
            })
            .map((user) => (
              <ul className="shadow-sm shadow-[#00000040]" key={user.id}>
                <div className="w-[80%] flex  ">
                  <img
                    className="w-[64px] h-[64px]"
                    src={user.userPics}
                    alt={user.userName}></img>
                  <li className="text-[16px] font-normal w-[50%]">
                    <h3>{user.userName}</h3>
                    <div>{user.skill}</div>
                  </li>
                </div>
                <p className="pr-[5%] lg:pr-0">Vetted</p>
              </ul>
            ))}
      </div>
      {isLoading ? (
        <img
          src={Spinner}
          className="w-[80%] md:[w-100%] h-[400px] absolute top-[250px] right-[0] md:h-[500px] m-auto mt-[-150px] ]"
          alt="loading"
        />
      ) : null}
    </>
  );
};

export default Talents;
