// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Table, Form, Image } from "react-bootstrap";
import Header from "../../layouts/Header";
import { useNavigate } from "react-router-dom";
import Footer from "../../layouts/Footer";
import { Helmet } from "react-helmet";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import axios from "axios";
import { increaseServiceQuantity, decreaseServiceQuantity, removeFromServiceCart } from "../../store/reducers/serviceCartSlice";
import { useSelector, useDispatch } from "react-redux";


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
  //new 
  const services = useSelector((state) => state.serviceCart.items);
  const dispatch = useDispatch();

  const handleQuantityChange = (id, change) => {
    if (change > 0) {
      dispatch(increaseServiceQuantity(id));
    } else {
      dispatch(decreaseServiceQuantity(id));
    }
  };

  const handleRemoveService = (id) => {
    dispatch(removeFromServiceCart(id));
  };
  const TongTien = () => {
    const subtotal = services.reduce((sum, service) => sum + service.price * service.quantity, 0);
    const shippingFee = subtotal > 500000 ? 0 : 30000;
    const ThanhTien = subtotal + shippingFee;
    setTotal(ThanhTien);
  };
  useEffect(() => {
    TongTien();
  }, [services]);
  //
  useEffect(() => {
    const storedCarts = localStorage.getItem("cart");
    const cartData = storedCarts ? JSON.parse(storedCarts) : [];
    setCarts(cartData);
    GetAllStaff();
  }, []);

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
        {services.length === 0 ? (
          <h4 className="text-danger text-center">Bạn chưa có lịch hẹn nào </h4>
        ) : (
          <Row>
            <Col md={7} className="border-end pt-1">
              <h4>Giỏ hàng sản phẩm</h4>
              <div className="overflow-auto" style={{ maxHeight: "380px" }}>
                {services.map((item) => (
                  <Row key={item.id} className="mb-3 align-items-center" style={{ width: "720px" }}>
                    <Col xs={3}>
                      <Image src={item.image ? `${import.meta.env.VITE_URL}${item.image}` : "path/to/default-image.jpg"} fluid rounded />
                    </Col>
                    <Col xs={5} className="text-start">
                      <h6>{item?.name || "Product Name"}</h6>
                      <div>
                        <p className="mb-0">
                          Giá gốc: <del>{Intl.NumberFormat("en-US").format(item.compare_price)}₫</del>
                        </p>
                        <p className="text-danger fw-bold">Giá giảm: {Intl.NumberFormat("en-US").format(item.price)}₫</p>
                      </div>
                    </Col>
                    <Col xs={3}>
                      <Form.Group className="d-flex align-items-center">
                        <Button variant="outline-secondary" size="sm" onClick={() => handleQuantityChange(item.id, -1)} disabled={item.quantity === 1}>
                          -
                        </Button>
                        <Form.Control type="text" readOnly value={item.quantity} className="text-center mx-2" style={{ width: "40px" }} />
                        <Button variant="outline-secondary" size="sm" onClick={() => handleQuantityChange(item.id, 1)}>
                          +
                        </Button>
                      </Form.Group>
                    </Col>
                    <Col xs={1} className="text-end">
                      <Button variant="danger" size="sm" onClick={() => handleRemoveService(item.id)}>
                        Xóa
                      </Button>
                    </Col>
                  </Row>
                ))}
              </div>
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
