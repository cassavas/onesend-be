import { USER } from 'shared/types/modal';
import { rGetUserByEmail } from 'shared/database/repository/user/rGetUser';
import { LogError } from 'shared/error/logError';
import { ErrorVars } from 'shared/error/errorVars';

export const userValidation = async (email: string): Promise<USER> => {
  const user = await rGetUserByEmail(email);

  if (!user) {
    throw new LogError(ErrorVars.E003_USER_NOT_EXISTS, 'LOGIC');
  }
  if (!user.active) {
    throw new LogError(ErrorVars.E004_USER_PENDING, 'LOGIC');
  }
  if (user.deletedAt) {
    throw new LogError(ErrorVars.E005_USER_IS_DELETED, 'LOGIC');
  }

  return user;
};
