import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminLayout from './admin/components/AdminLayout'
import AdminDashboard from './admin/pages/AdminDashboard'
import ProductManagement from './admin/pages/ProductManagement'
import UserManagement from './admin/pages/UserManagement'
import OrderManagement from './admin/pages/OrderManagement'
import StoreFront from './pages/StoreFront'
import ProductDetails from './pages/ProductDetails.jsx'
import LoginPage from './pages/LoginPage'
import AdminRoute from './components/AdminRoute'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="orders" element={<OrderManagement />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* Public Store Routes */}
        <Route path="/" element={<StoreFront />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
