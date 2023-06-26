import { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import apiService from "../../api";
import { formatDateTime } from "../../utils/dateTimeUtil";
import Pagination from "../../components/Pagination";
import createNotification from "../../utils/notification";
import { RingSpinnerOverlay } from "react-spinner-overlay";
export default function User() {
  const [account, setAccount] = useState({
    fullName: "",
    username: "",
    password: "",
    roles: "USER",
  });
  const [loading, setLoading] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [listDepartment, setListDepartment] = useState([]);
  const [department, setDepartment] = useState("");
  useEffect(() => {
    fetchListUser();
    fetchDepartment();
  }, []);
  const fetchListUser = (page = 1) => {
    setLoading(true);
    apiService.getListUser({ page }).then((res) => {
      setListUser(res.data.items);
      setLoading(false);
    });
  };
  const fetchDepartment = () => {
    apiService
      .getListDepartment()
      .then((res) => setListDepartment(res.data.items));
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
  const handleCreateDepartment = () => {
    apiService
      .createDepartment({ text: department })
      .then(() => console.log("DONE"));
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
          <div className="mr-2">
            <span className="!text-left">Vai Trò</span>
            <Form.Select
              className="!w-28"
              onChange={(e) =>
                setAccount({ ...account, ["role"]: e.target.value })
              }
            >
              <option value="USER">User</option>
              <option value="CHECKER">Checker</option>
            </Form.Select>
          </div>
          <Button
            onClick={handleCreateUser}
            disabled={Object.values(account).some((value) => !value)}
          >
            Tạo Nhân viên
          </Button>
        </div>
        <div className="h-[450px] overflow-auto ">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Tên Nhân viên</th>
                <th>Tài Khoản</th>
                <th>Mật Khẩu</th>
                <th>Vai Trò</th>
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
                    <td>{index % 2 == 0 ? "User" : "Checker"}</td>
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
        </div>
        <div className="border border-gray-500 absolute w-full left-0"></div>
        <div className="pt-4">
          <div className="flex items-end mb-2">
            <div className="w-60 mr-2">
              <span className="!text-left ">Bộ Phận</span>
              <Form.Control
                type="text"
                placeholder="Nhập bộ phận"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
            <div>
              <Button onClick={handleCreateDepartment} disabled={!department}>
                Tạo Bộ Phận
              </Button>
            </div>
          </div>
          <div className="overflow-y-auto h-[219px]">
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Bộ Phận</th>
                </tr>
              </thead>
              <tbody>
                {listDepartment.map((department, index) => {
                  return (
                    <tr key={department.id}>
                      <td>{index + 1}</td>
                      <td>{department.departmentName}</td>
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
          </div>
        </div>
      </div>
      <RingSpinnerOverlay loading={loading} size={40} />
    </>
  );
}
