import { GraphQLExecutionContext } from '@nestjs/graphql';
import { Response } from 'express';
import { User, MembersInChannels } from '@prisma/client';

export type GraphQLContext = GraphQLExecutionContext & { req: { res: Response } };

export type MembersInChannel = MembersInChannels & { member: Pick<User, 'chatGptRole' | 'username'> };
