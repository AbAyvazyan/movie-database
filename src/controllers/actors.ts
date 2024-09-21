import { Request, Response } from 'express';
import {pool} from "../utils/dbUtils";

export const getActors = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('SELECT * FROM Actors');
        res.json(result.rows);
    } catch (err:any) {
        res.status(500).json({ error: err.message });
    }
};

export const createActor = async (req: Request, res: Response): Promise<void> => {
    const { name, nationality, dob } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Actors (name, nationality, dob) VALUES ($1, $2, $3) RETURNING *',
            [name, nationality, dob]
        );
        res.json(result.rows[0]);
    } catch (err:any) {
        res.status(500).json({ error: err.message });
    }
};

export const updateActor = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, nationality, dob } = req.body;
    try {
        const result = await pool.query(
            'UPDATE Actors SET name = $1, nationality = $2, dob = $3 WHERE ActorID = $4 RETURNING *',
            [name, nationality, dob, id]
        );
        res.json(result.rows[0]);
    } catch (err:any) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteActor = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM Actors WHERE ActorID = $1', [id]);
        res.json({ message: 'Actor deleted successfully' });
    } catch (err:any) {
        res.status(500).json({ error: err.message });
    }
};
