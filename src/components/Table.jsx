import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { TbChevronsRight } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TbFileExport, TbRefresh, TbSearch } from "react-icons/tb";
import { PiFunnelFill, PiXBold } from "react-icons/pi";
import { BiBrushAlt } from "react-icons/bi";
import SideOver from "./SideOver";
import { axiosPrivate } from "../../api/axiosPrivate";
import PageHeader from "./PageHeader";
import TabNavlink from "./TabNavlink";
import { toast } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

const Table = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const resetFormRef = useRef({
    resetSearch: () => {},
    resetFilters: () => {},
  });

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      await axiosPrivate(
        `https://backend-test-gilt-eta.vercel.app/api/users?page=${page}&limit=${limit}${filterQuery}${
          searchKeyword ? `&search=${searchKeyword}` : ""
        }`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
        .then((res) => {
          setData(res?.data);
          console.log("fetched data => ", res?.data);
        })
        .catch((err) => {
          console.log("fetch error => ", err);
          toast.error(
            err?.response?.data?.message ||
              `Error with status ${err?.response?.status}`
          );
        })
        .finally(() => setIsLoading(false));
    };

    getData();
  }, [page, limit, searchKeyword, filterQuery]);

  return (
    <div className="">
      <SearchAndFilterComponent
        dataColumns={data?.columns?.users_header || []}
        dataRows={data?.data || []}
        onSearch={(text) => {
          setPage(1);
          setSearchKeyword(text);
        }}
        onFilter={(query) => {
          setPage(1);
          setFilterQuery(query);
        }}
        onReset={() => {
          setFilterQuery("");
          setSearchKeyword("");
          setPage(1);
          setLimit(10);

          if (resetFormRef.current?.resetSearch) {
            resetFormRef.current.resetSearch();
          }
          if (resetFormRef.current?.resetFilters) {
            resetFormRef.current.resetFilters();
          }
        }}
        resetFormRef={resetFormRef}
        isLoading={isLoading}
      />
      <PageHeader />

      <ReactTable
        data={data?.data || []}
        columns={data?.columns?.users_header || []}
      />
      <Pagination
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        totalItems={data?.count || 0}
      />
    </div>
  );
};

