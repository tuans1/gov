import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import BaseModal from "../../components/BaseModal";
import Pagination from "../../components/Pagination";
import apiService from "../../api";
import createNotification from "../../utils/notification";

export default function EnhancedTable() {
  const [listFile, setListFile] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
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
    handleFetchListUser();
  }, []);
  const handleChecked = (index) => {
    const newState = [...listFile];
    newState[index].isCheck = newState[index].isCheck ? "" : "checked";
    newState.every((x) => x.isCheck) ? setCheckAll("checked") : setCheckAll("");
    setData(newState);
  };
  const handleFetchListUser = () => {
    apiService.getListFile().then((res) => {
      const convertedList = res.data.items.files.map((file) => {
        return {
          ...file,
          isCheck: false,
        };
      });
      setListFile(convertedList);
      setCheckAll("");
    });
  };
  const handleCheckedAll = () => {
    const newState = [...listFile];
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

  const handleConfirm = async (name) => {
    if (window.confirm(`Bạn có chắc giao việc cho ${name} ?`) == true) {
      const checkedList = listFile
        .filter((file) => file.isCheck)
        .map((file) => file.id);
      const userId = localStorage.getItem("userId");
      await apiService
        .assignUser({ fileId: checkedList, userId })
        .then((res) => {
          alert("Giao viec thanh cong");
        });
      handleFetchListUser();
    } else {
      console.log("Hủy");
    }
  };
  const handleDeletePersonInCharge = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người phụ trách?") == true) {
      createNotification("success", "Xóa người đảm nhiệm thành công");
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
            setFile(e.target.files[0]);
            console.log(e);
          }}
          accept=".zip,.rar"
        />
      </div>
    </>
  );
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
            <th>Bộ Phận</th>
            <th>Ngày Thêm</th>
          </tr>
        </thead>
        <tbody>
          {listFile.map((x, index) => {
            return (
              <tr key={x.id}>
                <td>
                  <Form.Check
                    type="checkbox"
                    onChange={() => handleChecked(index)}
                    checked={x.isCheck}
                  />
                </td>
                <td>{index + 1}</td>
                <td>{x.userName}</td>
                <td>{x.fileName}</td>
                <td>{x.departmentName}</td>
                <td>{x.createTime}</td>
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
