import React,{useState} from 'react';
import AddNewProject from './AddNewProject';
import {AiFillTag} from 'react-icons/ai'
import { RxCross2 } from 'react-icons/rx' 

//RTK
import { useGetOwnProjectsQuery, useDeleteProjectByIDMutation} from '../../api/API';


function ProjectOptions({setTag, setSelectedProject,setShowProjectTags}) {
  const { 
    data : projects=[], 
    isLoading,
    isSuccess, 
    isError, 
    }
    = useGetOwnProjectsQuery()
  
  const [deleteProjectByID] = useDeleteProjectByIDMutation();


  
  const [ showCreateTag, setShowCreateTag ]= useState(false)

  const handleSetProject=(project)=>{
    setSelectedProject(project)
    setShowProjectTags(false)
    console.log(project.tag_color)
  }
  const handleDeteleProject = (project)=>{
    // console.log(project.id)
    deleteProjectByID(project.id)
    
  }

  return (
    <div className=' z-20 '>
      <div className='absolute right-0 top-10 width-40 bg-white rounded-md shadow-md'>
        <label htmlFor='project-filter'>
          <input className='m-4 border-2 rounded-full py-1 px-4 focus:outline-teal-400' id='project-filter' placeholder='Find project...'/>
        </label>
        {projects.map(project=>
        <div className='grid grid-cols-[30px_1fr_10px] items-center hover:bg-stone-100 mb-2 px-4'
              >
          <AiFillTag className={`m-1 text-${project.tag_color?project.tag_color:'zinc'}-400`} />
          <p className='' key={project.id} 
            onClick={()=>handleSetProject(project)}>
          {project.name}</p> 
            
          <RxCross2 
            onClick={()=>handleDeteleProject(project)}
            className='text-zinc-200 hover:text-zinc-900'/>

        </div>
        )}
        <div>
          <p className='m-4 text-teal-500 hover:cursor-pointer hover:font-semibold text-center capitalize'
          onClick={()=>setShowCreateTag(!showCreateTag)}>Create new project</p>
        </div>
      </div>
      {showCreateTag && 
        <div className='fixed top-1/3 left-1/3'>
          <AddNewProject setShowCreateTag={setShowCreateTag} projects={projects} />
        </div>
          }
    </div>
  );
}

export default ProjectOptions;


