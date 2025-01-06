const pool = require('../db/db');

const initializeUserTable = async () => {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255),
      location VARCHAR(255),
      blog VARCHAR(255),
      bio TEXT,
      public_repos INTEGER DEFAULT 0,
      public_gists INTEGER DEFAULT 0,
      followers INTEGER DEFAULT 0,
      following INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      deleted BOOLEAN DEFAULT FALSE
    );
  `);
};

module.exports = initializeUserTable;
