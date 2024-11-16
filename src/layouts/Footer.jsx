/* eslint-disable*/
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <>
        {/*start footer*/}
        <section className="footer-section bg-section-2 section-padding">
          <div className="container">
            <div className="row row-cols-1 row-cols-lg-4 g-4">
              <div className="col">
                <div className="footer-widget-6">
                  <img src="../src/assets/images/logo30GLOW.png" width={100} className="logo-img mb-3" alt="" />
                  <h5 className="mb-3 fw-bold">Về chúng tôi</h5>
                  <p className="mb-2">Chúng tôi không chỉ là nơi bạn có thể đặt lịch làm tóc để có mái tóc đẹp tự tin, mà còn là địa điểm tuyệt vời để khám phá các sản phẩm chăm sóc tóc và da mặt.</p>
                  <Link className="link-dark" to={"/gioi-thieu"}>Đọc thêm</Link>
                </div>
              </div>
              <div className="col">
                <div className="footer-widget-7">
                  <h5 className="mb-3 fw-bold">Cửa hàng</h5>
                  <ul className="widget-link list-unstyled">
                  <li>
                      <Link className="link-dark text-decoration-none" to={"/"}>Trang chủ</Link>
                    </li>
                    <li>
                      <Link className="link-dark text-decoration-none" to={"/san-pham"}>Sản phẩm</Link>
                    </li>
                    <li>
                      <Link className="link-dark text-decoration-none" to={"/dich-vu"}>Dịch vụ</Link>
                    </li>
                    <li>
                      <Link className="link-dark text-decoration-none" to={"/thuong-hieu"}>Thương hiệu</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col">
                <div className="footer-widget-8">
                  <h5 className="mb-3 fw-bold">Thông tin</h5>
                  <ul className="widget-link list-unstyled">
                    <li>
                      <Link className="link-dark text-decoration-none" to={"/gioi-thieu"}>Giới thiệu</Link >
                    </li>
                    <li>
                      <Link className="link-dark text-decoration-none" to={"/lien-he"}>Liên hệ</Link >
                    </li>
                    <li>
                      <Link className="link-dark text-decoration-none" to={"/tin-tuc"}>Tin tức</Link >
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col">
                <div className="footer-widget-9">
                  <h5 className="mb-3 fw-bold">Theo dõi chúng tôi</h5>
                  {/* <div className="social-link d-flex align-items-center gap-2">
                    <a>
                      <i className="bi bi-facebook" />
                    </a>
                    <a>
                      <i className="bi bi-twitter" />
                    </a>
                    <a>
                      <i className="bi bi-linkedin" />
                    </a>
                    <a>
                      <i className="bi bi-youtube" />
                    </a>
                    <a>
                      <i className="bi bi-instagram" />
                    </a>
                  </div> */}
                  {/* <Row className="justify-content-center"> */}
                    {/* <Col lg={8}> */}
                      <div className="ratio ratio-16x9 mb-2 mt-2">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.7270395810484!2d106.72730731480036!3d10.832619692278672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175274d65c5d21b%3A0x2998b5877b545b04!2zVHLGsOG7nW5nIENhbyDEkMOgbmggRlBUIFBvbHl0ZWNobmlj!5e0!3m2!1sen!2s!4v1697964429726!5m2!1sen!2s"
                          width="600"
                          height="450"
                          style={{ border: 0 }}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                    {/* </Col> */}
                  {/* </Row> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*end footer*/}

        {/*start cart*/}
        <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
          <div className="offcanvas-header bg-section-2">
            <h5 className="mb-0 fw-bold" id="offcanvasRightLabel">
              8 items in the cart
            </h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
          </div>
          <div className="offcanvas-body">
            <div className="cart-list">
              <div className="d-flex align-items-center gap-3">
                <div className="bottom-product-img">
                  <a href="product-details.html">
                    <img src="./src/assets/images/new-arrival/01.webp" width={60} alt="" />
                  </a>
                </div>
                <div>
                  <h6 className="mb-0 fw-light mb-1">Product Name</h6>
                  <p className="mb-0">
                    <strong>1 X $59.00</strong>
                  </p>
                </div>
                <div className="ms-auto fs-5">
                  <a className="link-dark">
                    <i className="bi bi-trash" />
                  </a>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center gap-3">
                <div className="bottom-product-img">
                  <a href="product-details.html">
                    <img src="./src/assets/images/new-arrival/02.webp" width={60} alt="" />
                  </a>
                </div>
                <div>
                  <h6 className="mb-0 fw-light mb-1">Product Name</h6>
                  <p className="mb-0">
                    <strong>1 X $59.00</strong>
                  </p>
                </div>
                <div className="ms-auto fs-5">
                  <a className="link-dark">
                    <i className="bi bi-trash" />
                  </a>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center gap-3">
                <div className="bottom-product-img">
                  <a href="product-details.html">
                    <img src="./src/assets/images/new-arrival/03.webp" width={60} alt="" />
                  </a>
                </div>
                <div>
                  <h6 className="mb-0 fw-light mb-1">Product Name</h6>
                  <p className="mb-0">
                    <strong>1 X $59.00</strong>
                  </p>
                </div>
                <div className="ms-auto fs-5">
                  <a className="link-dark">
                    <i className="bi bi-trash" />
                  </a>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center gap-3">
                <div className="bottom-product-img">
                  <a href="product-details.html">
                    <img src="./src/assets/images/new-arrival/04.webp" width={60} alt="" />
                  </a>
                </div>
                <div>
                  <h6 className="mb-0 fw-light mb-1">Product Name</h6>
                  <p className="mb-0">
                    <strong>1 X $59.00</strong>
                  </p>
                </div>
                <div className="ms-auto fs-5">
                  <a className="link-dark">
                    <i className="bi bi-trash" />
                  </a>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center gap-3">
                <div className="bottom-product-img">
                  <a href="product-details.html">
                    <img src="./src/assets/images/new-arrival/05.webp" width={60} alt="" />
                  </a>
                </div>
                <div>
                  <h6 className="mb-0 fw-light mb-1">Product Name</h6>
                  <p className="mb-0">
                    <strong>1 X $59.00</strong>
                  </p>
                </div>
                <div className="ms-auto fs-5">
                  <a className="link-dark">
                    <i className="bi bi-trash" />
                  </a>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center gap-3">
                <div className="bottom-product-img">
                  <a href="product-details.html">
                    <img src="./src/assets/images/new-arrival/06.webp" width={60} alt="" />
                  </a>
                </div>
                <div>
                  <h6 className="mb-0 fw-light mb-1">Product Name</h6>
                  <p className="mb-0">
                    <strong>1 X $59.00</strong>
                  </p>
                </div>
                <div className="ms-auto fs-5">
                  <a className="link-dark">
                    <i className="bi bi-trash" />
                  </a>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center gap-3">
                <div className="bottom-product-img">
                  <a href="product-details.html">
                    <img src="./src/assets/images/new-arrival/07.webp" width={60} alt="" />
                  </a>
                </div>
                <div>
                  <h6 className="mb-0 fw-light mb-1">Product Name</h6>
                  <p className="mb-0">
                    <strong>1 X $59.00</strong>
                  </p>
                </div>
                <div className="ms-auto fs-5">
                  <a className="link-dark">
                    <i className="bi bi-trash" />
                  </a>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center gap-3">
                <div className="bottom-product-img">
                  <a href="product-details.html">
                    <img src="./src/assets/images/new-arrival/08.webp" width={60} alt="" />
                  </a>
                </div>
                <div>
                  <h6 className="mb-0 fw-light mb-1">Product Name</h6>
                  <p className="mb-0">
                    <strong>1 X $59.00</strong>
                  </p>
                </div>
                <div className="ms-auto fs-5">
                  <a className="link-dark">
                    <i className="bi bi-trash" />
                  </a>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center gap-3">
                <div className="bottom-product-img">
                  <a href="product-details.html">
                    <img src="./src/assets/images/new-arrival/09.webp" width={60} alt="" />
                  </a>
                </div>
                <div>
                  <h6 className="mb-0 fw-light mb-1">Product Name</h6>
                  <p className="mb-0">
                    <strong>1 X $59.00</strong>
                  </p>
                </div>
                <div className="ms-auto fs-5">
                  <a className="link-dark">
                    <i className="bi bi-trash" />
                  </a>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center gap-3">
                <div className="bottom-product-img">
                  <a href="product-details.html">
                    <img src="./src/assets/images/new-arrival/10.webp" width={60} alt="" />
                  </a>
                </div>
                <div>
                  <h6 className="mb-0 fw-light mb-1">Product Name</h6>
                  <p className="mb-0">
                    <strong>1 X $59.00</strong>
                  </p>
                </div>
                <div className="ms-auto fs-5">
                  <a className="link-dark">
                    <i className="bi bi-trash" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="offcanvas-footer p-3 border-top">
            <div className="d-grid">
              <button type="button" className="btn btn-lg btn-dark btn-ecomm px-5 py-3">
                Checkout
              </button>
            </div>
          </div>
        </div>
        {/*end cat*/}
        {/*start quick view*/}
        {/* Modal */}
        <div className="modal fade" id="QuickViewModal" tabIndex={-1}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content rounded-0">
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-12 col-xl-6">
                    <div className="wrap-modal-slider">
                      <div className="slider-for">
                        <div>
                          <img src="./src/assets/images/product-images/01.jpg" alt="" className="img-fluid" />
                        </div>
                        <div>
                          <img src="./src/assets/images/product-images/02.jpg" alt="" className="img-fluid" />
                        </div>
                        <div>
                          <img src="./src/assets/images/product-images/03.jpg" alt="" className="img-fluid" />
                        </div>
                        <div>
                          <img src="./src/assets/images/product-images/04.jpg" alt="" className="img-fluid" />
                        </div>
                      </div>
                      <div className="slider-nav mt-3">
                        <div>
                          <img src="./src/assets/images/product-images/01.jpg" alt="" className="img-fluid" />
                        </div>
                        <div>
                          <img src="./src/assets/images/product-images/02.jpg" alt="" className="img-fluid" />
                        </div>
                        <div>
                          <img src="./src/assets/images/product-images/03.jpg" alt="" className="img-fluid" />
                        </div>
                        <div>
                          <img src="./src/assets/images/product-images/04.jpg" alt="" className="img-fluid" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-xl-6">
                    <div className="product-info">
                      <h4 className="product-title fw-bold mb-1">Check Pink Kurta</h4>
                      <p className="mb-0">Women Pink &amp; Off-White Printed Kurta with Palazzos</p>
                      <div className="product-rating">
                        <div className="hstack gap-2 border p-1 mt-3 width-content">
                          <div>
                            <span className="rating-number">4.8</span>
                            <i className="bi bi-star-fill ms-1 text-success" />
                          </div>
                          <div className="vr" />
                          <div>162 Ratings</div>
                        </div>
                      </div>
                      <hr />
                      <div className="product-price d-flex align-items-center gap-3">
                        <div className="h4 fw-bold">$458</div>
                        <div className="h5 fw-light text-muted text-decoration-line-through">$2089</div>
                        <div className="h4 fw-bold text-danger">(70% off)</div>
                      </div>
                      <p className="fw-bold mb-0 mt-1 text-success">inclusive of all taxes</p>
                      <div className="more-colors mt-3">
                        <h6 className="fw-bold mb-3">More Colors</h6>
                        <div className="d-flex align-items-center gap-2 flex-wrap">
                          <div className="color-box bg-red" />
                          <div className="color-box bg-primary" />
                          <div className="color-box bg-yellow" />
                          <div className="color-box bg-purple" />
                          <div className="color-box bg-green" />
                        </div>
                      </div>
                      <div className="size-chart mt-3">
                        <h6 className="fw-bold mb-3">Select Size</h6>
                        <div className="d-flex align-items-center gap-2 flex-wrap">
                          <div>
                            <button type="button" className="rounded-0">
                              XS
                            </button>
                          </div>
                          <div>
                            <button type="button" className="rounded-0">
                              S
                            </button>
                          </div>
                          <div>
                            <button type="button" className="rounded-0">
                              M
                            </button>
                          </div>
                          <div>
                            <button type="button" className="rounded-0">
                              L
                            </button>
                          </div>
                          <div>
                            <button type="button" className="rounded-0">
                              XL
                            </button>
                          </div>
                          <div>
                            <button type="button" className="rounded-0">
                              XXL
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="cart-buttons mt-3">
                        <div className="buttons d-flex flex-column gap-3 mt-4">
                          <a className="btn btn-lg btn-dark btn-ecomm px-5 py-3 flex-grow-1">
                            <i className="bi bi-basket2 me-2" />
                            Add to Bag
                          </a>
                          <a className="btn btn-lg btn-outline-dark btn-ecomm px-5 py-3">
                            <i className="bi bi-suit-heart me-2" />
                            Wishlist
                          </a>
                        </div>
                      </div>
                      <hr className="my-3" />
                      <div className="product-share">
                        <h6 className="fw-bold mb-3">Share This Product</h6>
                        <div className="d-flex align-items-center gap-2 flex-wrap">
                          <div>
                            <button type="button" className="btn-social bg-twitter">
                              <i className="bi bi-twitter" />
                            </button>
                          </div>
                          <div>
                            <button type="button" className="btn-social bg-facebook">
                              <i className="bi bi-facebook" />
                            </button>
                          </div>
                          <div>
                            <button type="button" className="btn-social bg-linkden">
                              <i className="bi bi-linkedin" />
                            </button>
                          </div>
                          <div>
                            <button type="button" className="btn-social bg-youtube">
                              <i className="bi bi-youtube" />
                            </button>
                          </div>
                          <div>
                            <button type="button" className="btn-social bg-pinterest">
                              <i className="bi bi-pinterest" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*end row*/}
              </div>
            </div>
          </div>
        </div>
        {/*end quick view*/}
        {/*Start Back To Top Button*/}
        <a className="back-to-top">
          <i className="bi bi-arrow-up" />
        </a>
        {/*End Back To Top Button*/}
      </>
    </>
  );
}

export default Footer;
