const { Pool } = require('pg');
const productsTable = require('./productModel.js');

// URI to sql database hosted on ElephantSQL
const PG_URI= "postgres://mhxzpxbj:UgdmVN4tsivjnyJARaN50U7ITOz87FCl@rajje.db.elephantsql.com:5432/mhxzpxbj";

// creating a pool to avoid overloading server with multiple queries
const pool = new Pool({
  connectionString: PG_URI,
});

// console log to confirm we connected to the db
pool.on('connect', () => {
  console.log('connected to sql db');
});

// running create table query
pool.query(productsTable, (err) => {
  if (err) console.log(err);
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
