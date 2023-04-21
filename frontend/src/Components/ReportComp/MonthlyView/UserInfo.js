import React from 'react';
import { useSelector } from 'react-redux';

export default function UserInfo() {
    const USER = useSelector( (state) => state.user.user)
    // console.log(USER)

  return (
    <div>
      UserInfo
      <div className='grid grid-cols-2'>
        <h2>{USER?.username.toUpperCase()}</h2>
        <p>{USER?.workload}%</p>
      </div>
    </div>
  );
}
