import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { AuthModule } from '@/modules/auth/auth.module';
import { PrismaModule } from '@/modules/prisma/prisma.module';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { AllExceptionsFilter } from '@/common/filters/exception.filter';
import { LoggerMiddleware } from '@/common/middleware/logger.middleware';
import { jwtConfig } from '@/config/jwt.config';
import { databaseConfig } from '@/config/database.config';
import { visaGatewayConfig } from '@/config/visa-gateway.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig, databaseConfig, visaGatewayConfig],
    }),
    PrismaModule,
    AuthModule,
    // TODO: Add UsersModule, VenuesModule, MatchesModule, BookingsModule, PaymentsModule, ReviewsModule, AdminModule in Phase 2+
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
