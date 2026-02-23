import { SetMetadata } from '@nestjs/common';
import { GenderType } from '@prisma/client';

export const GENDER_PROTECTED_KEY = 'genderProtected';

export const GenderProtected = (allowedGenders: GenderType[]) =>
  SetMetadata(GENDER_PROTECTED_KEY, allowedGenders);
