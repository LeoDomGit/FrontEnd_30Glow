// Forgot.js
import React, { useState } from "react";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Notyf } from "notyf";
import "notyf/notyf.min.css"; // Import CSS của Notyf
import { Helmet } from "react-helmet";

function Forgot() {
  const notyf = new Notyf({
    duration: 3000,
    position: { x: "right", y: "top" },
    dismissible: true,
  });

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // Kiểm tra hợp lệ email
  const validateEmail = () => {
    if (!email.trim()) {
      setError("Email không được để trống!");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Email không hợp lệ!");
      return false;
    }
    setError("");
    return true;
  };

  // Xử lý khi người dùng submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail()) {
      notyf.success("Đã gửi xác nhận đến email của bạn!");
    } else {
      notyf.error("Vui lòng kiểm tra thông tin email!");
    }
  };

  return (
    <>
      <Helmet>
        <title>Quên mật khẩu - 30GLOW</title>
        <meta name="description" content="meo meo meo" />
      </Helmet>
      <Header />
      <Container className="my-5">
        <Row className="border-rounded-10 shadow w-75 mx-auto">
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
              <h3 className="text-center mb-4 text-primary-emphasis">Quên mật khẩu</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Control type="email" placeholder="Địa chỉ email" value={email} onChange={(e) => setEmail(e.target.value)} isInvalid={!!error} />
                  <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mt-2 mb-3">
                  Gửi xác nhận
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

export default Forgot;
