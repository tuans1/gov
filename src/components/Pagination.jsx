import { useState } from "react";
import { PaginationControl } from "react-bootstrap-pagination-control";

export default function Pagination({ onChangePage, page, totalItems }) {
  return (
    <PaginationControl
      page={page}
      between={4}
      total={totalItems}
      limit={5}
      changePage={(page) => {
        onChangePage(page - 1);
      }}
      ellipsis={1}
    />
  );
}
