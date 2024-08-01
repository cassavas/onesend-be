export const getTokenRepo = (token: string, email: string) => {
  return global.prisma.userToken.findFirst({
    where: {
      token,
      User: {
        email: email
      }
    },
    select: {
      expiredAt: true,
      User: {
        select: {
          publicId: true,
          id: true,
          email: true
        }
      }
    }
  });
};
