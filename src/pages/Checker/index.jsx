import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import apiService from "../../api";
import { Modal, Table, Form } from "react-bootstrap";
import FormInput from "../Users/AddDocument";
import Alert from "../../components/Alert";

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
    label: "Người chỉnh sửa cuối",
  },
  {
    label: "Checker",
  },
  {
    label: "Ngày nhập",
  },
];
export default function Checker() {
  const [searchParams, setSearchParams] = useState({
    pageNum: 0,
    pageSize: 20,
    inputStatus: "0",
    userId: "",
    checked: "",
    checkerId: localStorage.getItem("userId"),
  });
  const [listFile, setListFile] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [fetchListAfterSaved, setFetchListAfterSaved] = useState(false);
  const [currentIndex, setCurrentIndex] = useState("");
  const [fileDetail, setFileDetail] = useState({});

  useEffect(() => {
    handleFetchList();
  }, [searchParams]);
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
  const handleEditDocument = (file, index) => {
    setShowModalEdit(true);
    setCurrentIndex(index);
    setFileDetail(file);
  };
  const handleChangePage = (pageNum) => {
    setSearchParams({ ...searchParams, pageNum });
  };
  const handleHideFormModal = () => {
    setShowModalEdit(false);
    if (fetchListAfterSaved) {
      handleFetchList();
      setFetchListAfterSaved(false);
    }
  };
  const handleSelectDropdown = (key, value) => {
    setSearchParams({ ...searchParams, pageNum: 0, [key]: value });
    setPagination({ ...pagination, page: 1 });
  };
  return (
    <>
      <div className="mx-8">
        <Alert content="Tổng số File" totalItems={pagination.totalItems} />
        <div className=" mt-4">
          <span>Trạng thái Nhập</span>
          <Form.Select
            className="!w-80 mr-2"
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
        <div className=" mt-4 overflow-x-auto">
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
                    <td className="min-w-[800px]">{file.subject}</td>
                    <td className="min-w-[200px]">{file.profileNo}</td>
                    <td className="min-w-[150px]">{file.numOfText}</td>
                    <td className="min-w-[100px]">{file.seq}</td>
                    <td className="min-w-[150px]">{file.folio}</td>
                    <td className="min-w-[150px]">{file.profileCode}</td>
                    <td className="min-w-[150px]">{file.fileDate}</td>
                    <td className="min-w-[200px]">{file.organizationName}</td>
                    <td className="min-w-[150px]">{file.numberOfPage}</td>
                    <td className="min-w-[200px]">{file.updateBy}</td>
                    <td className="min-w-[200px]">{file.checkerName}</td>
                    <td className="min-w-[150px]">{file.updateTime}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
      <Pagination onChangePage={handleChangePage} pagination={pagination} />
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
    </>
  );
}
