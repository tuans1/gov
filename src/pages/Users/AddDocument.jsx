import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import PDFViewer from "../../components/PDFViewer";
import { Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import apiService from "../../api";
import createNotification from "../../utils/notification";
export default function AddDocument({ fileDetail }) {
  const [formObj, setFormObj] = useState({
    subject: {
      label: "Tiêu đề văn bản",
      value: "",
      isSpeech: true,
      rules: "required",
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
  const [currentIndex, setCurrentIndex] = useState("");
  const [dirtyForm, setDirtyForm] = useState(false);
  const location = useLocation();
  const navigate = useNavigate("");
  useEffect(() => {
    if (speechField) {
      const clone = structuredClone(formObj);
      clone[speechField].value = transcript;
      setFormObj(clone);
      // resetTranscript();
    }
  }, [transcript]);
  useEffect(() => {
    const newFormObj = { ...formObj };
    const formDetail = fileDetail.id ? fileDetail : location.state.data;
    Object.keys(newFormObj).forEach((key) => {
      newFormObj[key].value = formDetail[key] || "";
    });
    setFormObj(newFormObj);
    setCurrentIndex(location.state.index);
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
    setDirtyForm(true);
  };
  const handleSaveDocument = () => {
    if (!formObj.subject.value) {
      createNotification("warning", "Tiêu đề không được bỏ trống");
      return;
    }
    const payload = {};
    Object.keys(formObj).forEach((key) => {
      payload[key] = formObj[key].value;
    });
    apiService
      .saveDocument({ id: location.state.listFile[currentIndex].id, payload })
      .then((res) => {
        createNotification("success", "Lưu File thành công");
        setDirtyForm(false);
      });
  };
  const handleNextFile = () => {
    const { listFile } = location.state;
    if (currentIndex + 1 === listFile.length) {
      createNotification(
        "warning",
        "Đã đến file cuối cùng, vui lòng trở về danh sách"
      );
      return;
    }
    const newFormObj = { ...formObj };
    const formDetail = listFile[currentIndex + 1];
    Object.keys(newFormObj).forEach((key) => {
      newFormObj[key].value = formDetail[key] || "";
    });
    setFormObj(newFormObj);
    setCurrentIndex(currentIndex + 1);
  };
  const handleRedirectBackToList = () => {
    if (dirtyForm) {
      let text =
        "Bạn có chắc chắn trở về?\nTất cả thay đổi không được Lưu sẽ mất.";
      if (window.confirm(text) == true) {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  };
  return (
    <>
      <div className="grid grid-cols-12 gap-4 p-4">
        <div className="col-span-5">
          <div className="flex">
            {!fileDetail.id && (
              <Button
                variant="primary"
                size="sm"
                onClick={handleRedirectBackToList}
                className="mb-4 mr-2 text-white"
              >
                Trở về danh sách
              </Button>
            )}
            <Button
              variant="success"
              size="sm"
              className="mb-4"
              onClick={handleSaveDocument}
            >
              Lưu File
            </Button>
            <Button
              variant="warning"
              size="sm"
              className="mb-4 ml-auto"
              onClick={handleNextFile}
            >
              File tiếp theo
            </Button>
          </div>
          <p>{transcript}</p>
          <Form>
            <div className="grid grid-cols-12 gap-4">
              {Object.keys(formObj).map((key) => {
                return (
                  <div className="col-span-12">
                    <div className={formObj[key].className} key={key}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          {formObj[key].label} {""}
                          {formObj[key].rules?.includes("required") && (
                            <span class="text-red-500">*</span>
                          )}
                        </Form.Label>
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
          <PDFViewer fileUrl={location.state.listFile[currentIndex]?.fileUrl} />
        </div>
      </div>
    </>
  );
}
AddDocument.defaultProps = {
  fileDetail: {},
};
