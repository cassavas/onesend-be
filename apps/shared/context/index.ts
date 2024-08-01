import winston from 'winston';

export type Context = {
  requestId: string;
  email: string | undefined;
  userId: number | undefined;
  userPublicId: number | string;
  logger: winston.Logger;
};
