import React from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

const HealthChart = () => {
  const data = [
    {
      name: "JAN",
      pv: 50,
    },
    {
      name: "FEB",
      pv: 200,
    },
    {
      name: "MAR",
      pv: 100,
    },
    {
      name: "APR",
      pv: 300,
    },
    {
      name: "MAY",
      pv: 50,
    },
    {
      name: "JUN",
      pv: 400,
    },
    {
      name: "JUL",
      pv: 200,
    },
    {
      name: "AUG",
      pv: 500,
    },
    {
      name: "SEP",
      pv: 200,
    },
    {
      name: "OCT",
      pv: 300,
    },
    {
      name: "NOV",
      pv: 400,
    },
    {
      name: "DEC",
      pv: 500,
    },
  ];

  return (
    <div className="charts w-full max-w-[300px] md:max-w-[300px] lg:max-w-[500px] h-[250px] lg:h-[300px] ">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={450}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 10,
            bottom: 5,
          }}>
          <XAxis
            dataKey="name"
            tickLine={false}
            padding={{ left: 20, right: 30 }}
            stroke="#215E7D"
            strokeWidth={2}
          />
          <YAxis
            tickLine={false}
            stroke="#215E7D"
            strokeWidth={2}
            color="#000"
            fontSize={14}
            fontWeight={400}
            unit="K"
          />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#000"
            strokeWidth={4}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HealthChart;
