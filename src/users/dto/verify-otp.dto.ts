import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsIn, IsNotEmpty, IsString, Length, MinLength } from "class-validator";


export class VerifyOtpDto {

    @IsString()
    @Length(10, 10, { message: 'Phone number must be 10 digit' })
    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    phoneNumber: string;

    @ApiProperty()
    @IsString()
    otp: string
   



}

