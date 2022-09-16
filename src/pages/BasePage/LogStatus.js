import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Comm",
    warning: 6500,
    info: 2400,
    error: 1600,
  },
  {
    name: "App",
    warning: 4000,
    info: 13200,
    error: 954,
  },
  {
    name: "Kernel",
    warning: 500,
    info: 6500,
    error: 600,
  },
];

export default function LogStatus() {
  return (
    <BarChart
      width={450}
      height={280}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="warning" stackId="a" fill="#DEEB7F" />
      <Bar dataKey="info" stackId="a" fill="#509CEB" />
      <Bar dataKey="error" stackId="a" fill="#f44336" />
    </BarChart>
  );
}
