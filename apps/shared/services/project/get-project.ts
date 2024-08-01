import { userValidationById } from 'shared/helpers/validation';
import ProjectRepository from 'shared/database/repository/project';
import { LogError } from 'shared/error/logError';
import { ErrorVars } from 'shared/error/errorVars';

export const getProject = async (publicId: string, userId: number) => {
  await userValidationById(userId);

  const project = await ProjectRepository.getProject(userId, publicId);

  if (project === null) {
    throw new LogError(ErrorVars.E014_RESOURCE_NOT_FOUND, 'LOGIC');
  }

  return project;
};
