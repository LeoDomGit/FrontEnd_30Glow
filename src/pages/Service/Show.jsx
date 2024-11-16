import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { Container, Row, Col, Button, Nav } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

function Show() {
  const { slug } = useParams();
  const [ChiTietDV, setChiTietDV] = useState(null);
  const [cart, setCart] = useState([]);
  const [bookingCount, setBookingCount] = useState(0); // State để theo dõi số lượng đặt lịch
  const notyf = useRef(new Notyf({ position: { x: "right", y: "top" } }));

  useEffect(() => {
    const fetchChiTietDV = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/services/${slug}`);
        if (response.data?.check) {
          setChiTietDV(response.data.data);
        } else {
          console.error("Dữ liệu không hợp lệ");
          notyf.current.error("Dữ liệu không hợp lệ");
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        notyf.current.error("Có lỗi xảy ra khi tải dữ liệu.");
      }
    };
    fetchChiTietDV();
  }, [slug]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = () => {
    if (!ChiTietDV) return;

    const existingItem = cart.find((item) => item.id === ChiTietDV.id);
    const updatedCart = existingItem ? cart.map((item) => (item.id === ChiTietDV.id ? { ...item, quantity: item.quantity + 1 } : item)) : [...cart, { ...ChiTietDV, quantity: 1 }];

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    notyf.current.success("Đã thêm vào giỏ hàng!");
  };

  const handleDatLich = () => {
    addToCart();
    setBookingCount(bookingCount + 1); // Tăng số lượng đặt lịch khi nhấn "Đặt lịch"
  };
  return (
    <>
      <Helmet>
        <title>{ChiTietDV ? ChiTietDV.name : "Chi tiết dịch vụ"} - 30GLOW</title>
        <meta name="description" content={ChiTietDV?.summary} />
      </Helmet>
      <Header />
      <Container className="my-5 mb-6">
        <Row>
          <Col md={6} className="d-flex flex-column align-items-center">
            <div className="text-center">
              <img
                src={ChiTietDV?.image ? `${import.meta.env.VITE_URL}/${ChiTietDV.image}` : "path/to/default-image.jpg"}
                alt="Hình ảnh"
                style={{
                  maxWidth: "500px",
                  height: "1500px",
                  maxHeight: "500px",
                  objectFit: "contain",
                  marginBottom: "3px",
                }}
                className="mx-auto"
              />
              {/* <div className="d-flex justify-content-center mt-3">
                {ChiTietDV?.gallery?.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Hình ${index + 1}`}
                    style={{
                      width: "130px",
                      height: "127px",
                      objectFit: "cover",
                      margin: "0 5px",
                    }}
                    className="mx-auto"
                  />
                ))}
              </div> */}
            </div>
          </Col>

          <Col md={5}>
            <div className="border p-2">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="text-danger fw-bold mb-0">{ChiTietDV ? ChiTietDV.name : "Tên dịch vụ"}</h4>
                <Button variant="dark" onClick={handleDatLich}>
                  Đặt lịch
                </Button>
              </div>
              {/* 
              // <div className="mt-3">
              //   <p>
              //     Số lần đặt lịch: <span>{bookingCount}</span>
              //   </p>
              // </div> */}
              <div className="d-flex justify-content-between">
                <p className="me-3 text-decoration-line-through">
                  {ChiTietDV
                    ? ChiTietDV.compare_price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })
                    : "..."}
                </p>
                <p className="fw-bold text-danger">
                  Tổng:{" "}
                  {ChiTietDV
                    ? ChiTietDV.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })
                    : "..."}
                </p>
              </div>
              <h4 className="fw-bold text-start mt-2">Nội dung dịch vụ:</h4>
              <div className="text-start">{ChiTietDV ? <p dangerouslySetInnerHTML={{ __html: ChiTietDV.content }} /> : <p>Đang tải nội dung dịch vụ...</p>}</div>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Show;
