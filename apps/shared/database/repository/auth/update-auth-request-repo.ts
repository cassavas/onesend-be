export const updateAuthRequestRepo = (id: number, limit: number, updatedAt: Date) => {
  return global.prisma.authRequest.update({
    where: {
      id
    },
    data: {
      limit: limit,
      updatedAt: updatedAt
    }
  });
};
