import { useEffect, useState } from "react";
import BaseModal from "./BaseModal";
import apiService from "../api";

export default function ModalAssignee({ onHide, onConfirm, show }) {
  const [assigner, setAssigner] = useState({});
  const [listUser, setListUser] = useState([
    { fullName: "tuan", id: 1 },
    { fullName: "xxx", id: 2 },
    { fullName: "john", id: 3 },
  ]);
  useEffect(() => {
    apiService.getListUser().then((res) => {
      setListUser(res.data.items);
    });
  }, []);
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
      disabled={assigner.id ? false : true}
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
