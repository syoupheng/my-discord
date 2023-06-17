import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserInput } from './dto/register-user.input';
import { ConfigService } from '@nestjs/config';
import { UserStatus } from '../users/enums/user-status.enum';
import { AuthUser } from './entities/auth-user.entity';
import { AvatarService } from '../avatar/avatar.service';
import { Response } from 'express';
import * as dayjs from 'dayjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private config: ConfigService,
    private avatarService: AvatarService,
  ) {}

  async validateUser(email: string, password: string): Promise<AuthUser | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await argon.verify(user?.password, password))) {
      const { password, status, ...result } = user;
      console.log({ result });
      return { status: UserStatus[status], ...result };
    }
    return null;
  }

  async login(user: AuthUser) {
    const token = this.jwtService.sign({
      username: user.username,
      sub: user.id,
    });
    console.log({ token });
    return { user, token };
  }

  async register(registerUserInput: RegisterUserInput) {
    const hashedPassword = await argon.hash(registerUserInput.password);
    const user = await this.usersService.create({
      ...registerUserInput,
      avatarColor: this.avatarService.getColor(),
      password: hashedPassword,
      status: UserStatus.ONLINE,
    });
    await this.usersService.initAccount(user);
    return this.login(user);
  }

  generateCookie(req: { res: Response }, token: string) {
    const COOKIE_OPTIONS = {
      secure: false,
      httpOnly: true,
      expires: dayjs()
        .add(this.config.get('HTTP_ONLY_COOKIE_EXP_TIME') ?? 1, 'days')
        .toDate(),
    };

    return req.res.cookie('access_token', token, COOKIE_OPTIONS);
  }
}
