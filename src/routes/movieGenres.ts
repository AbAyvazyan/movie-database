import { Router } from 'express';
import {createMovieGenre, deleteMovieGenre, getMovieGenres} from "../controllers/movieGenres";

const router = Router();

router.post('/', createMovieGenre);
router.delete('/:movieId/:genreId', deleteMovieGenre);
router.get('/', getMovieGenres);

export default router;
