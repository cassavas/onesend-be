import { deleteForceLogoutRepo } from 'shared/database/repository/auth/delete-force-logout-repo';
import { userValidationById } from 'shared/helpers/validation';

export const deleteForceLogoutService = async (userId: number, token: string) => {
  await userValidationById(userId);

  return deleteForceLogoutRepo(userId, token);
};
