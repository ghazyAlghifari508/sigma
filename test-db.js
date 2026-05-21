const { Client } = require('pg');

async function test() {
  const url = process.env.DATABASE_URL;
  console.log("Connecting to:", url);
  const client = new Client({ connectionString: url });
  try {
    await client.connect();
    const res = await client.query('SELECT 1 as val');
    console.log("Success:", res.rows);
  } catch(e) {
    console.error("Error:", e.message);
  } finally {
    await client.end();
  }
}
test();
