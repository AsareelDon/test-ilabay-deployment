import { useState, useEffect } from "react";

const pageRange = (data, rows) => {
  const range = [];
  const numOfPages = data ? Math.ceil(data.length / rows) : 0;
  for (let pageIndex = 1; pageIndex <= numOfPages; pageIndex++) {
    range.push(pageIndex);
  }
  return range;
};

const pageDatasets = (data, numOfPage, rows) => {
  return data ? data.slice((numOfPage - 1) * rows, numOfPage * rows) : [];
};

const usePagination = (data, page, rows) => {
  const [range, setTableRange] = useState([]);
  const [numOfRowPerPage, setNumofRowsPerPage] = useState([]);

  useEffect(() => {
    const range = pageRange(data, rows);
    setTableRange([...range]);

    const slice = pageDatasets(data, page, rows);
    setNumofRowsPerPage([...slice]);
  }, [data, setTableRange, page, setNumofRowsPerPage]);

  return { numOfRowPerPage, numOfPages: range };
};

export default usePagination;