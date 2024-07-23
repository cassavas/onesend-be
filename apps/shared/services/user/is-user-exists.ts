import { rGetUserByEmail } from 'shared/database/repository/user/get-user-repo';

export const isUserExists = async (email: string) => {
  return await rGetUserByEmail(email);
};
