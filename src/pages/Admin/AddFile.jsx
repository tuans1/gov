import { Alert, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import Pagination from "../../components/Pagination";
import apiService from "../../api";
import createNotification from "../../utils/notification";
import ModalAssignee from "../../components/ModalAssignee";
import ModalImport from "../../components/ModalImport";
import { RingSpinnerOverlay } from "react-spinner-overlay";
import BaseTable from "../../components/BaseTable";

const headCells = [
  {
    label: "STT",
  },
  {
    label: "Người Phụ Trách",
    key: "userName",
  },
  {
    label: "Người Check",
    key: "checker",
  },
  {
    label: "Tên File",
    key: "fileName",
  },
  {
    label: "Bộ Phận",
    key: "departmentName",
  },
  {
    label: "Ngày Thêm",
    key: "createTime",
  },
];
export default function EnhancedTable() {
  const [searchParams, setSearchParams] = useState({
    pageSize: 5,
    pageNum: 0,
    assigned: "0",
    departmentId: "",
  });
  const [listFile, setListFile] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModalAssign, setShowModalAssign] = useState(false);
  const [showModalAddFile, setShowModalAddFile] = useState(false);
  const [pagination, setPagination] = useState({});
  const [department, setDepartment] = useState([]);
  useEffect(() => {
    apiService.getListDepartment().then((res) => {
      setDepartment(res.data.items);
    });
  }, []);

  useEffect(() => {
    handleFetchListFile();
  }, [searchParams]);
  const handleChecked = (index) => {
    const newState = [...listFile];
    newState[index].isCheck = newState[index].isCheck ? false : true;
    newState.every((x) => x.isCheck) ? setCheckAll(true) : setCheckAll(false);
    setListFile(newState);
  };
  const handleFetchListFile = (pageNum) => {
    setLoading(true);
    apiService
      .getListFile({
        pageNum: searchParams.pageNum,
        pageSize: searchParams.pageSize,
        assigned: searchParams.assigned,
        departmentId: searchParams.departmentId,
      })
      .then((res) => {
        const convertedList = res.data.items.files.map((file) => {
          return {
            ...file,
            isCheck: false,
          };
        });
        setPagination({
          totalPages: res.data.items.totalPages,
          totalItems: res.data.items.totalItems,
          page: res.data.items.currentPage + 1,
        });
        setListFile(convertedList);
        setCheckAll("");
        setLoading(false);
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
    setListFile(newState);
  };
  const checkedList = listFile
    .filter((file) => file.isCheck)
    .map((file) => file.id);
  const handleConfirmAssign = async (assignee) => {
    if (
      window.confirm(
        `Bạn có chắc giao việc cho ${assignee.assigner.fullName} và ${assignee.checker.fullName} ?`
      ) == true
    ) {
      setShowModalAssign(false);
      setLoading(true);
      await apiService
        .assignUser({
          fileId: checkedList,
          userId: assignee.assigner.id,
          checkerId: assignee.checker.id,
        })
        .then((res) => {
          createNotification(
            "success",
            `Giao việc thành công cho ${assignee.assigner.fullName} và ${assignee.checker.fullName}`
          );
          handleFetchListFile();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleDeleteAssignee = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người phụ trách?") == true) {
      setLoading(true);
      apiService.deleteAssignee({ fileId: checkedList }).then(() => {
        createNotification("success", "Xóa người phụ trách thành công");
        handleFetchListFile();
      });
    }
  };
  const handleDeleteFile = () => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa File đã chọn?`) == true) {
      setLoading(true);
      apiService
        .deleteFile({ fileId: checkedList })
        .then(() => {
          createNotification("success", "Xóa File thành công");
          handleFetchListFile();
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };
  const handleChangePage = async (pageNum) => {
    setSearchParams({ ...searchParams, pageNum });
  };
  const handleImport = ({ file, departmentId }) => {
    const formData = new FormData();
    formData.append("uploadFiles", file);
    formData.append("departmentId", departmentId);
    apiService.importFile(formData);
  };
  const handleSelectDropdown = (key, value) => {
    console.log(key, value);
    setPagination({ ...pagination, page: 1 });
    setSearchParams({ ...searchParams, pageNum: 0, [key]: value });
  };
  return (
    <>
      <div className="p-4">
        <div className="mb-2 flex">
          <Button
            onClick={() => {
              setShowModalAddFile(true);
            }}
          >
            Thêm File
          </Button>
          {listFile.some((x) => x.isCheck) && (
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
                onClick={() => handleDeleteAssignee()}
                className="ml-auto mr-2"
                variant="danger"
              >
                Xóa người Phụ trách
              </Button>
              <Button onClick={handleDeleteFile} variant="danger">
                Xóa File
              </Button>
            </>
          )}
        </div>
        <Alert key={"success"} variant="success">
          Tổng file đã giao : 200/600
        </Alert>
        <div className="flex">
          <div>
            <span className="!text-left">Trạng thái File</span>
            <Form.Select
              className="!w-80"
              onChange={(e) => handleSelectDropdown("assigned", e.target.value)}
            >
              <option value="0" defaultChecked="0">
                Tất cả
              </option>
              <option value="2">Đã Giao</option>
              <option value="1">Chưa Giao</option>
            </Form.Select>
          </div>
          <div className="ml-2">
            <span className="!text-left">Bộ Phận</span>
            <Form.Select
              className="!w-80"
              onChange={(e) =>
                handleSelectDropdown("departmentId", e.target.value)
              }
            >
              <option value="" defaultChecked="">
                Tất cả
              </option>
              {department.map((dep) => {
                return (
                  <option value={dep.id} key={dep.id}>
                    {dep.departmentName}
                  </option>
                );
              })}
            </Form.Select>
          </div>
        </div>
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
              <th>Người Check</th>
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
                  <td>{x.checkerName}</td>
                  <td>{x.fileName}</td>
                  <td>{x.departmentName}</td>
                  <td>{x.createTime}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Pagination onChangePage={handleChangePage} pagination={pagination} />
        {/* <BaseTable
          data={listFile}
          header={headCells}
          onCheckAll={handleCheckedAll}
          onChecked={handleChecked}
          showCheckbox={true}
        /> */}
      </div>
      <ModalAssignee
        show={showModalAssign}
        onHide={() => setShowModalAssign(false)}
        onConfirm={handleConfirmAssign}
      />
      <ModalImport
        show={showModalAddFile}
        onHide={() => setShowModalAddFile(false)}
        onConfirm={handleImport}
        department={department}
      />
      <RingSpinnerOverlay loading={loading} size={40} />
    </>
  );
}
