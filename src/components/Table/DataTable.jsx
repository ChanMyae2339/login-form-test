import React from "react";
import ReactTable from "./ReactTable"; // should be the rebuilt v8 version
import PaginationComponent from "./PaginationComponent"; // rebuilt version using table.getState()

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
    <div className="">
      <ReactTable
        dataRows={dataRows}
        dataColumns={dataColumns}
        page={page}
        limit={limit}
      />
      {dataRows.length > 0 && (
        <PaginationComponent
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          totalItems={totalItems}
        />
      )}
    </div>
  );
};

export default DataTable;
