import { useEffect, useState } from "react";
import BaseModal from "./BaseModal";
import apiService from "../api";
import { Form } from "react-bootstrap";

export default function ModalAssignee({ onHide, onConfirm, show }) {
  const [assigner, setAssigner] = useState({});
  const [checker, setChecker] = useState({});
  const [listUser, setListUser] = useState([
    { fullName: "tuan", id: 1 },
    { fullName: "xxx", id: 2 },
    { fullName: "john", id: 3 },
  ]);
  const [listChecker, setListChecker] = useState([]);
  useEffect(() => {
    apiService.getListUser().then((res) => {
      const users = [];
      const checkers = [];
      res.data.items.forEach((user) => {
        if (user.roles === "CHECKER") {
          checkers.push(user);
        }
        if (user.roles === "USER") {
          users.push(user);
        }
      });
      setListChecker(checkers);
      setListUser(users);
    });
  }, []);
  useEffect(() => {
    if (!show) {
      setAssigner({});
    }
  }, [show]);
  const handleSelectUser = (e) => {
    const user = listUser.find((us) => us.id.toString() === e.target.value);
    setAssigner(user);
  };
  const handleSelectChecker = (e) => {
    const checker = listChecker.find(
      (us) => us.id.toString() === e.target.value
    );
    setChecker(checker);
  };
  const handleConfirm = () => {
    onConfirm({ assigner, checker });
  };

  return (
    <BaseModal
      size="sm"
      title="Chọn Người đảm nhiệm"
      show={show}
      onHide={onHide}
      onConfirm={handleConfirm}
      disabled={assigner.id && checker.id ? false : true}
    >
      <div className="text-left mb-2">
        <span>User</span>
        <Form.Select onChange={handleSelectUser}>
          <option selected={true} disabled>
            <b>Chọn User</b>
          </option>
          {listUser.map((user) => {
            return <option value={user.id} key={user.id}>{user.fullName}</option>;
          })}
        </Form.Select>
      </div>
      <div className="text-left">
        <span>Checker</span>
        <Form.Select onChange={handleSelectChecker}>
          <option selected={true} disabled>
            <b>Chọn người Check</b>
          </option>
          {listChecker.map((checker) => {
            return <option value={checker.id} key={checker.id}>{checker.fullName}</option>;
          })}
        </Form.Select>
      </div>
    </BaseModal>
  );
}
