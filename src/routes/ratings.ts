import { Router } from 'express';
import { getRatings, createRating, deleteRating } from '../controllers/ratings';

const router = Router();

router.get('/', getRatings);
router.post('/', createRating);
router.delete('/:movieId', deleteRating);

export default router;
