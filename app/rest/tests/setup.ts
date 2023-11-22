import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

if (process.env.NODE_ENV !== 'test' || !process.env.TEST) {
  throw new Error('Process must running on test env file');
}
(async () => {
  const connectionDetails = await prisma.$queryRaw`SELECT current_database() AS database, current_schemas(false) AS schema, current_user AS user`;
  console.log(connectionDetails);
})();
