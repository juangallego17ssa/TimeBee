import MyComposedChart from "../Components/DashboadComp/composedChart";
import EfficientTime from "../Components/DashboadComp/EfficientTime";
import DataProject from "../Components/DashboadComp/DataProject";

function Dashboard() {

    return (
      <div className="flex-col bg-gradient-to-r from-cyan-500 from-10% via-sky-500 via-20% to-emerald-500 to-80% w-full h-screen">
        <div className="flex w-full h-full">
          <div className="flex-col w-8/12 h-full">
            <div className="flex-col pl-5 pt-5 w-full h-1/2 ">
              <div className="bg-stone-100 h-full w-full rounded-3xl">
                <DataProject />
              </div>
            </div>
            <div className="flex-col w-full pl-5 py-5 h-1/2">
              <div className="bg-stone-100 h-full w-full rounded-3xl"></div>
            </div>
          </div>
          <div className="flex-col w-4/12 h-full p-5">
            <div className="bg-stone-100 h-full w-full py-4 px-9 rounded-3xl">
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