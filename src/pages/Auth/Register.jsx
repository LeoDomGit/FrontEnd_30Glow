// Register.js
import { useState } from "react";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "notyf/notyf.min.css";
import { Helmet } from "react-helmet";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Kiểm tra hợp lệ dữ liệu
  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Tên tài khoản không được để trống!";
    if (!formData.email.trim()) newErrors.email = "Email không được để trống!";
    if (!formData.phone.trim()) newErrors.phone = "SĐT không được để trống!";
    if (!formData.password.trim()) newErrors.password = "Mật khẩu không được để trống!";
    if (!formData.confirmPassword.trim()) newErrors.confirmPassword = "Xác nhận mật khẩu không được để trống!";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Email không hợp lệ!";
    }
    const phoneRegex = /^0\d{9}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "SĐT phải có 10 số và bắt đầu bằng số 0!";
    }
    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự!";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp!";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      await axios
        .post(`${import.meta.env.VITE_API_URL}/register`, {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
        })
        .then((response) => {
          if (response.data.check === true) {
            window.notyf.success("Đăng ký thành công!");
            setFormData({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
            setTimeout(() => navigate("/dang-nhap"), 2000);
          }
        })
        .catch((error) => {
          window.notyf.error(error.response.data.message);
        });
    } else {
      window.notyf.error("Vui lòng kiểm tra và điền đầy đủ thông tin!");
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <>
      <Helmet>
        <title>Đăng ký - 30GLOW</title>
        <meta name="description" content="meo meo meo" />
      </Helmet>
      <Header />
      <Container className="my-5">
        <Row className="rounded-4 shadow-lg overflow-hidden w-75 mx-auto">
          <Col md={6} className="d-none d-md-block px-0">
            <div
              className="h-100 w-100"
              style={{
                backgroundImage: `url("https://i.pinimg.com/564x/4f/58/53/4f5853f340b64303be02dda402f06411.jpg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </Col>

          <Col md={6} className="d-flex align-items-center justify-content-center bg-white">
            <div className="p-5" style={{ width: "100%", maxWidth: "400px" }}>
              <h3 className="text-center mb-4 text-primary-emphasis">Đăng ký</h3>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Control type="text" placeholder="Tên tài khoản" value={formData.name} onChange={handleChange} isInvalid={!!errors.name} />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Control type="email" placeholder="Địa chỉ email" value={formData.email} onChange={handleChange} isInvalid={!!errors.email} />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="phone">
                  <Form.Control type="text" placeholder="Số điện thoại" value={formData.phone} onChange={handleChange} isInvalid={!!errors.phone} />
                  <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu"
                      value={formData.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                      autoComplete={"off"}
                    />
                    <Button variant="outline-secondary rounded-end" onClick={togglePasswordVisibility}>
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </Button>
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="confirmPassword">
                  <InputGroup>
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Xác nhận mật khẩu"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      isInvalid={!!errors.confirmPassword}
                    />
                    <Button variant="outline-secondary rounded-end" onClick={toggleConfirmPasswordVisibility}>
                      <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                    </Button>
                    <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Link to="/dang-nhap" className="text-decoration-none text-primary-emphasis d-block mb-3 text-end">
                  Bạn đã có tài khoản?
                </Link>

                <Button variant="primary" type="submit" className="w-100 rounded-3 mb-3">
                  Đăng ký
                </Button>

                <Button variant="outline-primary" className="w-100 rounded-3">
                  Đăng ký với Google
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Register;
