import express from 'express';
const router = express.Router();
import { authCheck } from '../middlewares/auth.js';
import { checkout, checkoutStatus, createBooking } from '../controllers/bookingController.js';

router.post('/booking', authCheck, createBooking);

// @PAYMENT
router.post('/checkout', authCheck, checkout);

router.get('/checkout-status/:session_id', checkoutStatus);

export default router;