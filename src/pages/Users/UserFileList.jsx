import { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import Alert from "react-bootstrap/Alert";
import apiService from "../../api";
const headCells = [
  {
    label: "STT",
  },
  {
    label: "Tên File",
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
    label: "Số thứ tự văn bản trong hồ sơ",
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
export default function UserFileList() {
  const [pagination, setPagination] = useState({
    pageNum: 0,
    totalPages: 1,
    pageSize: 10,
  });
  const [listFile, setListFile] = useState([]);
  const navigate = useNavigate();
  const handleRedirectToForm = (data) => {
    navigate("/nhap-ho-so", {
      state: data,
    });
  };
  useEffect(() => {
    handleFetchList();
  }, []);

  const handleFetchList = () => {
    const userId = localStorage.getItem("userId");
    apiService
      .getListFile({
        pageNum: pagination.pageNum,
        pageSize: pagination.pageSize,
        userId,
      })
      .then((res) => {
        setListFile(res.data.items.files);
      });
  };
  return (
    <>
      <p>
        Trang này hiển thị cho quyền User để chọn file, sau khi click sẽ chuyển
        sang Form hiển thị file PD Làm thêm Filter theo Đã Nhập / Chưa nhập ,
        paging
      </p>
      <Alert key={"success"} variant="success">
        Tổng Đã Nhập : 200/600
      </Alert>
      <p>Filter theo Status</p>
      <Form.Select className="!w-80">
        <option defaultChecked="0">Tất cả</option>
        <option value="1">Đã Nhập</option>
        <option value="2">Chưa Nhập</option>
      </Form.Select>
      <p>Chọn file bạn muốn nhập</p>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            {headCells.map((x, i) => {
              return <td key={i}>{x.label}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {listFile.map((item, index) => {
            return (
              <tr
                className="cursor-pointer"
                key={item.id}
                onClick={() => handleRedirectToForm(item)}
              >
                <td>{index + 1}</td>
                <td>{item.fileName}</td>
                <td>{item.subject}</td>
                <td>{item.profileNo}</td>
                <td>{item.numOfText}</td>
                <td>{item.folio}</td>
                <td>{item.profileCode}</td>
                <td>{item.seq}</td>
                <td>{item.fileDate}</td>
                <td>{item.organizationName}</td>
                <td>{item.numberOfPage}</td>
                <td>{item.updateTime}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Pagination />
    </>
  );
}
