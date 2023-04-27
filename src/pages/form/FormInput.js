import Form from "react-bootstrap/Form";
import { useState } from "react";
import BaseInput from "../../components/BaseInput";
import PDFViewer from "../../components/PDFViewer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
export default function FormInput() {
  const [formObj, setFormObj] = useState({
    soKyHieuVaHoSo: {
      label: "Số và ký hiệu hồ sơ",
      value: "",
    },
    soCuaVanBan: {
      label: "Số của văn bản ( Dùng để tìm kiếm file )",
      value: "",
    },
    tieuDeVanBan: {
      label: "Tiêu đề văn bản",
      value: "",
    },
    toSo: {
      label: "Tờ số",
      value: "",
    },
    maHoSo: {
      label: "Mã hồ sơ",
      value: "",
    },
    sttVanBanTrongHoSo: {
      label: "Số tứ tự văn bản trong hồ sơ",
      value: "",
    },
    dateVanBan: {
      label: "Ngày tháng năm văn bản",
      value: "",
    },
    tenCoQuanBanHanhVanBan: {
      label: "Tên cơ quan tổ chức ban hành văn bản",
      value: "",
    },
    soLuongTrang: {
      label: "Số lượng trang của văn bản",
      value: "",
    },
  });
  const handleChangeInput = () => {};
  return (
    <>
      <div className="grid grid-cols-12 gap-4 p-4">
        <div className="col-span-4">
          <div className="flex">
            <Button variant="primary" size="sm" className="mb-4 mr-2 text-white">
              Trở về danh sách
            </Button>
            <Button variant="primary" size="sm" className="mb-4">
              Lưu File
            </Button>
            <Button variant="success" size="sm" className="mb-4 ml-auto">
              File tiếp theo
            </Button>
          </div>
          <Form>
            <div className="grid grid-cols-12 gap-4">
              {Object.keys(formObj).map((x) => {
                return (
                  <div className="col-span-6">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>{formObj[x].label}</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={"Nhập " + formObj[x].label}
                      />
                    </Form.Group>
                  </div>
                );
              })}
            </div>
          </Form>
        </div>
        <div className="col-span-8">
          <PDFViewer />
        </div>
      </div>
    </>
  );
}