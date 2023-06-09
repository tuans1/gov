import { Badge, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Collapse from "react-bootstrap/Collapse";
import { useEffect, useState } from "react";
import FormInput from "../Users/AddDocument";
import { ReactComponent as ArrowIcon } from "../../assets/icons/down-arrow.svg";
import { ReactComponent as ExportIcon } from "../../assets/icons/export-file.svg";
import Pagination from "../../components/Pagination";
import apiService from "../../api";
import createNotification from "../../utils/notification";
import { RingSpinnerOverlay } from "react-spinner-overlay";
const headCells = [
  {
    label: "STT",
  },
  {
    label: "Người Đảm Nhiệm",
  },
  {
    label: "Người chỉnh sửa cuối",
  },
  {
    label: "Checker",
  },
  {
    label: "Tiêu đề văn bản",
  },
  {
    label: "Số và ký hiệu hồ sơ",
  },
  {
    label: "Số của văn bản",
  },
  {
    label: "Tờ Số",
  },
  {
    label: "Mã hồ sơ",
  },
  {
    label: "Số tứ tự văn bản trong hồ sơ",
  },
  {
    label: "Ngày tháng năm văn bản",
  },
  {
    label: "Tên cơ quan tổ chức ban hành văn bản",
  },
  {
    label: "Số lượng trang của văn bản",
  },
  {
    label: "Ngày nhập",
  },
];
export default function Statistic() {
  const [pagination, setPagination] = useState({});
  const [searchParams, setSearchParams] = useState({
    pageNum: 0,
    pageSize: 20,
    inputStatus: "0",
    userId: "",
    checked: "",
    checkerId: "",
  });
  const [loading, setLoading] = useState(false);
  const [expandReport, setExpandReport] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [listChecker, setListChecker] = useState([]);
  const [listFile, setListFile] = useState([]);
  const [fileDetail, setFileDetail] = useState({});
  const [reportStatus, setReportStatus] = useState({});
  const [currentIndex, setCurrentIndex] = useState("");
  const [fetchListAfterSaved, setFetchListAfterSaved] = useState(false);
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
    apiService.reportStatus().then((res) => {
      const { totalInputted, totalFile, reportVoList } = res.data.items;
      setReportStatus({ totalInputted, totalFile, reportVoList });
    });
  }, []);
  useEffect(() => {
    handleFetchList();
  }, [searchParams]);
  const reportTotal = reportStatus?.reportVoList?.reduce((acc, cur) => {
    return {
      totalFile: acc.totalFile + cur.totalFile || 0,
      totalInputtedFile: acc.totalInputtedFile + cur.inputtedFile || 0,
    };
  }, {});
  const handleEditDocument = (file, index) => {
    setShowModalEdit(true);
    setCurrentIndex(index);
    setFileDetail(file);
  };
  const handleFetchList = () => {
    setLoading(false);
    apiService.getListFile(searchParams).then((res) => {
      setListFile(res.data.items.files);
      setPagination({
        totalPages: res.data.items.totalPages,
        totalItems: res.data.items.totalItems,
        page: res.data.items.currentPage + 1,
      });
      setLoading(false);
    });
  };
  const handleExport = () => {
    apiService.exportDocument();
  };
  const handleChangePage = (pageNum) => {
    setSearchParams({ ...searchParams, pageNum });
  };
  const handleSelectDropdown = (key, value) => {
    setSearchParams({ ...searchParams, pageNum: 0, [key]: value });
    setPagination({ ...pagination, page: 1 });
  };
  const handleHideFormModal = () => {
    setShowModalEdit(false);
    if (fetchListAfterSaved) {
      handleFetchList();
      setFetchListAfterSaved(false);
    }
  };
  return (
    <>
      <div>
        <div className="mt-8 container">
          <Button
            onClick={() => setExpandReport(!expandReport)}
            aria-controls="example-collapse-text"
            aria-expanded={expandReport}
          >
            Tổng File đã hoàn thành
            <ArrowIcon className="mt-1 ml-2 w-4 h-4 float-right" fill="white" />
          </Button>
          <Collapse in={expandReport}>
            <div id="example-collapse-text">
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tên Nhân viên</th>
                    <th>Đã nhập / Còn</th>
                  </tr>
                </thead>
                <tbody>
                  {reportStatus?.reportVoList &&
                    reportStatus.reportVoList.map((user, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{user.userName}</td>
                          <td>{`${user.inputtedFile}/${user.totalFile}`}</td>
                        </tr>
                      );
                    })}
                  <tr>
                    <td colSpan={3}>
                      Tổng Đã Hoàn Thành :{"  "}
                      <Badge bg="success">
                        <span className="text-sm">
                          {reportTotal?.totalInputtedFile +
                            " / " +
                            reportTotal?.totalFile}
                        </span>
                      </Badge>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Collapse>
        </div>
        <hr />
        <div className="flex container my-2">
          <div>
            <span>User</span>
            <Form.Select
              className="!w-40 mr-2"
              onChange={(e) => handleSelectDropdown("userId", e.target.value)}
            >
              <option defaultChecked={true} value="">
                Tất cả
              </option>
              {listUser.map((user) => {
                return (
                  <option value={user.id} key={user.id}>
                    {user.fullName}
                  </option>
                );
              })}
            </Form.Select>
          </div>
          <div>
            <span>Checker</span>
            <Form.Select
              className="!w-40 mr-2"
              onChange={(e) =>
                handleSelectDropdown("checkerId", e.target.value)
              }
            >
              <option defaultChecked={true} value="">
                Tất cả
              </option>
              {listChecker.map((checker) => {
                return (
                  <option value={checker.id} key={checker.id}>
                    {checker.fullName}
                  </option>
                );
              })}
            </Form.Select>
          </div>
          <div>
            <span>Trạng thái Nhập</span>
            <Form.Select
              className="!w-40 mr-2"
              onChange={(e) =>
                handleSelectDropdown("inputStatus", e.target.value)
              }
            >
              <option defaultChecked={true} value="0">
                Tất cả
              </option>
              <option value="2">Đã Nhập</option>
              <option value="1">Chưa Nhập</option>
            </Form.Select>
          </div>
          <div>
            <span>Trạng thái Check</span>
            <Form.Select
              className="!w-40 mr-2"
              onChange={(e) => handleSelectDropdown("checked", e.target.value)}
            >
              <option defaultChecked={true} value="">
                Tất cả
              </option>
              <option value="2">Đã Check</option>
              <option value="1">Chưa Check</option>
            </Form.Select>
          </div>
          <div className="self-end">
            <Button onClick={handleExport}>
              <ExportIcon className="mr-2 w-5 h-5 float-left" fill="white" />
              Xuất EXCEL
            </Button>
          </div>
        </div>
        <div className="mx-2 overflow-x-auto">
          <Table bordered hover size="sm">
            <thead>
              <tr>
                {headCells.map((x, i) => {
                  return (
                    <td
                      key={i}
                      className="font-bold"
                      style={{ color: "#332f2e" }}
                    >
                      {x.label}
                    </td>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {listFile.map((file, index) => {
                return (
                  <tr
                    onDoubleClick={() => handleEditDocument(file, index)}
                    key={file.id}
                    className="cursor-pointer"
                  >
                    <td>{index + 1}</td>
                    <td className="min-w-[200px]">{file.userName}</td>
                    <td className="min-w-[200px]">{file.updateBy}</td>
                    <td className="min-w-[200px]">{file.checkerName}</td>
                    <td className="min-w-[800px]">{file.subject}</td>
                    <td className="min-w-[200px]">{file.profileNo}</td>
                    <td className="min-w-[150px]">{file.numOfText}</td>
                    <td className="min-w-[100px]">{file.seq}</td>
                    <td className="min-w-[150px]">{file.folio}</td>
                    <td className="min-w-[150px]">{file.profileCode}</td>
                    <td className="min-w-[150px]">{file.fileDate}</td>
                    <td className="min-w-[200px]">{file.organizationName}</td>
                    <td className="min-w-[150px]">{file.numberOfPage}</td>

                    <td className="min-w-[150px]">{file.updateTime}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <Pagination onChangePage={handleChangePage} pagination={pagination} />
      </div>
      <Modal
        show={showModalEdit}
        fullscreen={true}
        onHide={handleHideFormModal}
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Chỉnh sửa Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="test">
          <FormInput
            fileDetail={fileDetail}
            listFileProps={listFile}
            indexFileProps={currentIndex}
            onSaveFileCallback={() => setFetchListAfterSaved(true)}
          />
        </Modal.Body>
      </Modal>
      <RingSpinnerOverlay loading={loading} size={40} />
    </>
  );
}
