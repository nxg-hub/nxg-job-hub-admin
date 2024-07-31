import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { MdOutlineSearch } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import "./health.scss";
import HealthChart from "./HealthChart";
import Barchart from "./Barchart";
import { fetchHealth } from "../../../../Redux/HealthSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../../static/icons/wheel.svg";
import { useApiRequest } from "../../../../utils/functions/fetchEndPoint";

export const Systemhealth = () => {
  const dispatch = useDispatch();
  const health = useSelector((state) => state.HealthSlice.health);
  const loading = useSelector((state) => state.HealthSlice.loading);
  const error = useSelector((state) => state.HealthSlice.error);

  //fetching all system data and displaying them in the ui
  useEffect(() => {
    dispatch(fetchHealth("/system-health/metrics"));
  }, []);

  const { data: verifiedTalentCount } = useApiRequest(
    "/api/v1/admin/count/verifiedTechTalent"
  );
  const { data: verifiedEmployerCount } = useApiRequest(
    "/api/v1/admin/count/verifiedEmployers"
  );
  const { data: unVerifiedEmployerCount } = useApiRequest(
    "/api/v1/admin/count/not-verifiedEmployers"
  );
  const { data: unVerifiedTalentCount } = useApiRequest(
    "/api/v1/admin/count/not-verifiedTechTalent"
  );

  // const userHealth = [
  //   {
  //     id: 1,
  //     healthTitle: "Total Users",
  //     healthData: "996K",
  //     healthRatio: " 32%",
  //     healthIcon: <BsArrowUp />,
  //     healthGroup: "Ascend",
  //   },

  // ];

  return (
    <div className="vetting health h-[100vh] overflow-y-scroll">
      {loading ? (
        <img
          src={Spinner}
          className="w-[100%] h-[500px] md:h-[500px] m-auto"
          alt="loading"
        />
      ) : !loading && error ? (
        <div className="w-[80%] m-auto mt-[300px] text-xl">
          <h2>Something went wrong. Check internet connecton</h2>
        </div>
      ) : (
        <>
          <section className="vetting-header-section">
            <Link to={"/dashboard"}>
              <BsArrowLeft style={{ fontSize: "24px", color: "#444444" }} />
            </Link>
            <div className="admin-search">
              <input type="search" placeholder="Search" />
              <MdOutlineSearch style={{ fontSize: "28px", color: "#8E8E8E" }} />
            </div>
            <CiMenuKebab style={{ fontSize: "24px", color: "#444444" }} />
          </section>
          <section className="user-health">
            <div
              className={`user-health-container flex flex-wrap w-full justify-between gap-4 sm:gap-4 `}>
              {/* {userHealth.map((health) => ( */}
              <div className="health-card w-[150px] sm:w-[40%] lg:w-[20%]">
                <div className="health-card-title">
                  <h5 className="text-sm sm:text-lg">Total Users</h5>
                  <CiMenuKebab fontSize={10} />
                </div>
                <div className="health-data-container">
                  <p className="text-sm font-bold sm:text-lg">
                    {health.totalUsers}
                  </p>
                </div>
              </div>
              <div
                className="health-card w-[150px] sm:w-[40%] lg:w-[20%]"
                key={health.id}>
                <div className="health-card-title">
                  <h5 className="text-sm sm:text-lg">New Users</h5>
                  <CiMenuKebab fontSize={10} />
                </div>
                <div className="health-data-container">
                  <p className="text-sm font-bold sm:text-lg">
                    {health.newUsers1monthAgo}
                  </p>
                  <div
                    className={
                      health.healthGroup === "Descend" ? "descend" : "ratio"
                    }>
                    <p>
                      {`${(
                        (health.newUsers1monthAgo / health.totalUsers) *
                        100
                      ).toFixed(2)}%`}
                    </p>
                    <span>{health.healthIcon}</span>
                  </div>
                </div>
              </div>
              <div
                className="health-card w-[150px] sm:w-[40%] lg:w-[20%]"
                key={health.id}>
                <div className="health-card-title">
                  <h5 className="text-sm sm:text-lg">
                    Average Time on Platform
                  </h5>
                  <CiMenuKebab fontSize={10} />
                </div>
                <div className="health-data-container">
                  <p className="text-sm font-bold sm:text-lg">
                    {health.averageTimeOnPlatform}
                  </p>
                  {/* <div
                    className={
                      health.healthGroup === "Descend" ? "descend" : "ratio"
                    }>
                    <p>{`${(
                      (health.averageTimeOnPlatform / 86400) *
                      100
                    ).toFixed(2)}%`}</p>
                    <span>{health.healthIcon}</span>
                  </div> */}
                </div>
              </div>
              <div
                className="health-card w-[150px] sm:w-[40%] lg:w-[20%]"
                key={health.id}>
                <div className="health-card-title">
                  <h5 className="text-sm sm:text-lg">Active Now</h5>
                  <CiMenuKebab fontSize={10} />
                </div>
                <div className="health-data-container">
                  <p className="text-sm font-bold sm:text-lg">
                    {health.activeNow}
                  </p>
                  <div className="bg-blue-50 py-1 border border-blue-400 rounded-md md:px-2 w-[40%] md:w-[35%] text-[12px]">
                    <p>
                      {`${(
                        (health.activeNow / health.totalUsers) *
                        100
                      ).toFixed(2)}%`}
                    </p>
                    <span>{health.healthIcon}</span>
                  </div>
                </div>
              </div>
              <div className="health-card w-[150px] sm:w-[40%] lg:w-[20%]">
                <div className="health-card-title">
                  <h5 className="text-sm sm:text-lg">Verified Talents</h5>
                  <CiMenuKebab fontSize={10} />
                </div>
                <div className="health-data-container">
                  <p className="text-sm font-bold sm:text-lg">
                    {verifiedTalentCount}
                  </p>
                  <div className="bg-blue-50 py-1 border border-blue-400 rounded-md md:px-2 w-[40%] md:w-[35%] text-[12px]">
                    <p>
                      {`${(
                        (verifiedTalentCount / health.totalUsers) *
                        100
                      ).toFixed(2)}%`}
                    </p>
                    <span>{health.healthIcon}</span>
                  </div>
                </div>
              </div>
              <div className="health-card w-[150px] sm:w-[40%] lg:w-[20%]">
                <div className="health-card-title">
                  <h5 className="text-sm sm:text-lg">Verified Employer</h5>
                  <CiMenuKebab fontSize={10} />
                </div>
                <div className="health-data-container">
                  <p className="text-sm font-bold sm:text-lg">
                    {verifiedEmployerCount}
                  </p>
                  <div className="bg-blue-50 py-1 border border-blue-400 rounded-md md:px-2 w-[40%] md:w-[35%] text-[12px]">
                    <p>
                      {`${(
                        (verifiedEmployerCount / health.totalUsers) *
                        100
                      ).toFixed(2)}%`}
                    </p>
                    <span>{health.healthIcon}</span>
                  </div>
                </div>
              </div>
              <div
                className="health-card w-[150px] sm:w-[40%] lg:w-[20%]"
                key={health.id}>
                <div className="health-card-title">
                  <h5 className="text-sm sm:text-lg">Unverified Talent</h5>
                  <CiMenuKebab fontSize={10} />
                </div>
                <div className="health-data-container">
                  <p className="text-sm font-bold sm:text-lg">
                    {unVerifiedTalentCount}
                  </p>
                  <div className="bg-blue-50 py-1 border border-blue-400 rounded-md md:px-2 w-[40%] md:w-[35%] text-[12px]">
                    <p>
                      {`${(
                        (unVerifiedTalentCount / health.totalUsers) *
                        100
                      ).toFixed(2)}%`}
                    </p>
                    <span>{health.healthIcon}</span>
                  </div>
                </div>
              </div>
              <div
                className="health-card w-[150px] sm:w-[40%] lg:w-[20%]"
                key={health.id}>
                <div className="health-card-title">
                  <h5 className="text-sm sm:text-lg">Unverified Employer</h5>
                  <CiMenuKebab fontSize={10} />
                </div>
                <div className="health-data-container">
                  <p className="text-sm font-bold sm:text-lg">
                    {unVerifiedEmployerCount}
                  </p>
                  <div className="bg-blue-50 py-1 border border-blue-400 rounded-md md:px-2 w-[40%] md:w-[35%] text-[12px]">
                    <p>
                      {`${(
                        (unVerifiedEmployerCount / health.totalUsers) *
                        100
                      ).toFixed(2)}%`}
                    </p>
                    <span>{health.healthIcon}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[95%] m-auto h-[38px] rounded-[7px] shadow-md shadow-[#00000040] px-[17px] py-[8px] mt-4">
              <h3 className="font-extrabold text-[18px]">Statistics</h3>
            </div>
          </section>
          <section className="health-chart w-[95%] h-[250px] md:h-[250px] lg:h-[400px] flex flex-wrap space-y-4 justify-between items-center overflow-scroll lg:overflow-hidden ">
            <HealthChart />
            <Barchart />
          </section>
        </>
      )}
    </div>
  );
};
