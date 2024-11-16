import { useState, useEffect, useContext } from "react";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import BreadcrumbComponent from "../../components/BreadcrumbComponent";
import { AuthenContext } from "../../context/AuthenContext";
import axios from "axios";

function Account() {
  const { user, token } = useContext(AuthenContext);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [changedFields, setChangedFields] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  useEffect(() => {
    setUserInfo(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
    setChangedFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/customers/${user.uid}`, changedFields, { headers: { Authorization: `Bearer ${token}` } });
      window.notyf.success(response.data.message);
      setIsEditing(false);
    } catch (error) {
      window.notyf.error(error.response.data.message);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setUserInfo(user);
    setChangedFields({});
    setIsEditing(false);
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <>
      <Helmet>
        <title>Tài khoản - 30GLOW</title>
        <meta name="description" content="Thông tin tài khoản" />
      </Helmet>
      <Header />
      <BreadcrumbComponent props={[{ name: "Tài khoản", url: "/tai-khoan" }]} />
      <Container className="pb-5">
        <Row className="mt-2">
          <h4>Thông tin tài khoản</h4>
          <Col md={6}>
            <Form onSubmit={handleSave}>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Tên</Form.Label>
                <Form.Control type="text" name="name" value={userInfo.name} onChange={handleChange} placeholder="Nhập tên của bạn..." disabled={!isEditing} />
              </Form.Group>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={userInfo.email} onChange={handleChange} placeholder="Nhập địa chỉ email..." disabled={!isEditing} />
              </Form.Group>
              <Form.Group controlId="phone" className="mb-3">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control type="tel" name="phone" value={userInfo.phone} onChange={handleChange} placeholder="Nhập số điện thoại..." disabled={!isEditing} />
              </Form.Group>
              <Form.Group controlId="address" className="mb-3">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control type="text" name="address" value={userInfo.address} onChange={handleChange} placeholder="Nhập địa chỉ..." disabled={!isEditing} />
              </Form.Group>
              {isEditing ? (
                <>
                  <Button variant="primary" type="submit">
                    Lưu thay đổi
                  </Button>
                  <Button variant="secondary" type="button" onClick={handleCancel} className="ms-2">
                    Hủy
                  </Button>
                </>
              ) : (
                <Button variant="primary" type="button" onClick={handleEdit}>
                  Chỉnh sửa
                </Button>
              )}
            </Form>
          </Col>
          <Col md={6}>
            <Form>
              <Form.Group controlId="currentPassword" className="mb-3">
                <Form.Label>Mật khẩu hiện tại</Form.Label>
                <InputGroup>
                  <Form.Control type={showPassword.currentPassword ? "text" : "password"} placeholder="Mật khẩu hiện tại" disabled={!isEditing} />
                  <Button variant="outline-secondary" onClick={() => togglePasswordVisibility("currentPassword")}>
                    <FontAwesomeIcon icon={showPassword.currentPassword ? faEyeSlash : faEye} />
                  </Button>
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="newPassword" className="mb-3">
                <Form.Label>Mật khẩu mới</Form.Label>
                <InputGroup>
                  <Form.Control type={showPassword.newPassword ? "text" : "password"} placeholder="Mật khẩu mới" disabled={!isEditing} />
                  <Button variant="outline-secondary" onClick={() => togglePasswordVisibility("newPassword")}>
                    <FontAwesomeIcon icon={showPassword.newPassword ? faEyeSlash : faEye} />
                  </Button>
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="confirmPassword" className="mb-3">
                <Form.Label>Xác nhận mật khẩu mới</Form.Label>
                <InputGroup>
                  <Form.Control type={showPassword.confirmPassword ? "text" : "password"} placeholder="Xác nhận mật khẩu mới" disabled={!isEditing} />
                  <Button variant="outline-secondary" onClick={() => togglePasswordVisibility("confirmPassword")}>
                    <FontAwesomeIcon icon={showPassword.confirmPassword ? faEyeSlash : faEye} />
                  </Button>
                </InputGroup>
              </Form.Group>
              {isEditing && (
                <Button variant="dark" type="button">
                  Đổi mật khẩu
                </Button>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Account;
