import { Request, Response } from 'express';
import { pool } from "../utils/dbUtils";

export const createMovieGenre = async (req: Request, res: Response): Promise<void> => {
    const { movieId, genreId } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO MovieGenres (MovieID, GenreID) VALUES ($1, $2) RETURNING *',
            [movieId, genreId]
        );
        res.status(201).json(result.rows[0]);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteMovieGenre = async (req: Request, res: Response): Promise<void> => {
    const { movieId, genreId } = req.params;
    try {
        await pool.query(
            'DELETE FROM MovieGenres WHERE MovieID = $1 AND GenreID = $2',
            [movieId, genreId]
        );
        res.json({ message: 'Movie-Genre association deleted successfully' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const getMovieGenres = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('SELECT * FROM MovieGenres');
        res.json(result.rows);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
