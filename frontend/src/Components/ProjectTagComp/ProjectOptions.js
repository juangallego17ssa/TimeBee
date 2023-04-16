import React,{useState} from 'react';
import AddNewProject from './AddNewProject';
import {AiFillTag} from 'react-icons/ai'

function ProjectOptions({setTag}) {
  const [projects,setProjects] = useState([{id:1,name:'project1',color:'purple'}])
  const [ showCreateTag, setShowCreateTag ]= useState(false)


  return (
    <div >
      <div className='border-2 border-red-500 absolute right-[1.5rem] top-12 width-40 p-4 bg-white'>
        <label htmlFor='project-filter'>
          <input id='project-filter' placeholder='Find project...'/>
        </label>
        {projects.map(project=>
        <div className='flex items-center hover:bg-stone-100'>
          <AiFillTag className={`m-1 text-${project.color}-500`} />
          <p className='' key={project.id} onClick={setTag}>{project.name}</p> 
        </div>
        )}
        <div>
          <p onClick={()=>setShowCreateTag(!showCreateTag)}>Create new project...</p>
        </div>
      </div>
        {showCreateTag && 
        <div className='relative'>
          <AddNewProject setShowCreateTag={setShowCreateTag} projects={projects} setProjects={setProjects}/>
        </div>
          }
    </div>
  );
}

export default ProjectOptions;


