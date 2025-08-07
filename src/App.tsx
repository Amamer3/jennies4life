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
import BlogPage from './pages/BlogPage';
import CategoryPage from './pages/CategoryPage';
import AboutPage from './pages/AboutPage';
import DealsPage from './pages/DealsPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductsAdmin from './pages/admin/ProductsAdmin';
import CategoriesAdmin from './pages/admin/CategoriesAdmin';
import DealsAdmin from './pages/admin/DealsAdmin';
import BlogAdmin from './pages/admin/BlogAdmin';
import UsersAdmin from './pages/admin/UsersAdmin';
import AnalyticsAdmin from './pages/admin/AnalyticsAdmin';
import SettingsAdmin from './pages/admin/SettingsAdmin';

function App() {
  return (
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
        <Route path="/products/:id" element={
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
        
        {/* Admin Routes without Header and Footer */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<ProductsAdmin />} />
        <Route path="/admin/categories" element={<CategoriesAdmin />} />
        <Route path="/admin/deals" element={<DealsAdmin />} />
        <Route path="/admin/blog" element={<BlogAdmin />} />
        <Route path="/admin/users" element={<UsersAdmin />} />
        <Route path="/admin/analytics" element={<AnalyticsAdmin />} />
        <Route path="/admin/settings" element={<SettingsAdmin />} />
        
        {/* 404 Catch-all Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
