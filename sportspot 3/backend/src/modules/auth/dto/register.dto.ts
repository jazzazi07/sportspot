import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { Gender } from '@prisma/client';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  name: string;

  @IsEnum(Gender, { message: 'Gender must be either MALE or FEMALE' })
  gender: Gender;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  skillLevel?: string;
}
