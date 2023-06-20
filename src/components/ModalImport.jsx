import { useState } from "react";
import BaseModal from "./BaseModal";
import { Form } from "react-router-dom";
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
      <p className="!text-left">Bộ Phận</p>
      <Form.Control type="text" placeholder="Nhập Bộ Phận" />
      <div className="border border-red-300">
        <label for="myfile">Select a file:</label>
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
