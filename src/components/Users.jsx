import React, { useMemo, useState } from "react";
import DataTable from "./Table/DataTable";
import MOCK_DATA from "../../api/MOCK_DATA.json";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { COLUMNS } from "./Table/columns";

const Users = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  
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
    <div className="p-4 overflow-auto ">
     <div className="flex justify-center w-full ">
       <input
        type="text"
        placeholder="Search..."
        className="border p-2 rounded w-64 mb-4 outline-none border-blue-300"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
     </div>
      <DataTable
        dataRows={paginatedRows.map((prow) => prow.original)}
        dataColumns={columns}

      //  For pagination component
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        totalItems={filteredRows.length}
      />
    </div>
  );
};

export default Users;
