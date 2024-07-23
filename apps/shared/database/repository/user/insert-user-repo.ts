import { newPublicId } from 'shared/helpers/function';

export const insertUserRepo = async (email: string, firstName: string, lastName: string, type: string, password?: string) => {
  return global.prisma.user.create({
    data: {
      email,
      publicId: newPublicId(),
      password: type === 'standard' ? global._crypto.hashPassword(password ?? '') : null,
      firstName,
      lastName,
      type: type,
      active: type === 'google'
    }
  });
};
