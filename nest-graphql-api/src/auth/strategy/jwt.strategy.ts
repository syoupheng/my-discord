import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/entities/user.entity';
import { UserStatus } from '../../users/enums/user-status.enum';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService, private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractFromCookie]),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
      logging: true,
    });
  }

  private static extractFromCookie(req: Request): string | null {
    if (req.cookies && 'access_token' in req.cookies && req.cookies.access_token.length > 0) {
      return req.cookies.access_token;
    }
    return null;
  }

  async validate(payload: { username: string; sub: number }): Promise<User> {
    const user = await this.usersService.findOneById(payload.sub);
    if (!user) throw new UnauthorizedException('JWT not valid !');
    const { password, status, ...result } = user;
    return { status: UserStatus[status], ...result };
  }
}
