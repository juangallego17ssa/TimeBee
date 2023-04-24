import React, { useState } from 'react';
import Calendar from 'react-calendar';
import moment from "moment";


function AddCodeDay() {

    const [isManual, setIsManual] = useState(false);


    return (
        <div className="flex flex-col justify-evenly bg-rose-100 md:h-60  w-full">
            <div className="flex flex-rows justify-evenly bg-red-400 md:h-20  w-full border-4">
                <div>From</div>
                <input type="datetime-local"/>
                <div></div>
            </div>
            <div>
                <select>

                </select>
                </div>
            
        </div>
    );
  }
  
  export default AddCodeDay;