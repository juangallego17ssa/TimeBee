import { useState,useRef,useEffect } from "react";
import MonthlyView from "../Components/ReportComp/MonthlyView/MonthlyView";
import AnnualView from "../Components/ReportComp/AnnualView/AnnualView";
import {useCreateTrackedTimeMutation} from '../api/API'
import moment from "moment";



function Report() {
  const[showAnnualReport,setShowAnnualReport] = useState(false)


  return(
    <section className="mx-6 inline-block h-[88%]">
    <div className="switch-view-btn flex gap-3">

    <label htmlFor='report-monthly-annual-switch' className="flex pl-5 py-2">
                <input 
                type="checkbox" 
                checked={showAnnualReport} 
                onChange={()=>setShowAnnualReport(!showAnnualReport)} 
                id="report-monthly-annual-switch" 
                className="cursor-pointer h-10 w-40 rounded-full appearance-none border-zinc-300 bg-opacity-10 border-2 checked:bg-zinc-300 transition duration-200 relative"/>
            </label>


    </div>
    {showAnnualReport?
      <AnnualView />
      :
      <MonthlyView />
    }
    </section>


  )
} 
  export default Report;
