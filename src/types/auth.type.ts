export interface User {
  id: string;
  email: string;
  role: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean; // Penting untuk protected route
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
