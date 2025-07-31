import React, { useEffect, useState } from "react";
import Select from "./Select";
import { RxCross2 } from "react-icons/rx";
import { PiMagnifyingGlass } from "react-icons/pi";
import getFilterQuery from "./getFilterQuery";

const SideOver = ({
  isSideOverOpen = false,
  setIsSideOverOpen,
  filterColumns = [],
  onFilter = () => null,
  setFilterCount,
  resetFormRef,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dataColumns, setDataColumns] = useState([]);

  useEffect(() => {
    let columns = filterColumns?.filter((column) => column.filter === true);
    setDataColumns(columns);
  }, [filterColumns]);

  useEffect(() => {
    if (resetFormRef) {
      resetFormRef.current.resetFilters = () => {
        setSelectedOptions([]);
        setFilterCount(0);
      };
    }
  }, [resetFormRef]);

  const handleFilter = (options) => {
    const result = getFilterQuery(options);
    setFilterCount(result.split("&").length - 1);
    onFilter(result);
  };

  return (
    <div
      className={`fixed top-20  right-0 h-screen lg:w-full  max-w-md transition-all duration-300 
		${
        isSideOverOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ boxShadow: isSideOverOpen ? "0 0 40px rgba(0,0,0,0.2)" : "none" }}
    >
      <div className="flex flex-col h-full bg-gradient-to-br from-indigo-500 to-sky-400 text-gray-700 rounded-tl-2xl rounded-bl-3xl shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/20 sticky top-0 bg-gradient-to-br from-indigo-500 to-sky-400 z-10">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            Filters
          </h2>
          <button
            onClick={() => setIsSideOverOpen(false)}
            className="text-white text-xl p-2 rounded hover:bg-white/10 transition"
            aria-label="Close"
          >
            <RxCross2 />
          </button>
        </div>
        {/* Filters */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 bg-white/80">
          {dataColumns?.length > 0 ? (
            dataColumns.map((column, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 border border-blue-100 hover:border-blue-400 transition"
              >
                <label className="text-sm font-semibold text-indigo-700 mb-1">
                  {column?.header}
                </label>
                <Select
                  options={column?.options || []}
                  isMulti={column?.multiselect}
                  placeholder={"Select ..."}
                  isSearchable={column?.searchable === true ? true : false}
                  value={selectedOptions[column?.accessor] || (column?.multiselect ? [] : null)}
                  onChange={(selected) => {
                    if (!selected || selected?.length === 0) {
                      const options = { ...selectedOptions };
                      delete options[column?.accessor];
                      setSelectedOptions(options);
                      return;
                    }
                    setSelectedOptions({
                      ...selectedOptions,
                      [column?.accessorKey]: selected,
                    });
                  }}
                />
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-8">No filters available</div>
          )}
        </div>
        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/20 bg-gradient-to-br from-indigo-500 to-sky-400 sticky bottom-0 z-10 flex gap-2">
          <button
            onClick={() => {
              handleFilter(selectedOptions);
            }}
            className="flex-1 flex items-center justify-center gap-2 bg-yellow-400 text-gray-900 font-semibold py-2 rounded-lg shadow hover:bg-yellow-300 transition"
          >
            <PiMagnifyingGlass className="text-lg" />
            <span>Apply Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideOver;
