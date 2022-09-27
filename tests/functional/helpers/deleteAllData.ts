import { PrismaClient } from '@prisma/client';

type PrismaSomeTable<
  PrismaClient,
  U extends keyof PrismaClient
> = PrismaClient[U];

async function deleteAllData(prismaClient: PrismaClient) {
  const allTablesNames = Object.keys(prismaClient).filter(
    (e) => !e.includes('_', 0)
  );

  const allTables = allTablesNames.map((tableName) => {
    const prismaTable = prismaClient[tableName as keyof PrismaClient];

    return (prismaTable as PrismaSomeTable<PrismaClient, 'car'>).deleteMany();
  });

  await Promise.all(allTables);
}

export default deleteAllData;
