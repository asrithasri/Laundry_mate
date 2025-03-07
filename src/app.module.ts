import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { ServiceProviderModule } from './service-provider/service-provider.module';
import { AuthModule } from './auth/auth.module';
import { ServiceProvider } from './service-provider/entities/service-provider.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '2024',
      database: 'garkideal',
      entities: [User,ServiceProvider],
      synchronize: true,
    }),
    UsersModule,
    ServiceProviderModule,
    AuthModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
