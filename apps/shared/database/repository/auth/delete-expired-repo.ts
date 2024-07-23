export const deleteExpiredRepo = async (token: string, email: string) => {
  return global.prisma.userToken.deleteMany({
    where: {
      token: token,
      User: {
        email: email
      }
    }
  });
};
