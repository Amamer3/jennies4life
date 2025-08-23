export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  getProfile: () => Promise<User | null>;
  refreshToken: () => Promise<boolean>;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}