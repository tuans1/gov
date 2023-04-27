import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import ModalComp from "../../components/Modal";
export default function EnhancedTable() {
  const [listIdChecked, setListIdChecked] = useState([]);
  const [checkAll, setCheckAll] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([
    {
      id: "512asfdasw512616",
      tenFile: "00.0092.HS.49.2019.pdf",
      tieuDe: "Sổ hộ khẩu gia đình Hoàng Văn ( Giấy kết hôn )",
      ngayThem: "15/10/2018",
      isCheck: "",
    },
    {
      id: "3215asd6236asd",
      tenFile: "00.0093.HS.49.2019.pdf",
      tieuDe: "Sổ hộ khẩu gia đình Hoàng Văn ( Giấy kết hôn )",
      ngayThem: "15/10/2018",
      isCheck: "",
    },
  ]);
  const [listUser, setListUser] = useState([
    {
      id: "latuan3",
      ten: "latuan3",
    },
    {
      id: "maomaomao",
      ten: "Mao Mao Mao",
    },
    {
      id: "chumotmi",
      ten: "Chu Một Mi",
    },
  ]);
  const [viewModal, setViewModal] = useState(null);
  const handleChecked = (index) => {
    const newState = [...data];
    newState[index].isCheck = newState[index].isCheck ? "" : "checked";
    newState.every((x) => x.isCheck) ? setCheckAll("checked") : setCheckAll("");
    setData(newState);
  };
  const handleCheckedAll = () => {
    const newState = [...data];
    newState.forEach((x) => {
      if (checkAll) {
        x.isCheck = "";
        setCheckAll("");
      } else {
        x.isCheck = "checked";
        setCheckAll("checked");
      }
    });
    setData(newState);
  };
  const ModalGiaoViec = listUser.map((user) => {
    return <div>{user.ten}</div>;
  });

  const ModalThemFile = (
    <>
      <Button variant="primary" size="sm" className="mb-4 mr-2 text-white">
        Trở về danh sách
      </Button>
      <Button variant="primary" size="sm" className="mb-4">
        Lưu File
      </Button>
      <Button variant="success" size="sm" className="mb-4 ml-auto">
        File tiếp theo
      </Button>
    </>
  );
  useEffect(() => {
    setModalShow(viewModal ? true : false);
  }, [viewModal]);
  return (
    <>
      <Button onClick={() => setViewModal(ModalThemFile)}>Thêm File</Button>
      <Button onClick={() => setViewModal(ModalGiaoViec)}>Giao Việc</Button>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>
              <Form.Check
                type="checkbox"
                checked={checkAll}
                onChange={() => handleCheckedAll()}
              />
            </th>
            <th>#</th>
            <th>Tên File</th>
            <th>Tiêu Đề </th>
            <th>Ngày Thêm</th>
          </tr>
        </thead>
        <tbody>
          {data.map((x, index) => {
            return (
              <tr key={x.id}>
                <td>
                  <Form.Check
                    type="checkbox"
                    onChange={() => handleChecked(index)}
                    checked={x.isCheck}
                  />
                </td>
                <td>
                  {index + 1} {x.isCheck}
                </td>
                <td>{x.tenFile}</td>
                <td>{x.tieuDe}</td>
                <td>{x.ngayThem}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <ModalComp
        show={modalShow}
        size="sm"
        onHide={() => setModalShow(!modalShow)}
        title="Chọn Nhân viên"
      >
        {viewModal}
      </ModalComp>
    </>
  );
}
