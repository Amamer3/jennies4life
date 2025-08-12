import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import TodaysSpecials from './components/TodaysSpecials';
import TrendingSections from './components/TrendingSections';
import DealOfDay from './components/DealOfDay';
import Categories from './components/Categories';
import BlogSection from './components/BlogSection';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import ProductPage from './pages/ProductPage';
import ProductsListPage from './pages/ProductsListPage';
import BlogPage from './pages/BlogPage';
import CategoryPage from './pages/CategoryPage';
import AboutPage from './pages/AboutPage';
import DealsPage from './pages/DealsPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductsAdmin from './pages/admin/ProductsAdmin';
import CategoriesAdmin from './pages/admin/CategoriesAdmin';
import DealsAdmin from './pages/admin/DealsAdmin';
import BlogAdmin from './pages/admin/BlogAdmin';
import UsersAdmin from './pages/admin/UsersAdmin';
import AnalyticsAdmin from './pages/admin/AnalyticsAdmin';
import SettingsAdmin from './pages/admin/SettingsAdmin';
import AdminLogin from './pages/admin/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Home Page */}
          <Route path="/" element={
            <div className="min-h-screen bg-gray-50">
              <Header />
              <main>
                <Hero />
                <FeaturedProducts />
                <TrendingSections />
                <TodaysSpecials />
                <DealOfDay />
                <BlogSection />
                <Categories />
                <Newsletter />
              </main>
              <Footer />
            </div>
          } />
          
          {/* Public Routes with Header and Footer */}
          <Route path="/products" element={
            <div className="min-h-screen bg-gray-50">
              <Header />
              <ProductsListPage />
              <Footer />
            </div>
          } />
          <Route path="/products/:id" element={
            <div className="min-h-screen bg-gray-50">
              <Header />
              <ProductPage />
              <Footer />
            </div>
          } />
          <Route path="/product/:slug" element={
            <div className="min-h-screen bg-gray-50">
              <Header />
              <ProductPage />
              <Footer />
            </div>
          } />
          <Route path="/blog" element={
            <div className="min-h-screen bg-gray-50">
              <Header />
              <BlogPage />
              <Footer />
            </div>
          } />
          <Route path="/category/:category" element={
            <div className="min-h-screen bg-gray-50">
              <Header />
              <CategoryPage />
              <Footer />
            </div>
          } />
          <Route path="/about" element={
            <div className="min-h-screen bg-gray-50">
              <Header />
              <AboutPage />
              <Footer />
            </div>
          } />
          <Route path="/deals" element={
            <div className="min-h-screen bg-gray-50">
              <Header />
              <DealsPage />
              <Footer />
            </div>
          } />
          
          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Protected Admin Routes without Header and Footer */}
          <Route path="/admin/*" element={
            <ProtectedRoute>
              <AdminLayout>
                <Routes>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="/products" element={<ProductsAdmin />} />
                  <Route path="/categories" element={<CategoriesAdmin />} />
                  <Route path="/deals" element={<DealsAdmin />} />
                  <Route path="/blog" element={<BlogAdmin />} />
                  <Route path="/users" element={<UsersAdmin />} />
                  <Route path="/analytics" element={<AnalyticsAdmin />} />
                  <Route path="/settings" element={<SettingsAdmin />} />
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          } />
          
          {/* 404 Catch-all Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
