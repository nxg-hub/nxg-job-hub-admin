import { CiSearch } from "react-icons/ci";
import s from "./index.module.scss";
import ActivityChart from "./ActivityChart";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchEmployer,
  // removeVettedEmployer,
} from "../../../../Redux/EmployerSlice";
import avater from "../../../../static/images/userIcon.png";
const EmployerReview = () => {
  const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));
  const [reasonForRejection, setReasonForRejection] = useState("");
  const [form, setForm] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const [employerVett, setEmployerVett] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const employer = useSelector((state) => state.EmployerSlice.employer);
  const loading = useSelector((state) => state.EmployerSlice.loading);
  // const error = useSelector((state) => state.EmployerSlice.error);
  const openForm = () => {
    setForm(true);
  };
  useEffect(() => {
    dispatch(fetchEmployer("/api/v1/admin/employer?page=0&size=1000"));
  }, []);
  useEffect(() => {
    const employerVett = employer.find(
      (user) => user.employer.employerID === id
    );
    setEmployerVett(employerVett || {});
  }, []);

  //documents to be verified
  const taxClearanceCertificate =
    employerVett?.employer?.taxClearanceCertificate;
  const caccertificate = employerVett?.employer?.caccertificate;
  const companyMemorandum = employerVett?.employer?.companyMemorandum;
  const companyWebsite = employerVett?.employer?.companyWebsite;
  const companyName = employerVett?.employer?.companyName;
  const companyPosition = employerVett?.employer?.position;
  const companyAddress = employerVett?.employer?.companyAddress;
  const companySize = employerVett?.employer?.companySize;

  function handleAccept() {
    //verifying employer
    try {
      // setIsLoading(true);
      const res = fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/employer/${id}/verify`,
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
          console.log(data);
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
    //rejecting employer
    try {
      // setIsLoading(true);
      const res = fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/v1/admin/${id}/reject-employer-verification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
            Authorization: token,
          },
          body: JSON.stringify({ reasonForRejection: reasonForRejection }),
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          navigate("/vetting");
          // console.log(data);
          // dispatch(vettedEmployer(employerVett));
          // dispatch(removeVettedEmployer(employerVett.id));
        });
    } catch (err) {
      console.log(err, err.message);
    } finally {
      // setIsLoading(false);
    }
  }

  return (
    <div className={s.ViewTalent}>
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
          <h3>Employer ID: {employerVett?.employer?.employerID}</h3>
          <ActivityChart />
        </div>
        <div className="mt-8 h-[150px] w-[250px] m-auto">
          <img
            className="rounded-full m-auto  md:w-[150px]"
            src={
              employerVett?.employer?.profilePicture
                ? employerVett?.employer?.profilePicture
                : avater
            }
            alt=""
          />
          <h3 className="text-center">{employerVett?.user?.firstName}</h3>
          <span className="pl-[30px] space-x-4 m-auto text-center">
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
          <h3 className="font-bold">About</h3>
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
            {companyName ? (
              <p>
                <span></span> Company Name:{employerVett?.employer?.companyName}
              </p>
            ) : (
              <p>
                <span></span> Company Name:
                <p className="font-bold">No Detail Provided</p>
              </p>
            )}
            {companyPosition ? (
              <p>
                <span></span>Position:{employerVett?.employer?.position}
              </p>
            ) : (
              <p>
                <span></span>Position:
                <p className="font-bold">No Detail Provided</p>
              </p>
            )}

            {companyAddress ? (
              <p>
                <span></span>Company Address:
                {employerVett?.employer?.companyAddress}
              </p>
            ) : (
              <p>
                <span></span>Company Address:
                <p className="font-bold">No Detail Provided</p>
              </p>
            )}

            {companySize ? (
              <p>
                <span></span>Company Size:{employerVett?.employer?.companySize}
              </p>
            ) : (
              <p>
                <span></span>Company Size:
                <p className="font-bold">No Detail Provided</p>
              </p>
            )}
          </div>
          <div className={`w-[80%] m-auto h-full md:w-[30%]`}>
            {companyWebsite ? (
              <p>
                Company Website:
                <a
                  className="text-blue-700"
                  target="_blank"
                  href={employerVett?.employer?.companyWebsite}>
                  Click to view company site
                </a>
              </p>
            ) : (
              <p>
                Company Website:
                <span className="font-bold">No Link Provided</span>
              </p>
            )}
            {taxClearanceCertificate ? (
              <p>
                Tax Clearance Certificate:
                <a
                  className="text-blue-700"
                  target="_blank"
                  href={employerVett?.employer?.taxClearanceCertificate}>
                  Click to view tax clearance
                </a>
              </p>
            ) : (
              <p>
                Tax Clearance Certificate:
                <span className="font-bold">No Document Provided</span>
              </p>
            )}
            {caccertificate ? (
              <p>
                CAC Certificate:
                <a
                  className="text-blue-700"
                  target="_blank"
                  href={employerVett?.employer?.caccertificate}>
                  Click to view CAC clearance
                </a>
              </p>
            ) : (
              <p>
                Tax Clearance Certificate:
                <span className="font-bold">No Document Provided</span>
              </p>
            )}
            {companyMemorandum ? (
              <p>
                Company Memorandum:
                <a
                  className="text-blue-700"
                  target="_blank"
                  href={employerVett?.employer?.companyMemorandum}>
                  Click to view Company Memorandum
                </a>
              </p>
            ) : (
              <p>
                Company Memorandum:
                <span className="font-bold">No Document Provided</span>
              </p>
            )}
          </div>
        </section>
      </div>
      {form && (
        <>
          <form className="w-[80%] m-auto text-center space-y-3 z-30 absolute h-[100px] rounded-lg bg-blue-200 top-[200px]">
            <label className="font-bold">Reason for Rejection</label>
            <br />
            <textarea
              className="w-[80%] md:w-[50%] pl-2"
              type="text"
              value={reasonForRejection}
              onChange={(e) => {
                setReasonForRejection(e.target.value);
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

export default EmployerReview;
