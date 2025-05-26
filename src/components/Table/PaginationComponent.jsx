import React, { useEffect, useMemo } from "react";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

const PaginationComponent = ({ page, setPage, totalItems, limit, setLimit }) => {
  const noOfPages = useMemo(() => Math.ceil(totalItems / limit), [totalItems, limit]);

  const canGoNext = page < noOfPages;
  const canGoBack = page > 1;

  const onNextPage = () => {
    if (canGoNext) setPage(page + 1);
  };

  const onPrevPage = () => {
    if (canGoBack) setPage(page - 1);
  };

  const onPageSelect = (pageNum) => {
    if (pageNum >= 1 && pageNum <= noOfPages) {
      setPage(pageNum);
    }
  };

  const renderPageButtons = () => {
    if (noOfPages <= 5) {
      return [...Array(noOfPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageSelect(i + 1)}
          className={`pagination-item font-normal ${
            page === i + 1 ? "bg-primary text-white" : "text-primary"
          }`}
        >
          {i + 1}
        </button>
      ));
    }

    return (
      <>
        <button
          onClick={() => onPageSelect(1)}
          className={`pagination-item font-normal ${page === 1 && "bg-primary text-white"}`}
        >
          1
        </button>
        {page > 3 && <span className="pagination-item">...</span>}

        {page > 2 && page < noOfPages - 1 && (
          <button className="pagination-item font-normal" onClick={() => onPageSelect(page - 1)}>
            {page - 1}
          </button>
        )}
        {page > 1 && page < noOfPages && (
          <button className="pagination-item font-normal bg-primary text-white">
            {page}
          </button>
        )}
        {page + 1 < noOfPages && (
          <button className="pagination-item font-normal" onClick={() => onPageSelect(page + 1)}>
            {page + 1}
          </button>
        )}

        {page < noOfPages - 2 && <span className="pagination-item">...</span>}

        <button
          onClick={() => onPageSelect(noOfPages)}
          className={`pagination-item font-normal ${
            page === noOfPages && "bg-primary text-white"
          }`}
        >
          {noOfPages}
        </button>
      </>
    );
  };

  useEffect(() => {
    if (page > noOfPages && noOfPages > 0) {
      setPage(1); // Reset to first page if overflow
    }
  }, [page, noOfPages]);

  return (
    <div className="mt-6 w-full lg:flex items-center justify-between">
      {/* Left: Limit & total info */}
      <div className="flex items-center gap-2 text-content">
        <span className="text-[#231F20B3] font-semibold">Show:</span>
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="outline-none bg-white ring-1 ring-[#231F2080] rounded px-2 w-14 h-6 lg:w-16 lg:h-8"
        >
          {[5, 10, 15].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span className="text-[#231F20B3]">
          per page <span className="font-bold">|</span> Total:{" "}
          <span className="font-semibold">{totalItems}</span>
        </span>
      </div>

      {/* Right: Pagination buttons */}
      <div className="flex items-center gap-3 mt-4 lg:mt-0">
        <button
          onClick={onPrevPage}
          disabled={!canGoBack}
          className="pagination-item text-[#231F2080] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <TbChevronLeft className="icon-content" />
        </button>

        <div className="flex items-center gap-2">{renderPageButtons()}</div>

        <button
          onClick={onNextPage}
          disabled={!canGoNext}
          className="pagination-item text-[#231F2080] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <TbChevronRight className="icon-content" />
        </button>
      </div>
    </div>
  );
};

export default PaginationComponent;
