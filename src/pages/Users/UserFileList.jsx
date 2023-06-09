import { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import apiService from "../../api";
import { RingSpinnerOverlay } from "react-spinner-overlay";
import BaseTable from "../../components/BaseTable";
import AlertComponent from "../../components/Alert";
const headCells = [
  {
    label: "STT",
  },
  {
    label: "Tên File",
    key: "fileName",
  },
  {
    label: "Tiêu đề VB",
    key: "subject",
  },
  {
    label: "Số và ký hiệu hồ sơ",
    key: "profileNo",
  },
  {
    label: "Số của VB ( Dùng để tìm kiếm file )",
    key: "numOfText",
  },
  {
    label: "Tờ Số",
    key: "folio",
  },
  {
    label: "Mã hồ sơ",
    key: "profileCode",
  },
  {
    label: "STT VB trong hồ sơ trong hồ sơ",
    key: "seq",
  },
  {
    label: "Ngày tháng năm VB",
    key: "fileDate",
  },
  {
    label: "Tên cơ quan tổ chức ban hành VB",
    key: "organizationName",
  },
  {
    label: "Số lượng trang của VB",
    key: "numberOfPage",
  },
  {
    label: "Ngày nhập",
    key: "updateTime",
  },
];
export default function UserFileList() {
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    pageNum: 0,
    totalPages: 1,
    pageSize: 10,
    status: "0",
  });
  const [listFile, setListFile] = useState([
    // {
    //   id: 14,
    //   fileName: "filename3",
    //   organizationName: "UBND Quận Cầu Giấy",
    //   departmentName: "chủ tịch",
    //   userName: "DVN",
    //   subject: "tieu de3",
    //   profileNo: "sokyhieu3",
    //   numOfText: "sovanban3",
    //   folio: "toso3",
    //   profileCode: "mahoso3",
    //   seq: 3,
    //   fileDate: "12:22 14/05/2023",
    //   numberOfPage: 4,
    //   createTime: "12:22 14/05/2023",
    //   createBy: "admin",
    //   updateTime: "13:51 14/05/2023",
    //   updateBy: "admin",
    //   fileUrl:
    //     "filegovmanagement/UMs0kyffxz1j4uMC_13May2023032722GMT_1683948442291.pdf",
    // },
    // {
    //   id: 1,
    //   fileName: "filename0",
    //   organizationName: "UBND Quận Cầu Giấy",
    //   departmentName: "chủ tịch",
    //   userName: "DVN",
    //   subject: "tieu de0",
    //   profileNo: "sokyhieu0",
    //   numOfText: "sovanban0",
    //   folio: "toso0",
    //   profileCode: "mahoso0",
    //   seq: 0,
    //   fileDate: "12:22 14/05/2020",
    //   numberOfPage: 4,
    //   createTime: "12:22 14/05/2020",
    //   createBy: "admin",
    //   updateTime: "10:51 14/05/2020",
    //   updateBy: "admin",
    //   fileUrl:
    //     "filegovmanagement/UMs0kyffxz1j4uMC_13May2023032722GMT_1683948442291.pdf",
    // },
    // {
    //   id: 10,
    //   fileName: "xxxxxx",
    //   organizationName: "UBND Quận Cầu Giấy",
    //   departmentName: "chủ tịch",
    //   userName: "DVN",
    //   subject: "xxxxxx",
    //   profileNo: "xxxxxx",
    //   numOfText: "sovanbxxxxxxan0",
    //   folio: "xxxxxx",
    //   profileCode: "xxxxxx",
    //   seq: 0,
    //   fileDate: "12:22 14/05/2020",
    //   numberOfPage: 4,
    //   createTime: "12:22 14/05/2020",
    //   createBy: "admin",
    //   updateTime: "10:51 14/05/2020",
    //   updateBy: "admin",
    //   fileUrl:
    //     "filegovmanagement/UMs0kyffxz1j4uMC_13May2023032722GMT_1683948442291.pdf",
    // },
    // {
    //   id: 19,
    //   fileName: "lololololol",
    //   organizationName: "UBND Quận Cầu Giấy",
    //   departmentName: "chủ tịch",
    //   userName: "DVN",
    //   subject: "lololololol",
    //   profileNo: "lololololol",
    //   numOfText: "sovanblolololololan0",
    //   folio: "lololololol",
    //   profileCode: "lololololol",
    //   seq: 0,
    //   fileDate: "12:22 14/05/2020",
    //   numberOfPage: 4,
    //   createTime: "12:22 14/05/2020",
    //   createBy: "admin",
    //   updateTime: "10:51 14/05/2020",
    //   updateBy: "admin",
    //   fileUrl:
    //     "filegovmanagement/UMs0kyffxz1j4uMC_13May2023032722GMT_1683948442291.pdf",
    // },
  ]);
  const navigate = useNavigate();
  const handleRedirectToForm = (data, index) => {
    navigate("/nhap-ho-so", {
      state: { data, listFile: listFile, index },
    });
  };
  useEffect(() => {
    handleFetchList();
  }, [searchParams]);

  const handleFetchList = () => {
    setLoading(true);
    const userId = localStorage.getItem("userId") || "";
    apiService
      .getListFile({
        pageNum: searchParams.pageNum,
        pageSize: searchParams.pageSize,
        userId,
        status: searchParams.status,
      })
      .then((res) => {
        setListFile(res.data.items.files);
        setPagination({
          totalPages: res.data.items.totalPages,
          totalItems: res.data.items.totalItems,
          page: res.data.items.currentPage + 1,
        });
        setLoading(false);
      });
  };
  const handleChangePage = (pageNum) => {
    setSearchParams({ ...searchParams, pageNum });
  };
  return (
    <>
      <div className="container">
        <AlertComponent
          content="Tổng Số File"
          totalItems={pagination.totalItems}
        />
        <p>Filter theo Status</p>
        <Form.Select
          className="!w-80"
          onChange={(e) =>
            setSearchParams({ ...searchParams, status: e.target.value })
          }
        >
          <option value="0" defaultChecked="0">
            Tất cả
          </option>
          <option value="2">Đã Nhập</option>
          <option value="1">Chưa Nhập</option>
        </Form.Select>
      </div>
      <div className="mx-2">
        <Table bordered hover size="sm">
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
                  onDoubleClick={() => handleRedirectToForm(item, index)}
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
        {/* <BaseTable
          data={listFile}
          header={headCells}
          handleDbClick={handleRedirectToForm}
        /> */}
      </div>
      <Pagination onChangePage={handleChangePage} pagination={pagination} />
      <RingSpinnerOverlay loading={loading} size={40} />
    </>
  );
}
