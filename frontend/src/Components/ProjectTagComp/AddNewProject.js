import React,{useState,useRef} from 'react';
import { BsCheck } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { useCreateProjectsMutation } from '../../api/API'

export default function AddNewProject({setShowCreateTag, projects, setProjects}) {
    // RTK 
    const [createProjects] = useCreateProjectsMutation()

    const projectNameRef= useRef();
    const projectDescriptionRef= useRef();


    const [tagColor, setTagColor] = useState('');
    const handleOptionChange = (e)=>{
        setTagColor(e.target.value)

    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        const data={
            name:projectNameRef.current.value,
            description:projectDescriptionRef.current.value,
            tag_color:tagColor,
        }
        // console.log(data)
        createProjects(data)
        .then(result=> {
            const data = result.data
            setProjects(data)
        })
        
        // setProjects([...projects,data])
        setShowCreateTag(false)
        
    }
  return (
    <div className="z-10">
        <RxCross2 className='absolute right-0 m-1 opacity-30 hover:opacity-100' onClick={()=>setShowCreateTag(false)}/>
    <form onSubmit={handleSubmit}
          className='flex flex-col rounded justify-center items-center shadow bg-white p-6 gap-2'>
        <h2 className='uppercase'>Create new project</h2>

    {/*  PROJECT NAME INPUT  */}
        <label htmlFor='project-name'>
            <input className='border-2 border-zinc-100 focus:outline-teal-400 rounded-full py-0.5 px-3'
            ref={projectNameRef} 
            id='project-name' 
            placeholder='project name...'/>
        </label>

    {/*  PROJECT DISCRIPTION INPUT  */}
        <label htmlFor='project-description'>
            <input className='border-2 border-zinc-100 focus:outline-teal-400 rounded-full py-0.5 px-3'
            ref={projectDescriptionRef} 
            id='project-description' 
            placeholder='project description...'/>
        </label>
     {/*  PROJECT TAG COLOR  */}    
        <div className='text-zinc-300 '>Choose a color </div>
        <fieldset className='flex flex-row gap-1' >
            <div className='relative'>
                <label htmlFor='red'/>
                <input name='color' type='radio' id='red' value="#ef4444" 
                       className='appearance-none w-6 h-6 bg-red-400 hover:bg-red-500 checked:bg-red-500 rounded' 
                       checked={tagColor==="red"} 
                       onClick={handleOptionChange}/>
                {tagColor==="#ef4444" && <BsCheck className='absolute top-0.5 right-0.5 text-xl font-bold text-white' />}
            </div>
            <div className='relative'>
                <label htmlFor='yellow'/>
                <input name='color' type='radio' id='yellow' value="#facc15" 
                       className='appearance-none w-6 h-6 bg-yellow-400 hover:bg-yellow-500 checked:bg-yellow-500 rounded' 
                       checked={tagColor==="yellow"} 
                       onClick={handleOptionChange}/>
                {tagColor==="#facc15" && <BsCheck className='absolute top-0.5 right-0.5 text-xl font-bold text-white' />}
            </div>
            <div className='relative'>
                <label htmlFor='green'/>
                <input name='color' type='radio' id='green' value="#22c55e" 
                       className='appearance-none w-6 h-6 bg-green-400 hover:bg-green-500 checked:bg-green-500 rounded' 
                       checked={tagColor==="green"} 
                       onClick={handleOptionChange}/>
                {tagColor==="#22c55e" && <BsCheck className='absolute top-0.5 right-0.5 text-xl font-bold text-white' />}
            </div>
            <div className='relative'>
                <label htmlFor='blue'/>
                <input name='color' type='radio' id='blue' value="#0ea5e9" 
                       className='appearance-none w-6 h-6 bg-blue-400 hover:bg-blue-500 checked:bg-blue-500 rounded' 
                       checked={tagColor==="blue"} 
                       onClick={handleOptionChange}/>
                {tagColor==="#0ea5e9" && <BsCheck className='absolute top-0.5 right-0.5 text-xl font-bold text-white' />}
            </div>
            <div className='relative'>
                <label htmlFor='purple'/>
                <input name='color' type='radio' id='purple' value="#a855f7" 
                       className='appearance-none w-6 h-6 bg-purple-400 hover:bg-purple-500 checked:bg-purple-500 rounded' 
                       checked={tagColor==="purple"} 
                       onClick={handleOptionChange}/>
                {tagColor==="#a855f7" && <BsCheck className='absolute top-0.5 right-0.5 text-xl font-bold text-white' />}
            </div>
           
        
        </fieldset>
        <button className='px-4 py-1 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-pink-500 hover:to-yellow-500 text-white font-medium'>Create</button>
      
    </form>
    </div>


  );
}
