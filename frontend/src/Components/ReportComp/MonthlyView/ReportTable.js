import React, { useState } from "react";
import { useTable, useEditable } from 'react-table';
import moment from "moment";

const columns = [
  {
    Header: 'Date',
    accessor: 'date',
    Cell: ({ value }) => (
      <div className="grid grid-cols-2">
        <p> {moment(value).format('DD')}</p>
        <p> {moment(value).format('ddd')}</p>
      </div>
    ),
  },
  {
    Header: 'Start',
    accessor: 'start',
    Cell: ({ value }) => (
      <input
        className={`bg-transparent text-center`}
        type="text"
        defaultValue={value}
        // onChange={(e) => handleInputChange(e, 'start')}
      />
    ),
  },
  {
    Header: 'Stop',
    accessor: 'stop',
    Cell: ({ value }) => (
      <input
        className={`bg-transparent text-center`}
        type="text"
        defaultValue={value}
        // onChange={(e) => handleInputChange(e, 'stop')}
      />
    ),
  },
  {
    Header: 'Worked Time',
    accessor: 'worked_time',
  },
  {
    Header: 'Overtime',
    accessor: 'over_time',
    Cell: ({ value }) => 
    value?
    <p>+{moment.utc(value).format('HH:mm')}</p>:'-'
  
    ,
  },
];



export default function ReportTable({data, publicHolidaysOfMonth }) {
  const tableInstance = useTable({ columns, data });
 const holidayDates = publicHolidaysOfMonth.map(item=>item.date)
//  console.log(holidayDates.includes('2023-04-11'))

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr 
            className={`${holidayDates.includes(row.cells[0].value) | moment(row.cells[0].value).format('ddd') === 'Sun' | moment(row.cells[0].value).format('ddd') === 'Sat' ? 'bg-stone-200' :''}`}
            value={row}
            onClick={(e)=>console.log(row.cells[0].value)}
            {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td 
                value={cell.value}
                className=""
                // onClick={(e)=>console.log(e.target)}
                {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}