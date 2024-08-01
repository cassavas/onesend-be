import { Context } from 'shared/context';
import express from 'express';
import { createProject } from 'shared/services/project/create-project';
import { LogError } from 'shared/error/logError';
import { responseError } from 'rest/middleware/response/error';
import { ErrorVars } from 'shared/error/errorVars';
import { responseSuccess } from 'rest/middleware/response/success';

export const postSetupProjectHandler = async (ctx: Context, req: express.Request<any, any, { name?: string }>, res: express.Response) => {
  let name = (req.body.name ?? '').trim() || 'Undefined Project';

  if (!ctx.userId) {
    responseError(new LogError(ErrorVars.E001_NOT_PERMISSION, 'AUTHENTICATION'), req, res);
    return;
  }

  const newProject = await createProject(name, ctx.userId);

  return responseSuccess(req, res, {
    data: {
      publicId: newProject.publicId,
      sid: newProject.sid,
      authId: newProject.authId,
      name: newProject.name,
      balance: newProject.balance
    }
  });
};
