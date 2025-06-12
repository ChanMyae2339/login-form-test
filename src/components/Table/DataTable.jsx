import React from "react";
import ReactTable from "./ReactTable";
import PaginationComponent from "./PaginationComponent";

const DataTable = ({
  dataRows = [],
  dataColumns = [],
  page,
  setPage,
  limit,
  setLimit,
  totalItems,
}) => {

  return (
    <div>
    <ReactTable
  dataRows={dataRows}
  dataColumns={dataColumns}
 
/>

      <PaginationComponent
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        totalItems={totalItems}
      />
    </div>
  );
};

export default DataTable;
