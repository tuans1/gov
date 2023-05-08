import { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import apiService from "../../api";
import { formatDateTime } from "../../utils/dateTimeUtil";
export default function User() {
  const [account, setAccount] = useState({
    name: "",
    password: "",
  });
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    apiService.getListUser().then((res) => setListUser(res.data.items));
  }, []);
  const handleCreateUser = () => {
    apiService.createUser(account);
    setAccount({
      name: "",
      password: "",
    });
  };
  return (
    <>
      <p>Trang này hiển thị Các User ADMIN có thể tạo User và set TK + MK</p>
      <div className="flex items-end">
        <div className="w-80">
          <span className="!text-left">Tài Khoản</span>
          <Form.Control
            type="text"
            placeholder="Nhập tài khoản"
            value={account.name}
            onChange={(e) =>
              setAccount({ ...account, ["name"]: e.target.value })
            }
          />
        </div>
        <div className="w-80">
          <span className="!text-left">Mật Khẩu</span>
          <Form.Control
            type="text"
            placeholder="Nhập mật khẩu"
            value={account.password}
            onChange={(e) =>
              setAccount({ ...account, ["password"]: e.target.value })
            }
          />
        </div>
        <div>
          <Button
            onClick={handleCreateUser}
            disabled={!account.name || !account.password}
          >
            Tạo Nhân viên
          </Button>
        </div>
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Tên Nhân viên</th>
            <th>Tài Khoản</th>
            <th>Mật Khẩu</th>
            <th>Ngày Tạo</th>
          </tr>
        </thead>
        <tbody>
          {listUser.map((user, index) => {
            return (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.fullName}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{formatDateTime(user.createTime)}</td>
                <td>
                  <Button variant="danger" size="sm">
                    Xóa
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
