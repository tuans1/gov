import React from "react";
import { Table } from "react-bootstrap";

export default function DanhSachFile() {
  const headCells = [
    {
      label: "STT",
    },
    {
      label: "Tên File",
    },
    {
      label: "Tiêu đề văn bản",
    },
    {
      label: "Số và ký hiệu hồ sơ",
    },
    {
      label: "Số của văn bản ( Dùng để tìm kiếm file )",
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
      <p>
        Trang này hiển thị cho quyền User để chọn file, sau khi click sẽ chuyển sang Form
        hiển thị file PDF
      </p>
      <p>Chọn file bạn muốn nhập</p>
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
            <td> 00.0092.HS.49.2019.pdf</td>
            <td>
              Tờ khai cấp giấy xác nhận tình trạng hôn nhân: Phạm Thu Thảo ( Tổ
              8 Minh Tiến A)
            </td>
            <td>82</td>
            <td></td>
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
            <td> 00.0092.HS.22.2019.pdf</td>
            <td>
              Giấy xác nhận tình trạng hôn nhân: Phạm Quang Hải ( Tổ 4 Khu Minh
              Tiến B ) Vũ Đình Hoa ( Tổ 9 Khu Diêm Thuỷ )
            </td>
            <td>62</td>
            <td></td>
            <td>HS15</td>
            <td>Quyển 06</td>
            <td>12</td>
            <td>12/01/2015</td>
            <td>UBND phường Cẩm Bình</td>
            <td>01</td>
            <td>12:53 25/04/2023 </td>
          </tr>
          <tr>
            <td>3</td>
            <td> 00.0092.HS.33.2019.pdf</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>3</td>
            <td> 00.0092.HS.66.2019.pdf</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
