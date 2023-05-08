import { GraphQLExecutionContext } from '@nestjs/graphql';
import { Response } from 'express';
import { AuthUser } from './auth/entities/auth-user.entity';
import { User, MembersInChannels } from '@prisma/client';

export type GraphQLContext = GraphQLExecutionContext & { req: { res: Response } };

export type GraphQLContextWithUser = GraphQLContext & { req: GraphQLContext['req'] & { user: AuthUser } };

export type MembersInChannel = MembersInChannels & { member: Pick<User, 'chatGptRole' | 'username'> };
