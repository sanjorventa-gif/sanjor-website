import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Company from './pages/Company';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Services from './pages/Services';
import Downloads from './pages/Downloads';
import News from './pages/News';
import Contact from './pages/Contact';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminLayout from './components/layout/AdminLayout';
import Users from './pages/admin/Users';
import UserForm from './pages/admin/UserForm';

import UserLogin from './pages/auth/UserLogin';
import ForgotPassword from './pages/auth/ForgotPassword';

import { useUI } from './context/UIContext';
import NewsletterDrawer from './components/features/NewsletterDrawer';

function App() {
  const { isNewsletterOpen, onCloseNewsletter } = useUI();

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="empresa" element={<Company />} />
          <Route path="productos" element={<Products />} />
          <Route path="productos/:category" element={<Products />} />
          <Route path="productos/detalle/:id" element={<ProductDetail />} />
          <Route path="servicios" element={<Services />} />
          <Route path="descargas" element={<Downloads />} />
          <Route path="novedades" element={<News />} />
          <Route path="contacto" element={<Contact />} />
          <Route path="login" element={<UserLogin />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="new" element={<AddProduct />} />
            <Route path="edit/:id" element={<EditProduct />} />
            <Route path="users" element={<Users />} />
            <Route path="users/new" element={<UserForm />} />
            <Route path="users/edit/:id" element={<UserForm />} />
          </Route>
        </Route>
      </Routes>
      <NewsletterDrawer isOpen={isNewsletterOpen} onClose={onCloseNewsletter} />
    </>
  );
}

export default App;
