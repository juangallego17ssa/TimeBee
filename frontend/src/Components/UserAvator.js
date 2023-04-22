import React from 'react';
import {useGetUserProfileQuery} from '../api/API'
import { useSelector } from 'react-redux';

export default function UserAvator() {
  //  const USER = useSelector( (state) => state.user.user)
  //  const username = USER?.username
  //  console.log(USER.username.charAt(0).toUpperCase())

    const {data:currentUser,isLoading,isSuccess,isError} = useGetUserProfileQuery()
    // console.log(currentUser)

  if(isSuccess)
  return (
    <div className="relative w-10 h-10 bg-teal-400 rounded-full flex justify-center items-center hover:opacity-70 hover:cuersor">
      {currentUser.avatar?
      <img src={currentUser?.avatar}/>
      :
      <p className='uppercase text-center text-2xl font-bold text-white'>
        {currentUser?.username.charAt(0)}
      </p>
      }
    </div>
  );
}
