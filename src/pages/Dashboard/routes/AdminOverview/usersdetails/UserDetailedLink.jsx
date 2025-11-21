import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { recuritter } from "./usersdetails";
import "../../../adminstyle.scss";
import UserDetailTalent from "./components/UserDetailTalent";
import UserDetailEmployer from "./components/UserDetailEmployer";
import Spinner from "../../../../../static/icons/wheel.svg";
import { useSelector } from "react-redux";
import UserDetailsProvider from "./components/UserDetailsProvider";

export default function UserDetailedLink() {
  const { id, userType } = useParams();
  const [userTalent, setUserTalent] = useState(null);
  const [userEmployer, setUserEmployer] = useState(null);
  const [userProvider, setUserProvider] = useState(null);
  const talent = useSelector((state) => state.TalentSlice.talents);
  const employer = useSelector((state) => state.EmployerSlice.employer);
  const { provider } = useSelector((state) => state.providerSlice);

  useEffect(() => {
    //fetching employers, comparing each id with the id gotten with useParams hook to know which employer to display
    const userId = id;
    const selectedEmployer = employer.find((user) => user.user.id === userId);
    setUserEmployer(selectedEmployer);
  }, [id]);

  useEffect(() => {
    const userId = id;
    ////fetching talents, comparing each id with the id gotten with useParams hook to know which talent to display
    const selectedTalent = talent.find((user) => user.user.id === userId);
    setUserTalent(selectedTalent);
  }, [id]);

  useEffect(() => {
    const userId = id;
    ////fetching talents, comparing each id with the id gotten with useParams hook to know which talent to display
    const selectedProvider = provider.find((user) => user.user.id === userId);
    setUserProvider(selectedProvider);
  }, [id]);

  // console.log(userTalent);

  return (
    <div className="admin-">
      {
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
            }}>
            <BsArrowLeft style={{ fontSize: "26px" }} />
            <span>Back</span>
          </Link>
          <section className="user-details-container ">
            {userTalent && userType === "TECHTALENT" ? (
              <UserDetailTalent talent={userTalent} />
            ) : userEmployer && userType === "EMPLOYER" ? (
              <UserDetailEmployer employer={userEmployer} />
            ) : (
              userProvider && <UserDetailsProvider provider={userProvider} />
            )}
          </section>

          {/* <section className="history">
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
          </section> */}
        </>
      }
    </div>
  );
}
