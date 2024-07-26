export const updatePasswordRepo = (id: number, password: string) => {
  return global.prisma.user.update({
    where: {
      id
    },
    data: {
      password: global._crypto.hashPassword(password ?? '')
    }
  });
};
