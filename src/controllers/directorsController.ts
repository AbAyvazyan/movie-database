import { Request, Response } from 'express';
import {pool} from '../utils/dbUtils';

export const getDirectors = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM Directors');
        res.json(result.rows);
    } catch (err:any) {
        res.status(500).send(err.message);
    }
};

export const addDirector = async (req: Request, res: Response) => {
    const { name, nationality, dob } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Directors (Name, Nationality, DOB) VALUES ($1, $2, $3) RETURNING *',
            [name, nationality, dob]
        );
        res.status(201).json(result.rows[0]);
    } catch (err:any) {
        res.status(500).send(err.message);
    }
};

export const updateDirector = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { name, nationality, dob } = req.body;
    try {
        const result = await pool.query(
            'UPDATE Directors SET Name = $1, Nationality = $2, DOB = $3 WHERE DirectorID = $4 RETURNING *',
            [name, nationality, dob, id]
        );
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('Director not found');
        }
    } catch (err:any) {
        res.status(500).send(err.message);
    }
};

export const deleteDirector = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const result = await pool.query('DELETE FROM Directors WHERE DirectorID = $1 RETURNING *', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('Director not found');
        }
    } catch (err:any) {
        res.status(500).send(err.message);
    }
};
