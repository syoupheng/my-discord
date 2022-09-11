import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as argon from "argon2";
import { JwtService } from '@nestjs/jwt';
import { RegisterUserInput } from './dto/register-user.input';
import { AuthUser } from 'src/users/dto/auth-user';
import { ConfigService } from '@nestjs/config';
import { UserStatus } from '../users/enums/user-status.enum';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService, private config: ConfigService) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await argon.verify(user?.password, password))) {
      const { password, status, ...result } = user;
      return { status: UserStatus[status], ...result};
    }
    return null;
  }

  async login(user: AuthUser) {
    const token = this.jwtService.sign({ username: user.username, sub: user.id });
    return { user, token };
  }

  async register(registerUserInput: RegisterUserInput) {
    const hashedPassword = await argon.hash(registerUserInput.password);   
    const user = await this.usersService.create({ ...registerUserInput, password: hashedPassword })
    return this.login(user);
  }
}
