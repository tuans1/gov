import logo from "../static/images/twitter-logo.png";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function MenuNav() {
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
              <Link to="/" className="nav-link">
                <Nav.Link href="#action1">List</Nav.Link>
              </Link>
              <Link to="/lich-su" className="nav-link">
                <Nav.Link href="#action1">Detail List</Nav.Link>
              </Link>{" "}
              <Link to="/nhap-ho-so" className="nav-link">
                <Nav.Link href="#action1">Form</Nav.Link>
              </Link>
            </Nav>
            <NavDropdown title="User" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
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
