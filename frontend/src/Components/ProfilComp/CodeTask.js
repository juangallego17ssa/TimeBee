import React, { useState } from 'react';
import moment from "moment";
import { useCreateTrackedTimeMutation, useDeleteTrackedTimeByIDMutation } from '../../api/API';
import { FaTrashAlt } from "react-icons/fa";


function CodeTask(props) {
    
    const [deleteTrackedTimeByID] = useDeleteTrackedTimeByIDMutation();

    const handelDeleteTask = () => {
        const trackedtimeId = props.task.id;
        console.log(props);
        deleteTrackedTimeByID(trackedtimeId);
    };

    console.log(props.task)
    
    let codename = '';

    if (props.code === "00") {
        codename = 'Work'
    } else if (props.code === "01") {
        codename = 'Sick'
    } else if (props.code === "02") {
        codename = 'Injury'
    } else if (props.code === "03") {
        codename = 'Vacation'
    } else if (props.code === "04") {
        codename = 'Paid Vacation'
    } else if (props.code === "05") {
        codename = 'Unpaid Vacation'
    } else if (props.code === "06") {
        codename = 'Military'
    } else if (props.code === "07") {
        codename = 'Buisnesstrip'
    } else { 
        codename = 'School'
    }



    return (
        <div className="flex flex-col bg-white md:h-10  w-[90%]">
            <div className="flex flex-row items-center bg-white md:h-10  w-full px-2">
                <div className="flex text-s text-zinc-400 w-20 hover:text-teal-600">{codename}</div>
                <div className="flex text-xs w-30 text-zinc-400 gap-5 ">
                    <p className="flex text-xs w-fit text-zinc-400 ">{moment(props.task.start).format("DD-MMM-yyyy hh:mm")}</p>
                    <span>-</span>
                    <p className="flex text-xs w-fit text-zinc-400">{moment(props.task.stop).format("DD-MMM-yyyy hh:mm")}</p>
                </div>
                <FaTrashAlt onClick={handelDeleteTask} className="text-md text-zinc-200 hover:text-red-500 "/>
            </div>
        </div>
    );
  }
  
  export default CodeTask;