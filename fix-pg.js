require('dotenv').config();
const { Client } = require('pg');

async function fix() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  
  await client.query('UPDATE "Sekolah" SET latitude = -6.9175, longitude = 107.6191 WHERE latitude = 0;');
  await client.query('UPDATE "SPPG" SET latitude = -6.9200, longitude = 107.6200 WHERE latitude = 0;');
  
  console.log('Coordinates updated via raw pg');
  await client.end();
}

fix();
