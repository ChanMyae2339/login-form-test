import React, { useMemo, useState, useRef, useEffect } from "react";
import DataTable from "./Table/DataTable";
import MOCK_DATA from "../../api/MOCK_DATA.json";
import { COLUMNS } from "./Table/columns";

const columnOptions = [
  { key: "id", label: "ID" },
  { key: "first_name", label: "First Name" },
  { key: "last_name", label: "Last Name" },
  { key: "gender", label: "Gender" },
  { key: "age", label: "Age" },

  { key: "ip_address", label: "IP Address" },
  { key: "email", label: "Email" },
  // Add more columns as needed
];

const Users = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  // Global filter
  const [filter, setFilter] = useState("");

  // Column select and value filter
  const [selectedCol, setSelectedCol] = useState(columnOptions[0].key);
  const [colValue, setColValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const inputRef = useRef();

  // Unique values for selected column, filtered by input
  const uniqueValues = useMemo(() => {
    const values = data
      .map((row) => row[selectedCol])
      .filter((v) => v !== undefined && v !== null);
    const set = new Set();
    const filtered = [];
    for (const v of values) {
      const str = String(v);
      if (
        !set.has(str) &&
        (!colValue || str.toLowerCase().includes(colValue.toLowerCase()))
      ) {
        set.add(str);
        filtered.push(str);
      }
    }
    return filtered;
  }, [data, selectedCol, colValue]);

  // Filtering logic
  const filteredRows = useMemo(() => {
    let filtered = data;

    // Global filter
    if (filter) {
      filtered = filtered.filter((row) =>
        Object.values(row)
          .join(" ")
          .toLowerCase()
          .includes(filter.toLowerCase())
      );
    }

    // Column value filter (exact match)
    if (selectedCol && colValue) {
      filtered = filtered.filter(
        (row) =>
          String(row[selectedCol]).toLowerCase() === colValue.toLowerCase()
      );
    }

    return filtered;
  }, [data, filter, selectedCol, colValue]);

  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const paginatedRows = filteredRows.slice((page - 1) * limit, page * limit);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="p-4 overflow-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        {/* Global filter on the left */}
        <div className="flex-1 flex justify-start">
          <input
            type="text"
            placeholder=" Search..."
            className="border p-2 rounded w-full md:w-64 outline-none border-blue-300"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        {/* Column select and value search on the right */}
        <form
          className="flex flex-row gap-2 flex-1 justify-end items-center"
          autoComplete="off"
        >
          <select
            className="border rounded p-2 border-blue-300"
            value={selectedCol}
            onChange={(e) => {
              setSelectedCol(e.target.value);
              setColValue("");
              setShowDropdown(false);
            }}
          >
            {columnOptions.map((col) => (
              <option key={col.key} value={col.key}>
                {col.label}
              </option>
            ))}
          </select>
          <div className="relative" ref={inputRef}>
            <input
              type="text"
              placeholder={`Search ${
                columnOptions.find((c) => c.key === selectedCol)?.label
              }`}
              className="border rounded p-2 border-blue-300 w-36"
              value={colValue}
              onChange={(e) => {
                setColValue(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
            />
            {showDropdown && uniqueValues.length > 0 && (
              <div className="absolute left-0 right-0 mt-1 bg-white border rounded shadow z-10 max-h-40 overflow-y-auto">
                {uniqueValues.map((val, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-2 hover:bg-blue-100 cursor-pointer truncate"
                    onClick={() => {
                      setColValue(val);
                      setShowDropdown(false);
                    }}
                  >
                    {val}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Search button removed */}
        </form>
      </div>
      <DataTable
        dataRows={paginatedRows}
        dataColumns={columns}
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
