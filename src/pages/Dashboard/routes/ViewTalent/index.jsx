import { CiSearch } from "react-icons/ci";
import s from "./index.module.scss";
import ActivityChart from "./ActivityChart";
import { Link, useParams, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Spinner from "../../../../static/icons/wheel.svg";
import {
  removeVettedTalent,
  vettedTalent,
} from "../../../../Redux/TalentSlice";
import { fetchTalent } from "../../../../Redux/TalentSlice";
const ViewTalent = () => {
  const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));
  const [rejectionReason, setRejectionReason] = useState("");
  const [form, setForm] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const [talentVett, setTalentVett] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const talent = useSelector((state) => state.TalentSlice.talents);
  const loading = useSelector((state) => state.TalentSlice.loading);
  const error = useSelector((state) => state.TalentSlice.error);

  useEffect(() => {
    dispatch(fetchTalent("/api/v1/admin/techTalent?page=0&size=1000"));
  }, []);

  useEffect(() => {
    //finding the particular user to display on ui
    const talentVett = talent.find((user) => user.techTalentUser.techId === id);
    setTalentVett(talentVett || {});
  }, []);

  //credentials for verification
  const skills = talentVett?.techTalentUser?.skills;
  const porfolioLink = talentVett?.techTalentUser?.portfolioLink;
  const socialMedia = talentVett?.techTalentUser?.linkedInUrl;
  const qualification = talentVett?.techTalentUser?.highestQualification;
  const resume = talentVett?.techTalentUser?.resume;
  const openForm = () => {
    setForm(true);
  };

  function handleAccept() {
    //verifying talent
    try {
      // setIsLoading(true);
      const res = fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/techtalent/${id}/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
            Authorization: token.token,
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          navigate("/vetting");
        });
    } catch (err) {
      console.log(err, err.message);
    } finally {
      // setIsLoading(false);
    }
  }

  function handleReject(e) {
    e.preventDefault();
    if (rejectionReason === "") {
      setErrMsg(true);
      return;
    }
    //rejecting talent
    try {
      // setIsLoading(true);
      const res = fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/v1/admin/${id}/reject-techTalent-verification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
            Authorization: token,
          },
          body: JSON.stringify({ reasonForRejection: rejectionReason }),
        }
      )
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => {
          navigate("/vetting");
        });
    } catch (err) {
      console.log(err, err.message);
    } finally {
      // setIsLoading(false);
    }
  }
  return (
    <div className={s.ViewTalent}>
      {loading ? (
        <img
          src={Spinner}
          className="w-[80%] md:[w-100%] h-[400px] absolute top-[250px] right-[0] md:h-[500px] m-auto mt-[-150px] ]"
          alt="loading"
        />
      ) : !loading && error ? (
        <h1>error</h1>
      ) : (
        <>
          <Link
            to={"/vetting"}
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
          <div className=" md:flex md:justify-between w-[90%] m-auto">
            <div className={`w-full flex flex-col md:w-[50%] `}>
              <h3>Talent ID: {talentVett?.techTalentUser?.techId}</h3>
              <ActivityChart />
            </div>
            <div className="mt-8 h-[150px] w-[250px] m-auto rounded-full">
              <img
                className="!rounded-full w-[100px] mb-3 m-auto md:w-[150px] h-[150px]"
                src={talentVett?.techTalentUser?.profilePicture}
                alt="profile-picture"
              />
              <h3 className="text-center">{talentVett?.user?.firstName}</h3>
              <span className="pl-[30px] space-x-4 m-auto text-center pb-3">
                <button
                  onClick={handleAccept}
                  className="bg-[#126704] text-white py-2 px-6 rounded-lg">
                  Accept
                </button>
                <button
                  onClick={openForm}
                  className="bg-[#FF2323] text-white py-2 px-6 rounded-lg">
                  Reject
                </button>
              </span>
            </div>
          </div>
          <div className={s.Certifications}>
            <div className={s.Header}>
              <h3 className="font-bold">Skills</h3>
              <div className={s.searchBar}>
                <input
                  className={s.searchInput}
                  type="search"
                  placeholder={"Search"}
                  // value={search}
                  // onChange={(e) => setSearch(e.target.value)}
                />
                <CiSearch
                // onClick={handleSearch}
                />
              </div>
              <h3 className="font-bold">Certifications</h3>
            </div>
            <section className="w-[95%] h-[500px] md:h-[300px] m-auto flex flex-col space-y-8 md:space-y-0 md:flex-row md:justify-between py-4 ">
              <div className={` w-[80%] m-auto h-full md:w-[30%]`}>
                {skills ? (
                  skills.map((skill) => (
                    <p>
                      <span></span> {skill}
                    </p>
                  ))
                ) : (
                  <p className="font-bold">No skills provided</p>
                )}
              </div>
              <div className={`w-[80%] m-auto h-full md:w-[30%]`}>
                {resume ? (
                  <p>
                    Resume:
                    <span>
                      <a
                        className="text-blue-700"
                        target="_blank"
                        href={talentVett?.techTalentUser?.resume}>
                        Click to view resume
                      </a>
                    </span>
                  </p>
                ) : (
                  <p>
                    Resume:
                    <span className="font-bold">No Document Provided</span>
                  </p>
                )}

                {porfolioLink ? (
                  <p>
                    Porfolio link:
                    <span>
                      <a
                        className="text-blue-700"
                        target="_blank"
                        href={talentVett?.techTalentUser?.portfolioLink}>
                        Click to view portfolio
                      </a>
                    </span>
                  </p>
                ) : (
                  <p>
                    Porfolio link:
                    <span className="font-bold">No Link Provided</span>
                  </p>
                )}
                {socialMedia ? (
                  <p>
                    Social media:
                    <span>
                      <a
                        className="text-blue-700"
                        target="_blank"
                        href={talentVett?.techTalentUser?.linkedInUrl}>
                        Click to view social media profile
                      </a>
                    </span>
                  </p>
                ) : (
                  <p>
                    Social media:
                    <span className="font-bold">No Link Provided</span>
                  </p>
                )}
                {qualification ? (
                  <p>
                    Highest Qualification:
                    {talentVett?.techTalentUser?.highestQualification}
                  </p>
                ) : (
                  <p>
                    Highest Qualification:
                    <span className="font-bold">No Qualification Provided</span>
                  </p>
                )}
              </div>
            </section>
          </div>
        </>
      )}
      {form && (
        <>
          <form className="w-[80%] m-auto text-center space-y-3 z-30 absolute h-[100px] rounded-lg bg-blue-200 top-[200px]">
            <label className="font-bold">Reason for Rejection</label>
            <br />
            <textarea
              className="w-[80%] md:w-[50%] pl-2"
              type="text"
              value={rejectionReason}
              onChange={(e) => {
                setRejectionReason(e.target.value);
              }}
            />
            <br />
            {errMsg && <p className="text-red-600 font-bold">Required</p>}
            <button
              onClick={handleReject}
              className="bg-[#2596BE] w-[70%] md:w-[20%] px-3 py-2 rounded-md text-white font-bold">
              Submit
            </button>
          </form>
          <div
            onClick={() => {
              setForm(false);
            }}
            className="absolute z-20 bg-black bg-opacity-25 top-0 h-full left-0 right-0 bottom-0"
          />
        </>
      )}
    </div>
  );
};

export default ViewTalent;
