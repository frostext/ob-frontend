import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import About from "./pages/about/About";
import Navbar from "./components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./pages/admin/Dashboard/AdminDashboard";
import EditProduct from "./pages/admin/EditProduct/EditProduct";
import ProductDetails from "./pages/details/ProductDetails";
import Cart from "./pages/cart/Cart";
import Order from "./pages/order/Order";
import AdminOrders from "./pages/admin/Orders/AdminOrders";
import Search from "./pages/search/Search";
import ProfilePage from "./pages/profile/ProfilePage";
import SendPasswordReset from "./pages/password_reset/SendPasswordReset";
import AdminRoute from "./protected/AdminRoute";
import UserRoute from "./protected/UserRoute";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <ToastContainer />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* about */}
          <Route path="/about" element={<About />} />
          <Route path="/forgot-password" element={<SendPasswordReset />} />

          <Route element={<UserRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Order />} />
          </Route>

          {/* Admin dashboard */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/edit/:id" element={<EditProduct />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
          </Route>


          <Route path="/products/:id" element={<ProductDetails />} />


          <Route path="/search/:query" element={<Search />} />



          {/* 404 nor found */}
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
