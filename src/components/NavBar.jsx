import logo from "../assets/images/twitter-logo.png";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function MenuNav() {
  const navigate = useNavigate("");
  useEffect(() => {
    if (localStorage.getItem("isLogin") !== "true") {
      navigate("/dang-nhap");
    }
  }, []);
  const ADMIN_MENUS = [
    { text: "Danh Sách File", url: "/danh-sach-file" },
    { text: "Thống Kê", url: "/thong-ke" },
    { text: "Quản Trị Nhân Viên", url: "/nhan-vien" },
  ];
  const USER_MENUS = [{ text: "Danh Sách Nhập", url: "/" }];
  const CURRENT_ROLE = localStorage.getItem("roles");
  const ROLE_MENU =
    CURRENT_ROLE === "ADMIN"
      ? ADMIN_MENUS
      : CURRENT_ROLE === "USER"
      ? USER_MENUS
      : null;
  const MENU =
    ROLE_MENU &&
    ROLE_MENU.map((item) => {
      return (
        <Link key={item.url} to={item.url} className="nav-link">
          {item.text}
        </Link>
      );
    });
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/dang-nhap");
  };
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {MENU}
            </Nav>
            <NavDropdown
              title={
                localStorage.getItem("roles") === "ADMIN" ? "ADMIN" : "USER"
              }
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
      {/* <Link to="/" className="nav-link">
        <Button>Trang Chủ</Button>
      </Link>
      <Link to="/" className="nav-link">
        <Button>Thống Kê</Button>
      </Link>
      <Link to="/lich-su" className="nav-link">
        <Button>Lịch Sử</Button>
      </Link>
      <Link to="/nhap-ho-so" className="nav-link">
        <Button>Nhập Hồ sơ</Button>
      </Link> */}
    </>
  );
}
