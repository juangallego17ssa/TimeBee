import React from 'react';
import moment from 'moment';
import {useGetpublicHolidayYearQuery} from '../../../api/API'

export default function Holidays({currentMonth,publicHolidaysOfMonth}) {
    // const currentYear = new Date().getFullYear()
    // const { data:PUBLIC_HOLIDAYS, isLoading, isError, isSuccess }=useGetpublicHolidayYearQuery(currentYear)
    // // console.log(currentMonth)
    // const publicHolidaysOfMonth = PUBLIC_HOLIDAYS?.filter(holiday => holiday.date.substring(0,7) === currentMonth)
    // // console.log('publicHolidaysOfMonth:',publicHolidaysOfMonth)

  return (
    <div className='box-border mx-4 my-2'>
      {/* ==== PUBLIC ==== */}
      {publicHolidaysOfMonth?.map(holiday=>
      <div 
      className='grid grid-cols-[auto_auto_1fr] gap-4 w-3/4 mx-auto'
      key={holiday.date}>
        <input type={'checkbox'} checked={moment(`${holiday.date}`)-moment()<=0} disabled />
        <p>{moment(holiday.date).format('DD MMM')}</p>
        <p>{holiday.holiday_name}</p>
      </div>
      )}
    </div>
  );
}
