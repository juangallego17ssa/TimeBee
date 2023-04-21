import {useCreateTrackedTimeMutation} from '../../api/API';
import { useState } from 'react';
import moment from 'moment';

import React from 'react';

export default function GenerateTestData() {
    const [createTrackedTime] = useCreateTrackedTimeMutation()
    const [currentDate, setCurrentDate]=useState()

    // console.log(randomMin)
    
    const data =[]
        const item ={
            "type_of_input": "0",
            "start": moment(`2023 4 ${i} 9:${Math.floor(Math.random()*60)}`).format('yyyy-MM-DD HH:mm'),
            "stop": moment(`2023 4 ${i} 18:${Math.floor(Math.random()*60)}`).format('yyyy-MM-DD HH:mm'),
            "project_id": "42",
        }
        data.push(item)
        // createTrackedTime(item)
        // .then(result=>console.log(result))
        // .catch(error=>console.log(error))
    }
    // console.log(data)
    data.forEach(item=>{
      const new_data = JSON.stringify(item)
      // createTrackedTime(new_data)
      //     .then(result=>console.log(result))
      //     .catch(error=>console.log(error))
    })
    // data.forEach(item=>console.log(item))
    // data.forEach(item=>{
    //     createTrackedTime(item)
    //     .then(result=>console.log(result))
    //     .catch(error=>console.log(error))
    // })



  return (
    <div>
      <button>generateTestData</button>
    </div>
  );
}