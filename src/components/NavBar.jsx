import logo from "../assets/images/flag.png";
import { Link, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
export default function MenuNav() {
  const navigate = useNavigate("");
  const pathname = useLocation().pathname;
  const isLogin = Boolean(localStorage.getItem("isLogin"));
  const [, , removeCookie] = useCookies(["token_login"]);
  useEffect(() => {
    if (!isLogin) {
      navigate("/dang-nhap");
    }
  }, []);
  const MENUS = {
    ADMIN: [
      { text: "Danh Sách File", url: "/" },
      { text: "Thống Kê", url: "/thong-ke" },
      { text: "Quản Trị Nhân Viên", url: "/nhan-vien" },
    ],
    USER: [{ text: "Danh Sách Nhập", url: "/danh-sach-file" }],
    CHECKER: [{ text: "Checker", url: "/checker" }],
  };
  const CURRENT_ROLE = localStorage.getItem("roles");
  const ROLE_MENU = MENUS[CURRENT_ROLE];
  const MENU =
    ROLE_MENU &&
    ROLE_MENU.map((item) => {
      return (
        <Link
          key={item.url}
          to={item.url}
          className={
            pathname === item.url
              ? "nav-link !text-blue-600 !font-bold !underline"
              : "nav-link"
          }
        >
          {item.text}
        </Link>
      );
    });
  const handleLogOut = () => {
    localStorage.clear();
    removeCookie("token_login");
    navigate("/dang-nhap");
  };
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          {isLogin && <img src={logo} alt="" width={50} className="mr-10" />}
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <div
              className="me-auto my-2 my-lg-0 flex gap-4"
              style={{ maxHeight: "100px" }}
              
            >
              {MENU}
            </div>
            <NavDropdown
              title={localStorage.getItem("roles")}
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                <Nav.Link onClick={handleLogOut}>Đăng Xuất</Nav.Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
