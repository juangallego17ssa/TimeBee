import React, { useState } from "react";
import MyComposedChart from "../Components/DashboadComp/composedChart";
import DataProject from "../Components/DashboadComp/DataProject";
import EfficientTime from "../Components/DashboadComp/EfficientTime";

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
                <input type="checkbox" checked={displayChange} onChange={handleDisplayChange} id="projekt-clock-switch" className="cursor-pointer h-8 w-20 rounded-md appearance-none border-zinc-400 bg-opacity-10 border-2 checked:bg-zinc-400 transition duration-200 relative"/>
            </label>
            
            {displayChange ?
            
              <div className="flex-col pl-5 pb-12  w-full h-full ">
                <div className="flex bg-stone-100 h-full w-full rounded-3xl border-2 shadow-xl">
                  <DataProject />
                </div>
              </div>

              :
              <div className="flex-col w-full pl-5 pb-12 h-full">
                <div className="bg-stone-100 h-full w-full rounded-3xl border-2 shadow-xl"></div>
              </div>
            }
          </div>
          <div className="flex-col w-4/12 h-full pt-12 px-5">
            <div className="bg-stone-100 h-full w-full py-4 px-9 rounded-3xl border-2 shadow-xl">
              <div className="tracking-wider text-xl">Efficient Time</div>
              <div className="flex ">
                <p className="mt-3 tracking-wider text-sm">Show result per</p>
                <select className="text-sm mt-3" id="selector" name="selector">
                  <option value="week">Week</option>
                  <option value="month">Month</option>
                </select>
              </div>
              <div className="mt-3 flex">
                <div className="flex justify-center items-center cursor-pointer w-1/12 semi-bold text-sm text-sky-600">
                  &lt;&lt;
                </div>
                <div className="flex justify-center items-center w-10/12 semi-bold text-xs text-sky-600">
                  Week 16
                </div>
                <div className="flex justify-center items-center cursor-pointer w-1/12 semi-bold text-sm text-sky-600">
                  &gt;&gt;
                </div>
              </div>
              <div className="flex justify-center items-center mt-2 h-32 w-full">
                <div className="flex-col h-32 w-16">
                  <div className="bg-gray-400 h-1/5 w-full rounded"></div>
                  <div className="bg-emerald-500 h-4/5 w-full mt-1 rounded"></div>
                </div>
                <div className="flex-col h-32 ml-1 w-6 ">
                  <div className="h-1/5 w-full border-t border-zinc-400"></div>
                  <div className="h-4/5 w-full mt-1 border-b border-zinc-400"></div>
                </div>
              </div>

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