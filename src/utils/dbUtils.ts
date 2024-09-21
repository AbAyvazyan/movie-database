import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432', 10),
});

export const executeSqlFile = async (filePath: string) => {
    try {
        const sql = fs.readFileSync(path.resolve(__dirname, '../sql', filePath), 'utf8');
        await pool.query(sql);
        console.log(`Executed SQL script: ${filePath}`);
    } catch (error) {
        console.error(`Error executing SQL script: ${filePath}`, error);
    }
};
