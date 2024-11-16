/* eslint-disable*/
import React, { useEffect, useState } from "react";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { Container, Row, Col, Form, Button, Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CardProduct from "../../components/CardProduct";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import BreadcrumbComponent from "../../components/BreadcrumbComponent";
import { A11y, Autoplay, FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/reducers/shoppingCartSlice";

function Detail() {
  const { slug } = useParams();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const shoppingCart = useSelector((state) => state.shoppingCart.items);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    console.log("cart running...");

    const newItem = { id: productDetail.id, quantity: quantity };
    dispatch(addToCart(newItem));
  };
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Nguyễn Huy Hoàng",
      avatar: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png",
      content: "Sản phẩm chất lượng, giá rẻ",
      date: "17/10/2024",
      likes: 0,
      liked: false,
      showReplyInput: false,
      replies: [],
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [replyContent, setReplyContent] = useState({});
  const [productDetail, setProductDetail] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/products/${slug}`)
      .then((res) => {
        setProductDetail(res.data.data);
        setRelatedProducts(res.data.data.related_products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [slug]);

  const handleQuantityChange = (value) => {
    if (quantity + value > 0) setQuantity(quantity + value);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    const trimmedComment = newComment.trim();
  
    // Kiểm tra độ dài tối thiểu
    if (trimmedComment.length < 5) {
      alert("Bình luận quá ngắn. Vui lòng nhập nội dung rõ ràng hơn.");
      return;
    }
    if (!trimmedComment || trimmedComment.length > 500 || /^(.)\1{3,}$/.test(trimmedComment)) {
      alert("Nội dung trả lời không hợp lệ!");
      return;
    }
  
    // Nếu không có vấn đề, thêm bình luận mới
    const newCommentData = {
      id: comments.length + 1,
      name: "Người dùng mới",
      avatar: "https://static.30shine.com/shop-admin/2024/01/14/30SF3Q4K-5.jpg",
      content: trimmedComment,
      date: new Date().toLocaleDateString("vi-VN"),
      likes: 0,
      liked: false,
      showReplyInput: false,
      replies: [],
    };
  
    setComments([newCommentData, ...comments]);
    setNewComment("");
  };
  

  const toggleLike = (id) => {
    setComments(
      comments.map((comment) =>
        comment.id === id
          ? {
              ...comment,
              likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
              liked: !comment.liked,
            }
          : comment
      )
    );
  };

  const toggleReplyInput = (id) => {
    setComments(comments.map((comment) => (comment.id === id ? { ...comment, showReplyInput: !comment.showReplyInput } : comment)));
  };

  const handleReply = (id) => {
    const reply = replyContent[id]?.trim();
  
    // Kiểm tra tính hợp lệ: trả lời không rỗng, không vượt quá 1000 ký tự và không chứa từ vô nghĩa
    if (!reply || reply.length > 500 || /^(.)\1{3,}$/.test(reply)) {
      alert("Nội dung trả lời không hợp lệ!");
      return;
    }
  
    setComments(
      comments.map((comment) =>
        comment.id === id
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  name: "Tên người dùng", // Tên người dùng
                  avatar: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png", // URL avatar
                  content: reply,
                  date: new Date().toLocaleDateString("vi-VN"),
                },
              ],
              showReplyInput: false,
            }
          : comment
      )
    );
    setReplyContent({ ...replyContent, [id]: "" });
  };
  
  const handleDelete = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  const handleDeleteReply = (replyId, commentId) => {
    setComments(prevComments =>
      prevComments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: comment.replies.filter(reply => reply.id !== replyId)
          };
        }
        return comment;
      })
    );
  };
  

  return (
    <>
      <Helmet>
        <title>Chi tiết sản phẩm - 30GLOW</title>
        <meta name="description" content="meo meo meo" />
      </Helmet>
      <Header />
      <BreadcrumbComponent
        props={[
          { name: "Sản phẩm", url: "/san-pham" },
          { name: productDetail.name, url: "/san-pham/" + productDetail.slug },
        ]}
      />
      <Container className="my-5">
        {/* <div className="text-start border-0 rounded-0 border-start border-primary border-5 h-100 mb-3">
          <div className="ms-2">
            <h3 className="mb-0 h3 fw-bold text-primary-emphasis">
              Chi tiết sản phẩm
            </h3>
          </div>
        </div> */}

        <Row className="g-4">
          <Col lg={5}>
            <Swiper
              style={{ "--swiper-navigation-color": "#000000", "--swippagination-color": "#000000" }}
              loop={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[Autoplay, Navigation, Pagination, A11y, FreeMode, Thumbs]}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              navigation={true}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              spaceBetween={10}
              slidesPerView={1}
              className="shadow rounded"
            >
              {productDetail.gallery?.map((image, index) => (
                <SwiperSlide key={index}>
                  <img className="d-block w-100 rounded" src={`${import.meta.env.VITE_URL}${image?.image}`} alt={`Slide ${index + 1}`} />
                </SwiperSlide>
              ))}
            </Swiper>
            {/* <Swiper onSwiper={setThumbsSwiper} loop={true} spaceBetween={10} slidesPerView={2} freeMode={true} watchSlidesProgress={true} modules={[FreeMode, Navigation, Thumbs]} className="mySwiper">
              {productDetail.gallery?.map((image, index) => (
                <SwiperSlide key={index}>
                  <img className="d-block w-100 rounded" src={`${import.meta.env.VITE_URL}${image?.image}`} alt={`Slide ${index + 1}`} />
                </SwiperSlide>
              ))}
            </Swiper> */}
          </Col>

          <Col lg={7} className="d-flex flex-column gap-3">
            <h3 className="text-primary-emphasis fw-bold">{productDetail.name}</h3>

            <div className="d-flex align-items-center gap-3">
              <h4 className="text-danger fw-bold">
                {productDetail.price?.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </h4>
              <p className="fw-bold text-decoration-line-through text-muted mb-0 fs-5">
                {productDetail.price?.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              <Badge bg="success" className="p-2">
                {productDetail.discount}%
              </Badge>
            </div>

            <div className="align-items-center py-0">
              <span className="fw-semibold text-secondary">Số lượng trong kho: {productDetail?.in_stock}</span>
            </div>

            <Form className="d-flex gap-3 mt-3">
              <div className="d-flex align-items-center border rounded">
                <Button variant="light" onClick={() => handleQuantityChange(-1)}>
                  <i class="bi bi-dash-lg" />
                </Button>
                <Form.Control type="text" value={quantity} readOnly className="text-center border-0" style={{ width: "60px" }} />
                <Button variant="light" onClick={() => handleQuantityChange(1)}>
                  <i className="bi bi-plus-lg" />
                </Button>
              </div>
              <Button variant="primary" type="button" className="fw-bold flex-grow-1" onClick={() => handleAddToCart()}>
                Thêm vào giỏ hàng
              </Button>
            </Form>

            <div className="align-items-center py-0">
              <span className="fw-semibold text-secondary">Danh mục: {productDetail.category?.name}</span>
            </div>

            <div className="align-items-center py-0">
              <span className="fw-semibold text-secondary">Thương hiệu: {productDetail.brand?.name}</span>
            </div>

            <div className="d-flex flex-column">
              <h6 className="fw-semibold text-muted" dangerouslySetInnerHTML={{ __html: productDetail.content?.slice(15, 450) }} />
              <a className="text-decoration-none fw-bold text-primary-emphasis" href="#xemthem">...Xem thêm</a>
            </div>
          </Col>
        </Row>

        <hr className="my-4" />
        <Row className="g-3">
          <Col>
            <h3 className="text-primary-emphasis">Mô tả</h3>
            <p className="text-muted" id="xemthem">
              <span dangerouslySetInnerHTML={{ __html: productDetail.content }} />
            </p>
          </Col>
        </Row>

        <div className="text-start border-0 rounded-0 border-start border-primary border-5 h-100 mb-3 mt-4">
          <div className="ms-2">
            <h3 className="mb-0 h3 fw-bold text-primary-emphasis">Bình luận</h3>
          </div>
        </div>

        <Form onSubmit={handleAddComment} className="d-flex mb-4 mt-4">
          <Form.Control type="text" placeholder="Nhập bình luận của bạn..." value={newComment} onChange={(e) => setNewComment(e.target.value)} className="me-2" />
          <Button className="col-2" type="submit" variant="primary">
            Gửi
          </Button>
        </Form>

        <Row>
          <Col>
            {comments.map((comment) => (
              <div key={comment.id} className="mb-4">
                <div className="d-flex align-items-start gap-3">
                  <img src={comment.avatar} alt="Avatar" className="rounded-circle" style={{ width: "50px", height: "50px" }} />
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="fw-bold mb-0">{comment.name}</h6>
                      <small className="text-muted">{comment.date}</small>
                    </div>
                    <p className="mb-1 text-muted">{comment.content}</p>
                    <div className="d-flex gap-3">
                      {/* <Button className="text-decoration-none bg-primary bg-opacity-25" variant="link" size="sm" onClick={() => toggleLike(comment.id)}>
                        {comment.liked ? "Bỏ thích" : "Thích"} ({comment.likes})
                      </Button> */}
                      <Button className="text-decoration-none" variant="link" size="sm" onClick={() => toggleReplyInput(comment.id)}>
                        Trả lời
                      </Button>
                      <Button className="text-danger text-decoration-none" variant="link" size="sm" onClick={() => handleDelete(comment.id)}>
                        Xóa
                      </Button>
                    </div>

                    {comment.replies.map((reply, index) => (
                      <div key={index} className="ms-4 mt-3 d-flex">
                        <img
                          src={reply.avatar} // Hiển thị avatar của người dùng trả lời
                          alt="Avatar"
                          className="rounded-circle me-2"
                          style={{ width: "32px", height: "32px" }}
                        />
                        <div style={{ flex: 1 }}>
                          <h6 className="fw-bold mb-0">{reply.name}</h6> {/* Hiển thị tên người dùng */}
                          <p className="mb-1">{reply.content}</p> {/* Nội dung trả lời */}
                          <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted">{reply.date}</small> {/* Ngày trả lời */}
                            <button
                              className="btn btn-link text-danger p-0 ms-3 text-decoration-none" 
                              onClick={() => handleDeleteReply(reply.id, comment.id)} // Thêm logic xóa khi bấm
                            >
                              Xóa
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {comment.showReplyInput && (
                      <Form
                        className="d-flex mt-2 ms-4"
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleReply(comment.id);
                        }}
                      >
                        <Form.Control
                          type="text"
                          placeholder="Nhập trả lời..."
                          value={replyContent[comment.id] || ""}
                          onChange={(e) =>
                            setReplyContent({
                              ...replyContent,
                              [comment.id]: e.target.value,
                            })
                          }
                          className="me-2"
                        />
                        <Button type="submit" size="sm" variant="secondary">
                          Gửi
                        </Button>
                      </Form>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </Col>
        </Row>
        <div className="text-start border-0 rounded-0 border-start border-primary border-5 mb-3 mt-4">
          <div className="ms-2">
            <h3 className="mb-0 h3 fw-bold text-primary-emphasis">Sản phẩm liên quan</h3>
          </div>
        </div>
        <Row className="row-cols-1 row-cols-lg-5 g-4">
          {relatedProducts.map((product, index) => (
            <CardProduct key={index} {...product} />
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Detail;
