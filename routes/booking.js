import express from 'express';
const router = express.Router();
import { authCheck } from '../middlewares/auth.js';
import { checkout, checkoutStatus, createBooking, getHistoryBooking } from '../controllers/bookingController.js';

// @BOOKING 
router.post('/booking', authCheck, createBooking);
router.get('/booking', authCheck, getHistoryBooking);

// @PAYMENT
router.post('/checkout', authCheck, checkout);

router.get('/checkout-status/:session_id', checkoutStatus);

export default router;