import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432', 10),
});

const runMigration = async () => {
    const client = await pool.connect();
    try {
        const sqlFilePath = path.join(__dirname, '../sql/schema.sql');
        const sql = fs.readFileSync(sqlFilePath, 'utf-8');
        await client.query(sql);
        console.log('SQL script executed successfully.');
    } catch (err) {
        console.error('Error executing SQL script:', err);
    } finally {
        client.release();
    }
};

runMigration().catch(err => console.error('Migration failed:', err));
