import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../../store/reducers/shoppingCartSlice";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { Helmet } from "react-helmet";
import { Col, Container, Row, Button, Form, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProductCart() {
  const products = useSelector((state) => state.shoppingCart.items);
  const dispatch = useDispatch();

  const subtotal = products.reduce((sum, product) => sum + product.discountPrice * product.quantity, 0);
  const shippingFee = subtotal > 500000 ? 0 : 30000;
  const total = subtotal + shippingFee;
  const totalItems = products.reduce((total, product) => total + product.quantity, 0);

  const handleQuantityChange = (id, change) => {
    if (change > 0) {
      dispatch(increaseQuantity(id));
    } else {
      dispatch(decreaseQuantity(id));
    }
  };

  const handleRemoveProduct = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <Helmet>
        <title>Giỏ hàng sản phẩm - 30GLOW</title>
        <meta name="description" content="meo meo meo" />
      </Helmet>
      <Header />

      <Container className="my-3">
        <Row className="mb-4 p-2">
          <Col md={7} className="border-end pt-1">
            <h4>Giỏ hàng sản phẩm</h4>
            <p className="text-muted">Tổng sản phẩm trong giỏ: {totalItems}</p>
            <div className="overflow-auto" style={{ maxHeight: "380px" }}>
              {products.map((items) => (
                <Row key={items.id} className="mb-3 align-items-center" style={{ width: "720px" }}>
                  <Col xs={3}>
                    <Image src="https://static.30shine.com/shop-admin/2024/01/14/30SF3Q4K-5.jpg" fluid rounded />
                  </Col>
                  <Col xs={5} className="text-start">
                    <h6>{items?.name || "Product Name"}</h6>
                    <div>
                      <p className="mb-0">
                        Giá gốc: <del>{items?.originalPrice?.toLocaleString() || "0"}₫</del>
                      </p>
                      <p className="text-danger fw-bold">Giá giảm: {items?.discountPrice?.toLocaleString() || "0"}₫</p>
                    </div>
                  </Col>
                  <Col xs={3}>
                    <Form.Group className="d-flex align-items-center">
                      <Button variant="outline-secondary" size="sm" onClick={() => handleQuantityChange(items.id, -1)} disabled={items.quantity === 1}>
                        -
                      </Button>
                      <Form.Control type="text" readOnly value={items.quantity} className="text-center mx-2" style={{ width: "40px" }} />
                      <Button variant="outline-secondary" size="sm" onClick={() => handleQuantityChange(items.id, 1)}>
                        +
                      </Button>
                    </Form.Group>
                  </Col>
                  <Col xs={1} className="text-end">
                    <Button variant="danger" size="sm" onClick={() => handleRemoveProduct(items.id)}>
                      Xóa
                    </Button>
                  </Col>
                </Row>
              ))}
            </div>
          </Col>

          <Col md={5} className="pt-1">
            <div className="border rounded p-3">
              <div className="d-flex justify-content-between">
                <h6>Tạm tính</h6>
                <p>{subtotal?.toLocaleString() || "0"}₫</p>
              </div>
              <div className="d-flex justify-content-between">
                <h6>Phí vận chuyển</h6>
                <p>{shippingFee === 0 ? "Miễn phí" : `${shippingFee.toLocaleString()}₫`}</p>
              </div>
              <p className="text-success fw-bold mt-1">Miễn phí vận chuyển với hóa đơn từ 500k</p>
              <hr />
              <div className="d-flex justify-content-between">
                <h5>Tổng cộng</h5>
                <h5 className="fw-bold text-danger">{total.toLocaleString()}₫</h5>
              </div>
              <Button variant="primary" className="w-100 mt-3">
                <Link to="/thanh-toan-san-pham" className="text-decoration-none text-white">
                  Tiến hành thanh toán
                </Link>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default ProductCart;
