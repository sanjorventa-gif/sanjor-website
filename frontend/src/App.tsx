import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Company from './pages/Company';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Services from './pages/Services';
import DynamicFormPage from './pages/DynamicFormPage';
import Downloads from './pages/Downloads';
import History from './pages/History';
import News from './pages/News';
import Contact from './pages/Contact';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AddProduct from './pages/admin/products/AddProduct';
import EditProduct from './pages/admin/products/EditProduct';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminLayout from './components/layout/AdminLayout';
import Users from './pages/admin/users/Users';
import UserForm from './pages/admin/users/UserForm';
import NewsList from './pages/admin/news/NewsList';
import NewsForm from './pages/admin/news/NewsForm';
import HistoryList from './pages/admin/history/HistoryList';
import HistoryForm from './pages/admin/history/HistoryForm';
import DownloadsList from './pages/admin/downloads/DownloadsList';
import DownloadForm from './pages/admin/downloads/DownloadForm';
import CarouselList from './pages/admin/carousel/CarouselList';
import CarouselForm from './pages/admin/carousel/CarouselForm';
import ServiceRequestForm from './pages/ServiceRequestForm';
import WarrantyForm from './pages/WarrantyForm';
import ServiceRequests from './pages/admin/services/ServiceRequests';
import WarrantyRegistrations from './pages/admin/services/WarrantyRegistrations';

import UserLogin from './pages/auth/UserLogin';
import ForgotPassword from './pages/auth/ForgotPassword';

import { useUI } from './context/UIContext';
import NewsletterDrawer from './components/features/NewsletterDrawer';
import { RecaptchaProvider } from './providers/RecaptchaProvider';
import ScrollToTop from './components/utils/ScrollToTop';
import AdminNewsletter from './pages/admin/newsletter/Newsletter';

function App() {
  const { isNewsletterOpen, onCloseNewsletter } = useUI();

  return (
    <>
      <RecaptchaProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="empresa" element={<Company />} />
            <Route path="historia" element={<History />} />
            <Route path="productos" element={<Products />} />
            <Route path="productos/:category" element={<Products />} />
            <Route path="productos/detalle/:id" element={<ProductDetail />} />
            <Route path="/forms/:slug" element={<DynamicFormPage />} />
            <Route path="servicios" element={<Services />} />
            <Route path="servicios/tecnico" element={<ServiceRequestForm />} />
            <Route path="servicios/garantia" element={<WarrantyForm />} />
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
              <Route path="news" element={<NewsList />} />
              <Route path="news/new" element={<NewsForm />} />
              <Route path="news/edit/:id" element={<NewsForm />} />
              <Route path="history" element={<HistoryList />} />
              <Route path="history/new" element={<HistoryForm />} />
              <Route path="history/edit/:id" element={<HistoryForm />} />
              <Route path="downloads" element={<DownloadsList />} />
              <Route path="downloads/new" element={<DownloadForm />} />
              <Route path="downloads/edit/:id" element={<DownloadForm />} />
              <Route path="carousel" element={<CarouselList />} />
              <Route path="carousel/new" element={<CarouselForm />} />
              <Route path="carousel/edit/:id" element={<CarouselForm />} />
              <Route path="service-requests" element={<ServiceRequests />} />
              <Route path="warranty-registrations" element={<WarrantyRegistrations />} />
              <Route path="newsletter" element={<AdminNewsletter />} />
            </Route>
          </Route>
        </Routes>
        <NewsletterDrawer isOpen={isNewsletterOpen} onClose={onCloseNewsletter} />
      </RecaptchaProvider>
    </>
  );
}

export default App;
