import winston from 'winston';
export type Context = {
  requestId: string;
  logger: winston.Logger;
};
