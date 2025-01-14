"use client";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ResponsiveBar } from "@nivo/bar";

import { RootState } from "@/redux/store";

const BarChart = () => {
    const usersCount = useSelector((state: RootState) => state.users.list.length);
    const companiesCount = useSelector((state: RootState) => state.companies.list.length);

    const data = useMemo(
        () => [
            { category: "Users", count: usersCount },
            { category: "Companies", count: companiesCount },
        ],
        [usersCount, companiesCount]
    );

    return (
        <div style={{height: "400px"}}>
            <ResponsiveBar
                data={data}
                keys={["count"]}
                indexBy="category"
                margin={{top: 50, right: 50, bottom: 50, left: 60}}
                padding={0.3}
                colors={{scheme: "nivo"}}
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
                labelTextColor={{from: "color", modifiers: [["darker", 1.6]]}}
                animate={true}
            />
        </div>
    );
}

export default BarChart;
