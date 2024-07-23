import { rGetUserByEmail } from 'shared/database/repository/user/get-user-repo';
import { LogError } from 'shared/error/logError';
import { ErrorVars } from 'shared/error/errorVars';
import { updateActiveUserRepo } from 'shared/database/repository/user/update-active-user-repo';

export const updateActiveUser = async (email: string) => {
  const user = await rGetUserByEmail(email);

  if (!user) {
    throw new LogError(ErrorVars.E003_USER_NOT_EXISTS, 'LOGIC');
  }

  if (user.active) {
    throw new LogError(ErrorVars.E007_USER_EXISTS, 'LOGIC');
  }

  if (user.type !== 'standard') {
    throw new LogError(ErrorVars.E009_USER_METHOD_NOT_ALLOW, 'LOGIC');
  }

  await updateActiveUserRepo(user.id);
};
