import React, { PureComponent } from 'react';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from 'recharts';

const MyComposedChart = () => {

    const data = [
      {
        "name": "January",
        "yearsaldo": 1,
        "over/under-time": 1,
        "saldo": 1
      },
      {
        "name": "February",
        "yearsaldo": 0,
        "over/under-time": -1,
        "saldo": 0
      },
      {
        "name": "March",
        "yearsaldo": 2,
        "over/under-time": 2,
        "saldo": 2
      },
      {
        "name": "April",
        "yearsaldo": 3,
        "over/under-time": 1,
        "saldo": 3
      },
      {
        "name": "Mai",
        "yearsaldo": 4.5,
        "over/under-time": 1.5,
        "saldo": 4.5
      },
      {
        "name": "Juni",
        "yearsaldo": 4,
        "over/under-time": -0.5,
        "saldo": 4
      },
      {
        "name": "July",
        "yearsaldo": 4.5,
        "over/under-time": 0.5,
        "saldo": 4.5
      }
    ]


    return (
        <ComposedChart width={730} height={250} data={data} className="bg-white">
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#f5f5f5" />
          <Area type="monotone" dataKey="yearsaldo" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="over/under-time" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="saldo" stroke="#ff7300" />
        </ComposedChart>
    )

}


export default MyComposedChart

