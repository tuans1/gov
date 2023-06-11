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
    status: "0",
  });
  const [listFile, setListFile] = useState([
    {
      id: 14,
      fileName: "filename3",
      organizationName: "UBND Quận Cầu Giấy",
      departmentName: "chủ tịch",
      userName: "DVN",
      subject: "tieu de3",
      profileNo: "sokyhieu3",
      numOfText: "sovanban3",
      folio: "toso3",
      profileCode: "mahoso3",
      seq: 3,
      fileDate: "12:22 14/05/2023",
      numberOfPage: 4,
      createTime: "12:22 14/05/2023",
      createBy: "admin",
      updateTime: "13:51 14/05/2023",
      updateBy: "admin",
      fileUrl:
        "filegovmanagement/UMs0kyffxz1j4uMC_13May2023032722GMT_1683948442291.pdf",
    },
    {
      id: 1,
      fileName: "filename0",
      organizationName: "UBND Quận Cầu Giấy",
      departmentName: "chủ tịch",
      userName: "DVN",
      subject: "tieu de0",
      profileNo: "sokyhieu0",
      numOfText: "sovanban0",
      folio: "toso0",
      profileCode: "mahoso0",
      seq: 0,
      fileDate: "12:22 14/05/2020",
      numberOfPage: 4,
      createTime: "12:22 14/05/2020",
      createBy: "admin",
      updateTime: "10:51 14/05/2020",
      updateBy: "admin",
      fileUrl:
        "filegovmanagement/UMs0kyffxz1j4uMC_13May2023032722GMT_1683948442291.pdf",
    },
    {
      id: 10,
      fileName: "xxxxxx",
      organizationName: "UBND Quận Cầu Giấy",
      departmentName: "chủ tịch",
      userName: "DVN",
      subject: "xxxxxx",
      profileNo: "xxxxxx",
      numOfText: "sovanbxxxxxxan0",
      folio: "xxxxxx",
      profileCode: "xxxxxx",
      seq: 0,
      fileDate: "12:22 14/05/2020",
      numberOfPage: 4,
      createTime: "12:22 14/05/2020",
      createBy: "admin",
      updateTime: "10:51 14/05/2020",
      updateBy: "admin",
      fileUrl:
        "filegovmanagement/UMs0kyffxz1j4uMC_13May2023032722GMT_1683948442291.pdf",
    },
    {
      id: 19,
      fileName: "lololololol",
      organizationName: "UBND Quận Cầu Giấy",
      departmentName: "chủ tịch",
      userName: "DVN",
      subject: "lololololol",
      profileNo: "lololololol",
      numOfText: "sovanblolololololan0",
      folio: "lololololol",
      profileCode: "lololololol",
      seq: 0,
      fileDate: "12:22 14/05/2020",
      numberOfPage: 4,
      createTime: "12:22 14/05/2020",
      createBy: "admin",
      updateTime: "10:51 14/05/2020",
      updateBy: "admin",
      fileUrl:
        "filegovmanagement/UMs0kyffxz1j4uMC_13May2023032722GMT_1683948442291.pdf",
    },
  ]);
  const navigate = useNavigate();
  const handleRedirectToForm = (data, index) => {
    navigate("/nhap-ho-so", {
      state: { data, listFile: listFile, index },
    });
  };
  useEffect(() => {
    handleFetchList();
  }, [pagination]);

  const handleFetchList = () => {
    const userId = localStorage.getItem("userId");
    apiService
      .getListFile({
        pageNum: pagination.pageNum,
        pageSize: pagination.pageSize,
        userId,
        status: pagination.status,
      })
      .then((res) => {
        console.log(res.data.items.files);
        setListFile(res.data.items.files);
      });
  };
  return (
    <>
      <Alert key={"success"} variant="success">
        Tổng Đã Nhập : 200/600
      </Alert>
      <p>Filter theo Status</p>
      <Form.Select
        className="!w-80"
        onChange={(e) =>
          setPagination({ ...pagination, status: e.target.value })
        }
      >
        <option value="0" defaultChecked="0">
          Tất cả
        </option>
        <option value="2">Đã Nhập</option>
        <option value="1">Chưa Nhập</option>
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
                onClick={() => handleRedirectToForm(item, index)}
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
