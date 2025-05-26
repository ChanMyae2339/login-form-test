import React, { useMemo, useState } from 'react';
import DATA from '../../api/data.json'; // Adjust path as needed
import DataTable from './Table/DataTable';
import { GROUP_COLUMNS } from "./Table/columns";
import MOCK_DATA from "../../api/MOCK_DATA.json";
import {
   useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  
} from "@tanstack/react-table";


const Users = () => {
  const columns = useMemo(() => GROUP_COLUMNS, []);

  // ✅ Extract nested array from MOCK_DATA
  const data = useMemo(() => MOCK_DATA, []);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  
    const [filter, setFilter] = useState("");

 const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter: filter,
  
    },
    onGlobalFilterChange: setFilter,
        getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });
  const filteredRows = table.getFilteredRowModel().rows;
  const paginatedRows = filteredRows.slice((page - 1) * limit, page * limit);

  return (
  <div className="  flex flex-col  p-4   overflow-auto">
  <div className=" flex flex-col   ">
    <input
        type="text"
        placeholder="Search..."
        className="border border-blue-300 rounded-md p-2 mb-4 w-64 mx-auto outline-none "
       value={filter} 
       onChange={(e) => setFilter(e.target.value)}
      />   
 
         <DataTable
        dataRows={paginatedRows.map(row => row.original)} // pass raw data
        dataColumns={columns}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        totalItems={filteredRows.length}
      />
       </div>
    </div>
  );
};

export default Users;
