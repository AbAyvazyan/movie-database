import { Request, Response } from 'express';
import * as ratingService from '../services/ratingsService';

export const getRatings = async (req: Request, res: Response): Promise<void> => {
    try {
        const ratings = await ratingService.getRatings();
        res.json(ratings);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const createRating = async (req: Request, res: Response): Promise<void> => {
    const { movieId, rating } = req.body;
    try {
        const newRating = await ratingService.createRating({ movieId, rating });
        res.status(201).json(newRating);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteRating = async (req: Request, res: Response): Promise<void> => {
    const { movieId } = req.params;
    try {
        await ratingService.deleteRating(parseInt(movieId));
        res.json({ message: 'Rating deleted successfully' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
