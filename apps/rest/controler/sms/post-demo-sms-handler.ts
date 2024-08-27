import { Context } from 'shared/context';
import express from 'express';
import { responseError } from 'rest/middleware/response/error';
import { LogError } from 'shared/error/logError';
import { ErrorVars } from 'shared/error/errorVars';
import { E164PhoneRegex } from 'shared/types/const';
import { getSampleOtpTemplate, newOtp } from 'shared/helpers/function';
import { responseSuccess } from 'rest/middleware/response/success';
import SmsService from 'shared/services/service/sms';

export const postDemoSmsHandler = async (ctx: Context, req: express.Request<any, any, { projectId?: string; messageLang?: 'vi' | 'vi_uni' | 'en'; to?: string }>, res: express.Response) => {
  if (!ctx.userId) {
    responseError(new LogError(ErrorVars.E001_NOT_PERMISSION, 'AUTHENTICATION'), req, res);
    return;
  }

  if (!req.body.to || (req.body.to && !E164PhoneRegex.test(req.body.to))) {
    responseError(new LogError(ErrorVars.E017_MISSING_DATA, 'LOGIC'), req, res);
    return;
  }

  if (!req.body.projectId || (req.body.projectId && req.body.projectId.length > 30)) {
    responseError(new LogError(ErrorVars.E017_MISSING_DATA, 'LOGIC'), req, res);
    return;
  }

  if (!req.body.messageLang || (req.body.messageLang && !['vi', 'vi_uni', 'en'].includes(req.body.messageLang))) {
    responseError(new LogError(ErrorVars.E017_MISSING_DATA, 'LOGIC'), req, res);
    return;
  }

  const otp = newOtp(6);
  const content = getSampleOtpTemplate(otp, req.body.messageLang);

  await SmsService.sendDemoSms(ctx.userId, req.body.projectId, {
    to: req.body.to,
    content: content,
    brand: process.env.BRAND_NAME ?? '',
    otp: otp
  });

  responseSuccess(req, res, {}, true);
};
