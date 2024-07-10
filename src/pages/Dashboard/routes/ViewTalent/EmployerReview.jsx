import { CiSearch } from "react-icons/ci";
import s from "./index.module.scss";
import ActivityChart from "./ActivityChart";
import { Link, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
const EmployerReview = () => {
  const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));
  const [employerVett, setEmployerVett] = useState({});
  const { id } = useParams();
  // const talent = useSelector((state) => state.vettingTalent);
  // const talentArray = talent.talent[0].dataTalent;
  // console.log(talentArray);
  const talent = useSelector((state) => state.vettingTalent);
  const employerArray = talent.employer[0].dataEmployer;
  //   console.log(talent);
  useEffect(() => {
    const employerVett = employerArray.find((user) => user.id === id);
    setEmployerVett(employerVett || {});
  });
  function handleAccept() {
    //fecthing employer
    try {
      // setIsLoading(true);
      const res = fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/employer/${id}/verify`,
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
          console.log(res);
          return res.json();
        })
        .then((data) => {
          console.log("hey");
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
          <h3>Talent ID: 34526732</h3>
          <ActivityChart />
        </div>
        <div className="mt-8 h-[150px] w-[250px] m-auto">
          <img
            className="rounded-full m-auto  md:w-[250px]"
            src={employerVett.profilePicture}
            alt=""
          />
          <h3 className="text-center">{employerVett.firstName}</h3>
          <span className="pl-[30px] space-x-4 m-auto text-center">
            <button
              onClick={handleAccept}
              className="bg-[#126704] text-white py-2 px-6 rounded-lg">
              Accept
            </button>
            <button className="bg-[#FF2323] text-white py-2 px-6 rounded-lg">
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

export default EmployerReview;
