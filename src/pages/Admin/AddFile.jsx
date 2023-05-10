import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import BaseModal from "../../components/BaseModal";
import Pagination from "../../components/Pagination";
import apiService from "../../api";

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
  const [assigner, setAssigner] = useState({});
  const [viewModal, setViewModal] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [listUser, setListUser] = useState([]);
  const [file, setFile] = useState(null);
  useEffect(() => {
    setModalShow(viewModal ? true : false);
  }, [viewModal]);
  useEffect(() => {
    if (viewModal) {
      setViewModal(ModalAssignJob);
    }
  }, [assigner]);
  useEffect(() => {
    apiService.getListUser().then((res) => {
      setListUser(res.data.items);
    });
  }, []);
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
        {listUser.map((user) => {
          return (
            <div
              onClick={() => setAssigner(user)}
              key={user.id}
              className={
                "hover:bg-slate-200 py-2 cursor-pointer " +
                (assigner.id === user.id && "  bg-slate-200")
              }
            >
              {user.fullName}
            </div>
          );
        })}
      </>
    );
  };

  const ModalAddFile = (
    <>
      <p className="!text-left">Bộ Phận</p>
      <Form.Control type="text" placeholder="Nhập Bộ Phận" />
      <div className="border border-red-300">
        <label for="myfile">Select a file:</label>
        <input
          type="file"
          id="myfile"
          name="myfile"
          onChange={(e) => {
            setFile(e.target.files[0])
            console.log(e)
          }}
          accept=".zip,.rar"
        />
      </div>
    </>
  );
  const handleConfirm = (name) => {
    console.log(file)
    // if (window.confirm(`Bạn có chắc giao việc cho ${name} ?`) == true) {
    //   console.log("Xóa ");
    // } else {
    //   console.log("Hủy");
    // }
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
  const handleChangePage = (page) => {
    console.log(page);
  };
  return (
    <>
      <Button
        onClick={() => {
          setViewModal(ModalAddFile);
          setModalTitle("Thêm File");
        }}
      >
        Thêm File
      </Button>
      {data.some((x) => x.isCheck) && (
        <>
          <Button
            onClick={() => {
              setViewModal(ModalAssignJob);
              setModalTitle("Giao Việc");
            }}
          >
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
      <Pagination onChangePage={handleChangePage} />
      <BaseModal
        show={modalShow}
        size="sm"
        onHide={() => setModalShow(!modalShow)}
        title={modalTitle}
        onConfirm={() => handleConfirm(assigner.fullName)}
      >
        {viewModal}
      </BaseModal>
      NOTE **** : Cột <span className="text-red-400 text-lg">Bộ Phận</span> khi
      ADMIN import sẽ điền vào và import 1 loạt file PDF, để sau này xuất ra sẽ
      biết File này ở BP nào
    </>
  );
}
