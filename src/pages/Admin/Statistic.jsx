import { Button } from "react-bootstrap";
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
const headCells = [
  {
    label: "STT",
  },
  {
    label: "Người Đảm Nhiệm",
  },
  {
    label: "Tiêu đề văn bản",
  },
  {
    label: "Số và ký hiệu hồ sơ",
  },
  {
    label: "Số của văn bản ( Dùng để tìm kiếm file )",
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
    label: "Người chỉnh sửa cuối",
  },
  {
    label: "Ngày nhập",
  },
];
export default function Statistic() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [listFile, setListFile] = useState([]);
  const [fileDetail, setFileDetail] = useState({});
  const [reportStatus, setReportStatus] = useState([]);
  useEffect(() => {
    apiService.getListUser().then((res) => {
      console.log(res.data.items);
      setListUser(res.data.items);
    });
    apiService.getListFile().then((res) => {
      setListFile(res.data.items.files);
    });
    apiService.reportStatus().then((res) => {
      const { totalInputted, totalFile, reportVoList } = res.data.items;
      setReportStatus({ totalInputted, totalFile, reportVoList });
    });
  }, []);
  const handleEditDocument = (file) => {
    setShow(true);
    setFileDetail(file);
  };
  const handleExport = () => {
    apiService.exportDocument();
  };
  return (
    <>
      <div>
        <div className="mt-8 container">
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            Tổng File đã hoàn thành
            <ArrowIcon className="mt-1 ml-2 w-4 h-4 float-right" fill="white" />
          </Button>
          <Collapse in={open}>
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
                  {reportStatus?.reportVoList.map((user, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.fullName}</td>
                        <td>0 / 200</td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td colSpan={3}>Tổng Đã Hoàn Thành : 200/600</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Collapse>
        </div>
        <div className="flex container my-2">
          <Form.Select className="!w-80 mr-2">
            <option defaultChecked={true}>Tất cả</option>
            {listUser.map((user) => {
              return <option value={user.id}>{user.fullName}</option>;
            })}
          </Form.Select>
          <Button onClick={handleExport}>
            <ExportIcon className="mr-2 w-5 h-5 float-left" fill="white" />
            Xuất EXCEL
          </Button>
        </div>
        <div className="mx-2">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                {headCells.map((x, i) => {
                  return <td key={i}>{x.label}</td>;
                })}
              </tr>
            </thead>
            <tbody>
              {listFile.map((file, index) => {
                return (
                  <tr onClick={() => handleEditDocument(file)} key={file.id}>
                    <td>{index + 1}</td>
                    <td>{file.userName}</td>
                    <td>{file.subject}</td>
                    <td>{file.profileNo}</td>
                    <td>{file.numOfText}</td>
                    <td>{file.seq}</td>
                    <td>{file.folio}</td>
                    <td>{file.profileCode}</td>
                    <td>{file.fileDate}</td>
                    <td>{file.organizationName}</td>
                    <td>{file.numberOfPage}</td>
                    <td>{file.updateBy}</td>
                    <td>{file.updateTime}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <Pagination />
      </div>
      <Modal
        show={show}
        fullscreen={true}
        onHide={() => setShow(!show)}
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Chỉnh sửa Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="test">
          <FormInput fileDetail={fileDetail} />
        </Modal.Body>
      </Modal>
    </>
  );
}
