const http = require('http');
const { Client } = require('pg');

const PORT = 3000;

// Connection details come from environment variables (set in docker-compose.yml)
const dbConfig = {
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'labpass',
  database: process.env.DB_NAME || 'labdb',
  port: 5432,
};

const server = http.createServer(async (req, res) => {
  const client = new Client(dbConfig);
  try {
    await client.connect();

    // Make sure a table exists, then record this visit
    await client.query(`
      CREATE TABLE IF NOT EXISTS visits (
        id SERIAL PRIMARY KEY,
        visited_at TIMESTAMP DEFAULT NOW()
      );
    `);
    await client.query('INSERT INTO visits DEFAULT VALUES;');

    const result = await client.query('SELECT COUNT(*) FROM visits;');
    const count = result.rows[0].count;

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(
      `Hello DevOps! 🚀\n` +
      `This app is talking to its database by name.\n` +
      `You are visit number ${count}.\n` +
      `(Refresh the page — the count goes up, and survives a restart.)\n`
    );
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(`Could not reach the database 😢\n${err.message}\n`);
  } finally {
    await client.end();
  }
});

server.listen(PORT, () => console.log(`Hello DevOps app running on port ${PORT}`));
