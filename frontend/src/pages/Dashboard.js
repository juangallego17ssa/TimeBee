import React, { useState } from "react";
import MyComposedChart from "../Components/DashboadComp/composedChart";
import DataProject from "../Components/DashboadComp/DataProject";
import EfficientTime from "../Components/DashboadComp/EfficientTime";
import Overhours from "../Components/DashboadComp/composedChart";

function Dashboard() {

  const [displayChange, setDisplayChange] = useState(false)

  function handleDisplayChange(event) {
    setDisplayChange(event.target.checked)
}

    return (
      <div className="flex flex-col flex-grow bg-stone-100 w-full md:h-full">
        <div className="flex w-full h-full">
          <div className="flex-col w-8/12 h-full">
          <label htmlFor='projekt-clock-switch' className="flex pl-5 py-2">
                <input 
                type="checkbox" 
                checked={displayChange} 
                onChange={handleDisplayChange} 
                id="projekt-clock-switch" 
                className="cursor-pointer h-10 w-32 rounded-full appearance-none border-zinc-300 bg-opacity-10 border-2 checked:bg-zinc-300 transition duration-200 relative"/>
            </label>

            {displayChange ?

              <div className="flex-col pl-5 pb-12  w-full h-full ">
                <div className="flex bg-stone-100 h-full w-full rounded-3xl border-2 shadow-xl">
                  <DataProject />
                </div>
              </div>

              :
              <div className="flex-col w-full pl-5 pb-12 h-full">
                <div className="bg-stone-100 h-full w-full rounded-3xl border-2 shadow-xl">
                    {/*<Overhours></Overhours>*/}
                </div>
              </div>
            }
          </div>
          <div className="flex-col w-4/12 h-full pt-12 px-5">
            <div className="bg-stone-100 h-full w-full py-4 px-9 rounded-3xl border-2 shadow-xl">
              {/*<EfficientTime></EfficientTime>*/}
            </div>
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