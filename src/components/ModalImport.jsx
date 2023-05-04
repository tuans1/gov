import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import BaseModal from "./BaseModal";
export default function ModalImport() {
  return (
    <BaseModal
      show={modalShow}
      size="sm"
      onHide={() => setModalShow(!modalShow)}
      title="Chọn Nhân viên"
      onConfirm={() => handleConfirm(assigner.ten)}
    >
      <p className="!text-left">Bộ Phận</p>
      <Form.Control type="text" placeholder="Nhập Bộ Phận" />
    </BaseModal>
  );
}
