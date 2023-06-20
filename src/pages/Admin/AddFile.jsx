import { Alert, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import BaseModal from "../../components/BaseModal";
import Pagination from "../../components/Pagination";
import apiService from "../../api";
import createNotification from "../../utils/notification";
import ModalAssignee from "../../components/ModalAssignee";
import ModalImport from "../../components/ModalImport";

export default function EnhancedTable() {
  const [pagination, setPagination] = useState({
    pageSize: 5,
    pageNum: 0,
    assignedStatus: "0",
  });
  const [listFile, setListFile] = useState([]);
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
  const [file, setFile] = useState(null);
  const [showModalAssign, setShowModalAssign] = useState(false);
  const [showModalAddFile, setShowModalAddFile] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [page, setPage] = useState(1);
  useEffect(() => {
    handleFetchListFile();
  }, [pagination]);
  const handleChecked = (index) => {
    const newState = [...listFile];
    newState[index].isCheck = newState[index].isCheck ? "" : "checked";
    newState.every((x) => x.isCheck) ? setCheckAll("checked") : setCheckAll("");
    setData(newState);
  };
  const handleFetchListFile = (pageNum) => {
    apiService
      .getListFile({
        pageNum: pagination.pageNum,
        pageSize: pagination.pageSize,
        assignedStatus: pagination.assignedStatus,
      })
      .then((res) => {
        const convertedList = res.data.items.files.map((file) => {
          return {
            ...file,
            isCheck: false,
          };
        });
        setTotalPages(res.data.items.totalPages);
        setTotalItems(res.data.items.totalItems);
        setPage(res.data.items.currentPage + 1);
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

  const handleConfirmAssign = async (assignee) => {
    if (
      window.confirm(`Bạn có chắc giao việc cho ${assignee.fullName} ?`) == true
    ) {
      const checkedList = listFile
        .filter((file) => file.isCheck)
        .map((file) => file.id);
      await apiService
        .assignUser({ fileId: checkedList, userId: assignee.id })
        .then((res) => {
          createNotification(
            "success",
            "Giao việc thành công cho " + assignee.fullName
          );
          handleFetchListFile();
        })
        .catch((err) => {
          console.log(err);
        });
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
  const handleChangePage = async (pageNum) => {
    setPagination({ ...pagination, pageNum });
  };
  const handleImport = () => {
    const formData = new FormData();
    formData.append("uploadFiles", file);
    apiService.importFile(formData);
  };
  return (
    <>
      <div className="p-4">
        <div className="mb-2">
          <Button
            onClick={() => {
              setShowModalAddFile(true);
            }}
          >
            Thêm File
          </Button>
          {data.some((x) => x.isCheck) && (
            <>
              <Button
                onClick={() => {
                  setShowModalAssign(true);
                }}
                className="mx-2"
              >
                Giao Việc
              </Button>
              <Button
                onClick={() => handleDeletePersonInCharge()}
                variant="danger"
              >
                Xóa người Phụ trách
              </Button>
            </>
          )}
        </div>
        <Alert key={"success"} variant="success">
          Tổng file đã giao việc : 200/600
        </Alert>
        <p>Filter theo Status</p>
        <Form.Select
          className="!w-80"
          onChange={(e) =>
            setPagination({ ...pagination, assignedStatus: e.target.value })
          }
        >
          <option value="0" defaultChecked="0">
            Tất cả
          </option>
          <option value="2">Đã Giao</option>
          <option value="1">Chưa Giao</option>
        </Form.Select>
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
        <Pagination
          onChangePage={handleChangePage}
          pagination={pagination}
          totalPages={totalPages}
          totalItems={totalItems}
          page={page}
        />
        <ModalAssignee
          show={showModalAssign}
          onHide={() => setShowModalAssign(false)}
          onConfirm={handleConfirmAssign}
        />
        <ModalImport
          show={showModalAddFile}
          onHide={() => setShowModalAssign(false)}
          onConfirm={handleImport}
        />
      </div>
    </>
  );
}
