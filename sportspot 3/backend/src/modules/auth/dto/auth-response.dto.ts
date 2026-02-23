import { Exclude } from 'class-transformer';
import { Gender } from '@prisma/client';

export class AuthResponseDto {
  id: string;
  email: string;
  name: string;
  gender: Gender;
  accessToken: string;

  @Exclude()
  password?: string;

  constructor(partial: Partial<AuthResponseDto>) {
    Object.assign(this, partial);
  }
}
