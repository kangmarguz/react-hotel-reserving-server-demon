import express from 'express';
const router = express.Router();
import { authCheck } from '../middlewares/auth.js';
import { checkout, createBooking } from '../controllers/bookingController.js';
import Stripe from 'stripe';
const stripe = new Stripe(
    'sk_test_51THFvqHK9Kprr5DAl76gPCJPUqCv1JKg36aFT0mNPcqSYc3V0u4vAOpsh3tFNDZS38jQ12f0nLxB5Hlje04ZqjJB007smHrngI',
);

router.post('/booking', authCheck, createBooking);

// @PAYMENT
router.post('/checkout', authCheck, checkout);

export default router;
