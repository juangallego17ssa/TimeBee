import React,{useState,useRef} from 'react';
import { BsCheck } from 'react-icons/bs'

export default function AddNewProject({setShowCreateTag}) {
    const projectNameRef= useRef()

    const [tagColor, setTagColor] = useState('');
    const handleOptionChange = (e)=>{
        setTagColor(e.target.value)
        // console.log(e.target.value)
        // console.log(`color:${tagColor}`)
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        const data={
            name:projectNameRef.current.value,
            color:tagColor,
        }
        console.log(data)
        setShowCreateTag(false)
    }
  return (

    <form onSubmit={handleSubmit}
          className='flex flex-col rounded justify-center items-center shadow border-blue-700 bg-white p-4'>
        <h2 className='uppercase'>Create new project</h2>
        <label htmlFor='project-name'>
            <input ref={projectNameRef} id='project-name' placeholder='Enter project name...'/>
        </label>
            <div>Choose a color </div>
        <fieldset className='flex flex-row gap-1' >
            <div className='relative'>
                <label htmlFor='red'/>
                <input name='color' type='radio' id='red' value="red-400" 
                       className='appearance-none w-6 h-6 bg-red-400 rounded' checked={tagColor==="red-400"} onClick={handleOptionChange}/>
                {tagColor==="red-400" && <BsCheck className='absolute top-1 right-1'/>}
            </div>
            <div className='relative'>
                <label htmlFor='yellow'/>
                <input name='color' type='radio' id='yellow' value="yellow-400" 
                       className='appearance-none w-6 h-6 bg-yellow-400 rounded' checked={tagColor==="yellow-400"} onClick={handleOptionChange}/>
                {tagColor==="yellow-400" && <BsCheck className='absolute top-1 right-1'/>}
            </div>
            <div className='relative'>
                <label htmlFor='green'/>
                <input name='color' type='radio' id='green' value="green-400" 
                       className='appearance-none w-6 h-6 bg-green-400 rounded' checked={tagColor==="green-400"} onClick={handleOptionChange}/>
                {tagColor==="green-400" && <BsCheck className='absolute top-1 right-1'/>}
            </div>
            <div className='relative'>
                <label htmlFor='blue'/>
                <input name='color' type='radio' id='blue' value="blue-400" 
                       className='appearance-none w-6 h-6 bg-blue-400 rounded' checked={tagColor==="blue-400"} onClick={handleOptionChange}/>
                {tagColor==="blue-400" && <BsCheck className='absolute top-1 right-1'/>}
            </div>
            <div className='relative'>
                <label htmlFor='purple'/>
                <input name='color' type='radio' id='purple' value="purple-400" 
                       className='appearance-none w-6 h-6 bg-purple-400 rounded' checked={tagColor==="purple-400"} onClick={handleOptionChange}/>
                {tagColor==="purple-400" && <BsCheck className='absolute top-1 right-1'/>}
            </div>
        
        </fieldset>
        <button className='px-4 py-1 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-pink-500 hover:to-yellow-500 text-white font-medium'>Create</button>
      
    </form>
  );
}
