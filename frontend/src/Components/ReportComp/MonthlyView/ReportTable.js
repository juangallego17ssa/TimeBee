import React, { useState } from "react";
import { useTable, useEditable } from 'react-table';
import moment from "moment";
import * as XLSX from 'xlsx'

const columns = [
  {
    Header: 'Date',
    accessor: 'date',
    Cell: ({ value }) => (
      <div className="grid grid-cols-2 ">
        <p className="mx-auto"> {moment(value).format('DD')}</p>
        <p> {moment(value).format('ddd')}</p>
      </div>
    ),
  },
  {
    Header: 'Start',
    accessor: 'start',
    Cell: ({ value }) => {
      if(value){
        return (
        <p className={`bg-transparent text-center`}>{value}</p>       
        // <input
        //   className={`bg-transparent text-center`}
        //   type="text"
        //   defaultValue={value}
        //   // onChange={(e) => handleInputChange(e, 'start')}
        // />
        )
      }else return <div className={`bg-transparent text-center`}>-</div>

  },
  },
  {
    Header: 'Stop',
    accessor: 'stop',
    Cell: ({ value }) => {
      if(value){
        return(
          <p className={`bg-transparent text-center`}>{value}</p>       
          // <input
          //   className={`bg-transparent text-center`}
          //   type="text"
          //   defaultValue={value}
          //   // onChange={(e) => handleInputChange(e, 'stop')}
          // />
        )
      }else return <div className={`bg-transparent text-center`}>-</div>
  },
  },
  {
    Header: 'Worked Time',
    accessor: 'worked_time',
    Cell:({value})=>(
      <p className={`bg-transparent text-center`}>{value}</p>
      )
  },
  {
    Header: '',
    accessor: 'over_time',
    Cell: ({ value }) =>{
      if(value>0){
      return (
      <p className="text-red-500">-{moment.utc(value).format('HH:mm')}</p> //under time
      )
      }else if(value<0){
      return (
      <p className="text-teal-500">+{moment.utc(value*-1).format('HH:mm')}</p> //over time
      )
      }else if(value === 0 | value === undefined){
        return      
      }

    } 
  },
  {
    Header: 'Notes',
    accessor: 'notes',
    Cell: ({ value }) =>{
      return (
        <div>{value}</div>
      )
      // if(value>0){
      // return (
      // <p className="text-red-500">-{moment.utc(value).format('HH:mm')}</p> //under time
      // )
      // }else if(value<0){
      // return (
      // <p className="text-teal-500">+{moment.utc(value*-1).format('HH:mm')}</p> //over time
      // )
      // }else if(value === 0 | value === undefined){
      //   return      
      // }

    } 
  },
];
// const handleExportToExcel = () => {
//   const workbook = XLSX.utils.book_new();
//   const sheet = XLSX.utils.table_to_sheet(document.getElementById('my-table'));
//   XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');
//   XLSX.writeFile(workbook, 'table-data.xlsx');
// };


export default function ReportTable({data, publicHolidaysOfMonth }) {
  const tableInstance = useTable({ columns, data });
 const holidayDates = publicHolidaysOfMonth?.map(item=>item.date)
//  console.log(holidayDates.includes('2023-04-11'))

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;
if(holidayDates)
  return (
    <div className="h-[95%] w-[98%] flex-col items-center justify-center overflow-auto scrollbar-thin scrollbar-thumb-teal-400 scrollbar-track-white overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full ">
      {/* button to export table data to Excel */}
      {/* <button onClick={handleExportToExcel}>Export to Excel</button> */}
      <table
        id="my-table"
        className="table-auto text-[12px] text-center m-auto w-[80%]"
        {...getTableProps()}
      >
        <thead className="">
          {headerGroups?.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers?.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows?.map((row) => {
            prepareRow(row);
            return (
              <tr
                className={`${
                  holidayDates.includes(row.cells[0].value) |
                  (moment(row.cells[0].value).format("ddd") === "Sun") |
                  (moment(row.cells[0].value).format("ddd") === "Sat")
                    ? "bg-stone-50 text-zinc-500"
                    : ""
                } border-2`}
                value={row}
                onClick={(e) => console.log(row.cells[0].value)}
                {...row.getRowProps()}
              >
                {row.cells?.map((cell) => (
                  <td
                    value={cell.value}
                    className=""
                    // onClick={(e)=>console.log(e.target)}
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}