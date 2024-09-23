import { pool } from "../utils/dbUtils";

interface Actor {
    name: string;
    nationality: string;
    dob: string;
}

export const getAllActors = async (): Promise<any[]> => {
    const result = await pool.query('SELECT * FROM Actors');
    return result.rows;
};

export const createActor = async (actor: Actor): Promise<any> => {
    const { name, nationality, dob } = actor;
    const result = await pool.query(
        'INSERT INTO Actors (name, nationality, dob) VALUES ($1, $2, $3) RETURNING *',
        [name, nationality, dob]
    );
    return result.rows[0];
};

export const updateActor = async (id: string, actor: Actor): Promise<any> => {
    const { name, nationality, dob } = actor;
    const result = await pool.query(
        'UPDATE Actors SET name = $1, nationality = $2, dob = $3 WHERE ActorID = $4 RETURNING *',
        [name, nationality, dob, id]
    );
    return result.rows[0];
};

export const deleteActor = async (id: string): Promise<void> => {
    await pool.query('DELETE FROM Actors WHERE ActorID = $1', [id]);
};
