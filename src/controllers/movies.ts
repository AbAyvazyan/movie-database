import { Request, Response } from 'express';
import * as movieService from '../services/moviesService';

export const getMovies = async (req: Request, res: Response): Promise<void> => {
    try {
        const movies = await movieService.getMovies();
        res.json(movies);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const createMovie = async (req: Request, res: Response): Promise<void> => {
    const { title, releaseYear, directorId } = req.body;
    try {
        const newMovie = await movieService.createMovie({ title, releaseYear, directorId });
        res.status(201).json(newMovie);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const updateMovie = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { title, releaseYear, directorId } = req.body;
    try {
        const updatedMovie = await movieService.updateMovie(parseInt(id), { title, releaseYear, directorId });
        res.json(updatedMovie);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteMovie = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await movieService.deleteMovie(parseInt(id));
        res.json({ message: 'Movie deleted successfully' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
