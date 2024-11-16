import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardProduct from "../../components/CardProduct";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Container, Row } from "react-bootstrap";
import BreadcrumbComponent from "../../components/BreadcrumbComponent";

function CategoryProducts() {
  const { slug } = useParams();
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  //   const [page, setPage] = useState(1);
  //   const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + "/categories/" + slug);
        console.log(response.data.data.products);
        setCategory(response.data.data);
        setProducts(response.data.data.products);

        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
      }
    };
    fetchProducts();
  }, [slug]);

  //   const handlePageChange = (newPage) => {
  //     setPage(newPage);
  //   };

  //   const getFilteredProducts = () => {
  //     return products;
  //   };

  return (
    <>
      <Helmet>
        <title>Danh mục - 30GLOW</title>
        <meta name="description" content="meo meo meo" />
      </Helmet>
      <Header />
      <Container className="my-3">
        <BreadcrumbComponent
          props={[
            { name: "Sản phẩm", url: "/san-pham" },
            { name: category.name, url: `/danh-muc/${category.slug}` },
          ]}
        />
        <div className="text-start border-0 rounded-0 border-start border-primary border-5 h-100 mb-3">
          <div className="ms-2">
            <h3 className="mb-0 h3 fw-bold text-uppercase text-primary-emphasis">Danh mục: {category.name}</h3>
          </div>
        </div>
        {loading ? (
          <p>Đang tải sản phẩm...</p>
        ) : (
          <Row className="row-cols-1 row-cols-lg-5 g-4">
            {Object.keys(products).length > 0 ? products.map((product) => <CardProduct key={product.id} {...product} />) : <h3 className="text-center">Không có sản phẩm nào thuộc danh mục này.</h3>}
          </Row>
        )}
        {/* <Paginated current={page} total={totalPage} handle={handlePageChange} /> */}
      </Container>
      <Footer />
    </>
  );
}

export default CategoryProducts;
