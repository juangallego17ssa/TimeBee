import React, { useState, useRef, useEffect } from "react";
import { GiBee } from "react-icons/gi";
import {
  AiFillTag,
  AiOutlineClockCircle,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import TimerBar from "../Components/TimetrackerComp/TimerBar";
import Timer from "../Components/TimetrackerComp/Timer";
import { FaRegCalendarAlt } from "react-icons/fa";
import ProjectOptions from "../Components/ProjectTagComp/ProjectOptions";

import {
  useGetTrackedTimeQuery,
  useCreateTrackedTimeMutation,
  useGetOwnTrackedTimeQuery,
} from "../api/API";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrackedTimeOwn } from "../redux/Slices/trackedTimeOwnSlice";
import CalendarComponent from "../Components/CalendarComp/Calendar";
import { Views } from "react-big-calendar";
import AddTimeTracker from "../Components/TimetrackerComp/AddTimeTracker";
import { reactHooksModule } from "@reduxjs/toolkit/dist/query/react";

function Timetracker() {
  // Fetch all the TrackedItems of the actual user and store it in Redux
  const dispatch = useDispatch();
  const reduxTrackedTime = useSelector(
    (store) => store.trackedtime.trackedtime
  );

  useEffect(() => {
    dispatch(fetchTrackedTimeOwn());
  }, []);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isManual, setIsManual] = useState(false);
  const [showProjectTags, setShowProjectTags] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});
  const [tableFilterDataTask, setTableFilterDataTask] = useState([]);
  const [tableShowDataTask, setTableShowDataTask] = useState([]);
  const [tableFilterDataClock, setTableFilterDataClock] = useState([]);
  const [tableShowDataClock, setTableShowDataClock] = useState([]);
  
  

  const prepareTheDataForTaskTable = (reduxTrackedTime, date) => {
    const filteredOnlyTaskData = reduxTrackedTime?.filter(
      (task) => task.type_of_input !== "0"
      );
      
      const dateSelectedData = filteredOnlyTaskData?.filter((task) => {
        return new Date(task.start).toDateString() === date.toDateString();
      });
      
    
    return [filteredOnlyTaskData, dateSelectedData];
  };


  const prepareTheDataForClockTable = (reduxTrackedTime, date) => {
    const filteredOnlyClockData = reduxTrackedTime?.filter(
      (task) => task.type_of_input === "0"
    );

    const dateSelectedDataClock = filteredOnlyClockData?.filter((task) => {
      return new Date(task.start).toDateString() === date.toDateString();
    });

    return [filteredOnlyClockData, dateSelectedDataClock];
  };

   const handleDateChange = (newDate) => {
     setSelectedDate(newDate);
   };

   useEffect(() => {
    const [filterDataTask, generatedTableDataTask] = prepareTheDataForTaskTable(
      reduxTrackedTime,
      selectedDate
     );
     const [filterDataClock, generatedTableDataClock] = prepareTheDataForClockTable(
      reduxTrackedTime,
      selectedDate
    );
    setTableFilterDataTask(filterDataTask);
    setTableShowDataTask(generatedTableDataTask);
    setTableFilterDataClock(filterDataClock);
    setTableShowDataClock(generatedTableDataClock);
  }, [reduxTrackedTime, selectedDate]);

  // console.log(selectedDate);
  // console.log(tableFilterDataTask);
  // console.log(tableShowDataTask);

  const handleSearch = (event) => {
    event.preventDefault();
  };

  const handelDateChanged = (e) => {
    e.preventDefault();
    console.log("handelDateChanged");
  };

  return (
    <div className="flex flex-col flex-grow bg-stone-100 w-full md:h-full gap-4 px-8 py-4">
      <div className="flex items-center w-full gap-2 px-4">
        <AddTimeTracker isManual={isManual} />
        <div className="flex flex-col">
          <div>
            <AiOutlineClockCircle
              className={`${
                isManual ? "text-zinc-400" : "text-teal-400"
              } text-xl hover:cursor-pointer hover:text-teal-500`}
              onClick={() => setIsManual(false)}
            />
          </div>
          <div>
            <AiOutlineUnorderedList
              className={`${
                isManual ? "text-teal-400" : "text-zinc-400"
              } text-xl hover:cursor-pointer hover:text-teal-500`}
              onClick={() => setIsManual(true)}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row h-[80vh]">
        <div className="Leftcontainer md:w-3/5 flex flex-col px-6 pb-3">
          <div className="flex flex-col justify-start items-center gap-4 bg-stone-100 w-full h-4/6 md:h-screen">
            <div className="flex flex-col justify-start items-center gap-4 bg-stone-100 w-full max-h-1/2">
              <div className="font-bold">TASKS / PROJECTS</div>
              {tableShowDataTask?.map((task) => (
                <TimerBar
                  key={task.id}
                  task={task}
                  selectedProject={selectedProject}
                  setSelectedProject={setSelectedProject}
                />
              ))}
            </div>
            <div className="flex flex-col justify-start items-center gap-4 bg-stone-100 w-full max-h-1/2">
              <div className="font-bold">CLOCK IN / CLOCK OUT</div>
              {tableShowDataClock?.map((task) => (
                <TimerBar
                  key={task.id}
                  task={task}
                  selectedProject={selectedProject}
                  setSelectedProject={setSelectedProject}
                />
              ))}
            </div>

            {/* <TimerBar addProject={addProject} /> */}
          </div>
        </div>
        <div className=" h-full flex-1">
          <CalendarComponent
            events={reduxTrackedTime}
            views={{
              day: true,
            }}
            defaultView={Views.DAY}
            data={selectedDate}
            onDateChange={handleDateChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Timetracker;
