import React from "react";

function ExpandableComponent({ data, expandOrder }) {
  if (!data) return null;

  // Flatten grouped columns (if any)
  const getLeafColumns = (columns) => {
    const result = [];
    for (const col of columns) {
      if ("columns" in col) {
        result.push(...getLeafColumns(col.columns));
      } else {
        result.push(col);
      }
    }
    return result;
  };

  const flatColumns = getLeafColumns(expandOrder);

  return (
    <div className="w-full rounded-md overflow-hidden font-semibold bg-gray-50 p-2">
      {flatColumns.map((col, index) => {
        const label =
          typeof col.header === "function"
            ? col.header()
            : col.header ?? "";

        const value =
          col.accessorKey && data[col.accessorKey] !== undefined
            ? data[col.accessorKey]
            : "N/A";

        return (
          <div
            key={`row-col-${index}`}
            className="flex flex-row gap-2 py-1 border-b last:border-none"
          >
            <div className="w-1/3 px-2 text-gray-600 font-medium">
              {label}
            </div>
            <div className="w-2/3 px-2 text-gray-900">
              {value}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ExpandableComponent;
