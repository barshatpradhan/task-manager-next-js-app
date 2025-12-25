import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function test() {
  console.log('Prisma User model fields:');
  console.log(Object.keys((prisma.user as any).fields || {}));
}

test();