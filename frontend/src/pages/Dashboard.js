import MyComposedChart from "../Components/DashboadComp/composedChart";
import DataProject from "../Components/DashboadComp/DataProject";
import EfficientTime from "../Components/DashboadComp/EfficientTime";

function Dashboard() {

    return (
        <div className="flex-col bg-stone-100 w-full h-screen">
            <div className="flex w-full h-full">
                <div className="flex-col w-8/12 h-full">
                    <div className="flex-col pl-5 pt-5 w-full h-1/2 ">
                        <div className="flex felx-grow bg-stone-100 h-full w-full rounded-3xl border-2 shadow-xl">
                            <DataProject/>
                        </div>
                    </div>
                    <div className="flex-col w-full pl-5 py-5 h-1/2 border-2 shadow-xl">
                        <div className="bg-stone-100 h-full w-full rounded-3xl">{MyComposedChart()}</div>
                    </div>
                </div>
                <div className="flex-col w-4/12 h-full p-5">
                    <div className="bg-stone-100 h-full w-full py-4 rounded-3xl border-2 shadow-xl">
                        <EfficientTime></EfficientTime>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default Dashboard;