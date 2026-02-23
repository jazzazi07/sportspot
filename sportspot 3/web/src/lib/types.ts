// User types
export type Gender = 'MALE' | 'FEMALE';
export type UserRole = 'USER' | 'ADMIN';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'professional';

export interface User {
  id: string;
  email: string;
  name: string;
  gender: Gender;
  role: UserRole;
  skillLevel?: SkillLevel;
  rating: number;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  id: string;
  email: string;
  name: string;
  gender: Gender;
  accessToken: string;
}

// Match types
export type SportType = 'FOOTBALL' | 'PADEL';
export type GenderType = 'MALE_ONLY' | 'FEMALE_ONLY' | 'MIXED';
export type MatchType = 'PUBLIC' | 'PRIVATE' | 'OPEN';
export type MatchStatus = 'DRAFT' | 'OPEN' | 'FULL' | 'COMPLETED' | 'CANCELED';

export interface Match {
  id: string;
  sportType: SportType;
  venueId: string;
  creatorId: string;
  startTime: string;
  endTime: string;
  genderType: GenderType;
  matchType: MatchType;
  totalPlayers: number;
  requiredPlayers: number;
  currentPlayers: number;
  pricePerPlayer: number;
  status: MatchStatus;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

// Venue types
export interface Venue {
  id: string;
  name: string;
  location: string;
  city: string;
  sportTypes: SportType[];
  basePrice: number;
  rating: number;
  contactPerson?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

// Venue Time Slot types
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'REFUNDED';

export interface VenueTimeSlot {
  id: string;
  venueId: string;
  startTime: string;
  endTime: string;
  genderType: GenderType;
  price: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  venueTimeSlotId: string;
  genderType: GenderType;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
}

// Payment types
export type TransactionStatus = 'INITIATED' | 'SUCCESS' | 'FAILED' | 'REFUNDED';

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  paymentProvider: string;
  providerReference: string;
  status: TransactionStatus;
  platformCommission: number;
  commissionPercentage: number;
  createdAt: string;
  updatedAt: string;
}

// Review types
export interface Review {
  id: string;
  userId: string;
  venueId?: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  statusCode: number;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
