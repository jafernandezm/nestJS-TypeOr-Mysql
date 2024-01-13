import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,

        ) { }

    async register({ name, email, password }: RegisterDto) {
        const user = await this.usersService.finOneByEmail(email);

        if (user) {
            throw new BadRequestException('User already exists');
        }

        await this.usersService.create({
            name,
            email,
            password: await bcryptjs.hash(password, 10)
        });
        return {
            name,
            email
        }
    }

    async login( { email, password }: LoginDto) {
        const user = await this.usersService.finOneByEmail(email);
        if (!user) {
            throw new UnauthorizedException('email is wrong');
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password); 
        if (!isPasswordValid) {
            throw new UnauthorizedException('password is wrong');
        }
        const payload = { email: user.email, role: user.role }; // payload es la informacion que se va a guardar en el token
        const token = await this.jwtService.sign(payload);// se crea el token
        return { 
            token,
            email 
        };
        
    }

    async profile({email, role}) {

        // if (role !== 'admin') {
        //     throw new UnauthorizedException('You are not authorized | No esta Autorizado');
        // }

        return await this.usersService.finOneByEmail(email);
        
    }

    
}
