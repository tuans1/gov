import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import PDFViewer from "../../components/PDFViewer";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function AddDocument() {
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
  useEffect(()=>{
    console.log(location)
  },[])
  const location = useLocation();
  const navigate = useNavigate("");
  const handleChangeInput = () => {};

  return (
    <>
      <div className="grid grid-cols-12 gap-4 p-4">
        <div className="col-span-4">
          <div className="flex">
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate("/danh-sach-file")}
              className="mb-4 mr-2 text-white"
            >
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
                  <div className="col-span-6" key={x}>
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
