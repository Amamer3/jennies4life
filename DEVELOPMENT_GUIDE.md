# Development Guide - Jennies4Life Platform

This guide provides comprehensive information for developers working on the Jennies4Life platform.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Development Workflow](#development-workflow)
3. [Code Standards](#code-standards)
4. [Architecture Guidelines](#architecture-guidelines)
5. [Testing Strategy](#testing-strategy)
6. [Performance Guidelines](#performance-guidelines)
7. [Security Best Practices](#security-best-practices)
8. [Deployment Process](#deployment-process)
9. [Troubleshooting](#troubleshooting)
10. [Contributing](#contributing)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Git
- Firebase account (for authentication)
- Code editor (VS Code recommended)

### Development Environment Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd jennies4life
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:3001/api
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Access the application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001 (if running locally)

### VS Code Extensions (Recommended)

- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Importer
- Auto Rename Tag
- Bracket Pair Colorizer
- GitLens
- Prettier - Code formatter
- ESLint

## Development Workflow

### Branch Strategy

```
main
├── develop
│   ├── feature/user-authentication
│   ├── feature/product-catalog
│   ├── bugfix/header-responsive
│   └── hotfix/security-patch
```

**Branch Types**:
- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/*`: New features
- `bugfix/*`: Bug fixes
- `hotfix/*`: Critical production fixes

### Commit Convention

Use conventional commits for clear history:

```
type(scope): description

[optional body]

[optional footer]
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples**:
```
feat(auth): add user login functionality
fix(products): resolve pagination issue
docs(readme): update installation instructions
style(components): format code with prettier
```

### Pull Request Process

1. **Create feature branch**:
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Make changes and commit**:
   ```bash
   git add .
   git commit -m "feat(scope): add new feature"
   ```

3. **Push to remote**:
   ```bash
   git push origin feature/new-feature
   ```

4. **Create Pull Request**:
   - Use descriptive title
   - Include detailed description
   - Add screenshots for UI changes
   - Request appropriate reviewers

5. **Code Review**:
   - Address reviewer feedback
   - Update documentation if needed
   - Ensure tests pass

6. **Merge**:
   - Squash and merge for clean history
   - Delete feature branch after merge

## Code Standards

### TypeScript Guidelines

**Interface Naming**:
```typescript
// Use PascalCase for interfaces
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

// Use descriptive names
interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}
```

**Type Definitions**:
```typescript
// Define types in separate files
// src/types/user.ts
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

// Use union types for constants
export type ProductStatus = 'draft' | 'published' | 'archived';

// Use generic types when appropriate
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
```

### Component Guidelines

**Functional Components**:
```typescript
import React from 'react';

interface ComponentProps {
  title: string;
  children: React.ReactNode;
}

const MyComponent: React.FC<ComponentProps> = ({ title, children }) => {
  return (
    <div className="component-wrapper">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default MyComponent;
```

**Custom Hooks**:
```typescript
import { useState, useEffect } from 'react';

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useApi = <T>(url: string): UseApiResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // API logic
  }, [url]);

  return { data, loading, error };
};
```

### CSS/Styling Guidelines

**Tailwind CSS Best Practices**:
```typescript
// Use semantic class groupings
const buttonClasses = [
  // Layout
  'inline-flex items-center justify-center',
  // Spacing
  'px-4 py-2',
  // Typography
  'text-sm font-medium',
  // Colors
  'bg-orange-500 text-white',
  // States
  'hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500',
  // Transitions
  'transition-colors duration-200'
].join(' ');

// Use CSS variables for dynamic values
const dynamicStyles = {
  '--progress-width': `${progress}%`
} as React.CSSProperties;
```

**Component Styling**:
```typescript
// Use className composition
const getButtonClasses = (variant: 'primary' | 'secondary', size: 'sm' | 'md' | 'lg') => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors';
  
  const variantClasses = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;
};
```

### File Organization

```
src/
├── components/
│   ├── common/              # Shared components
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   ├── Header.test.tsx
│   │   │   └── index.ts
│   │   └── Footer/
│   ├── forms/               # Form components
│   └── ui/                  # Basic UI elements
├── pages/                   # Page components
│   ├── admin/
│   └── public/
├── hooks/                   # Custom hooks
├── services/                # API services
├── utils/                   # Utility functions
├── types/                   # Type definitions
├── contexts/                # React contexts
└── assets/                  # Static assets
```

## Architecture Guidelines

### State Management

**Local State**:
```typescript
// Use useState for component-level state
const [isOpen, setIsOpen] = useState(false);
const [formData, setFormData] = useState<FormData>(initialData);
```

**Global State (Context)**:
```typescript
// Use Context for app-wide state
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

**Server State**:
```typescript
// Use custom hooks for server state
const useProducts = (filters: ProductFilters) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchProducts(filters)
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [filters]);
  
  return { products, loading };
};
```

### API Integration

**Service Layer**:
```typescript
// src/services/productApi.ts
const API_BASE = process.env.VITE_API_BASE_URL;

export const productApi = {
  getAll: async (params?: ProductParams): Promise<Product[]> => {
    const response = await fetch(`${API_BASE}/products?${new URLSearchParams(params)}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },
  
  getById: async (id: string): Promise<Product> => {
    const response = await fetch(`${API_BASE}/products/${id}`);
    if (!response.ok) throw new Error('Product not found');
    return response.json();
  },
  
  create: async (product: CreateProductData): Promise<Product> => {
    const response = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    if (!response.ok) throw new Error('Failed to create product');
    return response.json();
  }
};
```

**Error Handling**:
```typescript
// Custom error types
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// Error boundary
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

## Testing Strategy

### Unit Testing

**Component Testing**:
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });
  
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('is accessible', () => {
    render(<Button disabled>Disabled button</Button>);
    const button = screen.getByRole('button');
    
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });
});
```

**Hook Testing**:
```typescript
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter Hook', () => {
  it('initializes with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });
  
  it('increments count', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
});
```

### Integration Testing

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { ProductsPage } from './ProductsPage';

// Mock API
jest.mock('../services/productApi');

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('ProductsPage Integration', () => {
  it('loads and displays products', async () => {
    const mockProducts = [{ id: '1', name: 'Test Product' }];
    (productApi.getAll as jest.Mock).mockResolvedValue(mockProducts);
    
    renderWithProviders(<ProductsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });
  });
});
```

## Performance Guidelines

### Code Splitting

```typescript
// Lazy load pages
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));

// Route-based splitting
const App = () => (
  <Router>
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Suspense>
  </Router>
);
```

### Optimization Techniques

```typescript
// Memoization
const ExpensiveComponent = React.memo(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => expensiveCalculation(item));
  }, [data]);
  
  const handleClick = useCallback((id: string) => {
    // Handle click
  }, []);
  
  return <div>{/* Component content */}</div>;
});

// Virtual scrolling for large lists
const VirtualizedList = ({ items }) => {
  const [visibleItems, setVisibleItems] = useState([]);
  
  useEffect(() => {
    // Calculate visible items based on scroll position
  }, [items]);
  
  return (
    <div className="virtual-list">
      {visibleItems.map(item => (
        <ItemComponent key={item.id} item={item} />
      ))}
    </div>
  );
};
```

### Bundle Optimization

```typescript
// Tree shaking - import only what you need
import { debounce } from 'lodash/debounce';
// Instead of: import _ from 'lodash';

// Dynamic imports for large libraries
const loadChartLibrary = async () => {
  const { Chart } = await import('chart.js');
  return Chart;
};
```

## Security Best Practices

### Authentication

```typescript
// Secure token storage
const tokenStorage = {
  get: () => localStorage.getItem('auth_token'),
  set: (token: string) => localStorage.setItem('auth_token', token),
  remove: () => localStorage.removeItem('auth_token')
};

// API request interceptor
const apiClient = axios.create({
  baseURL: process.env.VITE_API_BASE_URL
});

apiClient.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Input Validation

```typescript
// Client-side validation
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Sanitize user input
const sanitizeInput = (input: string): string => {
  return input.replace(/<script[^>]*>.*?<\/script>/gi, '');
};
```

### Environment Variables

```typescript
// Never commit sensitive data
// Use environment variables for configuration
const config = {
  apiUrl: import.meta.env.VITE_API_BASE_URL,
  firebaseConfig: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    // ... other config
  }
};
```

## Deployment Process

### Build Process

```bash
# Production build
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

### Environment Configuration

```bash
# Development
VITE_API_BASE_URL=http://localhost:3001/api

# Staging
VITE_API_BASE_URL=https://staging-api.jennies4life.com/api

# Production
VITE_API_BASE_URL=https://api.jennies4life.com/api
```

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run type-check
      - run: npm run lint
      - run: npm run test
      - run: npm run build
      - name: Deploy to production
        run: # Deployment commands
```

## Troubleshooting

### Common Issues

**Build Errors**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
npm run dev -- --force
```

**TypeScript Errors**:
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Update type definitions
npm update @types/react @types/react-dom
```

**Performance Issues**:
```bash
# Analyze bundle size
npm run build -- --analyze

# Check for memory leaks
# Use React DevTools Profiler
```

### Debugging

```typescript
// Development debugging
if (import.meta.env.DEV) {
  console.log('Debug info:', data);
}

// Error logging
const logError = (error: Error, context: string) => {
  console.error(`Error in ${context}:`, error);
  // Send to error tracking service
};
```

## Contributing

### Code Review Checklist

- [ ] Code follows style guidelines
- [ ] TypeScript types are properly defined
- [ ] Components are accessible
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] Performance impact is considered
- [ ] Security best practices are followed

### Documentation

- Update README.md for new features
- Add JSDoc comments for complex functions
- Update API documentation
- Include examples in component documentation

---

**Happy coding! 🚀**

For questions or support, please reach out to the development team or create an issue in the repository.