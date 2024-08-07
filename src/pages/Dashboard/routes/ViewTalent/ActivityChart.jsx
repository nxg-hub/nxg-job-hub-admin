import React from "react";
import s from "./activity_chart.module.scss";
import {
  LineChart,
  Line,
  XAxis,
  ReferenceLine,
  Label,
  ResponsiveContainer,
} from "recharts";

export default function ActivityChart() {
  const data = [
    {
      name: "0H",
      pv: -1000,
    },
    {
      name: "1H",
      pv: 800,
    },
    {
      name: "24H",
      pv: -650,
    },
    {
      name: "1W",
      pv: 1100,
    },
    {
      name: "1M",
      pv: -2000,
    },
    {
      name: "3M",
      pv: 1000,
    },
    {
      name: "6M",
      pv: -3500,
    },
    {
      name: "1Y",
      pv: -1490,
    },
  ];

  return (
    <div
      className={`bg-[#2596BE] h-[200px] md:h-[250px] w-[90%] md:max-w-[450px] md:w-full rounded-[15px] relative`}>
      <h3 className="text-white text-[18px] md:text-[24px] font-[600px] block pt-[30px] pl-[30px]">
        Activity Chart
      </h3>
      <ResponsiveContainer width="100%" height="65%">
        <LineChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#fff"
            axisLine={false}
            tickLine={false}
            tick={{ dx: -5 }}
          />
          <Line type="monotone" dataKey="pv" stroke="#fff" dot={false} />
          <ReferenceLine x="6M" stroke="none">
            <Label
              offset={-5}
              position="insideTop"
              viewBox={{
                height: 50,
                width: 50,
                x: 50,
                y: 50,
              }}
              fill="#000"
              fontSize={13.66}
            />
          </ReferenceLine>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
