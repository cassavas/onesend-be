import winston, { LoggerOptions } from 'winston';
import SlackHook from 'winston-slack-webhook-transport';
import { jsonToMarkdown } from 'shared/helpers/function';

const getSlackMessage = (error: any) => {
  return {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Hey Tue 👋. There is very important notice, codetheoyeucau.com has extremely serious error.'
        }
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `\`\`\` ${jsonToMarkdown(error)}\`\`\``
        }
      }
    ]
  };
};

const getCurrentLogFile = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `logs/onesend_log_${year}_${month}.json`;
};

const config: {
  [env: string]: LoggerOptions;
} = {
  test: {
    format: winston.format.simple(),
    transports: [new winston.transports.Console({ silent: true })]
  },
  dev: {
    format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    transports: [new winston.transports.Console()]
  },
  production: {
    format: winston.format.combine(winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston.format.errors({ stack: true }), winston.format.json()),
    transports: [
      new winston.transports.File({
        filename: getCurrentLogFile(),
        level: 'error'
      }),
      new winston.transports.File({
        filename: getCurrentLogFile(),
        level: 'warn'
      }),
      new SlackHook({
        webhookUrl: process.env.SLACK_WEBHOOK ?? '',
        level: 'error',
        formatter: (error) => getSlackMessage(error)
      })
    ]
  },

  other: {
    format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    transports: [new winston.transports.Console()]
  }
};

const logger = winston.createLogger(config[process.env.NODE_ENV as string] ? config[process.env.NODE_ENV as string] : config.other);

export default logger;
