import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagersService } from './managers.service';
import { ManagersController } from './managers.controller';
import { Manager } from './entities/manager.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Manager]),
    AuthModule,
  ],
  controllers: [ManagersController],
  providers: [ManagersService],
})
export class ManagersModule {}