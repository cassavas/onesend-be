import { Context } from 'shared/context';
import express from 'express';
import { LogError } from 'shared/error/logError';
import { responseError } from 'rest/middleware/response/error';
import { ErrorVars } from 'shared/error/errorVars';
import { responseSuccess } from 'rest/middleware/response/success';
import { getProject } from 'shared/services/project/get-project';

export const getProjectHandler = async (ctx: Context, req: express.Request<any, any, { name?: string }>, res: express.Response) => {
  const publicId = req.params.publicId;

  if (!publicId) {
    responseError(new LogError(ErrorVars.E014_RESOURCE_NOT_FOUND, 'LOGIC'), req, res);
    return;
  }

  if (!ctx.userId) {
    responseError(new LogError(ErrorVars.E001_NOT_PERMISSION, 'AUTHENTICATION'), req, res);
    return;
  }

  const project = await getProject(publicId, ctx.userId);

  return responseSuccess(req, res, {
    data: {
      publicId: project.publicId,
      name: project.name,
      sid: project.sid,
      authId: project.authId,
      balance: project.balance,
      plan: { publicId: project.Plan.publicId, name: project.Plan.name }
    }
  });
};
