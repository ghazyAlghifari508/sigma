const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.sekolah.count();
  console.log('Total schools in DB:', count);
  const uniqueKabupaten = await prisma.sekolah.findMany({distinct: ['kabupaten'], select: {kabupaten: true}});
  console.log('Kabupaten:', uniqueKabupaten);
}

main().catch(console.error).finally(()=>prisma.$disconnect());
