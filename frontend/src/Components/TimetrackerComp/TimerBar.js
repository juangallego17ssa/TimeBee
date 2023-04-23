import React, { useState, useRef } from "react";
import {
  FaPlayCircle,
  FaRegPauseCircle,
  FaRegStopCircle,
  FaTrashAlt,
} from "react-icons/fa";
import { AiFillTag } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { useGetOwnProjectsQuery } from "../../api/API";
import Timer from "./Timer";
import axios from "axios";
import moment from "moment";

import {
  useUpdateTrackedTimeByIDMutation,
  useDeleteTrackedTimeByIDMutation,
} from "../../api/API";
import ProjectOptions from "../ProjectTagComp/ProjectOptions";

function TimerBar({ task }) {
  //List all projects created by user
  const {
    data,
    isLoading,
    isSuccess,
    isError,
  } = useGetOwnProjectsQuery();
  const projects = data?.filter(project=>project.default !== 'default')
  console.log(projects)

  const taskNameRef = useRef();
  const projectRef = useRef();
  const startTimeRef = useRef();
  const stopTimeRef = useRef();

  const [updateTrackedTimeByID] = useUpdateTrackedTimeByIDMutation();
  const [deleteTrackedTimeByID] = useDeleteTrackedTimeByIDMutation();

  const [play, setPlay] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editTime, setEditTime] = useState(false);
  const [editProject, setEditProject] = useState(false);
  const [taskName, setTaskname ]= useState(task.task_name);
  const [project, setProject ]= useState(task.project.id);
  const [BusyBee, setBusyBee] = useState('');
  const [updated, setUpdated] = useState('');

  // const [showProject, setShowProject] = useState(false)

  const handleChangeTaskName = (event) => {
    event.preventDefault();
    const newName = event.target.value;
    if (edit) {
      setTaskname(newName);
    }
  };
  const handleChangeProject = () => {
    console.log(projectRef.current.value);
  };

  const handleAddChange = (event) => {
    setPlay(event.target.value);
  };

  const handlePlayStop = (event) => {
    event.preventDefault();
    setPlay(!play);
    // refetch();
    // perform the search operation here
  };

  const handleEdit = (event) => {
    event.preventDefault();
    setEdit(!edit);
    // console.log(edit)
    // refetch();
    // perform the search operation here
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const trackedtimeId= task.id
      let data ={
        "task_name": taskName,
        "project_id":editProject?projectRef.current.value:task.project.id,
        "start":editTime?startTimeRef.current.value:task.start,
      };
      if(task.stop){data.stop=editTime?stopTimeRef.current.value:task.stop}
      // console.log(task,trackedtimeId,data)
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
      console.log(result);
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
  };
  const handelDeleteTask = () => {
    const trackedtimeId = task.id;
    console.log(task);
    deleteTrackedTimeByID(trackedtimeId);
  };

  return (
    <div className="bg-white flex items-center py-2 px-4 rounded-full w-full shadow-md">
      <div className="flex flex-col lg:flex-row items-end w-full">
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
          {/* <FaTrashAlt onClick={handelDeleteTask}className="text-md text-zinc-300 hover:text-red-500 mx-3"/> */}
        </div>

        <div className="relative  flex items-center">
          {task?.stop ? (
            <div className="mx-1">
              {editTime ? (
                <div className="flex text-sm ma-2" onKeyDown={handleKeyDown}>
                  <input type={"datetime-local"} ref={startTimeRef} />-
                  <input type={"datetime-local"} ref={stopTimeRef} />
                </div>
              ) : (
                <div
                  className="flex text-xs w-fit text-zinc-400 gap-2"
                  onClick={() => setEditTime(!editTime)}
                >
                  <p>{moment(task.start).format("DD-MMM-yyyy hh:mm")}</p>
                  <span>-</span>
                  <p>{moment(task.stop).format("DD-MMM-yyyy hh:mm")}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex mx-2">
              <Timer start={play} />
              {play ? (
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
