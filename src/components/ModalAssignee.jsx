import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
export default function ModalAssignee({
  size,
  title,
  show,
  onHide,
  onConfirm,
}) {
  const LIST_USER = [
    {
      id: "natuan3",
      ten: "Nguyễn A Tuấn",
    },
    {
      id: "hvkhanh1",
      ten: "Hoàng văn Khánh",
    },
    {
      id: "hslam4",
      ten: "Hảo Sơn Lâm",
    },
  ];
  return (
    <Modal onHide={onHide} show={show} size={size} centered>
      <Modal.Header closeButton>
        <Modal.Title className="!text-xl">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        {LIST_USER.map((user) => {
          return (
            <div
              onClick={() => setAssigner(user)}
              key={user.id}
              className={
                "hover:bg-slate-200 py-2 cursor-pointer " +
                (assigner.id === user.id && "  bg-slate-200")
              }
            >
              {user.ten}
            </div>
          );
        })}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onConfirm}>Đồng ý</Button>
      </Modal.Footer>
    </Modal>
  );
}
