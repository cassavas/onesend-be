import { deleteTokenRepo } from 'shared/database/repository/auth/delete-token-repo';

export const signOutSession = async (token: string, email: string) => {
  await deleteTokenRepo(token, email);
};
