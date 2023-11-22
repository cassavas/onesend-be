import { PrismaClient } from 'shared/database/generated/prisma-client';
import log from 'shared/config/logger';
import winston from 'winston';
import Crypto from 'shared/helpers/crypto';

declare global {
  var prisma: PrismaClient;
  var logger: winston.Logger;
  var _crypto: Crypto;
}

global.prisma = new PrismaClient();
global.logger = log;
global._crypto = new Crypto();
