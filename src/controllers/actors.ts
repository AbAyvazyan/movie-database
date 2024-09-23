// src/controllers/actorController.ts
import { Request, Response } from 'express';
import * as actorService from '../services/actorsService';

export const getActors = async (req: Request, res: Response): Promise<void> => {
    try {
        const actors = await actorService.getAllActors();
        res.json(actors);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const createActor = async (req: Request, res: Response): Promise<void> => {
    const { name, nationality, dob } = req.body;
    try {
        const newActor = await actorService.createActor({ name, nationality, dob });
        res.json(newActor);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const updateActor = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, nationality, dob } = req.body;
    try {
        const updatedActor = await actorService.updateActor(id, { name, nationality, dob });
        res.json(updatedActor);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteActor = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await actorService.deleteActor(id);
        res.json({ message: 'Actor deleted successfully' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
