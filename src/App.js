import Navbar from "./components/NavBar";
import { Box } from "@mui/system";
import { Routes, Route, useNavigate } from "react-router-dom";

import AddDocument from "./pages/Users/AddDocument";
import AddFile from "./pages/Admin/AddFile";
import Statistic from "./pages/Admin/Statistic";
import UserManagement from "./pages/Admin/UserManagement";
import UserFileList from "./pages/Users/UserFileList";
import Login from "./pages/Users/Login";
import { NotificationContainer } from "react-notifications";
import ProtectedRoute from "./components/ProtectedRoute";
import { Cookies } from "react-cookie";
const cookies = new Cookies();
export default function App() {
  const navigate = useNavigate("");
  const ROLE_USER = "USER";
  const adminRoute = [
    {
      path: "/nhap-ho-so",
      element: <AddDocument />,
      role: ROLE_USER,
    },
    {
      path: "/danh-sach-file",
      element: <UserFileList />,
      role: ROLE_USER,
    },
    {
      path: "/thong-ke",
      element: <Statistic />,
    },
    {
      path: "/nhan-vien",
      element: <UserManagement />,
    },
    {
      path: "/",
      element: <AddFile />,
    },
  ];
  if (!cookies.get("token_login")) {
    localStorage.clear();
    navigate("/dang-nhap");
  }
  return (
    <>
      <Box height={"calc(100vh - 100.5px)"}>
        <Navbar />
        <Routes>
          <Route path="/dang-nhap" element={<Login />} />
          {adminRoute.map((route) => {
            return (
              <Route
                path={route.path}
                key={route.path}
                element={
                  <ProtectedRoute
                    path={route.path}
                    role={route.role || "ADMIN"}
                  >
                    {route.element}
                  </ProtectedRoute>
                }
              />
            );
          })}
          <Route path="*" element={<p>TRANG KHÔNG TỒN TẠI</p>} />
        </Routes>
      </Box>
      <NotificationContainer />
    </>
  );
}
