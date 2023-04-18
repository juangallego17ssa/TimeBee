import { GiTreeBeehive, GiBee } from "react-icons/gi";
import { useNavigate } from "react-router";
import MyResponsivePie from "../Components/PieChart/PieChart";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';


function Home() {


  const myData = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];


  const [data, setData] = useState([
    {
      "id": "go",
      "label": "go",
      "value": 113,
      "color": "hsl(340, 70%, 50%)"
    },
    {
      "id": "python",
      "label": "python",
      "value": 35,
      "color": "hsl(353, 70%, 50%)"
    },
    {
      "id": "c",
      "label": "c",
      "value": 229,
      "color": "hsl(288, 70%, 50%)"
    },
    {
      "id": "sass",
      "label": "sass",
      "value": 353,
      "color": "hsl(229, 70%, 50%)"
    },
    {
      "id": "hack",
      "label": "hack",
      "value": 160,
      "color": "hsl(161, 70%, 50%)"
    }
  ])

  const navigate = useNavigate()
  const goToLogIn = () => {
    navigate("/login");
  };

  const goToSignUp = () => {
    navigate("/signUp");
  };

    return (
      <div className="flex-col bg-gradient-to-r bg-stone-100 w-full h-full">
          <div className="flex flex-row justify-evenly items-center w-1/4 h-1/2">
          <GiTreeBeehive className="flex flex-wrap w-full h-full text-amber-500" />
          <div className="flex flex-wrap w-1/4 h-1/4">
            <GiBee className=" animate-bounce flex flex-wrap w-full h-full text-black" />
            <button onClick={goToLogIn} type="button" className="Login felx flew-wrap m-2 w-20 rounded-full text-white bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-pink-500 hover:to-yellow-500 to-80%">LOG IN</button>
          </div>
        </div>
        <div>Hello</div>
        {MyResponsivePie(data)}
        <LineChart width={500} height={300} data={myData}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
        </LineChart>
        <button onClick={goToSignUp} className="flex flex-wrap justify-center items-center w-56 h-50 ml-10 rounded-full text-white text-bold text-4xl bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-pink-500 hover:to-yellow-500 to-80%">
          
        </button>
      </div>
    );
  }
  
  export default Home;