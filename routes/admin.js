import express from 'express';
const router = express.Router();
import { authCheck } from '../middlewares/auth.js';
import { getListStats } from '../controllers/adminController.js';

router.get('/listStats', authCheck, getListStats);

export default router;