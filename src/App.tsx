import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import Categories from './components/Categories';
import BlogSection from './components/BlogSection';
import Footer from './components/Footer';
import ProductPage from './pages/ProductPage';
import BlogPage from './pages/BlogPage';
import CategoryPage from './pages/CategoryPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={
            <main>
              <Hero />
              <FeaturedProducts />
              <Categories />
              <BlogSection />
            </main>
          } />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
