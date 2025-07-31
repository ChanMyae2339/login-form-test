// ReactTable.jsx
import React, { useState, useMemo, Fragment } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { TbChevronsRight } from "react-icons/tb";
import ExpandableComponent from "./ExpandableComponent";
import { AnimatePresence } from "framer-motion";

const ReactTable = ({ dataRows, dataColumns }) => {
  const [expanded, setExpanded] = useState({});
  const [visibleColumnIds, setVisibleColumnIds] = useState([]);

  useMemo(() => {
    const updateVisibleColumns = () => {
      const screenWidth = window.innerWidth;
      const approxColWidth = 150;
      const maxCols = Math.floor(screenWidth / approxColWidth);
      // Show only the first maxCols columns
      const visibleColumns = dataColumns.slice(0, maxCols);
      setVisibleColumnIds(
        visibleColumns.map((col) => col.id || col.accessorKey)
      );
    };

    updateVisibleColumns();
    window.addEventListener("resize", updateVisibleColumns);
    return () => {
      window.removeEventListener("resize", updateVisibleColumns);
    };
  }, [dataColumns]);

  const data = useMemo(() => dataRows, [dataRows]);

  const expanderColumn = useMemo(() => {
    // Only show expander if some columns are hidden
    const showExpander = visibleColumnIds.length < dataColumns.length;
    if (!showExpander) return [];
    return [
      {
        id: "expander",
        header: () => {
          const isAllExpanded =
            Object.keys(expanded).length === dataRows.length;
          return (
            <button
              className="bg-white text-blue-500 px-2 py-1 rounded hover:bg-gray-600 transition duration-300"
              onClick={() => {
                const newExpanded = {};
                if (!isAllExpanded) {
                  dataRows.forEach((row, index) => {
                    newExpanded[index] = true;
                  });
                }
                setExpanded(newExpanded);
              }}
            >
              <TbChevronsRight
                className={`text-lg transition-transform duration-300 ${
                  isAllExpanded ? "rotate-90" : ""
                }`}
              />
            </button>
          );
        },
        cell: ({ row }) => (
          <div className="flex justify-center items-center">
            <button
              className="bg-green-500 text-white px-2 py-1 rounded hover:bg-gray-600 transition duration-300"
              onClick={() => {
                setExpanded((prev) => ({
                  ...prev,
                  [row.id]: !prev[row.id],
                }));
              }}
            >
              <TbChevronsRight
                className={`text-lg transition-transform duration-300 ${
                  row.getIsExpanded() ? "rotate-90" : ""
                }`}
              />
            </button>
          </div>
        ),
      },
    ];
  }, [expanded, visibleColumnIds.length, dataColumns.length, dataRows]);

  const finalVisibleColumns = useMemo(() => {
    const filtered = dataColumns.filter((col) =>
      visibleColumnIds.includes(col.id || col.accessorKey)
    );
    return [...expanderColumn, ...filtered];
  }, [dataColumns, visibleColumnIds, expanderColumn]);

  const table = useReactTable({
    data,
    columns: finalVisibleColumns,
    state: { expanded: expanded },
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onExpandedChange: setExpanded,
  });

  return (
    <div className="p-4">
      <table className="w-full border-collapse text-sm text-gray-800 shadow-md ">
        <thead className="bg-gradient-to-r from-indigo-500 to-sky-400 text-white text-sm font-semibold">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left uppercase tracking-wider"
                >
                  {flexRender(
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
            <Fragment key={row.id}>
              <tr className="hover:bg-indigo-50 even:bg-gray-100 odd:bg-gray-50 transition">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 border-b border-t border-gray-300"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
              <AnimatePresence>
                {row.getIsExpanded() && (
                  <tr key={`expandId-${row.id}`}>
                    <td colSpan={row.getVisibleCells().length}>
                      <ExpandableComponent
                        data={row.original}
                        dataColumns={dataColumns}
                        visibleColumnIds={visibleColumnIds}
                      />
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReactTable;
