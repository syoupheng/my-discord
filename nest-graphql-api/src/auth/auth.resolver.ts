import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthUser } from './dto/auth-user';
import { LoginUserInput } from './dto/login-user.input';
import { LogoutResponse } from './dto/logout-response';
import { RegisterUserInput } from './dto/register-user.input';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

const dayjs = require('dayjs');

const HTTP_ONLY_COOKIE = {
  secure: false,
  httpOnly: true,
  expires: dayjs().add(process.env.HTTP_ONLY_COOKIE_EXP_TIME ?? 1, "days").toDate()
}

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(returns => AuthUser)
  @UseGuards(GqlAuthGuard)
  async login(@Args('loginUserInput') loginUserInput: LoginUserInput, @Context() ctx): Promise<AuthUser> {
    // await new Promise((resolve) => {
    //   setTimeout(() => resolve('timeout'), 4000);
    // });
    const { user, token } = await this.authService.login(ctx.user);
    ctx.req.res?.cookie("access_token", token, HTTP_ONLY_COOKIE);
    return user;
  }

  @Mutation(returns => AuthUser)
  async register(@Args('registerUserInput') registerUserInput: RegisterUserInput, @Context() ctx): Promise<AuthUser> {
    const { user, token } = await this.authService.register(registerUserInput);
    ctx.req.res?.cookie("access_token", token, HTTP_ONLY_COOKIE);
    return user;
  }

  @Mutation(returns => LogoutResponse)
  @UseGuards(JwtAuthGuard)
  logout(@Context() ctx) {
    ctx.req.res?.clearCookie('access_token');
    return { success: true };
  }

  @Query(returns => AuthUser, { name: 'me' })
  @UseGuards(JwtAuthGuard)
  getMe(@Context() ctx): AuthUser {
    return ctx.req.user;
  }
}
