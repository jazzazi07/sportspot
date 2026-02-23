import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { Public } from '@/common/decorators/public.decorator';
import { AllExceptionsFilter } from '@/common/filters/exception.filter';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';

@Controller('auth')
@UseFilters(AllExceptionsFilter)
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * User registration endpoint
   * CRITICAL: User must select gender at signup (MALE or FEMALE)
   * Gender is enforced at database level
   */
  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(registerDto);
  }

  /**
   * User login endpoint
   * Returns JWT token for authenticated requests
   */
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  /**
   * Refresh token endpoint
   * Authenticated users can refresh their JWT token
   */
  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() { token }: { token: string }) {
    return this.authService.refreshToken(token);
  }

  /**
   * Health check endpoint
   */
  @Public()
  @Post('health')
  @HttpCode(HttpStatus.OK)
  health() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
