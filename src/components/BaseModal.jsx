import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
export default function BaseModal({
  children,
  size,
  title,
  show,
  onHide,
  onConfirm,
}) {
  return (
    <Modal onHide={onHide} show={show} size={size} centered>
      <Modal.Header closeButton>
        <Modal.Title className="!text-xl">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">{children}</Modal.Body>
      <Modal.Footer>
        <Button onClick={onConfirm}>Đồng ý</Button>
      </Modal.Footer>
    </Modal>
  );
}
