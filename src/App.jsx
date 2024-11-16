import { Route, Routes } from "react-router-dom";
import "notyf/notyf.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./index.css";
import Home from "./pages/Home/Index";
import Contact from "./pages/Home/Contact";
import Detail from "./pages/Product/Detail";
import Product from "./pages/Product/Index";
import Service from "./pages/Service/Index";
import Show from "./pages/Service/Show";
import GioHang from "./pages/Cart/ServiceCart";
import About from "./pages/Home/About";
import Brand from "./pages/Brand/Index";
import ThanhToan from "./pages/Cart/thanh-toan";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Forgot from "./pages/Auth/Forgot";
import ProductCart from "./pages/Cart/ProductCart";
import ProductPayment from "./pages/Cart/ProductPayment";
import ResetPass from "./pages/Auth/ResetPass";
import Account from "./pages/Profile/Account";
import Notfound from "./pages/Home/Notfound";
import CategoryProducts from "./pages/Product/CategoryProducts";
import { useContext } from "react";
import { AuthenContext } from "./context/AuthenContext";
import Order from "./pages/Profile/Order";

function App() {
  const { user } = useContext(AuthenContext);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gioi-thieu" element={<About />} />
      <Route path="/lien-he" element={<Contact />} />
      <Route path="/dat-lich" element={<GioHang />} />
      <Route path="/gio-hang" element={<ProductCart />} />
      <Route path="/thanh-toan-san-pham" element={<ProductPayment />} />
      <Route path="/san-pham" element={<Product />} />
      <Route path="/thuong-hieu" element={<Brand />} />
      <Route path="/danh-muc/:slug" element={<CategoryProducts />} />
      <Route path="/san-pham/:slug" element={<Detail />} />
      <Route path="/dich-vu" element={<Service />} />
      <Route path="/dich-vu/:slug" element={<Show />} />
      <Route path="/thanh-toan" element={<ThanhToan />} />
      {!user ? (
        <>
          <Route path="/dang-ky" element={<Register />} />
          <Route path="/dang-nhap" element={<Login />} />
        </>
      ) : (
        <>
          <Route path="/tai-khoan" element={<Account />} />
          <Route path="/hoa-don" element={<Order />} />
        </>
      )}
      <Route path="/quen-mat-khau" element={<Forgot />} />
      <Route path="/doi-mat-khau" element={<ResetPass />} />
      <Route path="/*" element={<Notfound />} />
    </Routes>
  );
}

export default App;
