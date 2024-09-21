import { Request, Response } from 'express';
import { pool } from "../utils/dbUtils";

export const getMovies = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('SELECT * FROM Movies');
        res.json(result.rows);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const createMovie = async (req: Request, res: Response): Promise<void> => {
    const { title, releaseYear, directorId } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Movies (title, releaseYear, directorId) VALUES ($1, $2, $3) RETURNING *',
            [title, releaseYear, directorId]
        );
        res.json(result.rows[0]);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const updateMovie = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { title, releaseYear, directorId } = req.body;
    try {
        const result = await pool.query(
            'UPDATE Movies SET title = $1, releaseYear = $2, directorId = $3 WHERE movieId = $4 RETURNING *',
            [title, releaseYear, directorId, id]
        );
        res.json(result.rows[0]);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteMovie = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM Movies WHERE movieId = $1', [id]);
        res.json({ message: 'Movie deleted successfully' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
