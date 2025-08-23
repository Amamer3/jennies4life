import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  siteName?: string;
  locale?: string;
  structuredData?: object;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Royal-lounge - Premium Lifestyle Products & Reviews',
  description = 'Discover premium lifestyle products, honest reviews, and exclusive deals at Jennies4Life. Your trusted source for quality products and lifestyle inspiration.',
  keywords = 'lifestyle products, product reviews, deals, premium products, shopping, lifestyle blog',
  image = '/og-image.jpg',
  url = 'https://www.royal-lounge.org',
  type = 'website',
  author = 'Royal-lounge',
  publishedTime,
  modifiedTime,
  siteName = 'Royal-lounge',
  locale = 'en_US',
  structuredData
}) => {
  const fullTitle = title.includes('Royal-lounge') ? title : `${title} | Royal-lounge`;
  const fullUrl = url.startsWith('http') ? url : `https://www.royal-lounge.org${url}`;
  const fullImage = image.startsWith('http') ? image : `https://www.royal-lounge.org${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@jennies4life" />
      <meta name="twitter:creator" content="@jennies4life" />
      
      {/* Article specific meta tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Default Organization Structured Data */}
      {!structuredData && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Jennies4Life",
            "url": "https://www.royal-lounge.org",
            "logo": "https://www.royal-lounge.org/Jennie4lifelogo.png",
            "description": description,
            "sameAs": [
              "https://facebook.com/jennies4life",
              "https://twitter.com/jennies4life",
              "https://instagram.com/jennies4life"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+233-123-4567",
              "contactType": "customer service",
              "email": "hello@royal-lounge.org"
            }
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

// Helper function to generate product structured data
export const generateProductStructuredData = (product: any) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": product.description,
  "image": product.image,
  "brand": {
    "@type": "Brand",
    "name": product.brand || "Royal-lounge"
  },
  "category": product.category,
  "url": `https://www.royal-lounge.org/products/${product.slug || product.id}`,
  "aggregateRating": product.rating && {
    "@type": "AggregateRating",
    "ratingValue": product.rating,
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": product.reviewCount || 1
  },
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "USD",
    "url": product.affiliateLink
  }
});

// Helper function to generate article structured data
export const generateArticleStructuredData = (article: any) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.excerpt,
  "image": article.image,
  "author": {
    "@type": "Person",
    "name": article.author || "Jennies4Life Team"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Jennies4Life",
    "logo": {
      "@type": "ImageObject",
      "url": "https://jennies4life.com/Jennie4lifelogo.png"
    }
  },
  "datePublished": article.publishedAt,
  "dateModified": article.updatedAt || article.publishedAt,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://www.royal-lounge.org/blog/${article.slug || article.id}`
  }
});