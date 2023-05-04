import React from "react";
import { Button, Table } from "react-bootstrap";

export default function User() {
  return (
    <>
      <p>Trang này hiển thị Các User ADMIN có thể tạo User và set TK + MK</p>
      <Button onClick={() => {}}>Tạo Nhân viên</Button>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Tên Nhân viên</th>
            <th>Tài Khoản</th>
            <th>Mật Khẩu</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Trần Văn Hung</td>
            <td>tvhung</td>
            <td>tvhung</td>
            <td>
              <Button variant="danger" size="sm">Xóa</Button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Trần Văn Hung</td>
            <td>tvhung</td>
            <td>tvhung</td>
            <td>
              <Button variant="danger" size="sm">Xóa</Button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Trần Văn Hung</td>
            <td>tvhung</td>
            <td>tvhung</td>
            <td>
              <Button variant="danger" size="sm">Xóa</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
