import { ConflictException, HttpException, INestApplication, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

type DbErrorType = 'conflict' | 'not-found';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  throwDBError(error: unknown, { message = 'Database error !', errorType }: { message?: string; errorType: DbErrorType }) {
    const errorMapping = new Map<DbErrorType, { exception: HttpException; code: string }>([
      ['conflict', { exception: new ConflictException(message), code: 'P2002' }],
      ['not-found', { exception: new NotFoundException(message), code: 'P2025' }],
    ]);
    if (error instanceof PrismaClientKnownRequestError && error.code === errorMapping.get(errorType)?.code) {
      throw errorMapping.get(errorType)?.exception;
    }
  }
}
