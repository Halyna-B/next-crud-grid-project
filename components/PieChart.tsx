"use client";
import { useMemo } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';


const PieChart = () => {
    const usersCount = useSelector((state: RootState) => state.users.list.length);
    const companiesCount = useSelector((state: RootState) => state.companies.list.length);

    const pieData = useMemo(
        () => [
            {id: "Users", value: usersCount, label: "Users"},
            {id: "Companies", value: companiesCount, label: "Companies"},
        ],
        [usersCount, companiesCount]
    );

    return (
        <div style={{height: "400px"}}>
            <ResponsivePie
                data={pieData}
                margin={{top: 40, right: 80, bottom: 80, left: 80}}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colors={{scheme: "nivo"}}
                borderWidth={1}
                borderColor={{from: "color", modifiers: [["darker", 0.2]]}}
                animate={true}
            />
        </div>
    );
};

export default PieChart;
