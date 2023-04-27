import React from "react";
import { Table } from "react-bootstrap";

export default function ListPdfFile() {
  const headCells = [
    {
      label: "STT",
    },
    {
      label: "Người Đảm Nhiệm",
    },
    {
      label: "Số và ký hiệu hồ sơ",
    },
    {
      label: "Số của văn bản ( Dùng để tìm kiếm file )",
    },
    {
      label: "Tiêu đề văn bản",
    },
    {
      label: "Tờ Số",
    },
    {
      label: "Mã hồ sơ",
    },
    {
      label: "Số tứ tự văn bản trong hồ sơ",
    },
    {
      label: "Ngày tháng năm văn bản",
    },
    {
      label: "Tên cơ quan tổ chức ban hành văn bản",
    },
    {
      label: "Số lượng trang của văn bản",
    },
    {
      label: "Ngày nhập",
    },
  ];
  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            {headCells.map((x, i) => {
              return <td key={i}>{x.label}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>latuan3</td>
            <td>82</td>
            <td></td>
            <td>
              Tờ khai cấp giấy xác nhận tình trạng hôn nhân: Phạm Thu Thảo ( Tổ
              8 Minh Tiến A)
            </td>
            <td>@HS99</td>
            <td>18</td>
            <td>12</td>
            <td>12/01/2015</td>
            <td>UBND phường Cẩm Bình</td>
            <td>02</td>
            <td>12:53 25/04/2023 </td>
          </tr>
          <tr>
            <td>2</td>
            <td>latuan3</td>
            <td>62</td>
            <td></td>
            <td>
              Giấy xác nhận tình trạng hôn nhân: Phạm Quang Hải ( Tổ 4 Khu Minh
              Tiến B ) Vũ Đình Hoa ( Tổ 9 Khu Diêm Thuỷ )
            </td>
            <td>HS15</td>
            <td>Quyển 06</td>
            <td>12</td>
            <td>12/01/2015</td>
            <td>UBND phường Cẩm Bình</td>
            <td>01</td>
            <td>12:53 25/04/2023 </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
