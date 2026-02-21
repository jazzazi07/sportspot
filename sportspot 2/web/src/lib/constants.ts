export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Gender constants
export const GENDERS = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
} as const;

export const GENDER_LABELS = {
  MALE: 'Male',
  FEMALE: 'Female',
} as const;

// Sport types
export const SPORTS = {
  FOOTBALL: 'FOOTBALL',
  PADEL: 'PADEL',
} as const;

export const SPORT_LABELS = {
  FOOTBALL: '⚽ Football',
  PADEL: '🎾 Padel',
} as const;

// Gender types for matches/venues
export const GENDER_TYPES = {
  MALE_ONLY: 'MALE_ONLY',
  FEMALE_ONLY: 'FEMALE_ONLY',
  MIXED: 'MIXED',
} as const;

export const GENDER_TYPE_LABELS = {
  MALE_ONLY: 'Male Only',
  FEMALE_ONLY: 'Female Only',
  MIXED: 'Mixed',
} as const;

export const GENDER_TYPE_COLORS = {
  MALE_ONLY: 'bg-blue-100 text-blue-800',
  FEMALE_ONLY: 'bg-pink-100 text-pink-800',
  MIXED: 'bg-purple-100 text-purple-800',
} as const;

// Match types
export const MATCH_TYPES = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
  OPEN: 'OPEN',
} as const;

export const MATCH_TYPE_LABELS = {
  PUBLIC: 'Public',
  PRIVATE: 'Private',
  OPEN: 'Open',
} as const;

// Match status
export const MATCH_STATUSES = {
  DRAFT: 'DRAFT',
  OPEN: 'OPEN',
  FULL: 'FULL',
  COMPLETED: 'COMPLETED',
  CANCELED: 'CANCELED',
} as const;

export const MATCH_STATUS_LABELS = {
  DRAFT: 'Draft',
  OPEN: 'Open',
  FULL: 'Full',
  COMPLETED: 'Completed',
  CANCELED: 'Canceled',
} as const;

export const MATCH_STATUS_COLORS = {
  DRAFT: 'bg-gray-100 text-gray-800',
  OPEN: 'bg-green-100 text-green-800',
  FULL: 'bg-yellow-100 text-yellow-800',
  COMPLETED: 'bg-blue-100 text-blue-800',
  CANCELED: 'bg-red-100 text-red-800',
} as const;

// Booking status
export const BOOKING_STATUSES = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELED: 'CANCELED',
  REFUNDED: 'REFUNDED',
} as const;

// Skill levels
export const SKILL_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
  PROFESSIONAL: 'professional',
} as const;

export const SKILL_LEVEL_LABELS = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  professional: 'Professional',
} as const;

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE = 1;

// Toast messages
export const TOAST_MESSAGES = {
  SUCCESS: 'Operation completed successfully',
  ERROR: 'Something went wrong',
  LOGIN_SUCCESS: 'Logged in successfully',
  LOGOUT_SUCCESS: 'Logged out successfully',
  REGISTRATION_SUCCESS: 'Account created successfully',
  VALIDATION_ERROR: 'Please check your input and try again',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'sportspot_auth_token',
  USER_DATA: 'sportspot_user_data',
  THEME: 'sportspot_theme',
} as const;

// Date and time constants
export const TIME_SLOTS = [
  '06:00', '07:00', '08:00', '09:00', '10:00',
  '11:00', '12:00', '13:00', '14:00', '15:00',
  '16:00', '17:00', '18:00', '19:00', '20:00',
  '21:00', '22:00',
] as const;

export const SLOT_DURATION_MINUTES = 60;

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  MATCHES: '/matches',
  MATCH_CREATE: '/matches/create',
  MATCH_DETAIL: (id: string) => `/matches/${id}`,
  VENUES: '/venues',
  VENUE_DETAIL: (id: string) => `/venues/${id}`,
  VENUE_BOOK: (id: string) => `/venues/${id}/book`,
  BOOKINGS: '/bookings',
  ADMIN: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_VENUES: '/admin/venues',
  ADMIN_MATCHES: '/admin/matches',
  ADMIN_BOOKINGS: '/admin/bookings',
  ADMIN_SETTINGS: '/admin/settings',
} as const;

// Regex patterns
export const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^(\+\d{1,3}[- ]?)?\d{1,14}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
} as const;
