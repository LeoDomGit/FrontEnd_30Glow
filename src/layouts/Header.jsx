/* eslint-disable*/
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Dropdown, Form, Image, Nav, Navbar, NavDropdown, Offcanvas, Row } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import useAuthenContext from "../context/AuthenContext";
import { useSelector } from "react-redux";

function Header() {
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [groupedCategories, setGroupedCategories] = useState({});
  const { user, logout } = useAuthenContext();
  const shoppingCart = useSelector((state) => state.shoppingCart.items);

  const isActive = (path) => location.pathname === path;

  const getCategories = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL + "/categories");
      return setCategories(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    const grouped = categories.reduce((item, category) => {
      const parent = category.parent;
      if (!item[parent.id]) {
        item[parent.id] = { parent, children: [] };
      }
      item[parent.id].children.push(category);
      return item;
    }, {});
    setGroupedCategories(grouped);
  }, [categories]);

  return (
    <>
      {/*start top header*/}
      <Navbar expand="xl" className="bg-body-tertiary sticky-top">
        <Container>
          <Navbar.Brand as={NavLink} to="/" end>
            <Image src="../src/assets/images/logo30GLOW.png" width={100} fluid />
          </Navbar.Brand>
          {/* start header */}

          {/* Button mobile */}
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          {/* Button mobile */}

          <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="end" className="bg-body-tertiary">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                <Navbar.Brand as={NavLink} to="/">
                  <Image src="../src/assets/images/logo30GLOW.png" width={80} fluid />
                </Navbar.Brand>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="me-auto text-uppercase fw-semibold gap-3" variant="underline">
                <Nav.Item>
                  <Nav.Link as={NavLink} to="/">
                    Trang chủ
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={NavLink} to="/gioi-thieu">
                    Giới thiệu
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={NavLink} to="/dich-vu">
                    Dịch vụ
                  </Nav.Link>
                </Nav.Item>
                {/* start dropdown */}
                <NavDropdown title="Sản phẩm" id="product-dropdown" data-bs-popper="static" active={isActive("/san-pham" || "/danh-muc/:slug")}>
                  <Container fluid style={{ width: "24rem" }}>
                    <Row className="g-0 row-cols-1 row-cols-lg-2">
                      {Object.values(groupedCategories).map((group, index) => (
                        <Col key={index}>
                          <Dropdown.Header as={NavLink} className="text-decoration-none" to={`/danh-muc/${group.parent.slug}`}>
                            {group.parent.name}
                          </Dropdown.Header>
                          {group.children.map((child) => (
                            <Dropdown.Item key={child.id} as={NavLink} to={`/danh-muc/${child.slug}`}>
                              {child.name}
                            </Dropdown.Item>
                          ))}
                        </Col>
                      ))}
                      <Col className="m-0 p-0">
                        <Dropdown.Header as={NavLink} className="text-decoration-none" to={"/san-pham"}>
                          Tất cả sản phẩm
                        </Dropdown.Header>
                      </Col>
                    </Row>
                  </Container>
                </NavDropdown>
                {/* end dropdown */}

                <NavDropdown title="Thương hiệu" id="brand-dropdown" className="d-none d-lg-block">
                  <NavDropdown.Item as={NavLink} to="/thuong-hieu">
                    Thương hiệu
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/thuong-hieu">
                    Thương hiệu 2
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Item>
                  <Nav.Link as={NavLink} to="/lien-he">
                    Liên hệ
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={NavLink} to="/tin-tuc">
                    Tin tức
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="d-block d-lg-none">
                  <Nav.Link as={NavLink} to="/tai-khoan">
                    Tài khoản
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              {/* end header */}
              <Navbar.Collapse className="justify-content-center">
                <Form className="d-flex mt-3 d-block d-lg-none">
                  <Form.Control type="search" placeholder="Tìm kiếm gì đó..." className="me-2" aria-label="Search" />
                  <Button variant="outline-success">
                    <i className="bi bi-search"></i>
                  </Button>
                </Form>
                <div className="d-flex gap-1 mt-3">
                  <Nav.Link as={NavLink} to="/dat-lich" className="col-6 d-md-none">
                    <Button variant="outline-primary" className="w-100">
                      <span className="me-2">Đặt lịch</span>
                      <span class="badge text-bg-danger">4</span>
                    </Button>
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/gio-hang" className="col-6 d-md-none">
                    <Button variant="outline-primary" className="w-100">
                      <span className="me-2">Giỏ hàng</span>
                      <span class="badge text-bg-danger">{shoppingCart ? shoppingCart.length : 0}</span>
                    </Button>
                  </Nav.Link>
                </div>
              </Navbar.Collapse>

              <Navbar.Collapse className="justify-content-end mx-auto text-uppercase fw-semibold gap-3 d-none d-lg-block">
                <Nav.Link as={NavLink} to={"#"}>
                  <i className="bi bi-search position-relative fs-5"></i>
                </Nav.Link>
                <Nav.Link as={NavLink} to="/dat-lich" className="ms-1">
                  <i className="bi bi-calendar-check position-relative fs-5" title="Lịch đã đặt">
                    <span className="position-absolute top-25 start-100 translate-middle badge rounded-pill bg-danger">9</span>
                  </i>
                </Nav.Link>
                <Nav.Link as={NavLink} to="/gio-hang" className="ms-1" title="Giỏ hàng">
                  <i className="bi bi-cart2 position-relative fs-5">
                    <span className="position-absolute top-25 start-100 translate-middle badge rounded-pill bg-danger">{shoppingCart ? shoppingCart.length : 0}</span>
                  </i>
                </Nav.Link>
                {user ? (
                  <>
                    <Dropdown autoClose="outside" className="ms-1">
                      <Dropdown.Toggle as={NavLink} variant="link" id="dropdown-basic1" title={"Khách hàng"} className="dropdown-user text-decoration-none text-dark">
                        <i className="bi bi-person-circle fs-4 ms-2"></i>
                      </Dropdown.Toggle>

                      <Dropdown.Menu align="end">
                        <Dropdown.Header className="fw-semibold">{user?.name}</Dropdown.Header>
                        <Dropdown.Item as={NavLink} to="/tai-khoan">
                          <i className="bi bi-person-circle me-2" />
                          Tài khoản
                        </Dropdown.Item>
                        <Dropdown.Item as={NavLink} to="/hoa-don">
                          <i className="bi bi-box me-2" />
                          Hóa đơn
                        </Dropdown.Item>
                        <Dropdown.Item as={NavLink} to="/dat-lich">
                          <i className="bi bi-calendar-check me-2" />
                          Đặt lịch
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#" role="button" onClick={logout}>
                          <i className="bi bi-box-arrow-right me-2" />
                          Đăng xuất
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                ) : (
                  <>
                    <Dropdown autoClose="outside" className="ms-1">
                      <Dropdown.Toggle as={NavLink} variant="link" id="dropdown-basic" title="Tài khoản" className="dropdown-user">
                        <i className="bi bi-person-circle fs-4 me-2"></i>
                      </Dropdown.Toggle>

                      <Dropdown.Menu align="end">
                        <Dropdown.Header className="fw-semibold">Tài khoản</Dropdown.Header>
                        <Dropdown.Item as={NavLink} to="/dang-nhap">
                          <i className="bi bi bi-door-open me-2"></i> Đăng nhập
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as={NavLink} to="/dang-ky">
                          <i className="bi bi-person-add me-2"></i> Đăng ký
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                )}
              </Navbar.Collapse>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      {/*end top header*/}
    </>
  );
}

export default Header;
