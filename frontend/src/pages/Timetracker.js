import React, { useState, useEffect } from "react";
import {
  AiOutlineClockCircle,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import TimerBar from "../Components/TimetrackerComp/TimerBar";
import {
  useGetTrackedTimeByDateWithStartNullQuery,
} from "../api/API";
import { useDispatch, useSelector } from "react-redux";
import CalendarComponent from "../Components/CalendarComp/Calendar";
import { Views } from "react-big-calendar";
import AddTimeTracker from "../Components/TimetrackerComp/AddTimeTracker";
import moment from 'moment'
import Loader from "../Components/Loader";
import ErrorPage from "../Components/ErrorPage";

function Timetracker() {
  // Fetch all the TrackedItems of the actual user and store it in Redux
  const reduxTrackedTime = useSelector(
    (store) => store.trackedtime.trackedtime
  );

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isManual, setIsManual] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});
  const [tableFilterDataTask, setTableFilterDataTask] = useState([]);
  const [tableShowDataTask, setTableShowDataTask] = useState([]);
  const [tableFilterDataClock, setTableFilterDataClock] = useState([]);
  const [tableShowDataClock, setTableShowDataClock] = useState([]);

  
  

  // GET all tasks created by USER
  const {
    data: tasks,
    isLoading,
    isError,
  } = useGetTrackedTimeByDateWithStartNullQuery(moment(selectedDate).format("YYYY-MM-DD"));
  console.log(tasks)
  
  // filter out login/logout
  const filteredTask = tasks?.filter((task) => task.type_of_input !== "0");
  const TasksOfDay = filteredTask?.filter(
    (task) =>
      new Date(task.start).toDateString() ===
      new Date(selectedDate).toDateString()
  );
  
  const filteredTaskStartNull = tasks?.filter((task) => task.type_of_input !== "0" && task.start === null);





  const filteredTaskClockIn = tasks?.filter((task) => task.type_of_input === "0");
  const clockinOfDay = filteredTaskClockIn?.filter(
    (task) =>
      new Date(task.start).toDateString() ===
      new Date(selectedDate).toDateString()
  );

  // console.log(TasksOfDay);

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
    const [filterDataClock, generatedTableDataClock] =
      prepareTheDataForClockTable(reduxTrackedTime, selectedDate);
      setTableFilterDataTask(filterDataTask);
      setTableShowDataTask(generatedTableDataTask);
      setTableFilterDataClock(filterDataClock);
      setTableShowDataClock(generatedTableDataClock);
  }, [reduxTrackedTime, selectedDate]);

  const handelDateChanged = (e) => {
    e.preventDefault();
    console.log("handelDateChanged");
  };

  if (isLoading) {
    return <Loader />
  } else if (isError) {
    console.log("fetch Error")
    return <ErrorPage />
  }
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
              {isLoading && <div>Loading</div>}
              {TasksOfDay?.map((task) => (
                <TimerBar
                  key={task.id}
                  task={task}
                  selectedProject={selectedProject}
                  setSelectedProject={setSelectedProject}
                />
              ))}
            </div>
            <div className="flex flex-col justify-start items-center gap-4 bg-stone-100 w-full max-h-1/2">
              <div className="font-bold">ALL OPEN TASKS</div>
              {filteredTaskStartNull?.map((task) => (
                <TimerBar
                  key={task.id}
                  task={task}
                  selectedProject={selectedProject}
                  setSelectedProject={setSelectedProject}
                />
              ))}
            </div>
            {/* -----This Section is for correcting clockin and clockout time */}
            
            {/* <div className="flex flex-col justify-start items-center gap-4 bg-stone-100 w-full max-h-1/2">
              <div className="font-bold">CLOCK IN / CLOCK OUT</div>
              {clockinOfDay?.map((task) => (
                <TimerBar
                  key={task.id}
                  task={task}
                  selectedProject={selectedProject}
                  setSelectedProject={setSelectedProject}
                />
              ))}
            </div> */}

            {/* --------- till here----------- */}
          </div>
        </div>
        <div className=" h-full flex-1">
          <CalendarComponent
            events={tasks}
            views={{
              day: true,
            }}
            defaultView={Views.DAY}
            date={selectedDate}
            onDateChange={handleDateChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Timetracker;
