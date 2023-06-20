import { useState } from "react";
import { PaginationControl } from "react-bootstrap-pagination-control";

export default function Pagination({ onChangePage, pagination }) {
  return (
    <PaginationControl
      page={pagination.page}
      between={4}
      total={pagination.totalItems}
      limit={5}
      changePage={(page) => {
        onChangePage(page - 1);
      }}
      ellipsis={1}
    />
  );
}
