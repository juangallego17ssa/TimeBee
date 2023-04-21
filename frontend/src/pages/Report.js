import { useState,useRef } from "react";
import MonthlyView from "../Components/ReportComp/MonthlyView/MonthlyView";
import AnnualView from "../Components/ReportComp/AnnualView/AnnualView";



function Report() {
  const[showAnnualReport,setShowAnnualReport] = useState(false)


  return(
    <section className="mx-6">
    <div className="switch-view-btn flex gap-3">
      <button
      className="bg-black text-white font-bold px-4 py-2 rounded-lg"
      onClick={()=>setShowAnnualReport(false)}
      >
        MONTHLY
      </button>
      <button
      className="bg-black text-white font-bold px-4 py-2 rounded-lg"
      onClick={()=>setShowAnnualReport(true)}
      >
        ANNUAL
      </button>

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

  const woking_hour_data={}