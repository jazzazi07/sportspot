import { Gender } from '@prisma/client';

export interface JwtPayload {
  sub: string; // user id
  email: string;
  gender: Gender;
  role: string;
  iat?: number;
  exp?: number;
}
