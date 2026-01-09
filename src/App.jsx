import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";

import Home from "./pages/Home";
import Category from "./pages/Category";
import DesignDetail from "./pages/DesignDetail";
import Cart from "./pages/Cart";
import OrderSummary from "./pages/OrderSummary";
import MyOrders from "./pages/MyOrders";
import AdminOrders from "./pages/admin/AdminOrders.jsx";
import Login from "./pages/Login.jsx";
import OrderSuccess from "./pages/OrderSuccess";
import AddDesign from "./pages/admin/AddDesign";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Signup from "./pages/Signup";
import OrderTracking from "./pages/OrderTracking.jsx";
import AdminManageProducts from "./pages/admin/AdminManageProducts.jsx";

const App = () => {
  return (
    <div className="min-h-screen bg-white text-blue-900 font-serif">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/category/:neckType" element={<Category />} />
        <Route path="/design/:designId" element={<DesignDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/order-tracking" element={<OrderTracking />} />
        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/add-design" element={<AddDesign />} />
        <Route path="/admin/manageproducts" element={<AdminManageProducts/>}/>
    
      </Routes>
    </div>
  );
};

export default App;
