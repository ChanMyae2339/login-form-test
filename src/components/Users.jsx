import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { GROUP_COLUMNS } from "./columns";
import MOCK_DATA from "../../api/MOCK_DATA.json";
import { useMemo } from "react";
import { useState } from "react";

export default function Users() {
  const columns = useMemo(() => GROUP_COLUMNS, []);
  const [filter, setFilter] = useState("");
  const data = useMemo(() => MOCK_DATA, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filter,
    },
    onGlobalFilterChange: setFilter,
  });

  return (
    <div className=" flex flex-col  p-4   overflow-auto">
      <input
        type="text"
        placeholder="Search..."
        className="border border-blue-300 rounded-md p-2 mb-4 w-64 mx-auto outline-none"
        onChange={(e) => setFilter(e.target.value)}
      />
      <table className="min-w-full table-auto bg-white">
        <thead className="bg-gray-100 bg-gradient-to-r from-indigo-400 to-cyan-400">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="text-center text-sm font-medium  px-4 py-2 border border-gray-300 text-gray-800"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-blue-200 even:bg-gray-200 odd:bg-gray-100 transition-colors duration-150"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-4 py-2 text-sm text-gray-800 border-b text-center"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
