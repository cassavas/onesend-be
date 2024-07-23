export const deleteTokenRepo = (token: string, email: string) => {
  return global.prisma.userToken.deleteMany({
    where: {
      token,
      User: {
        email: email
      }
    }
  });
};
