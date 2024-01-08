import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { User } from './user.entity';

@Controller('user')
export class UserController {

    constructor(private readonly userResolver: UserResolver) { }

    @Get()
    async users() {
        try {
            const users = await this.userResolver.users()
            return users
        } catch (error) {
            return HttpStatus.NOT_FOUND
        }
    }

    @Get(':id')
    async user(@Param('id') id: string) {
        try {
            const user = await this.userResolver.user(id)
            return user
        } catch (error) {
            return HttpStatus.NOT_FOUND
        }
    }

    @Get('email/:email')
    async userByEmail(@Param('email') email: string) {
        try {
            const user = await this.userResolver.userByEmail(email)
            return user
        } catch (error) {
            return HttpStatus.NOT_FOUND
        }
    }

    @Get('compare-password/:password/:id')
    async comparePassword(@Param('password') password: string, @Param('id') id: string): Promise<boolean> {
        try {
            const res = await this.userResolver.comparePassword(password, id)
            return res
        } catch (error) {
            return false
        }
    }

    @Post()
    async createUser(@Body() user: any) {
        try {
            const res = await this.userResolver.createUser(user)
            return res
        } catch (error) {
            return HttpStatus.NOT_FOUND
        }
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        try {
            const res = await this.userResolver.deleteUser(id)
            return res
        } catch (error) {   
            return HttpStatus.NOT_FOUND
        }
    }
}
