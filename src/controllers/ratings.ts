import { Request, Response } from 'express';
import {pool} from "../utils/dbUtils";

export const getRatings = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('SELECT * FROM Ratings');
        res.json(result.rows);
    } catch (err:any) {
        res.status(500).json({ error: err.message });
    }
};

export const createRating = async (req: Request, res: Response): Promise<void> => {
    const { movieId, rating } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Ratings (movieId, rating) VALUES ($1, $2) RETURNING *',
            [movieId, rating]
        );
        res.json(result.rows[0]);
    } catch (err:any) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteRating = async (req: Request, res: Response): Promise<void> => {
    const { movieId } = req.params;
    try {
        await pool.query('DELETE FROM Ratings WHERE movieId = $1', [movieId]);
        res.json({ message: 'Rating deleted successfully' });
    } catch (err:any) {
        res.status(500).json({ error: err.message });
    }
};
