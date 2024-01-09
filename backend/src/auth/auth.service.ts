import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { AuthSignUpUserDto } from './dto/auth-sign-up-user.dto';
import { AuthSignInUserDto } from './dto/auth-sign-in-user.dto';
import { Role } from './enums/role.enum';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private jwtService: JwtService) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.getUserByEmail(email);
        if (user == null)
            throw new NotFoundException();
        
        const passwordCorrect = await this.userService.comparePassword(pass, user.id);
        if (passwordCorrect) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async signUp(signUpDto: AuthSignUpUserDto): Promise<any> {
        let user = await this.userService.getUserByEmail(signUpDto.email);
        if (user == null) {
            user = new User();
            user.email = signUpDto.email;
            user.name = signUpDto.name;
            user.surname = signUpDto.surname;
            user.phone = signUpDto.phone;
            user.birthDate = signUpDto.birthDate;
            user.type = Role.User;

            await user.setPassword(signUpDto.password);

            user = await this.userService.createUser(user);
            const payload = { sub: user.id, type: user.type };
            return {
                access_token: this.jwtService.sign(payload),
            };
        }
        else {
            throw new NotFoundException();
        }
    }

    async signIn(signInDto: AuthSignInUserDto): Promise<any> {
        const user = await this.userService.getUserByEmail(signInDto.email);
        const payload = { sub: user.id, type: user.type };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}