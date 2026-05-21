const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fix() {
  await prisma.sekolah.updateMany({
    where: { latitude: 0 },
    data: { latitude: -6.9175, longitude: 107.6191 }
  });
  await prisma.sPPG.updateMany({
    where: { latitude: 0 },
    data: { latitude: -6.9200, longitude: 107.6200 }
  });
  console.log('Coordinates fixed');
}
fix();
