import { CiSearch } from "react-icons/ci";
import s from "./index.module.scss";
import ActivityChart from "./ActivityChart";
import { Link, useParams, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  removeVettedTalent,
  vettedTalent,
} from "../../../../Redux/TalentSlice";
import { fetchTalent } from "../../../../Redux/TalentSlice";
const ViewTalent = () => {
  const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));
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
    const talentVett = talent.find((user) => user.id === id);
    setTalentVett(talentVett || {});
  }, []);
  function handleAccept() {
    //verifying talent
    try {
      // setIsLoading(true);
      const res = fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/techtalent/${id}/verify`,
        {
          method: "GET",
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
          dispatch(vettedTalent(talentVett));
          navigate("/vetting");
          dispatch(removeVettedTalent(talentVett.id));
        });
    } catch (err) {
      console.log(err, err.message);
    } finally {
      // setIsLoading(false);
    }
  }

  function handleReject() {
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
          body: JSON.stringify({ reasonForRejection: "reasonForRejection" }),
        }
      )
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => {
          // dispatch(vettedTalent(talentVett));
          console.log(data);
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
          <h3>Talent ID: {talentVett.id}</h3>
          <ActivityChart />
        </div>
        <div className="mt-8 h-[150px] w-[250px] m-auto">
          <img
            className="rounded-full m-auto md:w-[150px]"
            src={talentVett.profilePicture}
            alt=""
          />
          <h3 className="text-center">{talentVett.firstName}</h3>
          <span className="pl-[30px] space-x-4 m-auto text-center">
            <button
              onClick={handleAccept}
              className="bg-[#126704] text-white py-2 px-6 rounded-lg">
              Accept
            </button>
            <button
              onClick={handleReject}
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
          {" "}
          <div className={` w-[80%] m-auto h-full md:w-[30%]`}>
            <p>
              {" "}
              <span></span> Creative Writing
            </p>
            <p>
              {" "}
              <span></span>Creative Writing
            </p>

            <p>
              {" "}
              <span></span>Creative Writing
            </p>

            <p>
              {" "}
              <span></span>Creative Writing
            </p>
          </div>
          <div className={`w-[80%] m-auto h-full md:w-[30%]`}>
            <p> Certificate 1</p>
            <p> Certificate 1</p>
            <p> Certificate 1</p>
            <p> Certificate 1</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ViewTalent;
