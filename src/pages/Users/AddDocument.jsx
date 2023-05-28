import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import PDFViewer from "../../components/PDFViewer";
import { Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import apiService from "../../api";
export default function AddDocument() {
  const [formObj, setFormObj] = useState({
    subject: {
      label: "Tiêu đề văn bản",
      value: "",
      isSpeech: true,
    },
    profileNo: {
      label: "Số và ký hiệu hồ sơ",
      value: "",
    },
    organizationName: {
      label: "Tên cơ quan tổ chức ban hành văn bản",
      value: "",
    },
    seq: {
      label: "Số thứ tự văn bản trong hồ sơ ( Dùng để tìm kiếm file )",
      value: "",
    },
    folio: {
      label: "Tờ số",
      value: "",
      className: "col-span-6",
    },
    profileCode: {
      label: "Mã hồ sơ",
      value: "",
      className: "col-span-6",
    },
    numOfText: {
      label: "Số của văn bản",
      value: "",
      className: "col-span-6",
    },
    fileDate: {
      label: "Ngày tháng năm văn bản",
      value: "",
      className: "col-span-6",
    },
    numberOfPage: {
      label: "Số lượng trang của văn bản",
      value: "",
      className: "col-span-6",
    },
  });
  const [speechField, setSpeechField] = useState("");
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const location = useLocation();
  const navigate = useNavigate("");
  console.log(location);
  useEffect(() => {
    console.log(transcript);
    if (speechField) {
      const clone = structuredClone(formObj);
      clone[speechField].value = transcript;
      setFormObj(clone);
      // resetTranscript();
    }
  }, [transcript]);
  useEffect(() => {
    const newFormObj = { ...formObj };
    Object.keys(newFormObj).forEach((key) => {
      newFormObj[key].value = location.state[key];
    });
    setFormObj(newFormObj);
  }, []);
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
  const handleSaveDocument = () => {
    const payload = {};
    Object.keys(formObj).forEach((key) => {
      payload[key] = formObj[key].value;
    });
    apiService.saveDocument({ id: location.state.id, payload });
  };
  return (
    <>
      <div className="grid grid-cols-12 gap-4 p-4">
        <div className="col-span-5">
          <div className="flex">
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate("/")}
              className="mb-4 mr-2 text-white"
            >
              Trở về danh sách
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="mb-4"
              onClick={handleSaveDocument}
            >
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
                  <div className="col-span-12">
                    <div className={formObj[key].className} key={key}>
                      <Form.Group className="mb-3">
                        <Form.Label>{formObj[key].label}</Form.Label>
                        <div>
                          <Form.Control
                            type="text"
                            placeholder={"Nhập " + formObj[key].label}
                            value={formObj[key].value}
                            onChange={(e) =>
                              handleChangeInput(key, e.target.value)
                            }
                          />
                          {formObj[key].isSpeech && (
                            <Button
                              variant="primary"
                              size="sm"
                              className="mb-4 float-right"
                              onClick={() => handleSpeech(key)}
                            >
                              {speechField === key ? "Tắt" : "Đọc"}
                            </Button>
                          )}
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                );
              })}
            </div>
          </Form>
        </div>
        <div className="col-span-7">
          <PDFViewer />
        </div>
      </div>
    </>
  );
}
