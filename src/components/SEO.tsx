import React from 'react';
import { useHead } from '@unhead/react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  price?: string;
  currency?: string;
  availability?: string;
  brand?: string;
  category?: string;
  rating?: number;
  reviewCount?: number;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Jennies4Life - Premium Lifestyle Products & Reviews',
  description = 'Discover curated lifestyle products, expert reviews, and amazing deals. Your trusted source for quality electronics, fashion, health & wellness products.',
  keywords = 'lifestyle products, product reviews, deals, electronics, fashion, health, wellness, shopping',
  image = '/Jennie4lifelogo.png',
  url = 'https://jennies4life.com',
  type = 'website',
  author = 'Jennies4Life Team',
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  price,
  currency = 'USD',
  availability = 'in stock',
  brand,
  category,
  rating,
  reviewCount
}) => {
  const canonicalUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://jennies4life.com');
  
  // Build structured data
  const structuredData: any = {
    '@context': 'https://schema.org',
    '@type': type === 'product' ? 'Product' : 'WebSite',
    name: title,
    description,
    url: canonicalUrl,
    image
  };

  if (type === 'product' && price) {
    structuredData['@type'] = 'Product';
    structuredData.brand = brand;
    structuredData.category = category;
    structuredData.offers = {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
      availability: `https://schema.org/${availability.replace(' ', '')}`
    };
    
    if (rating && reviewCount) {
      structuredData.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: rating,
        reviewCount
      };
    }
  }

  if (type === 'article') {
    structuredData['@type'] = 'Article';
    structuredData.author = {
      '@type': 'Person',
      name: author
    };
    structuredData.publisher = {
      '@type': 'Organization',
      name: 'Jennies4Life',
      logo: {
        '@type': 'ImageObject',
        url: '/Jennie4lifelogo.png'
      }
    };
    if (publishedTime) structuredData.datePublished = publishedTime;
    if (modifiedTime) structuredData.dateModified = modifiedTime;
    if (section) structuredData.articleSection = section;
    if (tags.length > 0) structuredData.keywords = tags.join(', ');
  }

  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'author', content: author },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      
      // Open Graph
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: 'Jennies4Life' },
      
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      
      // Article specific
      ...(type === 'article' && publishedTime ? [{ property: 'article:published_time', content: publishedTime }] : []),
      ...(type === 'article' && modifiedTime ? [{ property: 'article:modified_time', content: modifiedTime }] : []),
      ...(type === 'article' && section ? [{ property: 'article:section', content: section }] : []),
      ...(type === 'article' && author ? [{ property: 'article:author', content: author }] : []),
      ...tags.map(tag => ({ property: 'article:tag', content: tag })),
      
      // Product specific
      ...(type === 'product' && price ? [{ property: 'product:price:amount', content: price }] : []),
      ...(type === 'product' && currency ? [{ property: 'product:price:currency', content: currency }] : []),
      ...(type === 'product' && availability ? [{ property: 'product:availability', content: availability }] : []),
      ...(type === 'product' && brand ? [{ property: 'product:brand', content: brand }] : []),
      ...(type === 'product' && category ? [{ property: 'product:category', content: category }] : [])
    ],
    link: [
      { rel: 'canonical', href: canonicalUrl },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(structuredData)
      }
    ]
  });

  return null;
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