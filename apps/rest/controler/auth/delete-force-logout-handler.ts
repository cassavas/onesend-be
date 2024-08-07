import express from 'express';
import { responseSuccess } from 'rest/middleware/response/success';
import { Context } from 'shared/context';
import { responseError } from 'rest/middleware/response/error';
import { LogError } from 'shared/error/logError';
import { ErrorVars } from 'shared/error/errorVars';
import { deleteForceLogoutService } from 'shared/services/auth/delete-force-logout-service';

export const deleteForceLogoutHandler = async (ctx: Context, req: express.Request, res: express.Response) => {
  const token = req.headers.authorization!.split(' ')[1];
  if (!ctx.userId || !token) {
    responseError(new LogError(ErrorVars.E001_NOT_PERMISSION, 'AUTHENTICATION'), req, res);
    return;
  }

  await deleteForceLogoutService(ctx.userId, token);
  responseSuccess(req, res, {}, true);
};
