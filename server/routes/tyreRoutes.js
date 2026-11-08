import express from 'express';
import { getTyres, getTyreById, searchTyres } from '../controllers/tyreController.js';

const router = express.Router();
router.get('/', getTyres);
router.get('/search', searchTyres);
router.get('/:id', getTyreById);

export default router;

