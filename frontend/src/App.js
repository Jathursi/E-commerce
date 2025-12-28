import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";


import MainLayout from "./layouts/MainLayout";
import LoginPage from "./features/auth/pages/LoginPage";
import MainPage from "./features/user/pages/MainPage";
import ProductListPage from "./features/products/pages/ProductListPage";
import ProductDetailsPage from "./features/products/pages/ProductDetailsPage";
import CartPage from "./features/cart/pages/CartPage";
import TrackShipping from "./features/orders/pages/TrackShipping";
import OrderSuccessPage from "./features/orders/pages/OrderSuccessPage";


import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import AdminMain from "./features/admin/dashboard/pages/AdminMain";
import AdminProducts from "./features/admin/products/pages/AdminProducts";
import AdminOrders from "./features/admin/orders/pages/AdminOrders";
import AdminUsers from "./features/admin/users/pages/AdminUsers";
import SettingPage from "./features/admin/settings/pages/SettingPage";
import AdminCategory from "./features/admin/category/pages/AdminCategory";
import AnalyticsPage from "./features/admin/analytics/pages/AnalyticsPage";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute roles={["user"]} />}>
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<MainPage />} />
          <Route path="main" element={<MainPage />} />
          <Route path="products" element={<ProductListPage />} />
          <Route path="products/:productId" element={<ProductDetailsPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="track-shipping" element={<TrackShipping />} />
          <Route path="order-success" element={<OrderSuccessPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={["admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminMain />} />
          <Route path="dashboard" element={<AdminMain />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="categories" element={<AdminCategory />} />
          <Route path="settings" element={<SettingPage />} />
          <Route path="reports" element={<AnalyticsPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
