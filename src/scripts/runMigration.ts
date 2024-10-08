import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import {pool} from "../utils/dbUtils";

dotenv.config();


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
