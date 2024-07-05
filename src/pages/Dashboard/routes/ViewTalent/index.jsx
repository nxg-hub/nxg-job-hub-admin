import { CiSearch } from "react-icons/ci";
import s from "./index.module.scss";
import ActivityChart from "./ActivityChart";
import profile from "../../../../static/images/Kristy.svg";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
const ViewTalent = () => {
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
        <div className="mt-8">
          <img
            className=" m-auto w-[150px] md:w-[250px]"
            src={profile}
            alt=""
          />
          <h3 className="text-center">Jane Doe</h3>
          <span className="pl-[30px] space-x-4 m-auto text-center">
            <button className="bg-[#126704] text-white py-2 px-6 rounded-lg">
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

export default ViewTalent;
