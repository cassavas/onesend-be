export const updateExpiredRepo = async (token: string, email: string, expired: Date) => {
  return global.prisma.userToken.updateMany({
    where: {
      token: token,
      User: {
        email: email
      }
    },
    data: {
      expiredAt: expired
    }
  });
};
