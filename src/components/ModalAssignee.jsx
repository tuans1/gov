import { useState } from "react";
import Button from "react-bootstrap/Button";
import BaseModal from "./BaseModal";

export default function ModalAssignee({ onHide, onConfirm, show }) {
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
    <BaseModal
      size="sm"
      title="Chọn Nhân Viên"
      show={show}
      // onHide={}
      // onConfirm={}
    >
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
    </BaseModal>
  );
}
