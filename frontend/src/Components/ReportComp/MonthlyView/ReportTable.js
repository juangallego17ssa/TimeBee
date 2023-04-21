import React, { useState } from "react";
import { useTable, useEditable } from 'react-table';
import moment from "moment";




export default function ReportTable({data}) {
    const [tableData, setTableData] = useState(data);
    const handleChangeData = (e)=>{
        const new_data = {
            /* data={
                date:,
                start: // new start time in iso string with date
                stop:  // new stop time in iso string with date
                code:  // new code
            }
            // PATCH data to API
            } */
        } 
        console.log("new data:",new_data);

    }

    const columns = React.useMemo(
      () => [
        {
          Header: "Date",
          accessor: "date",
          Cell: ({ value }) => 
          <button onClick={handleChangeData}>
            {moment(value).format('DD ddd')}
        </button>,

        },
        {
          Header: "Start",
          accessor: "start",
          Cell: ({ row, value, column }) => (
            <input
              className={`${value?'':'opacity-5'} text-sm`}
              value={value}
              type={'time'}
              onChange={(e) => {
                const newData = [...tableData];
                newData[row.index][column.accessor] = e.target.value;
                setTableData(newData);
              }}
            />
          ),
        },
        {
          Header: "Stop",
          accessor: "stop",
          Cell: ({ row, value, column }) => (
            <input
              className={`${value?'':'opacity-5'} text-sm`}
              value={value}
              type={'time'}
              onChange={(e) => {
                const newData = [...tableData];
                newData[row.index][column.accessor] = e.target.value;
                setTableData(newData);
              }}
            />
          ),
        },
        {
          Header: "Worked Time",
          accessor: "worked_time",
          
        },
        {
          Header: "Overtime",
          accessor: "over_time",
          Cell: ({ value }) => 
          value &&
          <p className={`text-red-400`}
          >+{moment.utc(value).format('HH:mm')}</p>,

        },
      ],
      [tableData]
    );
  
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable({ columns, data: tableData }, useEditable);
  
    return (
      <table className="w-full px-4"
      {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr 
              className={`border-2 text-center`}
              {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }