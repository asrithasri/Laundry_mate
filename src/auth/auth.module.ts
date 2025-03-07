import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { ServiceProvider } from 'src/service-provider/entities/service-provider.entity';
import {ServiceProviderAuthService} from './service-provider-auth.service';
import { UserAuthService} from './user-auth.service'

@Module({
  imports: [TypeOrmModule.forFeature([User,ServiceProvider])],
  controllers: [AuthController],
  providers: [UserAuthService,ServiceProviderAuthService],
})
export class AuthModule {}
