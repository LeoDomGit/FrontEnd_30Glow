/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Container, FormSelect } from "react-bootstrap";
import { Card, Col, Row } from "react-bootstrap";
import Footers from "../../layouts/Footer";
import Headers from "../../layouts/Header";
import CardProduct from "../../components/CardProduct";
import BreadcrumbComponent from "../../components/BreadcrumbComponent";
import Paginated from "../../components/Paginated";
import { Helmet } from "react-helmet";
import axios from "axios";

function Index() {
  const [filter, setFilter] = useState("default");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${page}`);
      const data = response.data.data;
      setProducts(data.data);
      setTotalPage(data.last_page);
      setPage(data.current_page);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Sắp xếp sản phẩm dựa trên giá trị bộ lọc
  const getFilteredProducts = () => {
    let sortedProducts = [...products];
    
    if (filter === "sale") {
      sortedProducts = sortedProducts.filter((product) => product.discount > 0);
    } else if (filter === "high-to-low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (filter === "low-to-high") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (filter === "newest") {
      sortedProducts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    return sortedProducts;
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <>
      <Helmet>
        <title>Sản phẩm - 30GLOW</title>
        <meta name="description" content="meo meo meo" />
      </Helmet>
      <Headers />
      <BreadcrumbComponent props={[{ name: "Sản phẩm", url: "/san-pham" }]} children={null} />
      <Container className="my-3">
        <div className="d-flex justify-content-between mb-3">
          <div className="text-start border-0 rounded-0 border-start border-primary border-5 h-100 mb-3">
            <div className="ms-2">
              <h3 className="mb-0 h3 fw-bold text-uppercase text-primary-emphasis">Sản phẩm</h3>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <span className="me-2">Lọc:</span>
            <FormSelect value={filter} onChange={handleFilterChange} style={{ width: "200px" }}>
              <option value="default">Mặc định</option>
              <option value="high-to-low">Giá cao nhất</option>
              <option value="low-to-high">Giá thấp nhất</option>
              <option value="newest">Sản phẩm mới</option>
              <option value="sale">Sản phẩm có sale</option> {/* Thêm tùy chọn Sale */}
            </FormSelect>
          </div>
        </div>
        {loading ? (
          <p>Đang tải sản phẩm...</p>
        ) : (
          <Row className="row-cols-1 row-cols-lg-5 g-4">
            {getFilteredProducts().length > 0 ? (
              getFilteredProducts().map((product, index) => <CardProduct key={index} {...product} />)
            ) : (
              <h3 className="text-center">Không có sản phẩm</h3>
            )}
          </Row>
        )}
        <Paginated current={page} total={totalPage} handle={handlePageChange} />
      </Container>
      <Container className="my-5">
        <Row className="row-cols-1 row-cols-lg-4 g-4">
          <Col className="d-flex">
            <Card className="border-0 rounded-0 border-bottom border-primary border-3 w-100">
              <Card.Body className="text-center">
                <div className="h1 fw-bold my-2 text-primary">
                  <i className="bi bi-truck" />
                </div>
                <h5 className="fw-bold">Giao hàng siêu tốc 2h</h5>
                <p className="mb-0">Nhận hàng ngay trong 2 giờ! Nhanh chóng, tiện lợi.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col className="d-flex">
            <Card className="border-0 rounded-0 border-bottom border-danger border-3 w-100">
              <Card.Body className="text-center">
                <div className="h1 fw-bold my-2 text-danger">
                  <i className="bi bi-credit-card" />
                </div>
                <h5 className="fw-bold">Bảo hành 3 ngày</h5>
                <p className="mb-0">Không hài lòng? Hoàn tiền 100%!</p>
              </Card.Body>
            </Card>
          </Col>
          <Col className="d-flex">
            <Card className="border-0 rounded-0 border-bottom border-success border-3 w-100">
              <Card.Body className="text-center">
                <div className="h1 fw-bold my-2 text-success">
                  <i className="bi bi-minecart-loaded" />
                </div>
                <h5 className="fw-bold">Đổi trả tận nơi</h5>
                <p className="mb-0">Đổi trả miễn phí, tận nơi. Dễ dàng!</p>
              </Card.Body>
            </Card>
          </Col>
          <Col className="d-flex">
            <Card className="border-0 rounded-0 border-bottom border-warning border-3 w-100">
              <Card.Body className="text-center">
                <div className="h1 fw-bold my-2 text-warning">
                  <i className="bi bi-headset" />
                </div>
                <h5 className="fw-bold">Hỗ trợ 24/7</h5>
                <p className="mb-0">Hỗ trợ khách hàng 24/7</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footers />
    </>
  );
}

export default Index;
