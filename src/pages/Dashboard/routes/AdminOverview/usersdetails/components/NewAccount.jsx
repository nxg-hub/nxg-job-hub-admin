import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { talentUsers } from "../usersdetails";

const NewAccount = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const userId = parseInt(id, 10);
    const accountUser = talentUsers.find((user) => user.id === userId);
    setUser(accountUser || {});
  }, [id]);
  return (
    <div className="bg-white w-full">
      <Link
        to={"/dashboard"}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          fontSize: "12px",
          fontWeight: "400",
          color: "#000",
          margin: "0 0 1rem 1rem",
          paddingTop: ".5rem",
        }}>
        <BsArrowLeft style={{ fontSize: "26px" }} />
        <span>Back</span>
      </Link>
      <div className="md:w-[100%] h-[128px] flex ml-[10px] gap-[20px]">
        <div className="h-[100%] w-[128px] sm:w-[128px] sm:h-[128px] rounded-full bg-[#D9D9D9]">
          <img className="w-full h-full" src={user.userPics} alt="avatar" />
        </div>

        {user && (
          <div className="pt-[15px] space-y-3 text-black">
            <h3 className="font-extrabold">
              Name:<span className="font-normal">{user.userName}</span>
            </h3>
            <h3 className="font-extrabold">
              Date Joined:<span className="font-normal">{user.userDate}</span>
            </h3>
            <h3 className="font-extrabold">
              User:<span className="font-normal">{user.userType}</span>
            </h3>
          </div>
        )}
      </div>
      <div className="mt-[40px] ml-[10px]">
        <h2 className="text-[20px] font-extrabold">Document</h2>
        <img
          className="h-[250px] w-[70%] sm:w-[50%]"
          src={user.cert}
          alt="certificate-img"
        />
      </div>
      <div className="mt-[100px] flex w-[70%] gap-3 m-auto justify-between text-white">
        <button className="w-[50%] bg-[#128000] rounded-[8px] p-[4px] text-white hover:bg-green-700">
          Approve
        </button>
        <button className="w-[50%] border border-[#CB3C3C] p-[4px] text-[#CB3C3C] rounded-[8px] hover:border-red-900">
          Reject
        </button>
      </div>
    </div>
  );
};

export default NewAccount;
