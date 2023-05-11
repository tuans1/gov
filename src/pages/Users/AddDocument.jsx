import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import PDFViewer from "../../components/PDFViewer";
import { Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
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
  const [speechField, setSpeechField] = useState("");
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const location = useLocation();
  const navigate = useNavigate("");
  useEffect(() => {
    console.log(transcript)
    if (speechField) {
      const clone = structuredClone(formObj);
      clone[speechField].value = transcript;
      setFormObj(clone);
      // resetTranscript();
    }
  }, [transcript]);
  const handleSpeech = (field) => {
    if (listening) {
      SpeechRecognition.stopListening();
      setSpeechField("");
    } else {
      setSpeechField(field);
      SpeechRecognition.startListening({
        language: "vi-VN",
        continuous: true,
      });
    }
    resetTranscript();
  };
  const handleChangeInput = (key, value) => {
    const clone = structuredClone(formObj);
    clone[key].value = value;
    setFormObj(clone);
  };
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
          <p>Microphone: {listening ? "on" : "off"}</p>
          <p>{transcript}</p>
          <Form>
            <div className="grid grid-cols-12 gap-4">
              {Object.keys(formObj).map((key) => {
                return (
                  <div className="col-span-6" key={key}>
                    <Form.Group className="mb-3">
                      <Form.Label>{formObj[key].label}</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={"Nhập " + formObj[key].label}
                        value={formObj[key].value}
                        onChange={(e) => handleChangeInput(key, e.target.value)}
                      />
                    </Form.Group>
                    <Button
                      variant="primary"
                      size="sm"
                      className="mb-4"
                      onClick={() => handleSpeech(key)}
                    >
                      {speechField === key ? "Tắt" : "Đọc"}
                    </Button>
                  </div>
                );
              })}
            </div>
          </Form>
        </div>
        <div className="col-span-8">
          {/* <PDFViewer /> */}
          {JSON.stringify(formObj)}
        </div>
      </div>
    </>
  );
}
