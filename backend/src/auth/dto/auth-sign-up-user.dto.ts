import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthSignUpUserDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsString()
    name: string;

    @IsString()
    surname: string;

    @IsString()
    phone: string;

    birthDate: Date;
}