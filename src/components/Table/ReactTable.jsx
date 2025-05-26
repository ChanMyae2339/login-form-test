import React, { useState, useMemo, Fragment } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { TbChevronsRight } from "react-icons/tb";
import ExpandableComponent from "./ExpandableComponent";

const ReactTable = ({ dataRows, dataColumns }) => {
  const [expanded, setExpanded] = useState({});

  const data = useMemo(() => dataRows, [dataRows]);
 const processedColumns = useMemo(
    () =>
      dataColumns.map((col) => ({
        id: col.accessor,
        header: col.Header,
        accessorKey: col.accessor,
        ...col,
      })),
    [dataColumns]
  );

  // Expander column at far left
  const expanderColumn = useMemo(
    () => [
      {
        id: "expander",
          header: () => (
          <button
            className="px-2 "
            onClick={() => {
              
              const isAllExpanded =
                Object.keys(expanded).length === dataRows.length;
              const newExpanded = {};
              if (!isAllExpanded) {
                dataRows.forEach((_, idx) => {
                  newExpanded[idx] = true;
                });
              }
              setExpanded(newExpanded);
            }}
          >
            <TbChevronsRight className="text-xl  " />
          </button>
        ),

        cell: ({ row }) => (
          <div className="flex justify-center items-center ">
            <button
              onClick={() =>
                setExpanded((prev) => ({
                  ...prev,
                  [row.id]: !prev[row.id],
                }))
              }
            >
              <TbChevronsRight
                className={`text-lg transition-transform duration-300 
                  ${row.getIsExpanded() ? "rotate-90" : ""
                  }`}
              />
            </button>
          </div>
        ),
      },
    ],
    [expanded , dataRows]

  );

  const columns = useMemo(
    () => [...expanderColumn, ...processedColumns],
    [expanderColumn, processedColumns]
  );

  const table = useReactTable({
    data,
    columns,
    state: { expanded },
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onExpandedChange: setExpanded,
  });

  return (
    <div className="p-4">
      <table className="border-collapse shadow-md rounded-lg bg-white text-sm w-full">
        <thead className="bg-gradient-to-r from-indigo-400 to-cyan-400 text-gray-700">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="px-4 py-2 text-left font-medium border-b border-gray-200"
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
        <tbody className="divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <Fragment key={row.id}>
              <tr className="hover:bg-blue-50 even:bg-gray-100 transition">
                {row.getVisibleCells().map((cell) => (
                  <td 
                  key={cell.id}
                   className="px-4 py-3 text-gray-800 text-sm"
                   >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
              {row.getIsExpanded() && (
                <tr>
                  <td colSpan={row.getVisibleCells().length}>
                    <ExpandableComponent
                      data={row.original}
                      expandOrder={dataColumns}
                    />
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReactTable;
