import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsString, Length, MinLength } from "class-validator";

export class LoginDto{
    @IsString()
    @Length(10,10 , { message: 'Phone number must be 10 digit' })
    @ApiProperty()
    phoneNumber: string;


  @IsString()
  @ApiProperty()
  @IsIn(['user', 'service_provider'])
  role: 'user' | 'service_provider';

}
