import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment'
import UserAvator from '../../UserAvator'


export default function UserInfo() {
  const ANNUAL_LEAVES = 25
    const userData = useSelector( (state) => state.user.user)
    // console.log(userData)
if (userData)
  return (
    <div className='p-5 flex-col'>
      <div className='flex justify-between h-10 items-center'>
        Welcome {userData.first_name} {userData.last_name}
        <UserAvator/>
        {/* <img src={userData.avatar} alt='avatar' className='h-full w-10 rounded-full object-cover'></img> */}
      </div>
      <div></div>
      <div>

      <div className="grid grid-cols-2">
        <p>Username: {userData?.username}</p>
        <p> Holidays: 25 / {userData.holidays?userData.holidays:ANNUAL_LEAVES}</p>
        <p> Workload: {userData?.workload}%</p>
        <p></p>
        <p> First Login: {moment(userData?.date_joined).format("DD-MM-YYYY")}</p>
        <p> Last Login: {moment(userData?.last_login).format("DD-MM-YYYY")}</p>

      </div>
      </div>
      </div>
      
      
  );
}
