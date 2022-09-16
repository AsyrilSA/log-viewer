import React, { PureComponent } from "react";
import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Communication Log", value: 15 },
  { name: "Application Log", value: 57 },
  { name: "Kernel Log", value: 28 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class Example extends PureComponent {
  render() {
    return (
      <PieChart width={300} height={300} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data}
          cx={120}
          cy={140}
          innerRadius={60}
          outerRadius={80}
          label={{ value: renderCustomizedLabel, fill: "black" }}
          fill="#8884d8"
          paddingAngle={1}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    );
  }
}
