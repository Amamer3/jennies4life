import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createHead, UnheadProvider } from '@unhead/react/client';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import TodaysSpecials from './components/TodaysSpecials';
import TrendingSections from './components/TrendingSections';
import DealOfDay from './components/DealOfDay';
import Categories from './components/Categories';
import BlogSection from './components/BlogSection';
import Newsletter from './components/Newsletter';
import ProtectedRoute from './components/ProtectedRoute';
import SEO from './components/SEO';

// Lazy load pages for better performance
const ProductPage = React.lazy(() => import('./pages/ProductPage'));
const ProductsListPage = React.lazy(() => import('./pages/ProductsListPage'));
const BlogPage = React.lazy(() => import('./pages/BlogPage'));
const CategoryPage = React.lazy(() => import('./pages/CategoryPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const DealsPage = React.lazy(() => import('./pages/DealsPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

// Lazy load admin components
const AdminLayout = React.lazy(() => import('./components/AdminLayout'));
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'));
const ProductsAdmin = React.lazy(() => import('./pages/admin/ProductsAdmin'));
const CategoriesAdmin = React.lazy(() => import('./pages/admin/CategoriesAdmin'));
const DealsAdmin = React.lazy(() => import('./pages/admin/DealsAdmin'));
const BlogAdmin = React.lazy(() => import('./pages/admin/BlogAdmin'));
const UsersAdmin = React.lazy(() => import('./pages/admin/UsersAdmin'));
const AnalyticsAdmin = React.lazy(() => import('./pages/admin/AnalyticsAdmin'));
const SettingsAdmin = React.lazy(() => import('./pages/admin/SettingsAdmin'));
const AdminLogin = React.lazy(() => import('./pages/admin/AdminLogin'));

// Loading component for Suspense fallbacks
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
  </div>
);

// Create head instance for @unhead/react
const head = createHead();

function App() {
  return (
    <UnheadProvider head={head}>
      <ErrorBoundary>
        <AuthProvider>
          <CartProvider>
            <Router>
              <Routes>
                {/* Home Page */}
                <Route path="/" element={
            <div className="min-h-screen bg-gray-50">
              <SEO 
                title="Jennies4Life - Premium Lifestyle Products & Reviews"
                description="Discover curated lifestyle products, expert reviews, and amazing deals. Your trusted source for quality electronics, fashion, health & wellness products."
                keywords="lifestyle products, product reviews, deals, electronics, fashion, health, wellness, shopping"
                type="website"
                image="/Jennie4lifelogo.png"
              />
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
              <SEO 
                title="All Products - Jennies4Life"
                description="Browse our complete collection of curated lifestyle products. Find electronics, fashion, health & wellness items with expert reviews and ratings."
                keywords="products, shopping, electronics, fashion, health, wellness, lifestyle"
                type="website"
              />
              <Header />
              <Suspense fallback={<PageLoader />}>
                <ProductsListPage />
              </Suspense>
              <Footer />
            </div>
          } />
          <Route path="/products/:id" element={
            <div className="min-h-screen bg-gray-50">
              <Header />
              <Suspense fallback={<PageLoader />}>
                <ProductPage />
              </Suspense>
              <Footer />
            </div>
          } />
          <Route path="/product/:slug" element={
            <div className="min-h-screen bg-gray-50">
              <Header />
              <Suspense fallback={<PageLoader />}>
                <ProductPage />
              </Suspense>
              <Footer />
            </div>
          } />
          <Route path="/blog" element={
            <div className="min-h-screen bg-gray-50">
              <SEO 
                title="Blog - Jennies4Life"
                description="Read expert product reviews, lifestyle tips, and shopping guides. Stay updated with the latest trends and deals in electronics, fashion, and wellness."
                keywords="blog, product reviews, lifestyle tips, shopping guides, trends, deals"
                type="website"
              />
              <Header />
              <Suspense fallback={<PageLoader />}>
                <BlogPage />
              </Suspense>
              <Footer />
            </div>
          } />
          <Route path="/category/:category" element={
            <div className="min-h-screen bg-gray-50">
              <Header />
              <Suspense fallback={<PageLoader />}>
                <CategoryPage />
              </Suspense>
              <Footer />
            </div>
          } />
          <Route path="/about" element={
            <div className="min-h-screen bg-gray-50">
              <SEO 
                title="About Us - Jennies4Life"
                description="Learn about Jennies4Life's mission to provide curated lifestyle products and expert reviews. Discover our story, values, and commitment to quality."
                keywords="about us, company story, mission, values, quality products"
                type="website"
              />
              <Header />
              <Suspense fallback={<PageLoader />}>
                <AboutPage />
              </Suspense>
              <Footer />
            </div>
          } />
          <Route path="/deals" element={
            <div className="min-h-screen bg-gray-50">
              <Header />
              <Suspense fallback={<PageLoader />}>
                <DealsPage />
              </Suspense>
              <Footer />
            </div>
          } />
          
          {/* Admin Login Route */}
          <Route path="/admin/login" element={
            <Suspense fallback={<PageLoader />}>
              <AdminLogin />
            </Suspense>
          } />
          
          {/* Protected Admin Routes without Header and Footer */}
          <Route path="/admin/*" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoader />}>
                <AdminLayout>
                  <Routes>
                    <Route index element={
                      <Suspense fallback={<PageLoader />}>
                        <AdminDashboard />
                      </Suspense>
                    } />
                    <Route path="products" element={
                      <Suspense fallback={<PageLoader />}>
                        <ProductsAdmin />
                      </Suspense>
                    } />
                    <Route path="categories" element={
                      <Suspense fallback={<PageLoader />}>
                        <CategoriesAdmin />
                      </Suspense>
                    } />
                    <Route path="deals" element={
                      <Suspense fallback={<PageLoader />}>
                        <DealsAdmin />
                      </Suspense>
                    } />
                    <Route path="blog" element={
                      <Suspense fallback={<PageLoader />}>
                        <BlogAdmin />
                      </Suspense>
                    } />
                    <Route path="users" element={
                      <Suspense fallback={<PageLoader />}>
                        <UsersAdmin />
                      </Suspense>
                    } />
                    <Route path="analytics" element={
                      <Suspense fallback={<PageLoader />}>
                        <AnalyticsAdmin />
                      </Suspense>
                    } />
                    <Route path="settings" element={
                      <Suspense fallback={<PageLoader />}>
                        <SettingsAdmin />
                      </Suspense>
                    } />
                  </Routes>
                </AdminLayout>
              </Suspense>
            </ProtectedRoute>
          } />
          
          {/* 404 Catch-all Route */}
          <Route path="*" element={
            <Suspense fallback={<PageLoader />}>
              <NotFoundPage />
            </Suspense>
          } />
              </Routes>
            </Router>
            <Toaster position="top-right" />
          </CartProvider>
        </AuthProvider>
      </ErrorBoundary>
    </UnheadProvider>
  );
}

export default App;
