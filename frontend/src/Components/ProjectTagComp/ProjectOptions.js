import React,{useState} from 'react';
import AddNewProject from './AddNewProject';
import {AiFillTag} from 'react-icons/ai'
import { RxCross2 } from 'react-icons/rx' 

//RTK
import { useGetOwnProjectsQuery } from '../../api/API';


function ProjectOptions({setTag}) {

  const { data : projects=[], isLoading, error, refetch } = useGetOwnProjectsQuery()

  
  const [ showCreateTag, setShowCreateTag ]= useState(false)

  const handleSetProject=(project)=>{
    console.log(project)
  }

  if (isLoading){return(<div>Loading</div>)}

  return (
    <div className=' z-10 '>
      <div className='absolute right-0 top-10 width-40 bg-white rounded-md shadow-md'>
        <label htmlFor='project-filter'>
          <input className='m-4 border-2 rounded-full py-1 px-4 focus:outline-teal-400' id='project-filter' placeholder='Find project...'/>
        </label>
        {projects.map(project=>
        <div className='grid grid-cols-[30px_1fr_10px] items-center hover:bg-stone-100 mb-2 px-4'
              onClick={()=>handleSetProject(project)}>
          <AiFillTag className={`m-1 text-${project.color}-500`} />
          <p className='' key={project.id} onClick={setTag}>{project.name}</p> 
          <RxCross2 className='text-zinc-200 hover:text-zinc-900'/>
        </div>
        )}
        <div>
          <p className='m-4 text-teal-500 hover:cursor-pointer hover:font-semibold text-center capitalize'
          onClick={()=>setShowCreateTag(!showCreateTag)}>Create new project</p>
        </div>
      </div>
      {showCreateTag && 
        <div className='fixed top-1/3 left-1/3'>
          <AddNewProject setShowCreateTag={setShowCreateTag} projects={projects}/>
        </div>
          }
    </div>
  );
}

export default ProjectOptions;


