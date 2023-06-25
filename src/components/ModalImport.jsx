import { useState } from "react";
import BaseModal from "./BaseModal";
import Form from "react-bootstrap/Form";
export default function ModalImport({ onHide, onConfirm, show }) {
  const [file, setFile] = useState();
  const handleConfirm = () => {
    onConfirm(file);
  };
  return (
    <BaseModal
      size="sm"
      title="Chọn File"
      show={show}
      onHide={onHide}
      onConfirm={handleConfirm}
    >
      <Form.Select className="!w-80">
        <option value="2">Văn Phòng</option>
        <option value="3">Công Chứng</option>
        <option value="1">Chủ Tịch</option>
      </Form.Select>
      <Form.Control type="text" placeholder="Nhập Bộ Phận" />
      <div className="border border-red-300">
        <label htmlFor="myfile">Select a file:</label>
        <input
          type="file"
          id="myfile"
          name="myfile"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          accept=".zip,.rar"
        />
      </div>
    </BaseModal>
  );
}
