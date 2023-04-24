import React,{useState,useRef}from 'react';
import { AiFillTag } from 'react-icons/ai'
import { FiPlus } from 'react-icons/fi'
import {FaCalendarAlt} from 'react-icons/fa'
import ProjectOptions from '../ProjectTagComp/ProjectOptions';
import {useCreateTrackedTimeMutation} from '../../api/API'
import moment from 'moment';

import Calendar from 'react-calendar';



export default function AddTimeTracker({isManual}) {

    const [showProjectTags, setShowProjectTags] = useState(false);
    const [selectedProject,setSelectedProject] = useState({});

    

    const taskNameRef=useRef()
    const startTimeRef=useRef()
    const endTimeRef=useRef()

// Timer Create
    const [createTrackedTime] = useCreateTrackedTimeMutation()
    
  const handleCreateTimer = (e) => {
    e.preventDefault();

    //---- FROM HERE IS THE REAL CODE ----//
      
    const data = ({
        type_of_input:"1",
        // start:new Date().toISOString(),
        task_name:taskNameRef.current.value,
        project_id:selectedProject.id,
      })
      console.log(data)
      createTrackedTime(data)
      .then(result=>console.log(result))
        
      // Clean up input
      taskNameRef.current.value = '';
      setSelectedProject('');
    }
    
      
    // ------------END-------------//

    // ---- Create FAKE CLOCK-IN/OUT data ----// !!! comment out when after use
  //   const month = 4
  //   const start_date = 10
  //   const end_date = 19
  //   for (let i = start_date; i <= end_date; i++) { // !!! careful with the weekeds and holidays
  //     const date = i
  //     const start = new Date(`2023-${month}-${date} 09:${Math.floor(Math.random() * 60)}`).toISOString()
  //     const stop = new Date(`2023-${month}-${date} 18:${Math.floor(Math.random() * 60)}`).toISOString()
  //     const new_data = {
  //       "type_of_input": "1",
  //       "task_name": "generated automatically",
  //       "start": start,
  //       "stop": stop,
  //       "project_id": 47
  //     }
  //     createTrackedTime(new_data)
  //       .then(result => console.log(result)).catch(err => console.log(err))
  //   }
  // }
      // ------------END-------------//

    

// Manual Create
    const handleCreateMaually=(e)=>{
      e.preventDefault();   
      const data = ({
        type_of_input:"2",
        start:startTimeRef.current.value,
        stop:endTimeRef.current.value,
        task_name:taskNameRef.current.value,
        project_id:selectedProject.id,
      })
    //   console.log(data)
      createTrackedTime(data)
      .then(result=>console.log(result))
      
    //   Clean up input
      taskNameRef.current.value = '';
      startTimeRef.current.value = '';
      endTimeRef.current.value='';
      setSelectedProject('');
    }

    if (isManual){
        return(
            <div className='flex items-center flex-grow gap-2'>
            <div className='flex flex-col lg:flex-row md:items-center items-start bg-white py-2 px-6 rounded-3xl md:rounded-full shadow-md flex-grow '>
                <div className=' w-full grid grid-cols-[2fr_1fr]'>
                    <label htmlFor='task-name'>
                        <input 
                        className=' py-1 w-full shadow-inner rounded-full px-4 focus:outline-none'
                        id='task-name' 
                        placeholder='What are you working on ?'
                        ref={taskNameRef}/>
                    </label>
                    <div className="relative flex items-center">
                  <AiFillTag
                    style={{color: `${selectedProject.tag_color?selectedProject.tag_color:'zinc'}`}}
                        className="m-1 text-xl"
                        onClick={() => {
                        setShowProjectTags(!showProjectTags);
                        }}
                    />
                    <p>{selectedProject ? selectedProject.name : ""}</p>
        
                    {showProjectTags && (
                        <ProjectOptions
                        selectedProject={selectedProject}
                        setSelectedProject={setSelectedProject}
                        setShowProjectTags={setShowProjectTags}
                        />
                    )}
                    </div>    
                </div>
             {/*---- start time and finish time ----*/}
                <div className=' flex items-center justify-end gap-2 w-full text-zinc-600'> 
                    <div className='relative flex items-center '>
                        <label htmlFor='startTime'>
                            <input 
                            id='startTime' 
                            className="w-fit text-center focus:outline-none"
                            type={'datetime-local'}
                            ref={startTimeRef}
                            />
                        </label>
                    </div>
                    <span>-</span>
                    <div className='relative flex items-center '>
                        <label htmlFor='endTime'>
                            <input 
                            id='endTime' 
                            className="w-fit text-center focus:outline-none"
                            type={'datetime-local'}
                            ref={endTimeRef}
                            />
                        </label>
                    </div>  
                </div>
            </div>
            <div 
            onClick={handleCreateMaually}
            className='border-[2.5px] border-teal-400 text-teal-400 w-8 h-8 flex items-center justify-center rounded-full hover:bg-teal-400  hover:text-white'>
                <FiPlus className='text-xl font-extrabold'/>
            </div>
            </div>
    )

    }else{
        return (
          <div className="flex items-center flex-grow gap-2">
            <div className="grid grid-cols-[2fr_1fr] bg-white py-2 px-4 rounded-full shadow-md flex-grow">
              <label htmlFor="task-name">
                <input
                  className="py-1 w-full shadow-inner rounded-full px-4 focus:outline-none"
                  id="task-name"
                  placeholder="What are you working on ?"
                  ref={taskNameRef}
                />
              </label>
              <div className="relative flex items-center">
                <AiFillTag
                  style={{
                    color: `${
                      selectedProject.tag_color
                        ? selectedProject.tag_color
                        : "zinc"
                    }`,
                  }}
                  className="m-1 text-xl"
                  onClick={() => {
                    setShowProjectTags(!showProjectTags);
                  }}
                />
                <p>{selectedProject ? selectedProject.name : ""}</p>

                {showProjectTags && (
                  <ProjectOptions
                    selectedProject={selectedProject}
                    setSelectedProject={setSelectedProject}
                    setShowProjectTags={setShowProjectTags}
                  />
                )}
              </div>
            </div>
            <div
              onClick={handleCreateTimer}
              className="border-[2.5px] border-teal-400 text-teal-400 w-8 h-8 flex items-center justify-center rounded-full hover:bg-teal-400  hover:text-white"
            >
              <FiPlus className="text-xl font-extrabold" />
            </div>
          </div>
        );
    }
  }
