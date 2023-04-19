import React, { useState ,useRef } from 'react';
import { FaPlayCircle, FaRegPauseCircle, FaRegStopCircle, FaTrashAlt } from "react-icons/fa";
import {AiFillTag} from 'react-icons/ai'
import { FiEdit } from "react-icons/fi";
import { useGetOwnProjectsQuery } from '../../api/API'
import Timer from './Timer';
import axios from 'axios';

import {
  useUpdateTrackedTimeByIDMutation,
  useDeleteTrackedTimeByIDMutation,
} from '../../api/API'
import ProjectOptions from '../ProjectTagComp/ProjectOptions';



function TimerBar({task}) {
  //List all projects created by user
  const { data : projects,isLoading,isSuccess,isError,}= useGetOwnProjectsQuery()
  console.log(projects)
  const taskNameRef = useRef();
  const projectRef = useRef();
  const [ updateTrackedTimeByID ]=useUpdateTrackedTimeByIDMutation()
  const [ deleteTrackedTimeByID ]=useDeleteTrackedTimeByIDMutation()
  

  const [play, setPlay] = useState(false);
  const [edit, setEdit] = useState(false);
  const [taskName, setTaskname ]= useState(task.task_name);
  const [project, setProject ]= useState(task.project.id);
  const [BusyBee, setBusyBee] = useState('');
  const [updated, setUpdated] = useState('');

  const [showProject, setShowProject] = useState(false)
  

  const handleChangeTaskName = (event) => {
    event.preventDefault()
    const newName = event.target.value
    if(edit){
      setTaskname(newName)
    }
  }
  const handleChangeProject = ()=>{
    console.log(projectRef.current.value)
  }

  const handleAddChange = (event) => {
    setPlay(event.target.value);
  }

  const handlePlayStop = (event) => {
    event.preventDefault();
    setPlay(!play)
    // refetch();
    // perform the search operation here
  };

  const handleEdit = (event) => {
    event.preventDefault();
    setEdit(!edit)
    // console.log(edit)
    // refetch();
    // perform the search operation here
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const trackedtimeId= task.id
      let data ={
        "task_name": taskName,
        "project":projectRef.current.value, 
      };
      console.log(trackedtimeId,data)
      updateTrackedTimeByID({trackedtimeId,...data})
      .then((result)=>console.log(result))

      setEdit(!edit)
    }
  };

  const handleStop = ()=>{
    const trackedtimeId = task.id
    // console.log(trackedtimeId)
    const stopTime = new Date().toISOString()
    var data = {
      "stop": stopTime
      
    };
    updateTrackedTimeByID({trackedtimeId,...data})
    .then((result)=>{
      console.log(result)
    })
    .catch((error)=>{
      console.log('error',error)
    })
  }
  const handelDeleteTask = ()=>{
    const trackedtimeId =task.id
    console.log(task)
    // deleteTrackedTimeByID(trackedtimeId)
  }

  return (
    <div className="bg-white flex flex-col justify-between items-center py-2 px-4 rounded-full w-full shadow-md">
    <div className="flex justify-between items-center w-full" >
        <div className="relative w-3/5 flex items-center justify-between">
          <label  onClick={()=>setEdit(true)}>
            <input className=" bg-transparent focus:outline-teal-500 caret-teal-500 flex-grow "
                      // placeholder="BusyBee1"
                      value={taskName}
                      disabled={!edit}
                      onChange={handleChangeTaskName} 
                      onKeyDown={handleKeyDown} 
                    />
          </label>
            <div className='flex items-center'>
              <AiFillTag className={`text-${task.project.tag_color?task.project.tag_color:'zinc'}-400`}/>
              <label htmlFor="project">
              <select id="project" name="project" ref={projectRef} onChange={handleChangeProject}>
                {projects?.map(project=>
                  <option key={project.id} value={project.id}>{project.name}</option>
                  )}
              </select>
            </label>
            </div>
            <div>

            </div>
            </div>
            {/* {edit && */}
              <FaTrashAlt onClick={handelDeleteTask}
              className="text-md text-zinc-300 hover:text-red-500"/>
            {/* } */}
            <Timer start={play}/>
            {/* <FiEdit onClick={()=>{setEdit(true)}}
              className="text-md text-zinc-400 hover:text-yellow-500" /> */}
          
          <div className="flex gap-2 ">
            {play ?
              <FaRegPauseCircle onClick={handlePlayStop} 
              className="text-2xl text-zinc-400 hover:text-rose-500" />
            :
              <FaPlayCircle onClick={handlePlayStop} 
              className="text-2xl text-zinc-400 hover:text-emerald-500" />
            }   
            <FaRegStopCircle onClick={handleStop}
              className="text-2xl text-zinc-400 hover:text-rose-500" />
          </div>
    </div> 
    {task.stop &&
     <div className='w-full px-2 flex justify-end'>
      <p className='text-xs text-zinc-300'>{task.stop}</p>
     </div>  
    }
    </div>
    );
  }
  
  export default TimerBar;