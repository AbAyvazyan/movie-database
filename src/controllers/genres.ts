import { Request, Response } from 'express';
import * as genreService from '../services/genresService';

export const getGenres = async (req: Request, res: Response): Promise<void> => {
    try {
        const genres = await genreService.getAllGenres();
        res.json(genres);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const createGenre = async (req: Request, res: Response): Promise<void> => {
    const { genreName } = req.body;
    try {
        const newGenre = await genreService.createGenre({ genreName });
        res.json(newGenre);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const updateGenre = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { genreName } = req.body;
    try {
        const updatedGenre = await genreService.updateGenre(parseInt(id), { genreName });
        res.json(updatedGenre);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteGenre = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const deletedGenre = await genreService.deleteGenre(parseInt(id));
        res.json(deletedGenre ? { message: 'Genre deleted successfully' } : { error: 'Genre not found' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
