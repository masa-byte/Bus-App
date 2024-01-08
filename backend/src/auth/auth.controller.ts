import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignUpUserDto } from './dto/auth-sign-up-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorators/metadata';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('signin')
    async signIn(@Request() req) {
        return this.authService.signIn(req.user);
    }

    @Public()
    @Post('signup')
    signUp(@Request() req) {
        return this.authService.signUp(req.body);
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}