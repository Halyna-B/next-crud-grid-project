"use client";
import { ResponsivePie } from "@nivo/pie";

const pieData = [
  { id: "Users", value: 50, label: "Users" },
  { id: "Companies", value: 10, label: "Companies" },
];

const PieChart = () => (
  <div style={{ height: "400px" }}>
    <ResponsivePie
      data={pieData}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      colors={{ scheme: "nivo" }}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      animate={true}
    />
  </div>
);

export default PieChart;
