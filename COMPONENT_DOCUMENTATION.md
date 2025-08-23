# Component Documentation - Jennies4Life Platform

This document provides comprehensive documentation for all major components in the Jennies4Life platform.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Page Components](#page-components)
3. [Common Components](#common-components)
4. [Admin Components](#admin-components)
5. [Context Providers](#context-providers)
6. [Utility Components](#utility-components)
7. [Styling Guidelines](#styling-guidelines)
8. [Best Practices](#best-practices)

## Architecture Overview

The Jennies4Life platform follows a component-based architecture with the following structure:

```
src/
├── components/
│   ├── common/          # Shared UI components
│   ├── forms/           # Form-specific components
│   └── ui/              # Basic UI elements
├── pages/               # Page-level components
│   ├── admin/           # Admin dashboard pages
│   └── public/          # Public-facing pages
├── contexts/            # React Context providers
└── types/               # TypeScript type definitions
```

### Design Principles

- **Component Composition**: Small, reusable components that can be composed together
- **Separation of Concerns**: Clear separation between UI, logic, and data
- **Accessibility First**: All components include proper ARIA labels and keyboard navigation
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript support with proper type definitions

## Page Components

### HomePage
**Location**: `src/App.tsx` (inline component)

**Description**: The main landing page that showcases featured products, blog content, and key sections.

**Features**:
- Hero section with call-to-action
- Featured products carousel
- Trending sections
- Today's specials
- Deal of the day
- Blog section preview
- Product categories
- Newsletter signup

**SEO**: Includes comprehensive meta tags and structured data

### ProductsListPage
**Location**: `src/pages/ProductsListPage.tsx`

**Description**: Displays paginated list of products with filtering and search capabilities.

**Features**:
- Product grid/list view toggle
- Category filtering
- Search functionality
- Sort options (name, price, rating, newest)
- Pagination
- Loading states
- Error handling

**Props**: None (uses URL parameters for state)

### ProductPage
**Location**: `src/pages/ProductPage.tsx`

**Description**: Individual product detail page with comprehensive product information.

**Features**:
- Product image gallery
- Detailed product information
- Affiliate link integration
- Related products
- Reviews and ratings
- Social sharing
- Breadcrumb navigation

**URL Parameters**:
- `:id` - Product ID
- `:slug` - Product slug (alternative route)

### BlogPage
**Location**: `src/pages/BlogPage.tsx`

**Description**: Blog listing page with articles, categories, and search functionality.

**Features**:
- Article grid/list view
- Category filtering
- Search and sort options
- Pagination
- Featured articles
- Tag filtering
- Reading time estimation

**Accessibility**: Full ARIA support, keyboard navigation, screen reader optimized

### AboutPage
**Location**: `src/pages/AboutPage.tsx`

**Description**: Company information, mission, values, and team details.

**Features**:
- Mission statement
- Company values
- Team information
- Call-to-action sections
- Animated content with Framer Motion

## Admin Components

### AdminLogin
**Location**: `src/pages/admin/AdminLogin.tsx`

**Description**: Secure admin authentication page with Firebase integration.

**Features**:
- Username/password authentication
- Form validation
- Error handling
- Loading states
- Password visibility toggle
- Responsive design

**Security**: Integrates with Firebase Auth and backend authentication

### ProductsAdmin
**Location**: `src/pages/admin/ProductsAdmin.tsx`

**Description**: Admin interface for managing products (CRUD operations).

**Features**:
- Product listing with search and filters
- Add/edit product modal
- Delete confirmation
- Image upload handling
- Category assignment
- Status management (published/draft)
- Bulk operations

**Permissions**: Admin role required

### CategoriesAdmin
**Location**: `src/pages/admin/CategoriesAdmin.tsx`

**Description**: Admin interface for managing product categories.

**Features**:
- Category grid/table view
- Add/edit category modal
- Color picker for category themes
- Featured category toggle
- Product count display
- Status management

### AnalyticsAdmin
**Location**: `src/pages/admin/AnalyticsAdmin.tsx`

**Description**: Analytics dashboard with charts and metrics.

**Features**:
- Key performance indicators
- Revenue charts
- Category performance
- Device usage statistics
- Top products list
- Activity feed
- Date range filtering
- Export functionality

**Charts**: Uses custom chart components with accessibility support

### UsersAdmin
**Location**: `src/pages/admin/UsersAdmin.tsx`

**Description**: User management interface for admin users.

**Features**:
- User listing and search
- Add/edit user modal
- Role management
- User status toggle
- Bulk operations
- Activity tracking

## Common Components

### Header
**Location**: `src/components/common/Header.tsx`

**Description**: Main navigation header with responsive design.

**Features**:
- Logo and branding
- Navigation menu
- Search functionality
- User authentication status
- Mobile hamburger menu
- Shopping cart indicator
- Accessibility support

**Responsive**: Collapses to mobile menu on smaller screens

### Footer
**Location**: `src/components/common/Footer.tsx`

**Description**: Site footer with links, social media, and company information.

**Features**:
- Company information
- Quick links
- Social media links
- Newsletter signup
- Copyright information
- Responsive layout

### SEO Component
**Location**: `src/components/common/SEO.tsx`

**Description**: Manages page meta tags and SEO optimization.

**Props**:
```typescript
interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  type?: 'website' | 'article' | 'product';
  image?: string;
  url?: string;
}
```

**Features**:
- Dynamic meta tags
- Open Graph tags
- Twitter Card tags
- Structured data
- Canonical URLs

### ErrorBoundary
**Location**: `src/components/common/ErrorBoundary.tsx`

**Description**: Catches and handles React component errors gracefully.

**Features**:
- Error catching and logging
- Fallback UI display
- Error reporting
- Recovery mechanisms
- Development vs production behavior

### PageLoader
**Location**: `src/components/common/PageLoader.tsx`

**Description**: Loading spinner component for page transitions.

**Features**:
- Animated loading spinner
- Customizable size and color
- Accessibility support
- Smooth transitions

## Context Providers

### AuthProvider
**Location**: `src/contexts/AuthContext.tsx`

**Description**: Manages authentication state throughout the application.

**State**:
```typescript
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  getProfile: () => Promise<User | null>;
  refreshToken: () => Promise<boolean>;
}
```

**Features**:
- Persistent authentication
- Automatic token refresh
- Firebase integration
- Error handling
- Loading states

**Usage**:
```typescript
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  // Component logic
}
```

## Utility Components

### Motion Components
**Usage**: Framer Motion integration for animations

**Common Patterns**:
```typescript
// Fade in animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>

// Stagger children animation
<motion.div
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
  initial="hidden"
  animate="show"
>
  {items.map(item => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Form Components
**Location**: `src/components/forms/`

**Common Form Patterns**:
```typescript
// Input with validation
<div className="space-y-2">
  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
    Email Address
  </label>
  <input
    id="email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
    aria-describedby="email-error"
    aria-invalid={!!emailError}
  />
  {emailError && (
    <p id="email-error" className="text-sm text-red-600">
      {emailError}
    </p>
  )}
</div>
```

## Styling Guidelines

### Tailwind CSS Classes

**Color Palette**:
- Primary: `orange-500`, `orange-600`
- Secondary: `gray-100`, `gray-200`, `gray-300`
- Success: `green-500`, `green-600`
- Error: `red-500`, `red-600`
- Warning: `yellow-500`, `yellow-600`

**Common Patterns**:
```css
/* Card component */
.card {
  @apply bg-white rounded-lg shadow-md p-6 border border-gray-200;
}

/* Button primary */
.btn-primary {
  @apply bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2;
}

/* Input field */
.input-field {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent;
}
```

### Responsive Design

**Breakpoints**:
- `sm`: 640px and up
- `md`: 768px and up
- `lg`: 1024px and up
- `xl`: 1280px and up
- `2xl`: 1536px and up

**Mobile-First Approach**:
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Responsive grid */}
</div>

<div className="text-sm md:text-base lg:text-lg">
  {/* Responsive typography */}
</div>
```

## Accessibility Guidelines

### ARIA Labels
```typescript
// Button with descriptive label
<button
  aria-label="Add product to wishlist"
  className="p-2 rounded-full hover:bg-gray-100"
>
  <Heart className="w-5 h-5" aria-hidden="true" />
</button>

// Form with proper labeling
<div>
  <label htmlFor="search" className="sr-only">
    Search products
  </label>
  <input
    id="search"
    type="search"
    placeholder="Search products..."
    aria-describedby="search-help"
  />
  <div id="search-help" className="sr-only">
    Enter keywords to search for products
  </div>
</div>
```

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Focus indicators are visible
- Tab order is logical
- Escape key closes modals
- Enter key activates buttons

### Screen Reader Support
- Semantic HTML elements
- Proper heading hierarchy
- Alt text for images
- ARIA landmarks
- Live regions for dynamic content

## Best Practices

### Component Structure
```typescript
/**
 * Component documentation
 */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Types
interface ComponentProps {
  // Props definition
}

// Component
const MyComponent: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // State
  const [state, setState] = useState();
  
  // Effects
  useEffect(() => {
    // Effect logic
  }, []);
  
  // Handlers
  const handleAction = () => {
    // Handler logic
  };
  
  // Render
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="component-styles"
    >
      {/* Component content */}
    </motion.div>
  );
};

export default MyComponent;
```

### Performance Optimization
- Use `React.memo()` for expensive components
- Implement lazy loading with `React.lazy()`
- Optimize images with proper sizing
- Use `useMemo()` and `useCallback()` for expensive calculations
- Implement virtual scrolling for large lists

### Error Handling
- Wrap components in ErrorBoundary
- Implement loading and error states
- Provide fallback UI for failed operations
- Log errors for debugging

### Testing
- Write unit tests for utility functions
- Test component rendering and interactions
- Test accessibility features
- Test responsive behavior

---

**Note**: This documentation reflects the current component architecture. Components are continuously updated to improve performance, accessibility, and user experience.