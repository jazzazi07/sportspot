export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const validatePassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

export const validateGender = (gender: string): boolean => {
  return ['MALE', 'FEMALE'].includes(gender.toUpperCase());
};

export const validateSportType = (sport: string): boolean => {
  return ['FOOTBALL', 'PADEL'].includes(sport.toUpperCase());
};

export const validateGenderType = (genderType: string): boolean => {
  return ['MALE_ONLY', 'FEMALE_ONLY', 'MIXED'].includes(genderType.toUpperCase());
};

export const validateSkillLevel = (level: string): boolean => {
  const validLevels = ['beginner', 'intermediate', 'advanced', 'professional'];
  return validLevels.includes(level.toLowerCase());
};
