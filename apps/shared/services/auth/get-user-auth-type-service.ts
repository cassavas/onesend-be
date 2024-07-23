import { rGetUserByEmail } from 'shared/database/repository/user/get-user-repo';
import { LogError } from 'shared/error/logError';
import { ErrorVars } from 'shared/error/errorVars';

export const getUserAuthTypeService = async (email: string): Promise<string> => {
  const user = await rGetUserByEmail(email);

  if (!user) {
    throw new LogError(ErrorVars.E003_USER_NOT_EXISTS, 'LOGIC');
  }

  return user.type;
};
