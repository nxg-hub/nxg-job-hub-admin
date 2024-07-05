import React from "react";
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
  const data = [
    {
      name: "JAN",

      pv: 2400,
    },
    {
      name: "FEB",

      pv: 1398,
    },
    {
      name: "MAR",

      pv: 9800,
    },
    {
      name: "APR",

      pv: 3908,
    },
    {
      name: "MAY",

      pv: 4800,
    },
    {
      name: "JUN",

      pv: 3800,
    },
    {
      name: "JUL",

      pv: 4300,
    },
    {
      name: "AUG",

      pv: 4300,
    },
    {
      name: "SEP",

      pv: 4300,
    },
    {
      name: "OCT",

      pv: 4300,
    },
    {
      name: "NOV",

      pv: 4300,
    },
    {
      name: "DEC",
      pv: 4300,
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
          <Bar dataKey="pv" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Barchart;
