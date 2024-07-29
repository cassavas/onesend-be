import { userValidation } from 'shared/helpers/validation';
import { updatePasswordRepo } from 'shared/database/repository/user/update-password-repo';

export const resetPasswordService = async (email: string, password: string) => {
  const user = await userValidation(email);

  // what is problem when type of user is google ?-> check it before reset
  // need to check how many time reset here only accept reset request 5 times/days

  // why create newPassword but don't use
  const newPassword = await updatePasswordRepo(user.id, password);
};
