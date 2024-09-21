import { Router } from 'express';
import { getMovies, createMovie, updateMovie, deleteMovie } from '../controllers/movies';

const router = Router();
router.get('/', getMovies);
router.post('/', createMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

export default router;
