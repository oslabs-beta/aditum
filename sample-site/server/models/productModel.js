// psql model for our product db

const createTable = `CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  price INTEGER NOT NULL,
  name VARCHAR NOT NULL,
  inventory INTEGER,
  description VARCHAR NOT NULL
)`;

module.exports = createTable;
