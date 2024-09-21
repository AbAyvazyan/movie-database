import { Request, Response } from 'express';
import {pool} from "../utils/dbUtils";

export const getGenres = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('SELECT * FROM Genres');
        res.json(result.rows);
    } catch (err:any) {
        res.status(500).json({ error: err.message });
    }
};

export const createGenre = async (req: Request, res: Response): Promise<void> => {
    const { genreName } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Genres (genreName) VALUES ($1) RETURNING *',
            [genreName]
        );
        res.json(result.rows[0]);
    } catch (err:any) {
        res.status(500).json({ error: err.message });
    }
};

export const updateGenre = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { genreName } = req.body;
    try {
        const result = await pool.query(
            'UPDATE Genres SET genreName = $1 WHERE GenreID = $2 RETURNING *',
            [genreName, id]
        );
        res.json(result.rows[0]);
    } catch (err:any) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteGenre = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM Genres WHERE GenreID = $1', [id]);
        res.json({ message: 'Genre deleted successfully' });
    } catch (err:any) {
        res.status(500).json({ error: err.message });
    }
};
