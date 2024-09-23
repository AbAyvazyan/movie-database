import { pool } from "../utils/dbUtils";

interface Director {
    name: string;
    nationality: string;
    dob: string;
}

export const getAllDirectors = async (): Promise<any[]> => {
    const result = await pool.query('SELECT * FROM Directors');
    return result.rows;
};

export const createDirector = async (director: Director): Promise<any> => {
    const { name, nationality, dob } = director;
    const result = await pool.query(
        'INSERT INTO Directors (Name, Nationality, DOB) VALUES ($1, $2, $3) RETURNING *',
        [name, nationality, dob]
    );
    return result.rows[0];
};

export const updateDirector = async (id: number, director: Director): Promise<any> => {
    const { name, nationality, dob } = director;
    const result = await pool.query(
        'UPDATE Directors SET Name = $1, Nationality = $2, DOB = $3 WHERE DirectorID = $4 RETURNING *',
        [name, nationality, dob, id]
    );
    return result.rows[0];
};

export const deleteDirector = async (id: number): Promise<any> => {
    const result = await pool.query('DELETE FROM Directors WHERE DirectorID = $1 RETURNING *', [id]);
    return result.rows[0];
};
