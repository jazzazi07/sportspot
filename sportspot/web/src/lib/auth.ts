import { apiClient, API_ENDPOINTS } from './api';
import { AuthResponse, User } from './types';
import { STORAGE_KEYS } from './constants';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
  gender: 'MALE' | 'FEMALE';
  phone?: string;
  skillLevel?: string;
}

class AuthService {
  /**
   * Register a new user
   */
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH_REGISTER,
      credentials,
    );
    if (response.accessToken) {
      apiClient.setToken(response.accessToken);
      this.saveUserData(response);
    }
    return response;
  }

  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH_LOGIN,
      credentials,
    );
    if (response.accessToken) {
      apiClient.setToken(response.accessToken);
      this.saveUserData(response);
    }
    return response;
  }

  /**
   * Logout user
   */
  logout(): void {
    apiClient.clearAuth();
  }

  /**
   * Get current user from storage
   */
  getCurrentUser(): AuthResponse | null {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    return !!token;
  }

  /**
   * Save user data to storage
   */
  private saveUserData(user: AuthResponse): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(
      STORAGE_KEYS.USER_DATA,
      JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
        gender: user.gender,
      }),
    );
  }

  /**
   * Get stored auth token
   */
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }
}

export const authService = new AuthService();

/**
 * Check if user is admin
 */
export const isAdmin = (user: User | AuthResponse | null): boolean => {
  return !!user && 'role' in user && user.role === 'ADMIN';
};

/**
 * Check if user can access gender-specific content
 */
export const canAccessGenderContent = (
  userGender: string,
  contentGenderType: string,
): boolean => {
  if (contentGenderType === 'MIXED') return true;
  if (contentGenderType === 'MALE_ONLY') return userGender === 'MALE';
  if (contentGenderType === 'FEMALE_ONLY') return userGender === 'FEMALE';
  return false;
};

export default authService;
