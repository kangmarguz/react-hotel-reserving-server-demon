import express from 'express';
const router = express.Router();
import { authCheck } from '../middlewares/auth.js';
import { getListReservations, getListStats, getAllListReservations } from '../controllers/adminController.js';

router.get('/listStats', authCheck, getListStats);
router.get('/listReservations', authCheck, getListReservations);
router.get('/get-all-reservations', authCheck, getAllListReservations);

export default router;