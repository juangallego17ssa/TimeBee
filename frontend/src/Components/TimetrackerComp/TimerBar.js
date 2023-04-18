import React, { useState } from 'react';
import { FaPlayCircle, FaRegPauseCircle, FaRegStopCircle, FaTrashAlt } from "react-icons/fa";
import {AiFillTag} from 'react-icons/ai'
import { FiEdit } from "react-icons/fi";
import Timer from './Timer';


function TimerBar({task}) {
  // console.log(task)

  const [play, setPlay] = useState(false);
  const [edit, setEdit] = useState(false);
  const [BusyBee, setBusyBee] = useState('');
  const [updated, setUpdated] = useState('');

  const [showProject, setShowProject] = useState(false)

  const handleChangeBusyBee = (event) => {
    setBusyBee(event.target.value);
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
    console.log(edit)
    // refetch();
    // perform the search operation here
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setUpdated(BusyBee);
      setEdit(!edit)
    }
  };

  return (
    <div className=" bg-white flex justify-between items-center py-2 px-4 rounded-full w-full shadow-md">
        <div className="relative flex items-center">
                <input className=" bg-transparent focus:outline-teal-500 caret-teal-500 flex-grow "
                  // placeholder="BusyBee1"
                  value={task.task_name}
                  disabled={!edit}
                  onChange={handleChangeBusyBee} 
                  onKeyDown={handleKeyDown} 
                 />
              
            {edit &&
              <FaTrashAlt className="absolute left-36 text-md text-zinc-300 hover:text-red-500"/>
            }
            <AiFillTag className={`text-${task.project.tag_color?task.project.tag_color:'zinc'}-500`}
                      onClick={()=>setShowProject(!showProject)}/>
            <p>{task.project.name?task.project.name:''}</p>
                      {/* {showProject && 
                        <div>
                          
                        </div>
                      } */}
            </div>
            <Timer className="border-2 border-red w-24" start={play}/>
            <FiEdit onClick={()=>{setEdit(true)}}
              className="text-md text-zinc-400 hover:text-yellow-500" />
          
          <div className="flex gap-2 ">
            {play ?
              <FaRegPauseCircle onClick={handlePlayStop} 
              className="text-2xl text-zinc-400 hover:text-rose-500" />
            :
              <FaPlayCircle onClick={handlePlayStop} 
              className="text-2xl text-zinc-400 hover:text-emerald-500" />
            }   
            <FaRegStopCircle 
              className="text-2xl text-zinc-400 hover:text-rose-500" />
          </div>
    </div>    
    );
  }
  
  export default TimerBar;