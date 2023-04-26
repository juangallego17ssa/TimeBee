import React, { useState } from "react";
import MyComposedChart from "../Components/DashboadComp/Overhours";
import DataProject from "../Components/DashboadComp/DataProject";
import EfficientTime from "../Components/DashboadComp/EfficientTime";
import Overhours from "../Components/DashboadComp/Overhours";

function Dashboard() {

  const [displayChange, setDisplayChange] = useState(false)

  function handleDisplayChange(event) {
    setDisplayChange(event.target.checked)
}

    return (
      <div className="flex flex-col lg:flex-row item-center  bg-stone-100  h-[98%]">
        <div className="flex-col w-8/12 h-full">
          <label htmlFor="projekt-clock-switch" className="flex pl-5 py-2">
            <input
              type="checkbox"
              checked={displayChange}
              onChange={handleDisplayChange}
              id="projekt-clock-switch"
              className="cursor-pointer h-8 w-32 rounded-full appearance-none border-zinc-300 bg-opacity-10 border-2 checked:bg-zinc-300 transition duration-200 relative"
            />
          </label>

          {displayChange ? (
            <div className="flex-col pl-5 pb-12  w-full h-full">
              <div className="flex bg-stone-100 h-full w-full rounded-3xl border-2 shadow-xl">
                <DataProject />
              </div>
            </div>
          ) : (
            <div className="items-center justify-center bg-white ml-4 shadow-md rounded-xl p-4 flex-col h-[90%] ">
              <Overhours></Overhours>
            </div>
          )}
        </div>

        {/* Right wrapper */}
        <div className="flex-col w-4/12 h-full pt-12 px-5">
          <div className="bg-white  w-full rounded-xl shadow-md h-[96.25%]">
            <EfficientTime></EfficientTime>
          </div>
        </div>

        {/*<div className="h-48">{CreateDataBackend()}</div>*/}
        {/*<div className="h-48">{MyResponsiveCalendar(data)}</div>*/}
        {/*<div className="h-48">{MyResponsiveTimeRange(data2)}</div>*/}
        {/*<div className="h-48">{MyComposedChart()}</div>*/}
      </div>
    );
  }
  
  export default Dashboard;