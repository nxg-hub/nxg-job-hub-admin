import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { MdOutlineSearch } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";
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

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Fetch system health
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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <img
          src={Spinner}
          className="w-16 h-16 md:w-20 md:h-20 "
          alt="loading"
        />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-xl">
        Something went wrong. Check internet connection.
      </div>
    );

  const healthCards = [
    {
      title: "Total Users",
      value: health.totalUsers,
      ratio: null,
    },
    {
      title: "New Users (1 Month)",
      value: health.newUsers1monthAgo,
      ratio: health.totalUsers
        ? ((health.newUsers1monthAgo / health.totalUsers) * 100).toFixed(2) +
          "%"
        : "0%",
    },
    {
      title: "Average Time on Platform",
      value: health.averageTimeOnPlatform,
      ratio: null,
    },
    {
      title: "Active Now",
      value: health.activeNow,
      ratio: health.totalUsers
        ? ((health.activeNow / health.totalUsers) * 100).toFixed(2) + "%"
        : "0%",
    },
    {
      title: "Verified Talents",
      value: verifiedTalentCount,
      ratio: health.totalUsers
        ? ((verifiedTalentCount / health.totalUsers) * 100).toFixed(2) + "%"
        : "0%",
    },
    {
      title: "Verified Employers",
      value: verifiedEmployerCount,
      ratio: health.totalUsers
        ? ((verifiedEmployerCount / health.totalUsers) * 100).toFixed(2) + "%"
        : "0%",
    },
    {
      title: "Unverified Talents",
      value: unVerifiedTalentCount,
      ratio: health.totalUsers
        ? ((unVerifiedTalentCount / health.totalUsers) * 100).toFixed(2) + "%"
        : "0%",
    },
    {
      title: "Unverified Employers",
      value: unVerifiedEmployerCount,
      ratio: health.totalUsers
        ? ((unVerifiedEmployerCount / health.totalUsers) * 100).toFixed(2) + "%"
        : "0%",
    },
  ];

  return (
    <div className="p-4 md:p-6 h-screen overflow-y-scroll">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition">
          <BsArrowLeft className="text-2xl" />
          <span className="font-medium">Back</span>
        </Link>

        <div className="flex items-center gap-4">
          {/* Year Dropdown */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="border rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500">
            {Array.from(
              { length: 10 },
              (_, i) => new Date().getFullYear() - i
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <div className="flex items-center border rounded-lg px-3 py-1 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
            <input
              type="search"
              placeholder="Search"
              className="outline-none px-2 py-1"
            />
            <MdOutlineSearch className="text-gray-400 text-xl" />
          </div>
          <CiMenuKebab className="text-2xl text-gray-700 cursor-pointer" />
        </div>
      </div>

      {/* Health Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {healthCards.map((card, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <h5 className="text-sm md:text-lg font-semibold">{card.title}</h5>
              <CiMenuKebab className="text-gray-400 text-sm cursor-pointer" />
            </div>
            <p className="text-xl md:text-2xl font-bold mb-1">{card.value}</p>
            {card.ratio && (
              <div className="bg-blue-50 text-blue-600 text-xs font-medium px-2 py-1 rounded w-fit">
                {card.ratio}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h3 className="font-bold text-lg mb-4">System Statistics</h3>
        <p className="pb-5">Registered users by month</p>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <HealthChart year={selectedYear} />
          </div>
          <div className="flex-1">
            <Barchart year={selectedYear} />
          </div>
        </div>
      </div>
    </div>
  );
};
