import { newPublicId } from 'shared/helpers/function';

export const insertTokenRepo = async (token: string, userId: number, expired: Date, meta?: any) => {
  return global.prisma.userToken.create({
    data: {
      publicId: newPublicId(),
      meta,
      token,
      expiredAt: expired,
      userId
    }
  });
};
