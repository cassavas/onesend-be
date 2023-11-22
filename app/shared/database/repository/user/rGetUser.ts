import { USER } from 'app/shared/types/modal';

export const rGetUserByEmail = async (email: string): Promise<USER | null> => {
  return await global.prisma.user.findUnique({
    where: { email }
  });
};
