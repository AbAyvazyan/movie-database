import express from 'express';
import { getDirectors, addDirector, updateDirector, deleteDirector } from '../controllers/directorsController';

const router = express.Router();

router.get('/', getDirectors);
router.post('/', addDirector);
router.put('/:id', updateDirector);
router.delete('/:id', deleteDirector);

export default router;
