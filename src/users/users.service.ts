import { BadRequestException, Injectable } from '@nestjs/common';
import {  VerifyOtpDto } from './dto/verify-otp.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { LoginDto } from './dto/login.dto';
import { generateAuthToken } from 'src/utils/auth-token';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async generateOtp(): Promise<string> {
    return Math.floor(1000 + Math.random() * 90000).toString();
  }

  async login(loginDto: LoginDto): Promise<{ message: string; otp?: string }> {
    const { phoneNumber } = loginDto;

    let user = await this.userRepository.findOne({ where: { phoneNumber } });
    const otp = await this.generateOtp();

    if (!user) {
      // user = this.userRepository.create({ phoneNumber, otp })
      // await this.userRepository.save(user)
      return { message: "Not a Registed User .",  }
    }

    user.otp = otp;
    await this.userRepository.save(user)
    return { message: "OTP sent for login.", otp: otp }
  }


  async register(registerDto: RegisterDto): Promise<{ message: string; otp?: string }> {
    const { phoneNumber, name } = registerDto;

    let user = await this.userRepository.findOne({ where: { phoneNumber } });

    if (!user) {
      const otp = await this.generateOtp();

   user = this.userRepository.create({ phoneNumber , otp ,name: name || "" });
    await this.userRepository.save(user)
    return { message: "OTP sent for register.",  otp}
    }
    
    return { message: " Already Registed User",  };

  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{ message: string; authToken?: string; }> {
    const { phoneNumber, otp } = verifyOtpDto;

    const user = await this.userRepository.findOne({ where: { phoneNumber } });
    if (!user) throw new BadRequestException('User not found.');

    if (user.otp !== otp) throw new BadRequestException('Invalid OTP.');

    const authToken = generateAuthToken(); // Generate a 16-character token
    return { message: 'OTP verified successfully.', authToken: authToken };

  }


  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  // findAll() {
  //   return `This action returns all users`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }


}
