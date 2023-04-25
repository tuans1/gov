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
      <Row>
        <Col sm={4}>
          <Form>
            <Row>
              <Col sm={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="underline">Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="text-red-500">Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
        <Col sm={8}>
          <PDFViewer />
        </Col>
      </Row>
    </>
  );
}
