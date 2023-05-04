import Navbar from "./components/NavBar";
import { Box } from "@mui/system";

import FormInput from "./pages/form/FormInput";
import ListPdfFile from "./pages/listPdf/ListPdfFile";
import ListPdf from "./pages/list_pdf/ListPdf";
import { Routes, Route } from "react-router-dom";
import DanhSachFile from "./pages/DanhSachFile";
import ThongKe from "./pages/ThongKe";
import Login from "./pages/Login";
import User from "./pages/User";
export default function App() {
  return (
    <>
      <Box height={"calc(100vh - 100.5px)"}>
        <Navbar />
        <Routes>
          <Route path="/" element={<ListPdf />} />
          <Route path="/nhap-ho-so" element={<FormInput />} />
          <Route path="/lich-su" element={<ListPdfFile />} />
          <Route path="/danh-sach-file" element={<DanhSachFile />} />
          <Route path="/thong-ke" element={<ThongKe />} />
          <Route path="/dang-nhap" element={<Login />} />
          <Route path="/nhan-vien" element={<User />} />
        </Routes>
      </Box>
    </>
  );
}
