import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JWT_EXPIRATION, JWT_KEY } from './constants/jwt.constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: JWT_KEY,
      signOptions: { expiresIn: JWT_EXPIRATION },
      }),
    ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}