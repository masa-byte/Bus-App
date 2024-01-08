import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { AuthSignUpUserDto } from './dto/auth-sign-up-user.dto';
import { AuthSignInUserDto } from './dto/auth-sign-in-user.dto';
import { Role } from './enums/role.enum';
import { UserResolver } from 'src/user/user.resolver';

@Injectable()
export class AuthService {

    constructor(private userResolver: UserResolver, private jwtService: JwtService) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userResolver.userByEmail(email);
        if (user == null)
            throw new NotFoundException();
        
        const passwordCorrect = await this.userResolver.comparePassword(pass, user.id);
        if (passwordCorrect) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async signUp(signUpDto: AuthSignUpUserDto): Promise<any> {
        let user = await this.userResolver.userByEmail(signUpDto.email);
        if (user == null) {
            user = new User();
            user.email = signUpDto.email;
            user.name = signUpDto.name;
            user.surname = signUpDto.surname;
            user.phone = signUpDto.phone;
            user.type = Role.User;

            await user.setPassword(signUpDto.password);

            user = await this.userResolver.createUser(user);
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
        const user = await this.userResolver.userByEmail(signInDto.email);
        const payload = { sub: user.id, type: user.type };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}