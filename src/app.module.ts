import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { ManagersModule } from './managers/managers.module';
import { LocationsModule } from './locations/locations.module';
import { RegionsModule } from './regions/regions.module';
import { ProvidersModule } from './providers/providers.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_KEY, JWT_EXPIRATION } from './auth/constants/jwt.constants';


export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [

    
    ConfigModule.forRoot({
      isGlobal: true,
    }),

   
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'ocso-project',
    }),

    
    TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'TheBestPassword',
  database: process.env.DB_NAME ?? 'postgres',
  autoLoadEntities: true,
  synchronize: true,
}),

    EmployeesModule,
    ProductsModule,
    ManagersModule,
    LocationsModule,
    RegionsModule,
    ProvidersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}