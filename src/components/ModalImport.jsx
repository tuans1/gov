import { useRef, useState, useEffect } from "react";
import BaseModal from "./BaseModal";
import Form from "react-bootstrap/Form";
import { ReactComponent as UploadIcon } from "../assets/icons/upload_icon.svg";
import { ReactComponent as DeleteFileIcon } from "../assets/icons/delete_file_icon.svg";
import { Button } from "react-bootstrap";
import createNotification from "../utils/notification";

export default function ModalImport({ onHide, onConfirm, show, department }) {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const inputFileRef = useRef(null);
  useEffect(() => {
    if (!show) {
      setFile(null);
      setFileName(null);
    }
  }, [show]);
  const handleConfirm = () => {
    onConfirm({ file, departmentId });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.dataTransfer || e.target;
    if (!files[0].name.includes("zip")) {
      createNotification("warning", "Vui lòng chọn file Zip");
      return;
    }
    setFile(files[0]);
    setFileName(files[0].name);
  };
  const handleGetUploadFile = (e) => {
    handleDrop(e);
  };
  const handleChooseFile = () => {
    inputFileRef.current.click();
  };
  console.log(department);
  return (
    <BaseModal
      size="sm"
      title="Chọn File"
      show={show}
      onHide={onHide}
      onConfirm={handleConfirm}
      disabled={!fileName}
    >
      <div className="text-left mb-4" draggable>
        <span>Bộ Phận</span>
        <Form.Select onChange={(e) => setDepartmentId(e.target.value)}>
          <option value="" defaultChecked="">
            Tất cả
          </option>
          {department &&
            department.map((dep) => {
              return (
                <option value={dep.id} key={dep.id}>
                  {dep.departmentName}
                </option>
              );
            })}
        </Form.Select>
      </div>
      <div
        className="border border-red-300 min-h-[200px] pt-10"
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e)}
      >
        <b>Chọn hoặc kéo File vào để tải</b>
        <Button onClick={handleChooseFile} className="my-4">
          <div className="w-[100px] flex justify-between">
            <UploadIcon className="w-6 h-6 " fill="white" />
            <span>Chọn file</span>
          </div>
        </Button>
        {fileName && (
          <>
            <p>{fileName}</p>
            <DeleteFileIcon
              className="ml-0.5 cursor-pointer w-6 h-6 m-auto"
              onClick={() => {
                setFile("");
                setFileName("");
              }}
              fill="red"
            />
          </>
        )}
        <input
          ref={inputFileRef}
          type="file"
          className="invisible absolute"
          onChange={(e) => {
            handleGetUploadFile(e);
          }}
        />
      </div>
    </BaseModal>
  );
}
