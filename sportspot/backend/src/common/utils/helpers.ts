import { GenderType, Gender } from '@prisma/client';

/**
 * Filter content based on user's gender
 * CRITICAL: This enforces gender visibility rules
 */
export const getVisibleGenderTypes = (userGender: Gender): GenderType[] => {
  if (userGender === Gender.MALE) {
    return ['MALE_ONLY', 'MIXED'] as GenderType[];
  } else if (userGender === Gender.FEMALE) {
    return ['FEMALE_ONLY', 'MIXED'] as GenderType[];
  }
  return [];
};

/**
 * Check if user can access gender-type content
 */
export const canUserAccessGenderType = (
  userGender: Gender,
  contentGenderType: GenderType,
): boolean => {
  const visibleTypes = getVisibleGenderTypes(userGender);
  return visibleTypes.includes(contentGenderType);
};

/**
 * Check if user's gender matches the content's gender requirements
 */
export const canUserJoinGenderContent = (
  userGender: Gender,
  contentGenderType: GenderType,
): boolean => {
  if (contentGenderType === 'MIXED') {
    return true; // Anyone can join mixed
  }
  if (contentGenderType === 'MALE_ONLY') {
    return userGender === Gender.MALE;
  }
  if (contentGenderType === 'FEMALE_ONLY') {
    return userGender === Gender.FEMALE;
  }
  return false;
};

/**
 * Generate a unique reference ID for external services
 */
export const generateReferenceId = (prefix: string): string => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Parse price string to float
 */
export const parsePrice = (price: string | number): number => {
  const parsed = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(parsed)) {
    throw new Error('Invalid price format');
  }
  return Math.round(parsed * 100) / 100; // Round to 2 decimals
};

/**
 * Calculate commission
 */
export const calculateCommission = (
  amount: number,
  commissionPercentage: number,
): number => {
  return Math.round((amount * commissionPercentage) / 100 * 100) / 100;
};

/**
 * Check if an event is in the past
 */
export const isEventInPast = (eventDate: Date): boolean => {
  return new Date(eventDate) < new Date();
};

/**
 * Check if cancellation is allowed based on event date and cutoff hours
 */
export const isCancellationAllowed = (
  eventDate: Date,
  cutoffHours: number = 4,
): boolean => {
  const now = new Date();
  const eventTime = new Date(eventDate).getTime();
  const nowTime = now.getTime();
  const cutoffMs = cutoffHours * 60 * 60 * 1000;

  return eventTime - nowTime > cutoffMs;
};