const ReactTable = ({ data, columns }) => {
  const [sorting, setSorting] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const wrapperRef = useRef(null); //width calculation for visible columns

  // Manage visible and hidden columns based on wrapper width
  const [visibleColumns, setVisibleColumns] = useState(columns); // initially show all columns, Store hidden columns when width is not enough
  const [hiddenColumns, setHiddenColumns] = useState([]); //store hidden columns when width is not enough

  // Dynamically update visible/hidden columns when wrapper width or columns change
  useEffect(() => {
    const updateColumnsVisibility = () => {
      const wrapperWidth = wrapperRef.current?.offsetWidth || 0;
      const columnMinWidth = 150; // default width if no width set

      let totalWidth = 0;
      const visible = [];
      const hidden = [];

      for (let col of columns) {
        const colWidth = col.width || columnMinWidth;
        if (totalWidth + colWidth <= wrapperWidth) {
          visible.push(col);
          totalWidth += colWidth;
        } else {
          hidden.push(col);
        }
      }

      setVisibleColumns(visible);
      setHiddenColumns(hidden);
    };

    updateColumnsVisibility();
    window.addEventListener("resize", updateColumnsVisibility);
    return () => window.removeEventListener("resize", updateColumnsVisibility);
  }, [columns]);

  // Expander column definition with direct toggle handlers to fix expand toggle issue
  const expanderColumn = useMemo(() => {
    const showExpander = visibleColumns.length < columns.length;

    // Always return a column object with an 'id'.
    // Conditionally set 'header' and 'cell' to undefined if the expander is not needed.
    return {
      id: "expander", // This ID is crucial and must always be present
      header: showExpander
        ? ({ table }) => (
            <button
              onClick={table.getToggleAllRowsExpandedHandler()}
              aria-label="Toggle All Rows Expanded"
            >
              {table.getIsAllRowsExpanded() ? (
                <TbChevronsRight className=" rotate-90" />
              ) : (
                <TbChevronsRight />
              )}
            </button>
          )
        : undefined, // If not visible, header is undefined
      cell: showExpander
        ? ({ row }) => {
            const handleClick = () => {
              row.toggleExpanded();
            };
            return (
              <button
                onClick={handleClick}
                style={{ cursor: "pointer" }}
                aria-label="Toggle Row Expanded"
              >
                {row.getIsExpanded() ? (
                  <TbChevronsRight className=" rotate-90" />
                ) : (
                  <TbChevronsRight />
                )}
              </button>
            );
          }
        : undefined, // If not visible, cell is undefined
      size: 40,
    };
  }, [visibleColumns, columns]);

  // Compose columns with expander first
  const columnsWithExpander = useMemo(() => {
    // Only include expanderColumn if its 'header' property is defined (meaning showExpander was true)
    return expanderColumn.header
      ? [expanderColumn, ...visibleColumns]
      : [...visibleColumns];
  }, [expanderColumn, visibleColumns]);

  //for user detail link
  const columnStates = useMemo(() => {
    return columnsWithExpander.map((column) => {
      if (column?.accessorKey == "name") {
        return {
          ...column,

          cell: ({ row }) => (
            <>
              <TabNavlink
                row={row}
                value={row?.original[column?.accessorKey]}
              />
              {/* {row?.original[column?.accessorKey] } */}
            </>
          ),
        };
      }
      // For the status column, render as badge
      if (column?.accessorKey === "disabled") {
        return {
          ...column,
          cell: ({ row }) => (
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold
                                ${
                                  row?.original?.disabled === true
                                    ? "bg-red-100 text-red-700"
                                    : "bg-green-100 text-green-700"
                                }`}
            >
              {row?.original?.disabled === true ? "Disabled" : "Active"}
            </span>
          ),
        };
      }

      return column;
    });
  }, [columnsWithExpander]);

  // Create the table instance with getRowId to fix expand toggles
  const table = useReactTable({
    data,
    columns: columnStates,
    state: {
      sorting,
      expanded,
      pagination,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row) => row._id, // Use unique row id for expand tracking
  }); //row.toggleExpanded();//row.getIsExpanded() တွေက row ကို track လုပ်နိုင်ရန် getRowId ကို အသုံးပြုတယ်

  return (
    <div ref={wrapperRef} className="p-4">
      <table className="w-full border-collapse text-sm text-gray-800 shadow-md ">
        <thead className="bg-gradient-to-r from-indigo-500 to-sky-400 text-white text-sm font-semibold">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-b border-gray-300 p-2 text-left cursor-pointer select-none"
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ width: header.getSize() || 150 }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted()] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            const isExpanded = row.getIsExpanded();
            return (
              <React.Fragment key={row.id}>
                <tr
                  className={`border-b border-gray-200 hover:bg-green-100 even:bg-gray-100`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="p-2"
                      style={{ width: cell.column.getSize() || 150 }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
                {/* Render hidden columns when row is expanded */}
                {isExpanded && hiddenColumns.length > 0 && (
                  <tr>
                    <td
                      colSpan={row.getVisibleCells().length} //length of visible cells
                    >
                      <AnimatePresence>
                        <Expand
                          hiddenColumns={hiddenColumns}
                          data={row.original}
                        />
                      </AnimatePresence>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const Expand = ({ hiddenColumns, data }) => {
  return (
    <motion.div
      className="overflow-hidden  p-2"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div>
        {hiddenColumns.map((col) => {
          const key = col.accessorKey;

          const value = key && data ? data[key] : "";
          if (key === "disabled") {
            return (
              <div
                key={key}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex flex-col bg-gradient-to-r from-indigo-300 to-sky-300 p-3 rounded-lg border border-gray-100 shadow-sm"
              >
                <div className="text-gray-800 font-semibold text-sm mb-1">
                  <h3 className="text-center  font-bold text-[#231F2080]">
                    {col.header || col.Header}:
                  </h3>{" "}
                </div>
                <div className="text-gray-800 text-sm break-words">
                  <div className="w-full pl-2 text-left break-all ">
                    <div className="text-center  gap-2  font-semibold  text-[#231F20E6] ">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                                    ${
                                      data.disabled === true // hidden data မှာလည်း boolean ကို စစ်မယ်
                                        ? "bg-red-100 text-red-700"
                                        : "bg-green-100 text-green-700"
                                    }`}
                      >
                        {data.disabled === true ? "inactive" : "active"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          return (
            <div
              key={key}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex flex-col bg-gradient-to-r from-indigo-300 to-sky-300 p-3 rounded-lg border border-gray-100 shadow-sm"
            >
              <div className="text-gray-800 font-semibold text-sm mb-1">
                <h3 className="text-center  font-bold text-[#231F2080]">
                  {col.header || col.Header}:
                </h3>{" "}
              </div>
              <div className="text-gray-800 text-sm break-words">
                <div className="w-full pl-2 text-left break-all ">
                  <div className="text-center  gap-2  font-semibold  text-[#231F20E6] ">
                    {key === "order_date"
                      ? new Date(value).toLocaleDateString("en-GB", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        })
                      : String(value)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

const Pagination = ({ page, setPage, limit, setLimit, totalItems }) => {
  const totalPages = Math.ceil(totalItems / limit);

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="flex justify-between items-center mt-4 px-2">
      <div className="flex gap-2 items-center">
        <button
          onClick={handlePrev}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={page === 1}
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
      <div>
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="border p-1 rounded ml-2 border-blue-500 outline-none"
        >
          {[5, 10, 20].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const SearchAndFilterComponent = ({
  dataColumns = [],

  onSearch,
  onFilter,
  onReset,
  resetFormRef,
  isLoading = false,
}) => {
  const formSchema = z.object({
    text: z.string().max(255, {
      message: "Could not exceed 255 characters.",
    }),
  });
  const [isSideOverOpen, setIsSideOverOpen] = useState(false);
  const [filterCount, setFilterCount] = useState(0);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });
  useEffect(() => {
    if (resetFormRef) {
      resetFormRef.current.resetSearch = () => form.reset({ text: "" });
    }
  }, [form.reset, resetFormRef]);

  const onSubmit = (data) => {
    onSearch(data.text);
  };

  return (
    <div className="mt-5  grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4   ">
      <form
        className=" w-full lg:basis-1/2 flex flex-row  gap-4 ml-2 justify-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="relative ">
          <input
            className="search-input border p-2 rounded w-full md:w-64 outline-none border-blue-300 "
            {...form.register("text")}
            placeholder={`${isLoading ? "Loading" : "Search"}`}
            autoComplete="off"
          />

          <button
            className="btn text-blue-500 font-semibold absolute -mx-8 top-1/3 lg:top-1/4 "
            type="submit"
          >
            <TbSearch className="icon-content" />
          </button>
        </div>
        {/* <button className="btn text-red-500 font-semibold " onClick={onReset}>
          <BiBrushAlt className="icon-content" />
          <span className="hidden lg:inline">Reset</span>
        </button> */}
      </form>
      <div className="flex   justify-end mr-10">
        <button
          className="btn  border p-2 border-blue-400 rounded hover:bg-blue-500 hover:text-white "
          onClick={() => setIsSideOverOpen(true)}
          type="button"
        >
          <PiFunnelFill className="icon-content text-blue-300 font-semibold text-xl " />
          <span className="hidden lg:inline">Filter</span>
          {filterCount > 0 ? (
            <span className="absolute -top-1 -right-1 rounded-full border-2 border-background size-5 inline-flex items-center justify-center text-smallContent bg-primary text-white">
              {filterCount}
            </span>
          ) : null}
        </button>
      </div>
      <SideOver
        isSideOverOpen={isSideOverOpen}
        setIsSideOverOpen={setIsSideOverOpen}
        filterColumns={dataColumns}
        onFilter={onFilter}
        setFilterCount={setFilterCount}
        resetFormRef={resetFormRef}
      />
    </div>
  );
};

export default Table;
