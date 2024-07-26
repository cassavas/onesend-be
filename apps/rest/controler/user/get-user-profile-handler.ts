import express from 'express';
import { responseSuccess } from 'rest/middleware/response/success';
import { Context } from 'shared/context';
import { getUserService } from 'shared/services/user/get-user-service';

export const getUserProfileHandler = async (ctx: Context, req: express.Request, res: express.Response) => {
  const email = req.headers['x-auth-email'] as string;
  const user = await getUserService(email);

  responseSuccess(req, res, user);
};
