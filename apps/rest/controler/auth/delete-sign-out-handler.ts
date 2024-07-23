import express from 'express';
import { responseSuccess } from 'rest/middleware/response/success';
import { Context } from 'shared/context';
import { signOutSession } from 'shared/services/auth/sign-out-session';

export const deleteSignOutHandler = async (ctx: Context, req: express.Request, res: express.Response) => {
  const token = req.headers.authorization!.split(' ')[1];
  const email = req.headers['x-auth-email'] as string;

  signOutSession(token, email);

  responseSuccess(req, res, {}, true);
};
