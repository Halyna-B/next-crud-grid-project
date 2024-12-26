"use client";
import { ResponsiveBar } from "@nivo/bar";

const data = [
    { category: "Users", count: 50 },
    { category: "Companies", count: 10 },
];

const BarChart = () => (
    <div style={{ height: "400px" }}>
        <ResponsiveBar
            data={data}
            keys={["count"]}
            indexBy="category"
            margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
            padding={0.3}
            colors={{ scheme: "nivo" }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Category",
                legendPosition: "middle",
                legendOffset: 40,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Count",
                legendPosition: "middle",
                legendOffset: -50,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            animate={true}
        />
    </div>
);

export default BarChart;
