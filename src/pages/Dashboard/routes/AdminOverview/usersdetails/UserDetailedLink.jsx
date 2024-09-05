import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { recuritter } from "./usersdetails";
import "../../../adminstyle.scss";
import UserDetailTalent from "./components/UserDetailTalent";
import UserDetailEmployer from "./components/UserDetailEmployer";
import Spinner from "../../../../../static/icons/wheel.svg";

export default function UserDetailedLink() {
  const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));
  const { id, userType } = useParams();
  const [userTalent, setUserTalent] = useState(null);
  const [userEmployer, setUserEmployer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    //fetching employers, comparing each id with the id gotten with useParams hook to know which employer to display
    const userId = id;
    // setLoading(true);
    try {
      const fetchEmployers = async () => {
        await fetch(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/v1/admin/employer?page=0&size=1000`,
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
            const techUser = data.find((user) => user.user.id === userId);
            setUserEmployer(techUser);
            // setLoading(false);
            // console.log(data);
          });
      };
      fetchEmployers();
    } catch (err) {
      setError(true);
      console.log(err, err.message);
    }

    // const techUser = talentUsers.find((user) => user.id === userId);
    // setUser(techUser || {});
  }, [id]);

  useEffect(() => {
    const userId = id;
    setLoading(true);
    ////fetching talents, comparing each id with the id gotten with useParams hook to know which talent to display

    try {
      const fetchTalent = async () => {
        await fetch(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/v1/admin/techTalent?page=0&size=1000`,
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
            const techUser = data.find((user) => user.user.id === userId);
            setUserTalent(techUser || {});
            setLoading(false);
          });
      };
      fetchTalent();
    } catch (err) {
      console.log(err, err.message);
    }
  }, [id]);

  return (
    <div className="admin-main">
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
        <>
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
            }}
          >
            <BsArrowLeft style={{ fontSize: "26px" }} />
            <span>Back</span>
          </Link>
          <section className="user-details-container overflow-scroll">
            {userTalent && userType === "TECHTALENT" ? (
              <UserDetailTalent talent={userTalent} />
            ) : (
              userEmployer && <UserDetailEmployer employer={userEmployer} />
            )}
          </section>

          <section className="history">
            <h4>History</h4>
            <div className="employer-history">
              {recuritter.map((recurit) => (
                <div className="active-employer" key={recurit.id}>
                  <div className="employer-section">
                    <div className="employer-logo">{recurit.companyLogo}</div>
                    <h5>{recurit.companyName}</h5>
                  </div>
                  <p>{recurit.userType}</p>
                  <Link>
                    <span>{recurit.companyDetails}</span>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
