# Jennies4Life - Premium Lifestyle Products Platform

A modern, responsive e-commerce platform built with React, TypeScript, and Tailwind CSS, featuring product reviews, blog content, and admin management capabilities.

## 🚀 Features

### Public Features
- **Product Catalog**: Browse curated lifestyle products with detailed information
- **Product Reviews**: Expert reviews and ratings for informed purchasing decisions
- **Blog System**: Lifestyle tips, product guides, and trending content
- **Category Filtering**: Organized product browsing by categories
- **Search Functionality**: Find products and content quickly
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **SEO Optimized**: Meta tags, structured data, and performance optimization
- **Accessibility**: WCAG compliant with ARIA labels and keyboard navigation

### Admin Features
- **Product Management**: Add, edit, and manage product listings
- **Category Management**: Organize products into categories
- **Blog Management**: Create and publish blog posts
- **User Management**: Manage user accounts and permissions
- **Analytics Dashboard**: Track performance metrics and user engagement
- **Firebase Authentication**: Secure admin authentication system

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **Authentication**: Firebase Auth
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **SEO**: React Helmet Async
- **HTTP Client**: Fetch API

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Shared components (Header, Footer, etc.)
│   ├── forms/          # Form components
│   └── ui/             # Basic UI elements
├── contexts/           # React Context providers
├── pages/              # Page components
│   ├── admin/          # Admin dashboard pages
│   └── public/         # Public-facing pages
├── services/           # API service layers
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── config/             # Configuration files
└── data/               # Static data and constants
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Firebase project (for authentication)
- Backend API server

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jennies4life
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Configure the following environment variables:
   ```env
   VITE_API_BASE_URL=your_backend_api_url
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### Firebase Setup
Refer to `FIREBASE_AUTH_SETUP.md` for detailed Firebase configuration instructions.

### API Configuration
The application communicates with a backend API. Configure the base URL in your `.env` file.

## 📚 Key Components

### Authentication System
- **AuthContext**: Manages user authentication state
- **Firebase Integration**: Secure token-based authentication
- **Protected Routes**: Admin-only access control

### Product Management
- **Public API**: Read-only product access for public users
- **Admin API**: Full CRUD operations for administrators
- **Category System**: Hierarchical product organization

### Content Management
- **Blog System**: Rich content creation and management
- **SEO Optimization**: Automatic meta tag generation
- **Image Handling**: Optimized image loading and display
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
