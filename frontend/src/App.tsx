import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/public/Home';
import Company from './pages/public/Company';
import Message from './pages/public/Message';
import FamilyCompanies from './pages/public/FamilyCompanies';
import Products from './pages/products/Products';
import BlastSystem from './pages/products/BlastSystem';
import ProductDetail from './pages/products/ProductDetail';
import Services from './pages/services/Services';
import DynamicFormPage from './pages/resources/DynamicFormPage';
import Downloads from './pages/resources/Downloads';
import History from './pages/resources/History';
import Faq from './pages/resources/Faq';
import News from './pages/resources/News';
import NewsDetail from './pages/resources/NewsDetail';
import Contact from './pages/public/Contact';
import ServiceHistory from './pages/services/ServiceHistory';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AddProduct from './pages/admin/products/AddProduct';
import EditProduct from './pages/admin/products/EditProduct';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UserProtectedRoute from './components/auth/UserProtectedRoute';
import RoleProtectedRoute from './components/auth/RoleProtectedRoute';
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
import FaqList from './pages/admin/faqs/FaqList';
import FaqForm from './pages/admin/faqs/FaqForm';
import ServiceRequestForm from './pages/services/ServiceRequestForm';
import WarrantyForm from './pages/services/WarrantyForm';
import ServiceRequests from './pages/admin/services/ServiceRequests';
import WarrantyRegistrations from './pages/admin/services/WarrantyRegistrations';
import WarrantyExtensions from './pages/admin/services/WarrantyExtensions';

import UserLogin from './pages/auth/UserLogin';
import Register from './pages/auth/Register';
import RegisterSuccess from './pages/auth/RegisterSuccess';
import UserDashboard from './pages/user/UserDashboard';
import ForgotPassword from './pages/auth/ForgotPassword';

import { useUI } from './context/UIContext';
import NewsletterDrawer from './components/features/NewsletterDrawer';
import { RecaptchaProvider } from './providers/RecaptchaProvider';
import ScrollToTop from './components/utils/ScrollToTop';
import AdminNewsletter from './pages/admin/newsletter/Newsletter';

import WelcomeModal from './components/features/WelcomeModal';

function App() {
  const { isNewsletterOpen, onCloseNewsletter } = useUI();

  return (
    <>
      <RecaptchaProvider>
        <ScrollToTop />
        <WelcomeModal />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="empresa" element={<Company />} />
            <Route path="mensaje" element={<Message />} />
            <Route path="familias-empresas" element={<FamilyCompanies />} />
            <Route path="historia" element={<History />} />
            {/* <Route path="productos" element={<Products />} /> */}
            {/* <Route path="productos/sistema-blast" element={<BlastSystem />} /> */}
            {/* <Route path="productos/:category" element={<Products />} /> */}
            {/* <Route path="productos/detalle/:id" element={<ProductDetail />} /> */}
            <Route path="/forms/:slug" element={<DynamicFormPage />} />
            <Route path="servicios" element={<Services />} />
            <Route path="servicios/tecnico" element={<ServiceRequestForm />} />
            <Route path="servicios/tecnico" element={<ServiceRequestForm />} />
            <Route path="servicios/registro" element={<WarrantyForm type="standard" />} />
            <Route path="servicios/garantia" element={<WarrantyForm type="extension" />} />
            {/* <Route path="descargas" element={<Downloads />} /> */}
            <Route path="novedades" element={<News />} />
            <Route path="novedades/:slug" element={<NewsDetail />} />
            <Route path="preguntas-frecuentes" element={<Faq />} />
            <Route path="contacto" element={<Contact />} />
            <Route path="login" element={<UserLogin />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="registro-exitoso" element={<RegisterSuccess />} />
            <Route path="mi-cuenta" element={<UserProtectedRoute><UserDashboard /></UserProtectedRoute>} />
            <Route path="mis-solicitudes" element={<UserProtectedRoute><ServiceHistory /></UserProtectedRoute>} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />

          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              {/* Shared Routes (Admin & Technician) */}
              <Route element={<RoleProtectedRoute allowedRoles={['admin', 'servicio_tecnico']} />}>
                <Route path="service-requests" element={<ServiceRequests />} />
                <Route path="warranty-registrations" element={<WarrantyRegistrations />} />
                <Route path="warranty-extensions" element={<WarrantyExtensions />} />
              </Route>

              {/* Admin Only Routes */}
              <Route element={<RoleProtectedRoute allowedRoles={['admin']} />}>
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
                <Route path="faqs" element={<FaqList />} />
                <Route path="faqs/new" element={<FaqForm />} />
                <Route path="faqs/edit/:id" element={<FaqForm />} />
                <Route path="newsletter" element={<AdminNewsletter />} />
              </Route>
            </Route>
          </Route>

          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
        <NewsletterDrawer isOpen={isNewsletterOpen} onClose={onCloseNewsletter} />
      </RecaptchaProvider>
    </>
  );
}

export default App;
