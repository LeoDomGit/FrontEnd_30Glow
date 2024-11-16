import React from 'react'
import Header from '../../layouts/Header'
import Footer from '../../layouts/Footer'
import { Link } from 'react-router-dom'

function Notfound() {
  return (
    <>
    <Header />
    <>
  <section className="bg-light">
    <div className="container-fluid">
      <div className="row row-cols-1 justify-content-center py-5">
        <div className="col-xxl-7 mb-4 w-50">
          <div className="lc-block">
            <lottie-player
              src="https://assets9.lottiefiles.com/packages/lf20_u1xuufn3.json"
              className="mx-auto"
              background="transparent"
              speed={1}
              loop=""
              autoPlay=""
            />
          </div>
        </div>
        <div className="col text-center">
          <div className="lc-block">
            <div className="lc-block mb-4">
              <div editable="rich">
                <p className="rfs-11 fw-light">
                  {" "}
                  Trang bạn đang tìm kiếm đã được di chuyển, xóa hoặc có thể không còn tồn tại.
                </p>
              </div>
            </div>
            <div className="lc-block">
              <Link className="btn btn-lg btn-primary" to="/" role="button">
                Về trang chủ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</>

    <Footer />
    </>
  )
}

export default Notfound