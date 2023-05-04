import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import ModalComp from "../../components/BaseModal";
import Pagination from "../../components/Pagination";
export default function EnhancedTable() {
  const [listIdChecked, setListIdChecked] = useState([]);
  const [checkAll, setCheckAll] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([
    {
      id: "512asfdasw512616",
      user: "",
      tenFile: "00.0092.HS.49.2019.pdf",
      ngayThem: "15/10/2018",
      boPhan: "Văn Thư",
      isCheck: "",
    },
    {
      id: "3215asd6236asd",
      user: "natuan3",
      tenFile: "00.0093.HS.49.2019.pdf",
      ngayThem: "15/10/2018",
      boPhan: "Văn Thư",
      isCheck: "",
    },
    {
      id: "65123adasdsad",
      user: "",
      tenFile: "00.0093.HS.22.2019.pdf",
      ngayThem: "15/10/2018",
      boPhan: "Công Chứng",
      isCheck: "",
    },
  ]);
  const [listUser, setListUser] = useState([
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
  ]);
  const [assigner, setAssigner] = useState({ id: "", ten: "" });
  const [viewModal, setViewModal] = useState(null);
  useEffect(() => {
    setModalShow(viewModal ? true : false);
  }, [viewModal]);
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

  const ModalAssignJob = () => {
    return (
      <>
        <p className="!text-left">Bộ Phận</p>
        <Form.Control type="text" placeholder="Nhập Bộ Phận" />
      </>
    );
  };

  useEffect(() => {
    if (viewModal) {
      setViewModal(ModalAssignJob);
    }
  }, [assigner]);

  const ModalAddFile = (
    <>
      <p className="!text-left">Bộ Phận</p>
      <Form.Control type="text" placeholder="Nhập Bộ Phận" />
    </>
  );
  const handleConfirm = (name) => {
    if (window.confirm(`Bạn có chắc giao việc cho ${name} ?`) == true) {
      console.log("Xóa ");
    } else {
      console.log("Hủy");
    }
  };
  const handleDeletePersonInCharge = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người phụ trách?") == true) {
      console.log("Xóa ");
    } else {
      console.log("Hủy");
    }
  };
  const handleDeleteFile = (file) => {
    if (
      window.confirm(`Bạn có chắc chắn muốn xóa File ${file.tenFile} ?`) == true
    ) {
      console.log("Xóa ");
    } else {
      console.log("Hủy");
    }
  };
  return (
    <>
      <Button onClick={() => setViewModal(ModalAddFile)}>Thêm File</Button>
      {data.some((x) => x.isCheck) && (
        <>
          <Button onClick={() => setViewModal(ModalAssignJob)}>
            Giao Việc
          </Button>
          <Button onClick={() => handleDeletePersonInCharge()} variant="danger">
            Xóa người Phụ trách
          </Button>
        </>
      )}
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
            <th>Người Phụ Trách</th>
            <th>Tên File</th>
            <th>Ngày Thêm</th>
            <th>Bộ Phận</th>
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
                <td>{x.user}</td>
                <td>{x.tenFile}</td>
                <td>{x.ngayThem}</td>
                <td>{x.boPhan}</td>
                <td>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDeleteFile(x)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Pagination />
      <ModalComp
        show={modalShow}
        size="sm"
        onHide={() => setModalShow(!modalShow)}
        title={data.some((x) => x.isCheck) ? "Chọn Nhân viên" : "Nhập File"}
        onConfirm={() => handleConfirm(assigner.ten)}
      >
        {viewModal}
      </ModalComp>
      NOTE **** : Cột <span className="text-red-400 text-lg">Bộ Phận</span> khi
      ADMIN import sẽ điền vào và import 1 loạt file PDF, để sau này xuất ra sẽ
      biết File này ở BP nào
    </>
  );
}
