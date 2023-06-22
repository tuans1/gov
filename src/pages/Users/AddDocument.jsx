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
import { RingSpinnerOverlay } from "react-spinner-overlay";
export default function AddDocument({
  fileDetail,
  indexFileProps,
  listFileProps,
}) {
  const [formObj, setFormObj] = useState({
    subject: {
      label: "Tiêu đề VB",
      value: "",
      isSpeech: true,
      rules: "required",
      type: "textarea",
    },
    profileNo: {
      label: "Số và ký hiệu hồ sơ",
      value: "",
      className: "col-span-6",
    },
    organizationName: {
      label: "Tên cơ quan tổ chức ban hành VB",
      value: "",
      className: "col-span-6",
    },
    seq: {
      label: "STT VB trong hồ sơ",
      value: "",
      className: "col-span-6",
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
      label: "Số của VB ( Dùng để tìm kiếm file )",
      value: "",
      className: "col-span-6",
    },
    fileDate: {
      label: "Ngày tháng năm VB",
      value: "",
      className: "col-span-6",
    },
    numberOfPage: {
      label: "Số lượng trang của VB",
      value: "",
      className: "col-span-6",
    },
  });
  const [speechField, setSpeechField] = useState("");
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [currentIndex, setCurrentIndex] = useState("");
  const [listFile, setListFile] = useState([]);
  const [dirtyForm, setDirtyForm] = useState(false);
  const [loading, setLoading] = useState(false);
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
    console.log(fileDetail);
    const formDetail = fileDetail.id ? fileDetail : location.state.data;
    Object.keys(newFormObj).forEach((key) => {
      newFormObj[key].value = formDetail[key] || "";
    });
    setListFile(listFileProps || location.state.listFile);
    setFormObj(newFormObj);
    setCurrentIndex(indexFileProps || location.state.index);
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
    setLoading(true);
    const payload = {};
    Object.keys(formObj).forEach((key) => {
      payload[key] = formObj[key].value;
    });
    apiService
      .saveDocument({ id: listFile[currentIndex].id, payload })
      .then((res) => {
        createNotification("success", "Lưu File thành công");
        setDirtyForm(false);
        setLoading(false);
      });
  };
  const handleNextFile = () => {
    if (currentIndex + 1 === listFile.length) {
      createNotification(
        "warning",
        "Đã đến file cuối cùng, vui lòng trở về danh sách để tiếp tục."
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
          <Form>
            <div className="grid grid-cols-12 gap-4">
              {Object.keys(formObj).map((key) => {
                return (
                  <div
                    className={formObj[key].className || "col-span-12"}
                    key={key}
                  >
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
                          as={
                            formObj[key]?.type?.includes("textarea")
                              ? "textarea"
                              : "input"
                          }
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
                );
              })}
            </div>
          </Form>
        </div>
        <div className="col-span-7">
          <PDFViewer fileUrl={listFile[currentIndex]?.fileUrl} />
        </div>
      </div>
      <RingSpinnerOverlay loading={loading} size={40} />
    </>
  );
}
AddDocument.defaultProps = {
  fileDetail: {},
};
