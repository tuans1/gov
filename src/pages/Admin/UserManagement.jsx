import { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import apiService from "../../api";
import { formatDateTime } from "../../utils/dateTimeUtil";
import Pagination from "../../components/Pagination";
import createNotification from "../../utils/notification";
export default function User() {
  const [account, setAccount] = useState({
    fullName: "",
    username: "",
    password: "",
    roles: "USER",
  });
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    fetchListUser();
  }, []);
  const fetchListUser = (page = 1) => {
    apiService.getListUser({ page }).then((res) => setListUser(res.data.items));
  };
  const handleCreateUser = async () => {
    await apiService.createUser(account);
    fetchListUser();
    createNotification("success", "Tạo User thành công");
    setAccount({
      name: "",
      username: "",
      fullName: "",
      roles: "USER",
    });
  };
  const handleChangePage = (page) => {
    fetchListUser(page);
  };
  return (
    <>
      <div className="p-4">
        <div className="flex items-end mb-2">
          <div className="w-60 mr-2">
            <span className="!text-left ">Họ Và Tên</span>
            <Form.Control
              type="text"
              placeholder="Nhập tài khoản"
              value={account.fullName}
              onChange={(e) =>
                setAccount({ ...account, ["fullName"]: e.target.value })
              }
            />
          </div>
          <div className="w-60 mr-2">
            <span className="!text-left">Tài Khoản</span>
            <Form.Control
              type="text"
              placeholder="Nhập tài khoản"
              value={account.username}
              onChange={(e) =>
                setAccount({ ...account, ["username"]: e.target.value })
              }
            />
          </div>
          <div className="w-60 mr-2">
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
              disabled={Object.values(account).some((value) => !value)}
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
        <Pagination onChangePage={handleChangePage} />
      </div>
    </>
  );
}
