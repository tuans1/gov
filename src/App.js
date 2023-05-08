import Navbar from "./components/NavBar";
import { Box } from "@mui/system";
import { Routes, Route } from "react-router-dom";

import AddDocument from "./pages/Users/AddDocument";
import AddFile from "./pages/Admin/AddFile";
import Statistic from "./pages/Admin/Statistic";
import UserManagement from "./pages/Admin/UserManagement";
import UserFileList from "./pages/Users/UserFileList";
import Login from "./pages/Users/Login";

export default function App() {
  return (
    <>
      <Box height={"calc(100vh - 100.5px)"}>
        <Navbar />
        <Routes>
          <Route path="/" element={<UserFileList />} />
          <Route path="/danh-sach-file" element={<AddFile />} />
          <Route path="/nhap-ho-so" element={<AddDocument />} />
          <Route path="/thong-ke" element={<Statistic />} />
          <Route path="/dang-nhap" element={<Login />} />
          <Route path="/nhan-vien" element={<UserManagement />} />
        </Routes>
      </Box>
    </>
  );
}
