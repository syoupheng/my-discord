import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsEnum, IsOptional } from 'class-validator';
import { RegisterUserInput } from '../../auth/dto/register-user.input';
import { UserStatus } from '../enums/user-status.enum';

@InputType()
export class EditProfileInput extends PartialType(RegisterUserInput) {
  @IsOptional()
  @IsEnum(UserStatus)
  @Field((type) => UserStatus, { nullable: true })
  status?: UserStatus;
}
