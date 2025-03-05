import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository <User>
  ) {}

  async generateOtp(): Promise<string>
  {
  return Math.floor(1000 + Math.random() * 90000 ).toString();
  }

  async loginOrRegister(loginDto: LoginDto): Promise<{  message: string; otp: string}>
{
  const { phoneNumber } = loginDto;
  let user = await this.userRepository.findOne({where : {phoneNumber}});
  const otp = await this.generateOtp();

  if(!user){
    user=this.userRepository.create({phoneNumber,otp })
    await this.userRepository.save(user)
    return {message: "User registered Successfully. OTP sent.", otp}
  }

  user.otp=otp;
  await this.userRepository.save(user)
  return { message : "OTP sent for login.", otp}
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
