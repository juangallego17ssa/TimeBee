import ReportCalendar from "../Components/ReportComp/ReportCalendar";


function Report() {
    return (
      <div className="flex-col bg-teal-400 w-full h-full">Here is Report Page
      <div className="calendar flex flex-col justify-center items-center w-1/3">
          <ReportCalendar />
      </div>
      </div>
    );
  }
  
  export default Report;