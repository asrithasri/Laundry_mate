import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserAuthService } from './user-auth.service';
import { ServiceProviderAuthService } from './service-provider-auth.service';
import { LoginDto } from 'src/users/dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userAuthService: UserAuthService,
    private readonly serviceProviderAuthService: ServiceProviderAuthService,) { }


  @Post('login')
  async loginOrRegister(@Body() loginDto: LoginDto) {
    const { role } = loginDto;

    if (role === 'user') {
      return this.userAuthService.loginOrRegister(loginDto);

    } else if (role === 'service_provider') {
      return this.serviceProviderAuthService.loginOrRegister(loginDto);

    } else {
      throw new BadRequestException('Invalid role');
    }
  }


  @Post('verify-otp')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    const { role } = verifyOtpDto;

    if (role === 'user') {
      return this.userAuthService.verifyOtp(verifyOtpDto);
    } else if (role === 'service_provider') {
      return this.serviceProviderAuthService.verifyOtp(verifyOtpDto);
    } else {
      throw new BadRequestException('Invalid role');
    }
  }

}






// @Post()
// create(@Body() createAuthDto: CreateAuthDto) {
//   return this.authService.create(createAuthDto);
// }

// @Get()
// findAll() {
//   return this.authService.findAll();
// }

// @Get(':id')
// findOne(@Param('id') id: string) {
//   return this.authService.findOne(+id);
// }

// @Patch(':id')
// update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
//   return this.authService.update(+id, updateAuthDto);
// }

// @Delete(':id')
// remove(@Param('id') id: string) {
//   return this.authService.remove(+id);
// }

