import React from "react";

const Talents = ({ usersToVet, vettedUsers, handleReview }) => {
  return (
    <>
      <div className="tobe-vetted h-[400px] ">
        {usersToVet
          .filter((user) => {
            return user.category === "talent";
          })
          .map((user) => (
            <ul className="shadow-sm shadow-[#00000040]" key={user.id}>
              <div className="w-[80%] flex ">
                <img
                  className="w-[64px] h-[64px]"
                  src={user.userPics}
                  alt={user.userName}></img>
                <li className="text-[16px] font-normal w-[50%]">
                  <h3>{user.userName}</h3>
                  <div>{user.skill}</div>
                </li>
              </div>
              <div className="vet-btns">
                <button onClick={() => handleReview(user.id)}>Review</button>
              </div>
            </ul>
          ))}
      </div>
      <div className="vetted">
        {vettedUsers
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
    </>
  );
};

export default Talents;
