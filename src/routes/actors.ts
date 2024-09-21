import { Router } from 'express';
import { getActors, createActor, updateActor, deleteActor } from '../controllers/actors';

const router = Router();

router.get('/', getActors);
router.post('/', createActor);
router.put('/:id', updateActor);
router.delete('/:id', deleteActor);

export default router;
