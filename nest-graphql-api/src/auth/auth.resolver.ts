import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { RegisterUserInput } from './dto/register-user.input';
import { GqlAuthGuard } from './gql-auth.guard';

const dayjs = require('dayjs');

const HTTP_ONLY_COOKIE = {
  secure: false,
  httpOnly: true,
  expires: dayjs().add(process.env.HTTP_ONLY_COOKIE_EXP_TIME, "days").toDate()
}

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(returns => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async login(@Args('loginUserInput') loginUserInput: LoginUserInput, @Context() ctx): Promise<LoginResponse> {
    const { user, token } = await this.authService.login(ctx.user);
    ctx.req.res?.cookie("access_token", token, HTTP_ONLY_COOKIE);
    return { user };
  }

  @Mutation(returns => LoginResponse)
  async register(@Args('registerUserInput') registerUserInput: RegisterUserInput, @Context() ctx): Promise<LoginResponse> {
    const { user, token } = await this.authService.register(registerUserInput);
    ctx.req.res?.cookie("access_token", token, HTTP_ONLY_COOKIE);
    return { user };
  }
}
