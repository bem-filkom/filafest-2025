export interface User {
  userId: string;
  token: string;
}

export interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
