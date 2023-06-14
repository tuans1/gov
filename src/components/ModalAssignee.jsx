import { useState } from "react";
import Button from "react-bootstrap/Button";
import BaseModal from "./BaseModal";

export default function ModalAssignee({ onHide, onConfirm, show, listUser }) {
  const [assigner, setAssigner] = useState({});

  const handleConfirm = () => {
    onConfirm(assigner);
  };
  return (
    <BaseModal
      size="sm"
      title="Chọn Nhân Viên"
      show={show}
      onHide={onHide}
      onConfirm={handleConfirm}
    >
      {listUser.map((user) => {
        return (
          <div
            key={user.id}
            className={
              "hover:bg-slate-200 py-2 cursor-pointer " +
              (assigner.id === user.id && "  bg-slate-200")
            }
            onClick={() => setAssigner(user)}
          >
            {user.fullName}
          </div>
        );
      })}
    </BaseModal>
  );
}
