import axios from "axios";
import React, { useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Barchart = () => {
  const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));

  const fetchDataByMonth = async (month, year) =>
    await fetch(
      `${
        import.meta.env.VITE_BASE_URL
      }/system-health/users/countNewUsersByMonthAndYear?year=${year}&month=${month}`,
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
        return data;
      });

  const data = [
    {
      name: "JAN",

      pv: fetchDataByMonth(1, 2024),
    },
    {
      name: "FEB",

      pv: fetchDataByMonth(2, 2024),
    },
    {
      name: "MAR",

      pv: fetchDataByMonth(3, 2024),
    },
    {
      name: "APR",

      pv: fetchDataByMonth(4, 2024),
    },
    {
      name: "MAY",

      pv: fetchDataByMonth(5, 2024),
    },
    {
      name: "JUN",

      pv: fetchDataByMonth(6, 2024),
    },
    {
      name: "JUL",

      pv: fetchDataByMonth(7, 2024),
    },
    {
      name: "AUG",

      pv: fetchDataByMonth(8, 2024),
    },
    {
      name: "SEP",

      pv: fetchDataByMonth(9, 2024),
    },
    {
      name: "OCT",

      pv: fetchDataByMonth(10, 2024),
    },
    {
      name: "NOV",

      pv: fetchDataByMonth(11, 2024),
    },
    {
      name: "DEC",
      pv: fetchDataByMonth(12, 2024),
    },
  ];

  return (
    <div className="charts w-full max-w-[300px] md:max-w-[300px] lg:max-w-[500px] h-[250px] lg:h-[300px] ">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={730} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            tickLine={false}
            stroke="#215E7D"
            strokeWidth={2}
            color="#000"
            fontSize={14}
            fontWeight={400}
            unit="K"
          />
          <Tooltip />
          <Legend />
          {/* <Bar dataKey="pv" fill="#8884d8" /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Barchart;
