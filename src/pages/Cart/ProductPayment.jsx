import React, { useState, useEffect } from 'react';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import { Col, Container, Row, Form, Button, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { useNavigate } from 'react-router-dom';

function ProductPayment() {
  const navigate = useNavigate();

  const notyf = new Notyf({
    position: {
      x: 'right',
      y: 'top',
    },
  });
  

  // Khởi tạo giỏ hàng
  const [cartItems] = useState(
    [...Array(10)].map((_, idx) => ({
      id: idx + 1,
      name: `Sản phẩm ${idx + 1}`,
      originalPrice: 500000,
      discountPrice: 300000,
      quantity: 1,
    }))
  );

  const [subtotal, setSubtotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(30000);
  const [total, setTotal] = useState(0);

  // Tính toán tổng giá trị giỏ hàng
  useEffect(() => {
    const newSubtotal = cartItems.reduce(
      (sum, item) => sum + item.discountPrice * item.quantity,
      0
    );

    // Nếu tạm tính trên 500,000₫ thì miễn phí vận chuyển
    const newShippingFee = newSubtotal > 500000 ? 0 : 30000;
    setSubtotal(newSubtotal);
    setShippingFee(newShippingFee);
    setTotal(newSubtotal + newShippingFee);
  }, [cartItems]);

  // Tính tổng số lượng sản phẩm
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

//   const handleOrder = () => {
//     // Kiểm tra form và hiển thị thông báo
//     const form = document.querySelector('form');
//     if (form.checkValidity()) {
//       notyf.success('Đặt hàng thành công!');
//       navigate('/');
//     } else {
//       notyf.error('Vui lòng điền đầy đủ thông tin!');
//     }
//   };

const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    commune: '',
    district: '',
    city: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    const namePattern = /^[a-zA-ZÀ-ỹ\s]+$/;
    const phonePattern = /^0\d{9}$/;

    if (!formData.name || !formData.phone || !formData.address || !formData.commune || !formData.district || !formData.city) {
      notyf.error("Vui lòng điền đầy đủ thông tin!");
      return false;
    }

    if (!namePattern.test(formData.name)) {
      notyf.error("Họ và tên không hợp lệ! Vui lòng chỉ nhập chữ cái.");
      return false;
    }

    if (!phonePattern.test(formData.phone)) {
      notyf.error("Số điện thoại không hợp lệ! Vui lòng nhập đủ 10 số bắt đầu từ 0.");
      return false;
    }

    return true;
  };

  const handleOrder = () => {
    if (validateForm()) {
      notyf.success("Đặt hàng thành công!");
      navigate('/');
    }
  };

  return (
    <>
      <Helmet>
        <title>Thanh toán sản phẩm - 30GLOW</title>
        <meta name="description" content="meo meo meo" />
      </Helmet>
      <Header />
      <Container className="my-3 mb-5">
        <Row className="p-3 border rounded">
          <Col md={7} className="border-end pt-1">
            <h4>Thông tin thanh toán</h4>
            <Form className="mt-3" noValidate>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Nhập họ và tên" 
                    required 
                    value={formData.name} 
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control 
                    type="tel" 
                    placeholder="Nhập số điện thoại" 
                    required 
                    value={formData.phone} 
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Nhập địa chỉ" 
                required 
                value={formData.address} 
                onChange={handleInputChange}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="commune">
                  <Form.Label>Xã</Form.Label>
                  <Form.Select required value={formData.commune} onChange={handleInputChange}>
                    <option value="">Chọn xã</option>
                    <option value="Xa1">Xã 1</option>
                    <option value="Xa2">Xã 2</option>
                    <option value="Xa3">Xã 3</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="district">
                  <Form.Label>Quận / Huyện</Form.Label>
                  <Form.Select required value={formData.district} onChange={handleInputChange}>
                    <option value="">Chọn quận/huyện</option>
                    <option value="Quan1">Quận 1</option>
                    <option value="Quan2">Quận 2</option>
                    <option value="Quan3">Quận 3</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="city">
              <Form.Label>Tỉnh / Thành phố</Form.Label>
              <Form.Select required value={formData.city} onChange={handleInputChange}>
                <option value="">Chọn tỉnh/thành phố</option>
                <option value="TPHCM">TP. Hồ Chí Minh</option>
                <option value="HaNoi">Hà Nội</option>
                <option value="DaNang">Đà Nẵng</option>
              </Form.Select>
            </Form.Group>

            {/* Ghi chú đơn hàng */}
            <Form.Group className="mb-3" controlId="formNote">
                <Form.Label>Ghi chú đơn hàng</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Thêm ghi chú nếu có" />
              </Form.Group>

              {/* Hình thức thanh toán */}
              <Form.Group className="mb-3" controlId="formPaymentMethod">
                <Form.Label className="mb-2 fs-5 fw-bold">Hình thức thanh toán</Form.Label>
                <div>
                  <Form.Check 
                    type="radio"
                    label={
                      <>
                        <FontAwesomeIcon icon={faMoneyBillWave} className="me-2 text-success" />
                        Thanh toán khi nhận hàng (COD)
                      </>
                    }
                    name="paymentMethod"
                    id="paymentCOD"
                    className="mb-2"
                    defaultChecked
                  />
                  <Form.Check 
                    type="radio"
                    label={
                      <>
                        <FontAwesomeIcon icon={faCreditCard} className="me-2 text-primary" />
                        Chuyển khoản ngân hàng
                      </>
                    }
                    name="paymentMethod"
                    id="paymentBankTransfer"
                    className="mb-2"
                  />
                </div>
              </Form.Group>

              <p>Thời gian giao hàng từ 3 – 5 ngày đối với ngoại thành</p>
              <p>Giao hàng nhanh trong ngày với khu vực Hồ Chí Minh</p>
          </Form>
          </Col>

          <Col md={5} className="pt-1">
            <h4>Đơn hàng của bạn</h4>
            <p className="text-muted">Tổng sản phẩm: {totalItems}</p>
            <div className="order-summary mt-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {cartItems.map((item) => (
                <Row key={item.id} className="align-items-center mb-3" style={{ borderBottom: '1px solid #dee2e6', width: '500px' }}>
                  <Col xs={3}>
                    <Image
                      src="https://static.30shine.com/shop-admin/2024/01/14/30SF3Q4K-5.jpg"
                      fluid
                      rounded
                    />
                  </Col>
                  <Col xs={6}>
                    <h6>{item.name}</h6>
                    <p className="text-muted mb-1">
                      <del>{item.originalPrice.toLocaleString()}₫</del>
                    </p>
                    <p className="text-danger mb-0">{item.discountPrice.toLocaleString()}₫</p>
                  </Col>
                  <Col xs={3} className="text-end">
                    <p className="mb-0">x{item.quantity}</p>
                  </Col>
                </Row>
              ))}
            </div>
            <hr />

            <Form.Group className="mb-3" controlId="formVoucher">
              <Form.Label className="fs-5 fw-bold">Mã Voucher</Form.Label>
              <div className="d-flex flex-column flex-md-row gap-2">
                <Form.Control className="flex-grow-1" type="text" placeholder="Nhập mã giảm giá" />
                <Button variant="outline-success" className="w-50 w-md-auto">Áp dụng</Button>
              </div>
            </Form.Group>

            <hr />
            <div className="d-flex justify-content-between">
              <h6>Tạm tính</h6>
              <p>{subtotal.toLocaleString()}₫</p>
            </div>
            <div className="d-flex justify-content-between">
              <h6>Phí vận chuyển</h6>
              <p className='text-success'>{shippingFee > 0 ? `${shippingFee.toLocaleString()}₫` : 'Miễn phí'}</p>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <h5>Tổng cộng</h5>
              <h5>{total.toLocaleString()}₫</h5>
            </div>
            <Button variant="primary" className="w-100 mt-3" onClick={handleOrder}>
              Đặt hàng
            </Button>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default ProductPayment;
