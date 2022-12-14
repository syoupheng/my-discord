import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserInput } from './dto/register-user.input';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { UserStatus } from '../users/enums/user-status.enum';
import { AuthUser } from './entities/auth-user.entity';

const dayjs = require('dayjs');

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService, private config: ConfigService) {}

  async validateUser(email: string, password: string): Promise<AuthUser> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await argon.verify(user?.password, password))) {
      const { password, status, ...result } = user;
      return { status: UserStatus[status], ...result };
    }
    return null;
  }

  async login(user: User) {
    const token = this.jwtService.sign({
      username: user.username,
      sub: user.id,
    });
    return { user, token };
  }

  async register(registerUserInput: RegisterUserInput) {
    const hashedPassword = await argon.hash(registerUserInput.password);
    const user = await this.usersService.create({
      ...registerUserInput,
      password: hashedPassword,
      status: UserStatus.ONLINE,
    });
    return this.login(user);
  }

  generateCookie(req, token: string) {
    const HTTP_ONLY_COOKIE = {
      secure: false,
      httpOnly: true,
      expires: dayjs()
        .add(process.env.HTTP_ONLY_COOKIE_EXP_TIME ?? 1, 'days')
        .toDate(),
    };

    return req.res?.cookie('access_token', token, HTTP_ONLY_COOKIE);
  }
}
