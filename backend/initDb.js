const mysql = require('mysql2/promise');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

async function initDb() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || ''
        });

        const schema = fs.readFileSync(path.join(__dirname, 'models', 'schema.sql'), 'utf8');
        const queries = schema.split(';').filter(q => q.trim());

        for (let query of queries) {
            await connection.query(query);
        }

        console.log('Database initialized successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error initializing database:', error);
        process.exit(1);
    }
}

initDb();
