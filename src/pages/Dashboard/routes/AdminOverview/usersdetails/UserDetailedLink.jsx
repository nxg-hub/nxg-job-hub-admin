import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { talentUsers, recuritter } from "./usersdetails";
import "../../../adminstyle.scss";
import UserDetailTalent from "./components/UserDetailTalent";
import UserDetailEmployer from "./components/UserDetailEmployer";

export default function UserDetailedLink() {
  const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));
  const { id, userType } = useParams();
  const [userTalent, setUserTalent] = useState({});
  const [userEmployer, setUserEmployer] = useState({});

  useEffect(() => {
    //fetching employers, comparing each id with the id gotten with useParams hook to know which employer to display
    const userId = id;
    try {
      const fetchEmployers = async () => {
        await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/employer`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
            Authorization: token,
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            const techUser = data.find((user) => user.id === userId);
            setUserEmployer(techUser || {});
            // console.log(data);
          });
      };
      fetchEmployers();
    } catch (err) {
      console.log(err, err.message);
    }

    // const techUser = talentUsers.find((user) => user.id === userId);
    // setUser(techUser || {});
  }, [id]);

  useEffect(() => {
    const userId = id;
    ////fetching talents, comparing each id with the id gotten with useParams hook to know which talent to display

    try {
      const fetchTalent = async () => {
        await fetch(
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
            const techUser = data.find((user) => user.id === userId);
            setUserTalent(techUser || {});
            // console.log(data);
          });
      };
      fetchTalent();
    } catch (err) {
      console.log(err, err.message);
    }

    // const techUser = talentUsers.find((user) => user.id === userId);
    // setUser(techUser || {});
  }, [id]);

  return (
    <div className="admin-main">
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
      <section className="user-details-container">
        {userTalent && userType === "TECHTALENT" ? (
          <UserDetailTalent talent={userTalent} />
        ) : (
          userEmployer && <UserDetailEmployer employer={userEmployer} />
        )}
      </section>
      <section className="application">
        <div className="contracts user-jobs">
          <h5>Number of Job Applications</h5>
          <p>49</p>
        </div>
        <div className="contracts">
          <h5>Number of Contracts Secured</h5>
          <p>49</p>
        </div>
        <div className="contracts">
          <h5>Number of Contracts Delievered</h5>
          <p>49</p>
        </div>
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
    </div>
  );
}
