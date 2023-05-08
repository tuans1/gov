import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Collapse from "react-bootstrap/Collapse";
import { useState } from "react";
import FormInput from "../Users/AddDocument";
import { ReactComponent as ArrowIcon } from "../../assets/icons/down-arrow.svg";
import { ReactComponent as ExportIcon } from "../../assets/icons/export-file.svg";
import Pagination from "../../components/Pagination";
export default function Statistic() {
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
      label: "Người chỉnh sửa cuối",
    },
    {
      label: "Ngày nhập",
    },
  ];
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="container">
        <div>
          Trang này dành cho ADMIN tổng hợp File hiện có Tổng hợp số file mà
          từng user nhập dc trong ngày
        </div>
        <div className="mt-8">
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            Tổng File đã hoàn thành
            <ArrowIcon className="mt-1 ml-2 w-4 h-4 float-right" fill="white" />
          </Button>
          <Collapse in={open}>
            <div id="example-collapse-text">
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tên Nhân viên</th>
                    <th>Đã nhập / Còn</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>latuan3</td>
                    <td>0 / 200</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Mao Mao Mao</td>
                    <td>100 / 200</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Chu Một Mi</td>
                    <td>100 / 200</td>
                  </tr>
                  <tr>
                    <td colSpan={3}>Tổng Đã Nhập : 200/600</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Collapse>
        </div>
        <p>Chọn nhân viên để xem lịch sử</p>
        <div className="flex">
          <Form.Select className="!w-80">
            <option defaultChecked="0">Tất cả</option>
            <option value="1">latuan3</option>
            <option value="2">Mao Mao Mao</option>
            <option value="3">Chu Một Mi</option>
          </Form.Select>
          <Button onClick={() => {}}>
            <ExportIcon className="mr-2 w-5 h-5 float-left" fill="white" />
            Xuất EXCEL
          </Button>
        </div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              {headCells.map((x, i) => {
                return <td key={i}>{x.label}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            <tr onClick={() => setShow(true)}>
              <td>1</td>
              <td>latuan3</td>
              <td>82</td>
              <td></td>
              <td>
                Tờ khai cấp giấy xác nhận tình trạng hôn nhân: Phạm Thu Thảo (
                Tổ 8 Minh Tiến A)
              </td>
              <td>@HS99</td>
              <td>18</td>
              <td>12</td>
              <td>12/01/2015</td>
              <td>UBND phường Cẩm Bình</td>
              <td>02</td>
              <td>latuan3</td>
              <td>12:53 25/04/2023 </td>
            </tr>
            <tr onClick={() => setShow(true)}>
              <td>2</td>
              <td>latuan3</td>
              <td>62</td>
              <td></td>
              <td>
                Giấy xác nhận tình trạng hôn nhân: Phạm Quang Hải ( Tổ 4 Khu
                Minh Tiến B ) Vũ Đình Hoa ( Tổ 9 Khu Diêm Thuỷ )
              </td>
              <td>HS15</td>
              <td>Quyển 06</td>
              <td>12</td>
              <td>12/01/2015</td>
              <td>UBND phường Cẩm Bình</td>
              <td>01</td>
              <td>admin</td>
              <td>12:53 25/04/2023 </td>
            </tr>
          </tbody>
        </Table>
        <Pagination />
        <p>
          Có thể click vào Row -> mở modal lên để hiện thị Form + file PDF và có
          thể chỉnh sửa
        </p>
      </div>
      <Modal
        show={show}
        fullscreen={true}
        onHide={() => setShow(!show)}
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Chỉnh sửa Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="test">
          <FormInput />
        </Modal.Body>
      </Modal>
    </>
  );
}
