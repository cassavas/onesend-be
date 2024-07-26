import express from 'express';
import { responseSuccess } from 'rest/middleware/response/success';
import { Context } from 'shared/context';
import { getUserService } from 'shared/services/user/get-user-service';
import { LogError } from 'shared/error/logError';
import { ErrorVars } from 'shared/error/errorVars';
import { responseError } from 'rest/middleware/response/error';

export const getUserProfileHandler = async (ctx: Context, req: express.Request, res: express.Response) => {
  if (!ctx.userId) {
    responseError(new LogError(ErrorVars.E001_NOT_PERMISSION, 'AUTHENTICATION'), req, res);
    return;
  }
  const user = await getUserService(ctx.userId);

  responseSuccess(req, res, {
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    address: user.address
  });
};
