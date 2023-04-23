import React from 'react';
import {useGetUserProfileQuery} from '../../api/API'
import { useSelector } from 'react-redux';


function UserDisplay() {

    const user = useSelector((state) => state.user.user)
    const usernameFirstChar = user?.username?.charAt(0)

    const {data:currentUser,isLoading,isSuccess,isError} = useGetUserProfileQuery()
    console.log(currentUser)

  // if(isSuccess)
    
    return (
        <div className="flex flex-col justify-evenly items-center  w-1/3 h-5/6 shadow-xl rounded-3xl border-2 p-5">
            <div className="flex flex-col justify-center items-center w-full h-2/6 border-2">
                <div className="relative w-20 h-20 bg-teal-400 rounded-full flex justify-center items-center hover:opacity-70 hover:cuersor ">
                    {user.avatar ? (
                    <img
                    src={currentUser?.avatar}
                    alt="avatar"
                    className="object-cover relative w-20 h-20 bg-teal-400 rounded-full flex justify-center items-center hover:opacity-70 hover:cuersor "
                    />
                    ) : (
                    <p className="uppercase text-center text-2xl font-bold text-white">
                    {usernameFirstChar ? usernameFirstChar : "A"}
                    </p>
                    )}
                </div>
                <div>
                    <p>{currentUser?.first_name} {currentUser?.last_name}</p>
                </div>
            </div>
            <div className="flex flex-row justify-evenly items-center w-full h-1/6 border-2">
                <p>CONTRACT</p>
                <p>{currentUser?.workload} %</p>
            </div>
            <div className="flex flex-col justify-evenly items-center w-full h-3/6 border-2">
                <p className="flex flex-col justify-evenly items-start w-full h-1/6 border-2">WORKING HOUR</p>
                <div className="Container Days flex flex-col justify-evenly items-center w-full h-5/6 border-2">
                    <div className="Container Day flex flex-row justify-evenly items-center w-full h-1/6 border-2">
                        <div className="flex justify-evenly items-center w-1/5 h-full border-2 rounded-sm p-1 bg"></div>
                        <div className="flex justify-evenly items-center w-1/5 h-full border-2"></div>
                        <div className="flex justify-evenly items-center w-1/5 h-full border-2"></div>
                        <div className="flex justify-evenly items-center w-1/5 h-full border-2"></div>
                        <div className="flex justify-evenly items-center w-1/5 h-full border-2"></div>
                    </div>
                    <div className="Container Day flex flex-row justify-evenly items-center w-full h-1/6 border-2">
                        <div className="flex justify-evenly items-center w-1/5 h-full border-2"></div>
                        <div className="flex justify-evenly items-center w-1/5 h-full border-2"></div>
                        <div className="flex justify-evenly items-center w-1/5 h-full border-2"></div>
                        <div className="flex justify-evenly items-center w-1/5 h-full border-2"></div>
                        <div className="flex justify-evenly items-center w-1/5 h-full border-2"></div>
                    </div>
                    <div className="Container Day flex flex-row justify-evenly items-center w-full h-1/6 border-2">
                        <div className="flex justify-evenly items-center w-1/5 h-full border-2"></div>
                        <div className="flex justify-evenly items-center w-1/5 h-full border-2"></div>
                        <div className="flex justify-evenly items-center w-1/5 h-full border-2"></div>
                        <div className="flex justify-evenly items-center w-1/5 h-full border-2"></div>
                        <div className="flex justify-evenly items-center w-1/5 h-full border-2"></div>
                    </div>
                    <div className="Container Day flex flex-row justify-evenly items-center w-full h-1/6 border-2">
                        <div className="flex justify-evenly items-center w-1/5 h-full border-2"></div>
                        <div className="flex justify-evenly items-center w-1/5 h-full border-2"></div>
                        <div className="flex justify-evenly items-center w-1/5 h-full border-2"></div>
                        <div className="flex justify-evenly items-center w-1/5 h-full border-2"></div>
                        <div className="flex justify-evenly items-center w-1/5 h-full border-2"></div>
                    </div>
                    <div className="Container Day flex flex-row justify-evenly items-center w-full h-1/6 border-2">
                        <div className="flex justify-evenly items-center w-1/5 h-full border-2"></div>
                        <div className="flex justify-evenly items-center w-1/5 h-full border-2"></div>
                        <div className="flex justify-evenly items-center w-1/5 h-full border-2"></div>
                        <div className="flex justify-evenly items-center w-1/5 h-full border-2"></div>
                        <div className="flex justify-evenly items-center w-1/5 h-full border-2"></div>
                    </div>
                    <div className="Container Day flex flex-row justify-evenly items-center w-full h-1/6 border-2">
                        <div className="flex justify-evenly items-center w-1/5 h-full border-2"></div>
                        <div className="flex justify-evenly items-center w-1/5 h-full border-2"></div>
                        <div className="flex justify-evenly items-center w-1/5 h-full border-2"></div>
                        <div className="flex justify-evenly items-center w-1/5 h-full border-2"></div>
                        <div className="flex justify-evenly items-center w-1/5 h-full border-2"></div>
                    </div>
                </div>
            </div>
        
        </div>
    );
  }
  
  export default UserDisplay;