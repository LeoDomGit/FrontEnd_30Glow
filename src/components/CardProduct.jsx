import { Card, Col, Image } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function CardProduct({ name, slug, price, discount, gallery, category }) {
  const sale = price - price * (discount / 100);
  return (
    <>
      <Col>
        <Card className="card h-100">
          <div className="position-relative overflow-hidden">
            {discount > 0 ? (
              <div className="d-flex align-items-center justify-content-center gap-2 mx-auto position-absolute start-0">
                <p className="my-3 h6">
                  <span className="text-bg-danger">
                    <span className="fw-bold m-2">{discount}% OFF</span>
                  </span>
                </p>
              </div>
            ) : null}
            <Link to={`/san-pham/${slug}`}>
              <Image src={import.meta.env.VITE_URL + (gallery?.find((item) => item.status === 1)?.image || "")} width={100} height={300} className="card-img-top" fluid alt={slug} />
            </Link>
          </div>
          <Card.Body>
            <div className="text-start">
              <Link to={`/san-pham/${slug}`} className="text-decoration-none link-underline-opacity-100-hover">
                <h6 className="mb-1 fw-bold text-truncate" title={name}>
                  {name}
                </h6>
              </Link>
              {/* <div className="ratings mb-1 h6">
                <i className="bi bi-star-fill text-warning" />
                <i className="bi bi-star-fill text-warning" />
                <i className="bi bi-star-fill text-warning" />
                <i className="bi bi-star-fill text-warning" />
                <i className="bi bi-star-fill text-warning" />
              </div> */}
              <div className="d-flex align-items-center gap-2 mb-1">
                <span className="fw-semibold text-secondary">Danh mục: {category?.name}</span>
              </div>
              <div className="d-md-flex">
                {discount > 0 ? (
                  <>
                    <p className="me-md-2 mb-0 text-decoration-line-through">
                      {price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                    <p className="fw-bold text-danger">
                      {sale.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </>
                ) : (
                  <p className="fw-bold">
                    {price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                )}
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}

CardProduct.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  gallery: PropTypes.array.isRequired,
  price: PropTypes.number.isRequired,
  discount: PropTypes.string.isRequired,
};
