import { useState } from "react";
import { PaginationControl } from "react-bootstrap-pagination-control";

export default function Pagination({ onChangePage }) {
  const [page, setPage] = useState(1);

  return (
    <PaginationControl
      page={page}
      between={4}
      total={250}
      limit={20}
      changePage={(page) => {
        setPage(page);
        onChangePage(page);
      }}
      ellipsis={1}
    />
  );
}
