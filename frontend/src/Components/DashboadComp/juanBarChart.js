import React, { PureComponent } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
} from 'recharts';

const ClockChart = () => {
    const data = [
    {
        "Day": "2023.4.17",
        "Time at work": [
            "9.0",
            "18.3"
        ]
    },
    {
        "Day": "2023.4.18",
        "Time at work": [
            "9.0",
            "19.8"
        ]
    },
    {
        "Day": "2023.4.19",
        "Time at work": [
            "8.0",
            "17.3"
        ]
    },
    {
        "Day": "2023.4.20",
        "Time at work": [
            "9.0",
            "20.3"
        ]
    },
    {
        "Day": "2023.4.21",
        "Time at work": [
            "9.0",
            "17.9"
        ]
    }
]


    return (
        <BarChart height={200} width={280} data={data} margin={{top: 20, right: 20, bottom: 20, left: 20}} >
          <XAxis dataKey="Day"
                 fontSize={8}
                 angle={-45} // rotate labels by 45 degrees
                 textAnchor="end" // align labels to the end of the tick
                 interval={0} // display all ticks
          />
          <YAxis ticks={6} domain={[6, 22]} fontSize={12} />
          <Tooltip />
          <Bar dataKey="Time at work"  fill="#773377" />
        </BarChart>
    )

}


export default ClockChart
