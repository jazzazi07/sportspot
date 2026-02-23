import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_URL, STORAGE_KEYS } from './constants';

class ApiClient {
  private axiosInstance: AxiosInstance;
  private token: string | null = null;

  constructor() {
    // Initialize axios instance
    this.axiosInstance = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Load token from storage
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    }

    // Add request interceptor for auth
    this.axiosInstance.interceptors.request.use((config) => {
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }
      return config;
    });

    // Add response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Token expired or invalid - clear and redirect to login
          this.clearAuth();
          if (typeof window !== 'undefined') {
            window.location.href = '/auth/login';
          }
        }
        return Promise.reject(error);
      },
    );
  }

  setToken(token: string): void {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    }
  }

  clearAuth(): void {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    }
  }

  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, { params });
    return response.data;
  }

  async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data);
    return response.data;
  }

  async patch<T>(url: string, data?: any): Promise<T> {
    const response = await this.axiosInstance.patch<T>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url);
    return response.data;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// API endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH_REGISTER: '/auth/register',
  AUTH_LOGIN: '/auth/login',
  AUTH_REFRESH: '/auth/refresh',
  AUTH_HEALTH: '/auth/health',

  // Users
  USERS_ME: '/users/me',
  USERS_UPDATE: '/users/me',
  USERS_LIST: '/admin/users',
  USERS_GET: (id: string) => `/users/${id}`,

  // Matches
  MATCHES_LIST: '/matches',
  MATCHES_CREATE: '/matches',
  MATCHES_GET: (id: string) => `/matches/${id}`,
  MATCHES_JOIN: (id: string) => `/matches/${id}/join`,
  MATCHES_LEAVE: (id: string) => `/matches/${id}/leave`,
  MATCHES_CANCEL: (id: string) => `/matches/${id}/cancel`,

  // Venues
  VENUES_LIST: '/venues',
  VENUES_CREATE: '/admin/venues',
  VENUES_GET: (id: string) => `/venues/${id}`,
  VENUES_UPDATE: (id: string) => `/admin/venues/${id}`,

  // Venue Time Slots
  VENUE_SLOTS_LIST: (venueId: string) => `/venues/${venueId}/slots`,
  VENUE_SLOTS_CREATE: (venueId: string) => `/admin/venues/${venueId}/slots`,
  VENUE_SLOTS_UPDATE: (venueId: string, slotId: string) => `/admin/venues/${venueId}/slots/${slotId}`,
  VENUE_SLOTS_DELETE: (venueId: string, slotId: string) => `/admin/venues/${venueId}/slots/${slotId}`,

  // Bookings
  BOOKINGS_LIST: '/bookings',
  BOOKINGS_CREATE: '/bookings',
  BOOKINGS_GET: (id: string) => `/bookings/${id}`,
  BOOKINGS_CANCEL: (id: string) => `/bookings/${id}/cancel`,

  // Payments
  PAYMENTS_INITIATE_MATCH: '/payments/match',
  PAYMENTS_INITIATE_BOOKING: '/payments/booking',
  PAYMENTS_WEBHOOK: '/payments/webhook',
  PAYMENTS_STATUS: (reference: string) => `/payments/status/${reference}`,

  // Reviews
  REVIEWS_CREATE: '/reviews',
  REVIEWS_LIST: (venueId: string) => `/venues/${venueId}/reviews`,

  // Admin
  ADMIN_STATS: '/admin/stats',
  ADMIN_SETTINGS: '/admin/settings',
  ADMIN_SETTINGS_UPDATE: '/admin/settings',
};

export default apiClient;
