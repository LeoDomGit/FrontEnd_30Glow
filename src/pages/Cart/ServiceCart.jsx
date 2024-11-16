// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
import Header from "../../layouts/Header";
import { useNavigate } from "react-router-dom";
import Footer from "../../layouts/Footer";
import { Helmet } from "react-helmet";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import axios from "axios";

function ServiceCart() {
  const notyf = new Notyf({
    position: {
      x: "right",
      y: "top",
    },
  });

  const [carts, setCarts] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [id_user, setId_user] = useState(null);
  const [ArrayUser, setArrayUser] = useState(null);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [time, setTime] = useState("");
  const [time2, setTime2] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedCarts = localStorage.getItem("cart");
    const cartData = storedCarts ? JSON.parse(storedCarts) : [];
    setCarts(cartData);
    TongTien(cartData);
    GetAllStaff();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const TongTien = (cart) => {
    const ThanhTien = cart.reduce((acc, item) => acc + item.price, 0);
    setTotal(ThanhTien);
  };

  const deleteItem = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      const updatedCarts = carts.filter((item) => item.id !== id);
      setCarts(updatedCarts);
      localStorage.setItem("cart", JSON.stringify(updatedCarts));
      TongTien(updatedCarts);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (name.trim().length < 3) newErrors.name = "Chưa nhập đúng thông tin..";
    if (!/^0\d{9,11}$/.test(phone)) {
      newErrors.phone = "Chưa nhập đúng thông tin.";
    }
    if (!email.includes("@")) newErrors.email = "Email phải chứa ký tự '@'.";
    if (!appointmentDate) {
      newErrors.appointmentDate = "Vui lòng chọn ngày đến.";
    } else if (new Date(appointmentDate) < new Date()) {
      newErrors.appointmentDate = "Ngày đến không được ở trong quá khứ.";
    }
    if (!time) {
      newErrors.time = "Vui lòng chọn giờ đến.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Lưu thông tin lịch hẹn vào localStorage
      const appointment = {
        id_user,
        name,
        phone,
        email,
        time,
      };
      localStorage.setItem("appointment", JSON.stringify(appointment));

      let ids = JSON.parse(localStorage.getItem("cart")).map((item) => item.id);
      AddNewOrder(
        Object.assign(JSON.parse(localStorage.getItem("appointment")), {
          service: ids,
        })
      );
    }
  };

  useEffect(() => {
    if (appointmentDate && time2) {
      const formattedDateTime = new Date(`${appointmentDate} ${time2}`).toISOString().slice(0, 19).replace("T", " ");
      setTime(formattedDateTime);
    }
  }, [appointmentDate, time2]);
  const focusTime = (e) => {
    const selectedTime = e.target.value;
    const currentSeconds = new Date().getSeconds().toString().padStart(2, "0");
    const [hours, minutes] = selectedTime.split(":");

    setTime2(`${hours}:${minutes}:${currentSeconds}`);
  };

  const GetAllStaff = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/staff`);
      setArrayUser(response?.data?.data);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      notyf.error("Có lỗi xảy ra khi tải dữ liệu.");
    }
  };
  const handleSelectChange = (event) => {
    setId_user(event.target.value);
  };
  const AddNewOrder = async (DataOrder) => {
    console.log(DataOrder);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/bookings`, DataOrder, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      notyf.success("Đặt lịch hẹn thành công!");
      setCarts([]);
      localStorage.removeItem("cart");
      setTimeout(() => {
        navigate("/");
      }, 9000);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      notyf.error("Có lỗi xảy ra khi tải dữ liệu.");
    }
  };


  return (
    <>
      <Helmet>
        <title>Giỏ hàng - 30GLOW</title>
        <meta name="description" content="Giỏ hàng của bạn" />
      </Helmet>
      <Header />
      <Container className="my-5 mb-5">
        <h4 className="mb-4">Đặt lịch của bạn</h4>
        {carts.length === 0 ? (
          <h4 className="text-danger text-center">Bạn chưa có lịch hẹn nào </h4>
        ) : (
          <Row>
            <Col md={7}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th className="text-center">Hình ảnh</th>
                    <th>Sản phẩm</th>
                    <th></th>
                    <th>Thành Tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {carts.map((item, index) => (
                    <tr key={index}>
                      <td className="d-flex justify-content-center align-items-center">
                        <img
                          src={item.image ? `${import.meta.env.VITE_URL}${item.image}` : "path/to/default-image.jpg"}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                          alt={item.name}
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>
                        <Button variant="outline-danger" onClick={() => deleteItem(item.id)} className="ms-3">
                          <i className="bi bi-trash" />
                        </Button>
                      </td>
                      <td>
                        <span className="fw-bold">{Intl.NumberFormat("en-US").format(item.price)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <h4>
                <strong style={{ color: "red" }}> Khi đặt lịch trước</strong> bạn sẽ được tặng
                <span style={{ color: "green" }}> xịt dưỡng tóc Loreal</span>
              </h4>
            </Col>
            <Col md={5}>
              <div className="border" style={{ padding: "20px", borderRadius: "5px", width: "100%" }}>
                <h4 className="bold text-danger fw-bold">
                  Tổng cộng:{" "}
                  {total.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </h4>
                <Form onSubmit={handleFormSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tên người đặt lịch</Form.Label>
                    <Form.Control type="text" placeholder="Nhập tên của bạn..." value={name} onChange={(e) => setName(e.target.value)} isInvalid={!!errors.name} />
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                  </Form.Group>
                  <Row className="align-items-center">
                    <Col xs={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control type="tel" placeholder="Nhập số điện thoại..." value={phone} onChange={(e) => setPhone(e.target.value)} isInvalid={!!errors.phone} />
                        <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Nhập địa chỉ email..." value={email} onChange={(e) => setEmail(e.target.value)} isInvalid={!!errors.email} />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="align-items-center">
                    <Col xs={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Thời gian đến</Form.Label>
                        <Form.Control type="time" value={time2} onChange={(e) => focusTime(e)} isInvalid={!!errors.time2} />
                        <Form.Control.Feedback type="invalid">{errors.time}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Ngày đến</Form.Label>
                        <Form.Control type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} isInvalid={!!errors.appointmentDate} />
                        <Form.Control.Feedback type="invalid">{errors.appointmentDate}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Yêu cầu kĩ thuật viên *</Form.Label>
                      <Form.Select aria-label="Chọn kĩ thuật viên" placeholder="Yêu cầu kĩ thuật viên" value={id_user} onChange={handleSelectChange}>
                        <optgroup label="Thợ tóc tiệm đề xuất">
                          <option value="Tiệm Đề Xuất">Tiệm Đề Xuất Thợ Cho Bạn</option>
                        </optgroup>
                        <optgroup label="Thợ tóc">
                          {Array.isArray(ArrayUser) && ArrayUser.length > 0 ? (
                            ArrayUser.map((staffItem, i) => (
                              <option key={i} value={staffItem?.uid}>
                                {staffItem?.name}
                              </option>
                            ))
                          ) : (
                            <option disabled>Không có dữ liệu</option>
                          )}
                        </optgroup>
                      </Form.Select>
                    </Form.Group>
                  </Row>
                  <Button variant="dark" type="submit" className="w-100">
                    Đặt lịch hẹn ngay!
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default ServiceCart;
