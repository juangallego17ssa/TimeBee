import React, { useState, useRef } from 'react';
import moment from "moment";
import { useCreateTrackedTimeMutation } from '../../api/API';


function AddCodeDay(props) {
    
    const [createTrackedTime] = useCreateTrackedTimeMutation()


    const startTimeRef=useRef()
    const endTimeRef=useRef()

    const [selectedOption, setSelectedOption] = useState('03');

    console.log(selectedOption)

    function handleOptionChange(event) {
        setSelectedOption(event.target.value);
    }

    //Create leave
    const handleCreateMaually = (e) => {
        e.preventDefault();
         const data = ({
             type_of_input: "2",
             code: selectedOption,
             start: startTimeRef.current.value,
             stop: endTimeRef.current.value,
        })
        
        console.log(data)
        
        createTrackedTime(data)
        .then(result=>console.log(result))
        
    }

    return (
        <div className="flex flex-col justify-evenly bg-white md:h-50  w-full px-2">
            <div className="flex flex-col justify-end items-end bg-white md:h-8  w-full">
                <select value={selectedOption} onChange={handleOptionChange} className='bg-teal-400 text-white rounded-2xl px-2'>
                    <option value="00">Work</option>
                    <option value="01">Sick</option>
                    <option value="02">Accident</option>
                    <option value="03">Vacation</option>
                    <option value="04">Paid Vacation</option>
                    <option value="05">Unpaid Vacation</option>
                    <option value="06">Military</option>
                    <option value="07">Buisnesstrip</option>
                    <option value="08">School</option>  
                </select>
            </div>
            <div className="flex flex-rows justify-evenly items-center bg-white md:h-20  w-full">
                <p className='font-semibold pr-1'>From</p>
                <input type="datetime-local" ref={startTimeRef} className='InputTo border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg'/>
                <p className='font-semibold px-1 '>TO</p>
                <input type="datetime-local" ref={endTimeRef} className='InputTo border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg'/>
            </div>
            <form className="flex flex-col justify-center items-center bg-white md:h-10  w-full p-5">
                <button onClick={handleCreateMaually} className="flex flex-wrap justify-center items-center text-white w-32 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500">Submit</button>
            </form>  
        </div>
    );
  }
  
  export default AddCodeDay;