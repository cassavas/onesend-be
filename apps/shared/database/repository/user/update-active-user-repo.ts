export const updateActiveUserRepo = (id: number) => {
  return global.prisma.user.update({
    where: {
      id
    },
    data: {
      active: true
    }
  });
};
