import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { JWT_EXPIRATION } from '../auth/constants/jwt.constants';
import { JWT_KEY } from '../auth/constants/jwt.constants';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([Provider]), JwtModule.register({
    secret: JWT_KEY,
    signOptions: { expiresIn: JWT_EXPIRATION },
  })],
  controllers: [ProvidersController],
  providers: [ProvidersService],
  exports: [ProvidersService, TypeOrmModule],
})
export class ProvidersModule {}
