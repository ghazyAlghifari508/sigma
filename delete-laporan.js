require('dotenv').config();
const { Client } = require('pg');

async function clean() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  
  // Hapus semua laporan
  const res = await client.query('DELETE FROM "Laporan";');
  console.log(`Deleted ${res.rowCount} reports.`);
  
  await client.end();
}

clean();
