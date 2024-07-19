import { PrismaClient } from 'shared/database/generated/prisma-client';
import log from 'shared/config/logger';
import winston from 'winston';
import Crypto from 'shared/helpers/crypto';
import { MailTransport } from 'shared/config/mailTransport';

declare global {
  var prisma: PrismaClient;
  var logger: winston.Logger;
  var _crypto: Crypto;
  var sender: MailTransport;
}

global.prisma = new PrismaClient();
global.logger = log;
global._crypto = new Crypto();
global.sender = new MailTransport();
