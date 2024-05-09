import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AdminDashBoard from "./pages/AdminDashBoard";
import ExecutiveDashBoard from "./pages/ExecutiveDashBoard";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import Category from "./pages/Category/Category";
import Items from "./pages/Items/Items";
import Purchases from "./pages/Purchases/Purchases";
import ItemStock from "./pages/ItemStock/ItemStock";
import ProductStock from "./pages/ProductStock/ProductStock";
import Seller from "./pages/Seller/Seller";
import Supplies from "./pages/Supplies/Supplies";
import Orders from "./pages/Orders/Orders";
import DashBoard from "./Components/DashBoard/DashBoard";
import EditCategory from "./utils/Modal/Category/EditCategory";
import Supplier from "./pages/Suppliers/Supplier";
import Products from "./pages/Products/Products";
import EditSupplier from "./utils/Modal/Supplier/EditSupplier";
import EditItemsStock from "./utils/Modal/ItemStock/EditItemsStock";
import EditProductStock from "./utils/Modal/ProductStock/EditProductStock";
import EditOrder from "../src/utils/Modal/Order/EditOrder";
import EditSupplies from "./utils/Modal/Supplies/EditSupplies";
import EditSeller from "../src/utils/Modal/Seller/EditSeller";
import EditProduct from "../src/utils/Modal/Products/EditProduct";
import Sales from "./pages/Sales/Sales";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Superstockist from "./pages/SuperStockist/SuperStockist";
import ProductDetails from "./pages/SuperStockist/ProductDetails";
import SuperStockistDashboard from "./pages/SuperStockistDashboard";
import MyOrders from "./pages/MyOrders";
import SuperStockistLogin from "./Components/superStockistComponent/SuperStockistLogin";
import RegisterForm from "./pages/Executive/RegisterForm";

function App() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  return (
    <div className="App">
      <Routes>
        <Route path="/dashboard" element={<DashBoard />} />
        {!email && (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/ForgetPassword" element={<ForgetPassword />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
            <Route path="/stockistLogin" element={<SuperStockistLogin />} />
          </>
        )}
        {email && (
          <>
            <Route path="/adminDashboard" element={<AdminDashBoard />} />
            <Route path="/executiveDashboard" element={<ExecutiveDashBoard />} />
            <Route path="/category" element={<Category />} />
            <Route path="/items" element={<Items />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/itemStock" element={<ItemStock />} />
            <Route path="/itemStock/:id" element={<EditItemsStock />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<EditProduct />} />
            <Route path="/productStock" element={<ProductStock />} />
            <Route path="/productStock/:id" element={<EditProductStock />} />
            <Route path="/seller" element={<Seller />} />
            <Route path="/seller/:id" element={<EditSeller />} />
            <Route path="/supplies" element={<Supplies />} />
            <Route path="/supplier" element={<Supplier />} />
            <Route path="/supplier/:id" element={<EditSupplier />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/category/:id" element={<EditCategory />} />
            <Route path="/orders/:id" element={<EditOrder />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/superStockist" element={<Superstockist />} />
            <Route path="/product-details" element={<ProductDetails />} />
            <Route path="/superStockistDashboard" element={<SuperStockistDashboard />} />
            <Route path="/myOrders" element={<MyOrders />} />
            <Route path="/registerForm" element={<RegisterForm />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
