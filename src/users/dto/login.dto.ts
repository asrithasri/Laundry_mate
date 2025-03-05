import { IsString, Length, MinLength } from "class-validator";

export class LoginDto{
    @IsString()
    @Length(10,10 , { message: 'Phone number must be 10 digit' })
    phoneNumber: string;
}