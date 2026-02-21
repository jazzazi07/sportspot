import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  /**
   * Register a new user
   * CRITICAL: Includes gender field which is enforced at database level
   */
  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const { email, password, name, gender, phone, skillLevel } = registerDto;

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException(`User with email ${email} already exists`);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with gender
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        gender, // Gender is enforced here
        phone,
        skillLevel,
        role: 'USER',
      },
    });

    const accessToken = await this.generateToken(user);

    return new AuthResponseDto({
      id: user.id,
      email: user.email,
      name: user.name,
      gender: user.gender,
      accessToken,
    });
  }

  /**
   * Login user and return JWT token
   */
  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;

    // Find user by email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = await this.generateToken(user);

    return new AuthResponseDto({
      id: user.id,
      email: user.email,
      name: user.name,
      gender: user.gender,
      accessToken,
    });
  }

  /**
   * Generate JWT token
   */
  private async generateToken(user: any): Promise<string> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      gender: user.gender,
      role: user.role,
    };

    return this.jwtService.sign(payload);
  }

  /**
   * Verify JWT token
   */
  async verifyToken(token: string): Promise<JwtPayload> {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  /**
   * Refresh token (placeholder for future implementation)
   */
  async refreshToken(oldToken: string): Promise<{ accessToken: string }> {
    const payload = await this.verifyToken(oldToken);
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const newAccessToken = await this.generateToken(user);
    return { accessToken: newAccessToken };
  }
}
