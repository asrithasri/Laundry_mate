import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import {  VerifyOtpDto } from './dto/verify-otp.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login (@Body() loginDto: LoginDto){
    console.log(loginDto);
    return this.usersService.login(loginDto)

  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto){
    console.log(registerDto);
    return this.usersService.register(registerDto)
  }


  @Post("verify-otp")
  async verifyOtp (@Body() verifyOtpDto: VerifyOtpDto ){
    console.log(verifyOtpDto);
    return this.usersService.verifyOtp (verifyOtpDto)
    
  }




  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
