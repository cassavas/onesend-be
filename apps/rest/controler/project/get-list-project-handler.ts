import { Context } from 'shared/context';
import express from 'express';
import { LogError } from 'shared/error/logError';
import { responseError } from 'rest/middleware/response/error';
import { ErrorVars } from 'shared/error/errorVars';
import { responseSuccess } from 'rest/middleware/response/success';
import { listProject } from 'shared/services/project/list-project';

export const getListProjectHandler = async (ctx: Context, req: express.Request<any, any, { name?: string }>, res: express.Response) => {
  if (!ctx.userId) {
    responseError(new LogError(ErrorVars.E001_NOT_PERMISSION, 'AUTHENTICATION'), req, res);
    return;
  }

  const projects = await listProject(ctx.userId);

  return responseSuccess(req, res, {
    data: projects.map((project) => ({
      publicId: project.publicId,
      name: project.name,
      createdAt: project.createdAt
    }))
  });
};
