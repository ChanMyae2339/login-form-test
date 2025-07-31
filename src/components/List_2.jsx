
// import {
//   useReactTable,
//   flexRender,
//   getCoreRowModel,
//   getSortedRowModel,
//   getPaginationRowModel,
//   getFilteredRowModel,
// } from "@tanstack/react-table";
// import {  useMemo, useState } from "react";

// const List_2 = () => {

 



//   const [sorting, setSorting] = useState([]);
//   const [pagination, setPagination] = useState({
//     pageIndex: 0,
//     pageSize: 10,
//   });

//   const [globalFilter, setGlobalFilter] = useState("");

//   const GroupColumns = [
//     { header: 'ID', accessorKey: 'id', footer: 'ID' },

//     {
//       header: 'First-Name',
//       accessorKey: 'first_name',
//       footer: 'First Name',
//     },
//     {
//       header: 'Last Name',
//       accessorKey: 'last_name',
//       footer: 'Last Name',
//     },



//     { header: 'Email', accessorKey: 'email', footer: 'Email' },
//     { header: 'Gender', accessorKey: 'gender', footer: 'Gender' },
//     { header: 'Age', accessorKey: 'age', footer: 'Age' },
//     { header: 'Country', accessorKey: 'country', footer: 'Country' },
//     { header: 'Phone', accessorKey: 'phone', footer: 'Phone' },
//     { header: 'Date of Birth', accessorKey: 'date_of_birth', footer: 'Date Of Birth' },

//   ];

//   const columns = useMemo(() => GroupColumns, []);

//   const table = useReactTable({
//     columns,
//     state: {
//       sorting,
//       pagination,
//       globalFilter,
//     },
//     onSortingChange: setSorting,
//     onPaginationChange: setPagination,
//     onGlobalFilterChange: setGlobalFilter,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     globalFilterFn: (row, columnId, filterValue) => {
//       return String(row.getValue(columnId))
//         .toLowerCase()
//         .includes(filterValue.toLowerCase());
//     },
//   });

//   return (
//     <div className="p-4  w-full">
//       {/* 🔍 Global Search */}
//       <div className="mb-4 flex justify-center">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={globalFilter}
//           onChange={(e) => setGlobalFilter(e.target.value)}
//           className="px-3 py-2 border-blue-300 rounded bg-blue-200"

//         />
//       </div>

//       <table className="min-w-full border border-gray-300 text-sm text-left">
//         <thead className="bg-blue-600 text-gray-700">
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <th
//                   key={header.id}
//                   colSpan={header.colSpan}
//                   className="px-4 py-2 border-b border-blue-700 font-semibold text-center cursor-pointer select-none"
//                   onClick={header.column.getToggleSortingHandler()}
//                 >
//                   <div className="flex items-center justify-center gap-1">
//                     {flexRender(header.column.columnDef.header, header.getContext())}
//                     {header.column.getIsSorted() === "asc" && " 🔼"}
//                     {header.column.getIsSorted() === "desc" && " 🔽"}
//                   </div>
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map((row, rowIndex) => (
//             <tr
//               key={row.id}
//               className={rowIndex % 2 === 0 ? "bg-white" : "bg-blue-200 hover:bg-blue-300"}
//             >
//               {row.getVisibleCells().map((cell) => (
//                 <td key={cell.id} className="px-4 py-2 border-b border-gray-200">
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination UI */}
//       <div className="mt-4 flex items-center gap-2 justify-center">
//         <button
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//           className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
//         >
//           Previous
//         </button>
//         <span>
//           Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{" "}
//           <strong>{table.getPageCount()}</strong>
//         </span>
//         <button
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//           className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default List_2;




