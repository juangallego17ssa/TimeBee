import MyComposedChart from "../Components/DashboadComp/composedChart";
import EfficientTime from "../Components/DashboadComp/EfficientTime";
import React from "react";
import Overhours from "../Components/DashboadComp/composedChart";

function Dashboard() {


    return (
        <div className="flex-col bg-gradient-to-r from-cyan-500 from-10% via-sky-500 via-20% to-emerald-500 to-80% w-full h-screen">
            <div className="flex w-full h-full">
                <div className="flex-col w-8/12 h-full">
                    <div className="flex-col pl-5 pt-5 w-full h-1/2 ">
                        <div className="bg-stone-100 h-full w-full rounded-3xl">
                        </div>
                    </div>
                    <div className="flex-col w-full pl-5 py-5 h-1/2">
                        <div className="bg-stone-100 h-full w-full p-4 rounded-3xl flex">
                            <Overhours></Overhours>

                        </div>
                    </div>
                </div>
                <div className="flex-col w-4/12 h-full p-5">
                    <div className="bg-stone-100 h-full w-full py-4 rounded-3xl">
                        <EfficientTime></EfficientTime>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default Dashboard;