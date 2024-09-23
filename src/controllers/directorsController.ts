import { Request, Response } from 'express';
import * as directorService from '../services/directorsService';

export const getDirectors = async (req: Request, res: Response): Promise<void> => {
    try {
        const directors = await directorService.getAllDirectors();
        res.json(directors);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
};

export const addDirector = async (req: Request, res: Response): Promise<void> => {
    const { name, nationality, dob } = req.body;
    try {
        const newDirector = await directorService.createDirector({ name, nationality, dob });
        res.status(201).json(newDirector);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
};

export const updateDirector = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const { name, nationality, dob } = req.body;
    try {
        const updatedDirector = await directorService.updateDirector(id, { name, nationality, dob });
        if (updatedDirector) {
            res.json(updatedDirector);
        } else {
            res.status(404).send('Director not found');
        }
    } catch (err: any) {
        res.status(500).send(err.message);
    }
};

export const deleteDirector = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try {
        const deletedDirector = await directorService.deleteDirector(id);
        if (deletedDirector) {
            res.json(deletedDirector);
        } else {
            res.status(404).send('Director not found');
        }
    } catch (err: any) {
        res.status(500).send(err.message);
    }
};
