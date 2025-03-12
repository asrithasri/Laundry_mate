import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsIn, IsNotEmpty, IsOptional, IsString, Length, MinLength } from "class-validator";


export class RegisterDto {

    @IsString()
    @Length(10, 10, { message: 'Phone number must be 10 digit' })
    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    phoneNumber: string;

    @IsString()
    @ApiProperty()
    name: string;

}