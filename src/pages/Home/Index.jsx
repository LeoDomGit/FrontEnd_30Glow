import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import CardProduct from "../../components/CardProduct";
import CardPost from "../../components/CardPost";
import CardService from "../../components/CardService";
import { Helmet } from "react-helmet";

function Index() {
  const [slideIndex, setSlideIndex] = useState([]);
  const [serviceIndex, setServiceIndex] = useState([]);
  const [productIndex, setProductIndex] = useState([]);

  useEffect(() => {
    // Call API Slides
    const Slide = async () => {
      try {
        await axios
          .get(import.meta.env.VITE_API_URL + "/slides")
          .then((res) => {
            setSlideIndex(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    };

    // Call API Services
    const Service = async () => {
      try {
        await axios
          .get(import.meta.env.VITE_API_URL + "/services/highlighted")
          .then((res) => {
            setServiceIndex(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    };
    // Call API Products
    const Product = async () => {
      try {
        await axios
          .get(import.meta.env.VITE_API_URL + "/products/highlighted")
          .then((res) => {
            setProductIndex(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    };
    Slide();
    Service();
    Product();
  }, []);

  const postList = [
    {
      name: "Bài viết số 1",
      slug: "bai-viet-so-1",
      image: "./src/assets/images/blog/01.webp",
      createdAt: "2024-10-19",
      author: "Nguyễn Văn A",
      content: "Nội dung tóm tắt của bài viết số 1...",
    },
    {
      name: "Hướng dẫn học React",
      slug: "huong-dan-hoc-react",
      image: "./src/assets/images/blog/02.webp",
      createdAt: "2024-10-18",
      author: "Trần Thị B",
      content: "React là một thư viện JavaScript...",
    },
    {
      name: "Khám phá thế giới lập trình",
      slug: "kham-pha-the-gioi-lap-trinh",
      image: "./src/assets/images/blog/03.webp",
      createdAt: "2024-10-17",
      author: "Lê Văn C",
      content: "Lập trình là một lĩnh vực thú vị...",
    },
  ];
  return (
    <>
      <Helmet>
        <title>Trang chủ - 30GLOW</title>
        <meta name="description" content="meo meo meo" />
      </Helmet>
      <Header />
      {/* Start slider section */}
      <section className="p-0 m-0">
        <Swiper
          style={{
            "--swiper-navigation-color": "#000000",
            "--swiper-pagination-color": "#000000",
          }}
          modules={[Autoplay, Navigation, Pagination, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {slideIndex.length > 0 ? (
            slideIndex.map((item, index) => (
              <>
                <SwiperSlide key={index}>
                  <Image src={import.meta.env.VITE_URL + item.desktop} fluid className="w-100 height-100" alt={item.name} />
                </SwiperSlide>
              </>
            ))
          ) : (
            <SwiperSlide>
              <Image src="https://storage.30shine.com/banner/2024/20240717_banner_khumui_w.jpg" fluid className="w-100 height-100" alt="Slide 1" />
            </SwiperSlide>
          )}
        </Swiper>
      </section>
      {/* End slider section */}

      {/* Start buy section */}
      <Container className="my-2">
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
        {/*end row*/}
      </Container>
      {/* End buy section */}

      {/* Start service section */}
      <Container className="my-5">
        <div className="text-start border-0 rounded-0 border-start border-primary border-5 h-100 mb-3">
          <div className="ms-2">
            <h3 className="mb-0 h3 fw-bold text-uppercase text-primary-emphasis">DỊCH VỤ HOT</h3>
          </div>
        </div>
        <Row className="row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-4 row-cols-xl-5 g-4">
          {serviceIndex && serviceIndex.length > 0 ? serviceIndex.map((item, index) => <CardService key={index} {...item} />) : <h3 className="text-center pt-3">Không có dịch vụ</h3>}
        </Row>
      </Container>
      {/* End service section */}

      {/* Start product section */}
      <Container className="my-5">
        <div className="text-start border-0 rounded-0 border-start border-primary border-5 h-100 mb-3">
          <div className="ms-2">
            <h3 className="mb-0 h3 fw-bold text-uppercase text-primary-emphasis">SẢN PHẨM BÁN CHẠY</h3>
          </div>
        </div>
        <Row className="row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-4 row-cols-xl-5 g-4">
          {productIndex.length > 0 ? productIndex.map((product, index) => <CardProduct key={index} {...product} />) : <h3 className="text-center">Không có sản phẩm</h3>}
        </Row>
      </Container>
      {/* End product section */}

      {/* Start banner section */}
      <Container className="my-5">
        <Row className="row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2 g-4">
          <Image src="https://www.theskinfit.com/uploads/brand_banner/lAROCHE.jpg" className="img-fluid w-100" style={{ height: "320px" }} alt="banner" />
        </Row>
      </Container>
      {/* End banner section */}

      {/* Start Post */}
      <Container className="my-5">
        <div className="text-start border-0 rounded-0 border-start border-primary border-5 h-100 mb-3">
          <div className="ms-2">
            <h3 className="mb-0 h3 fw-bold text-uppercase text-primary-emphasis">Tin tức mới nhất về 30Glow</h3>
          </div>
        </div>

        <Row className="row-cols-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-3 g-4">
          {postList ? postList.map((post, index) => <CardPost key={index} {...post} />) : <h3 className="text-center">Không có bài đăng</h3>}
        </Row>
        {/*end row*/}
      </Container>
      {/* End Post */}

      <Footer />
    </>
  );
}

export default Index;
