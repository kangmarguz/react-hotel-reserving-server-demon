import express from 'express';
const router = express.Router();
import { authCheck } from '../middlewares/auth.js';
import { createBooking } from '../controllers/bookingController.js';

router.post('/booking', authCheck, createBooking);

export default router;