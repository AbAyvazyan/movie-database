import { Request, Response } from 'express';
import * as movieGenreService from '../services/movieGenresService';

export const createMovieGenre = async (req: Request, res: Response): Promise<void> => {
    const { movieId, genreId } = req.body;
    try {
        const newMovieGenre = await movieGenreService.createMovieGenre({ movieId, genreId });
        res.status(201).json(newMovieGenre);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteMovieGenre = async (req: Request, res: Response): Promise<void> => {
    const { movieId, genreId } = req.params;
    try {
        await movieGenreService.deleteMovieGenre(parseInt(movieId), parseInt(genreId));
        res.json({ message: 'Movie-Genre association deleted successfully' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const getMovieGenres = async (req: Request, res: Response): Promise<void> => {
    try {
        const movieGenres = await movieGenreService.getMovieGenres();
        res.json(movieGenres);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
