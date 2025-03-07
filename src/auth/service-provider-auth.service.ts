// src/auth/service-provider-auth.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceProvider } from '../service-provider/entities/service-provider.entity';
import { LoginDto } from 'src/users/dto/login.dto';


@Injectable()
export class ServiceProviderAuthService {
  constructor(
    @InjectRepository(ServiceProvider)
    private readonly serviceProviderRepository: Repository<ServiceProvider>,
  ) {}

  async generateOtp(): Promise<string> {
    return Math.floor(10000 + Math.random() * 90000).toString(); // Generates a 5-digit OTP
  }

  async loginOrRegister(loginDto: LoginDto): Promise<{ message: string; otp: string }> {
    const { phoneNumber } = loginDto;
    let provider = await this.serviceProviderRepository.findOne({ where: { phoneNumber } });

    if (!provider) {
      provider = this.serviceProviderRepository.create({ phoneNumber, otp: await this.generateOtp() });
      await this.serviceProviderRepository.save(provider);
      return { message: 'Service provider registered successfully. OTP sent.', otp: provider.otp };
    }

    provider.otp = await this.generateOtp();
    await this.serviceProviderRepository.save(provider);
    return { message: 'OTP sent for login.', otp: provider.otp };
  }
}
