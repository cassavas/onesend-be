import { userValidationById } from 'shared/helpers/validation';
import ProjectRepository from 'shared/database/repository/project';
import { LogError } from 'shared/error/logError';
import { ErrorVars } from 'shared/error/errorVars';

export const createProject = async (projectName: string, userId: number) => {
  await userValidationById(userId);

  const projects = await ProjectRepository.listProject(userId);

  if (projects.length >= 5) {
    throw new LogError(ErrorVars.E013_LIMIT_PROJECT, 'LOGIC');
  }

  return await ProjectRepository.createProject(userId, projectName);
};
