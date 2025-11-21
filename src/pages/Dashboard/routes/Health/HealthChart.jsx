// import React from "react";
// import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

// const HealthChart = () => {
//   const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));

//   const fetchDataByMonth = async (month, year) =>
//     await fetch(
//       `${
//         import.meta.env.VITE_BASE_URL
//       }/system-health/users/countNewUsersByMonthAndYear?year=${year}&month=${month}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
//           Authorization: token,
//         },
//       }
//     )
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//         return data;
//       });
//   const data = [
//     {
//       name: "JAN",
//       pv: fetchDataByMonth(1, 2024),
//     },
//     {
//       name: "FEB",
//       pv: fetchDataByMonth(2, 2024),
//     },
//     {
//       name: "MAR",
//       pv: fetchDataByMonth(3, 2024),
//     },
//     {
//       name: "APR",
//       pv: fetchDataByMonth(4, 2024),
//     },
//     {
//       name: "MAY",
//       pv: fetchDataByMonth(5, 2024),
//     },
//     {
//       name: "JUN",
//       pv: fetchDataByMonth(6, 2024),
//     },
//     {
//       name: "JUL",
//       pv: fetchDataByMonth(7, 2024),
//     },
//     {
//       name: "AUG",
//       pv: fetchDataByMonth(8, 2024),
//     },
//     {
//       name: "SEP",
//       pv: fetchDataByMonth(9, 2024),
//     },
//     {
//       name: "OCT",
//       pv: fetchDataByMonth(10, 2024),
//     },
//     {
//       name: "NOV",
//       pv: fetchDataByMonth(11, 2024),
//     },
//     {
//       name: "DEC",
//       pv: fetchDataByMonth(12, 2024),
//     },
//   ];

//   return (
//     <div className="charts w-full max-w-[300px] md:max-w-[300px] lg:max-w-[500px] h-[250px] lg:h-[300px] ">
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart
//           width={450}
//           height={300}
//           data={data}
//           margin={{
//             top: 5,
//             right: 20,
//             left: 10,
//             bottom: 5,
//           }}>
//           <XAxis
//             dataKey="name"
//             tickLine={false}
//             padding={{ left: 20, right: 30 }}
//             stroke="#215E7D"
//             strokeWidth={2}
//           />
//           <YAxis
//             tickLine={false}
//             stroke="#215E7D"
//             strokeWidth={2}
//             color="#000"
//             fontSize={14}
//             fontWeight={400}
//             unit="K"
//           />
//           <Line
//             type="monotone"
//             dataKey="pv"
//             stroke="#000"
//             strokeWidth={4}
//             dot={false}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default HealthChart;

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const monthNames = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const HealthChart = ({ year }) => {
  const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDataByMonth = async (month, year) => {
    try {
      const res = await fetch(
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
      );
      const result = await res.json();
      return result || 0;
    } catch (err) {
      console.error("Error fetching month data:", err);
      return 0;
    }
  };

  useEffect(() => {
    const fetchAllMonths = async () => {
      setLoading(true);
      const months = Array.from({ length: 12 }, (_, i) => i + 1);
      const counts = await Promise.all(
        months.map((month) => fetchDataByMonth(month, year))
      );

      const chartData = counts.map((count, idx) => ({
        name: monthNames[idx],
        pv: count,
      }));

      setData(chartData);
      setLoading(false);
    };

    fetchAllMonths();
  }, [year]);

  if (loading)
    return <p className="text-center text-gray-500">Loading chart...</p>;

  return (
    <div className="charts w-full max-w-[500px] h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tickLine={false}
            stroke="#215E7D"
            strokeWidth={2}
          />
          <YAxis
            tickLine={false}
            stroke="#215E7D"
            strokeWidth={2}
            fontSize={14}
            fontWeight={400}
            unit="K"
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#000"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HealthChart;
