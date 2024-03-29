import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { CustomersModule } from '../customers/customers.module'
import { JwtModule } from '@nestjs/jwt'
import { PrismaService } from '../../database/prisma.service'
import { AuthLocalStrategy } from '../auth/authStrategies/auth-local.strategy'
import { AuthJwtStrategy } from '../auth/authStrategies/auth-jwt.strategy'
import { AuthRefreshTokenStrategy } from './authStrategies/auth-refreshToken.strategy'

@Module({
  imports: [
    CustomersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.EXPIRES_IN,
      },
    }),
  ],
  providers: [
    AuthService,
    PrismaService,
    AuthLocalStrategy,
    AuthJwtStrategy,
    AuthRefreshTokenStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
