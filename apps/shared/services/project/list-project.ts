import { userValidationById } from 'shared/helpers/validation';
import ProjectRepository from 'shared/database/repository/project';

export const listProject = async (userId: number) => {
  await userValidationById(userId);

  return await ProjectRepository.listProject(userId);
};
