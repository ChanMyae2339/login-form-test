import React from "react";
import { motion } from "framer-motion";


function ExpandableComponent({ data, dataColumns, visibleColumnIds }) {
  if (!data) return null;

  const hideColumns = dataColumns.filter(
    (col) => !visibleColumnIds.includes(col.accessorKey)
  );

  return (
    <motion.div
      className="overflow-hidden  p-2"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {hideColumns.map((col, index) => {
          const label =
            typeof col.header === "function" ? col.header() : col.header ?? "";
          const value =
            col.accessorKey && data[col.accessorKey] !== undefined
              ? data[col.accessorKey]
              : "N/A";

          return (
            <div
              key={index}
              className="flex flex-col bg-gradient-to-r from-indigo-300 to-sky-300 p-3 rounded-lg border border-gray-100 shadow-sm"
            >
              <span className="text-gray-800 font-semibold text-sm mb-1">
                {label}
              </span>
              <span className="text-gray-800 text-sm break-words">
                {value}
                </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default ExpandableComponent;
