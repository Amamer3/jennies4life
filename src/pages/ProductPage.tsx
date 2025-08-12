import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  Heart,
  Share2,
  ShoppingBag,
  Truck,
  Shield,
  RotateCcw,
  Check,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import type { Product } from '../types';
import { publicProductAPI } from '../services/publicProductApi';

// ProductPage component - fetches product data from API

const ProductPage: React.FC = () => {
  const { id, slug } = useParams<{ id?: string; slug?: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let fetchedProduct: Product | null = null;
        
        if (slug) {
          // Fetch product by slug from API
          const response = await publicProductAPI.getProductBySlug(slug);
          if (response.success && response.product) {
            fetchedProduct = response.product;
          } else {
            setError(response.message || 'Product not found');
          }
        } else if (id) {
          // For ID-based routing, try to fetch from API using ID
          // Note: This assumes the API can handle ID-based lookups
          const response = await publicProductAPI.getProducts({ limit: 1000 });
          if (response.success && response.products) {
            fetchedProduct = response.products.find(p => p.id === id) || null;
            if (!fetchedProduct) {
              setError('Product not found');
            }
          } else {
            setError('Failed to load product');
          }
        }
        
        setProduct(fetchedProduct);
      } catch (err) {
        setError('Failed to load product');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id || slug) {
      fetchProduct();
    }
  }, [id, slug]);

  const images = useMemo(() => product?.images || (product?.image ? [product.image] : []), [product]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!product) return;
      
      try {
        // Try to get related products from API
        const allProducts = await publicProductAPI.getProducts({
          category: product.category,
          limit: 5 // Get 5 to exclude current product
        });
        
        // Filter out current product and limit to 4
        const filtered = (allProducts.products || [])
          .filter(p => p.id !== product.id)
          .slice(0, 4);
        
        setRelatedProducts(filtered);
      } catch (error) {
        console.warn('Failed to fetch related products from API:', error);
        setRelatedProducts([]);
      }
    };

    fetchRelatedProducts();
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            {error || 'Product Not Found'}
          </h1>
          <Link
            to="/"
            className="text-blue-500 hover:text-blue-600 text-sm sm:text-base transition-colors"
            aria-label="Return to homepage"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 sm:h-4 sm:w-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : i < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
        aria-hidden="true"
      />
    ));
  };

  const handleImageNavigation = (direction: 'prev' | 'next') => {
    setSelectedImage((prev) =>
      direction === 'prev'
        ? (prev - 1 + images.length) % images.length
        : (prev + 1) % images.length
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500" aria-label="Breadcrumb">
            <Link to="/" className="text-blue-500 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              to={`/category/${product.category.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-blue-500 hover:text-blue-600 transition-colors"
            >
              {product.category}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-gray-900" aria-current="page">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
            role="region"
            aria-labelledby="product-images"
          >
            <h2 id="product-images" className="sr-only">
              Product Images
            </h2>
            {/* Main Image */}
            <div className="relative mb-3 sm:mb-4">
              <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-md">
                <img
                  src={images[selectedImage] || product.image}
                  alt={`${product.name} - Image ${selectedImage + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => handleImageNavigation('prev')}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleImageNavigation('next')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                {images.slice(0, 4).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-1 h-16 sm:h-20 aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === index ? 'border-blue-500' : 'border-gray-200 hover:border-blue-300 hover:scale-105'
                    }`}
                    aria-label={`View image ${index + 1}`}
                    aria-selected={selectedImage === index}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-4 sm:space-y-6"
            role="region"
            aria-labelledby="product-details"
          >
            <h2 id="product-details" className="sr-only">
              Product Details
            </h2>
            {/* Product Title & Rating */}
            <div>
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className="bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium px-2 py-1 rounded-full">
                  {product.category}
                </span>
                {product.isNew && (
                  <span className="bg-green-100 text-green-800 text-xs sm:text-sm font-medium px-2 py-1 rounded-full">
                    New
                  </span>
                )}
                {product.isBestseller && (
                  <span className="bg-orange-100 text-orange-800 text-xs sm:text-sm font-medium px-2 py-1 rounded-full">
                    Bestseller
                  </span>
                )}
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-2 sm:mb-3 hover:text-blue-600 transition-colors">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                  <span className="text-xs sm:text-sm font-medium text-gray-900 ml-1 sm:ml-2">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-xs sm:text-sm text-gray-500">
                  ({product.reviewCount.toLocaleString()} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-sm sm:text-base text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="bg-red-100 text-red-800 text-xs sm:text-sm font-medium px-2 py-1 rounded-full">
                    Save {product.discount}%
                  </span>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div>
              <span
                className={`text-xs sm:text-sm font-medium ${
                  product.inStock ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-800 leading-relaxed max-w-prose">
              {product.description}
            </p>

            {/* Features */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Key Features</h3>
              <ul className="space-y-1 sm:space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" aria-hidden="true" />
                    <span className="text-xs sm:text-sm text-gray-800">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Buy Now Section */}
            <div className="space-y-3 sm:space-y-4">

              <div className="flex gap-2 sm:gap-3">
                <a
                  href={product.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-500 text-white text-xs sm:text-sm font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-blue-600 transition-all duration-200 flex items-center justify-center gap-1 sm:gap-2"
                  aria-label={`Buy ${product.name}`}
                >
                  <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Buy Now</span>
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                </a>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-2 sm:p-3 rounded-lg border-2 transition-all duration-200 ${
                    isWishlisted
                      ? 'border-red-500 bg-red-50 text-red-600'
                      : 'border-gray-300 hover:border-gray-400 text-gray-600'
                  }`}
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
                <button
                  className="p-2 sm:p-3 rounded-lg border-2 border-gray-300 hover:border-gray-400 text-gray-600 transition-all duration-200"
                  aria-label="Share product"
                >
                  <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>

            {/* Shipping & Returns */}
            <div className="bg-white rounded-lg p-4 sm:p-5 border border-gray-100 space-y-2 sm:space-y-3">
              {[
                { icon: <Truck className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />, text: 'Free shipping on orders over $50' },
                { icon: <RotateCcw className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />, text: '30-day return policy' },
                { icon: <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />, text: '2-year warranty included' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-3">
                  {item.icon}
                  <span className="text-xs sm:text-sm text-gray-800">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mt-8 sm:mt-12 lg:mt-16"
            role="region"
            aria-labelledby="related-products"
          >
            <h2 id="related-products" className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-4 sm:mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.slug}`}
                  className="group bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  aria-label={`View product: ${relatedProduct.name}`}
                >
                  <div className="aspect-square bg-white overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      {renderStars(relatedProduct.rating)}
                      <span className="text-xs sm:text-sm text-gray-500">
                        ({relatedProduct.rating.toFixed(1)}, {relatedProduct.reviewCount})
                      </span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <span className="font-bold text-gray-900 text-sm sm:text-base">
                        ${relatedProduct.price.toFixed(2)}
                      </span>
                      {relatedProduct.originalPrice && (
                        <span className="text-xs sm:text-sm text-gray-500 line-through">
                          ${relatedProduct.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;