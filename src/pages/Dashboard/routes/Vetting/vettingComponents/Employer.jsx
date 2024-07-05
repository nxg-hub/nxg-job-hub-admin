import React from "react";

const Employer = ({ usersToVet, vettedUsers, handleReview }) => {
  return (
    <>
      <div className="tobe-vetted h-full overflow-hidden">
        {usersToVet
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
              <div className="vet-btns">
                <button onClick={() => handleReview(user.id)}>Review</button>
              </div>
            </ul>
          ))}
      </div>
      <div className="vetted">
        {vettedUsers
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
    </>
  );
};

export default Employer;
