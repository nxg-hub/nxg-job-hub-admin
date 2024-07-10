import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./components/Button";
import Spinner from "../../../../../static/icons/wheel.svg";

export default function EmployerDetailsCard() {
  const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));
  const [employer, setEmployer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suspend, setSuspend] = useState(false);

  useEffect(() => {
    //fecthing talents
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
        });
    } catch (err) {
      console.log(err, err.message);
    } finally {
      // setIsLoading(false);
    }
  }, []);

  return (
    <div className="app-users">
      {employer.map((user) => (
        <div className="user-card" key={user.id}>
          <div className="user-plan">
            <span>{user.subPlan}</span>
          </div>
          <div className="user-contents">
            <div className="user-pics-section">
              {/* Conditionally display the restriction icon */}
              {user.subGroup === "Reactivate" && (
                <div className="user-pics restrict">
                  <img src={user.restricIcon} alt="Restriction-Icon" />
                </div>
              )}
              <div className="user-pics">
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
          <div className="user-btn-section">
            {/* <button
              onClick={() => {
                handleSuspend(user.id);
              }}
              className={suspend ? "reactivate-btn" : ""}>
              {suspend ? "Reactivate" : "Suspend"}
            </button> */}
            <Button id={user.id} />
          </div>
        </div>
      ))}
      {isLoading ? (
        <img
          src={Spinner}
          className="w-[100%] h-[500px] md:h-[500px] m-auto]"
          alt="loading"
        />
      ) : null}
    </div>
  );
}
