import React, { useState, useRef } from "react";
import { FaPlayCircle, FaRegStopCircle, FaTrashAlt } from "react-icons/fa";
import { AiFillTag } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { useGetOwnProjectsQuery } from "../../api/API";
import Timer from "./Timer";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  useUpdateTrackedTimeByIDMutation,
  useDeleteTrackedTimeByIDMutation,
} from "../../api/API";

function TimerBar({ task }) {
  //List all projects created by user
  const { data, isLoading, isSuccess, isError } = useGetOwnProjectsQuery();
  const projects = data?.filter((project) => project.default !== "default");

  // console.log(projects)

  const taskNameRef = useRef();
  const projectRef = useRef();
  const startTimeRef = useRef(new Date(task.start));
  const stopTimeRef = useRef(new Date(task.stop));

  const [updateTrackedTimeByID] = useUpdateTrackedTimeByIDMutation();
  const [deleteTrackedTimeByID] = useDeleteTrackedTimeByIDMutation();
  
  const [play, setPlay] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editTime, setEditTime] = useState(false);
  const [editProject, setEditProject] = useState(false);
  const [taskName, setTaskname] = useState(task.task_name);
  const [project, setProject] = useState(task.project.id);
  const [taskStart, setTaskStart] = useState(new Date(task.start));
  const [taskStop, setTaskStop] = useState(new Date(task.stop));

  const handleChangeTaskName = (event) => {
    event.preventDefault();
    const newName = event.target.value;
    if (edit) {
      setTaskname(newName);
    }
  };
  const handleChangeProject = () => {
    setProject(projectRef.current.value);
    console.log(projectRef.current.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const trackedtimeId = task.id;
      const start = new Date(task.start).toISOString()
      const stop = new Date(task.stop).toISOString()
      const newStartTime = new Date(taskStart).toISOString()
      const newStopTime = new Date(taskStop).toISOString()

      let data = {
        task_name: taskName,
        project_id: editProject ? projectRef.current.value : task.project.id,
      };
      if(task.start) {
        data.start= editTime ? newStartTime : start;
      }
      
      if (task.stop) {
        data.stop = editTime ? newStopTime : stop;
      }

      console.log("blue", task, trackedtimeId, data);
     
        updateTrackedTimeByID({trackedtimeId,...data})
        .then((result)=>console.log(result))
        .catch(error=>console.log(error))

        setEdit(false)
        setEditTime(false)
        setEditProject(false)
    }
  };

  
  const handlePlay = () => {
    setPlay(true);
    const trackedtimeId = task.id;
    // console.log(trackedtimeId)
    const startTime = new Date().toISOString();
    var data = {
      start: startTime,
    };
    updateTrackedTimeByID({ trackedtimeId, ...data }).then((result) => {
      // console.log(result);
    });
  };

  const handleStop = () => {
    setPlay(false);
    const trackedtimeId = task.id;
    // console.log(trackedtimeId)
    const stopTime = new Date().toISOString();
    var data = {
      stop: stopTime,
    };
    updateTrackedTimeByID({ trackedtimeId, ...data })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log("error", error);
      });
    setTaskStop(new Date())
  };
  const handelDeleteTask = () => {
    const trackedtimeId = task.id;
    console.log(task);
    deleteTrackedTimeByID(trackedtimeId);
  };
  const handelTaskStartDate = (newDate) => {
    setTaskStart(newDate);
  };
  const handelTaskStopDate = (newDate) => {
    setTaskStop(newDate);
  };
  
  const durationInSeconds = task.duration;
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const duration = `${hours}h ${minutes}m`;

  console.log(task.duration)
  

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Oops! something is wrong</div>;
  }
  return (
    <div className="bg-white flex items-center py-2 px-4 rounded-full w-full shadow-md">
      <div className="flex flex-col lg:flex-row items-center w-full">
        <div className="relative flex items-center w-full">
          <label onClick={() => setEdit(true)} className="flex">
            <input
              className={`${
                edit ? "shadow-inner border-teal-500 " : ""
              }rounded-full bg-transparent focus:outline-teal-500 px-4`}
              value={taskName}
              disabled={!edit}
              onChange={handleChangeTaskName}
              onKeyDown={handleKeyDown}
            />
          </label>
          <div className="flex items-center">
            <AiFillTag
              style={{
                color: `${
                  task.project.tag_color ? task.project.tag_color : "zinc"
                }`,
              }}
              className="mx-1"
            />
            <div className="hidden md:w-1/4 md:flex md:flex-row">
              {editProject ? (
                <label htmlFor="project">
                  <select
                    id="project"
                    name="project"
                    ref={projectRef}
                    onChange={handleChangeProject}
                    onKeyDown={handleKeyDown}
                  >
                    {projects?.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </label>
              ) : (
                <button onClick={() => setEditProject(true)}>
                  {task.project.name}
                </button>
              )}
            </div>
          </div>
        </div>
        {/* <div className="flex relative w-[20%]">
          <p className="text-sm text-zinc-400">{duration}</p>
        </div> */}
        <div className="relative flex items-center w-[70%] justify-end">
          {task?.stop ? (
            <div className="mx-1">
              {editTime ? (
                <div className="flex text-sm" onKeyDown={handleKeyDown}>
                  {/* <input type={"datetime-local"} ref={taskStart} />-
                  <input type={"datetime-local"} ref={taskStop} /> */}
                  <DatePicker
                    selected={taskStart}
                    onChange={handelTaskStartDate}
                    showTimeSelect
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="mx-4"
                  />
                  <DatePicker
                    selected={taskStop}
                    onChange={handelTaskStopDate}
                    showTimeSelect
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="mx-4"
                  />
                </div>
              ) : (
                <div
                  className="flex text-xs w-fit text-zinc-400 gap-2"
                  onClick={() => setEditTime(!editTime)}
                >
                  <p>{moment(task.start).format("DD-MMM-yyyy hh:mm a")}</p>
                  <span>-</span>
                  <p>{moment(task.stop).format("DD-MMM-yyyy hh:mm a")}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex mx-2">
              <Timer play={play} startDate={task.start} />
              {task.start ? (
                <FaRegStopCircle
                  onClick={handleStop}
                  className="text-2xl text-rose-400"
                />
              ) : (
                <FaPlayCircle
                  onClick={handlePlay}
                  className="text-2xl text-zinc-400 hover:text-emerald-500"
                />
              )}
            </div>
          )}
        </div>
      </div>
      <FaTrashAlt
        onClick={handelDeleteTask}
        className="text-md text-zinc-200 hover:text-red-500 "
      />
    </div>
  );
}

export default TimerBar;
