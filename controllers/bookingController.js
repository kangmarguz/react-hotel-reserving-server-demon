import prisma from '../config/prismaClient.js';
import { calculateBookingDetails } from '../utils/booking.js';
import renderError from '../utils/renderError.js';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createBooking = async (req, res, next) => {
    const { campingId, checkIn, checkOut } = req.body;
    const { id } = req.user;
    try {
        // const listCamp = await prisma.landmark.findMany();
        // res.json({ result: listCamp });
        console.log(campingId, checkIn, checkOut);
        await prisma.booking.deleteMany({
            where: {
                profileId: id,
                paymentStatus: false,
            },
        });

        const camping = await prisma.landmark.findFirst({
            where: {
                id: campingId,
            },
            select: {
                price: true,
            },
        });

        if (!camping) {
            return renderError(400, 'Camping not found.');
        }

        const { total, nights } = calculateBookingDetails(
            checkIn,
            checkOut,
            camping.price,
        );

        const result = await prisma.booking.create({
            data: {
                profileId: id,
                landmarkId: campingId,
                checkIn,
                checkOut,
                totalPrice: total,
                totalNights: nights,
                reservBy: id,
            },
        });

        res.json({
            status: {
                code: '200',
                message: 'Booking Success',
            },
            result: {
                id: result.id,
            },
        });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

export const checkout = async (req, res, next) => {
    try {
        const { id } = req.body;
        const booking = await prisma.booking.findFirst({
            where: {
                id: id,
            },
            include: {
                landmark: {
                    select: {
                        id: true,
                        secure_url: true,
                        title: true,
                    },
                },
            },
        });

        if (!booking) return renderError(404, 'Not Found Your Booking.');

        const { totalNights, totalPrice, checkIn, checkOut, landmark } =
            booking;
        const { secure_url, title } = landmark;

        //CONNECT PAYMENT
        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded_page',
            metadata: {
                bookingId: booking.id, // custom prop
            },
            line_items: [
                {
                    price_data: {
                        currency: 'thb',
                        product_data: {
                            name: title,
                            images: [secure_url],
                            description: 'Thank you so much !',
                        },
                        unit_amount: Math.round(totalPrice * 100),
                    },
                    quantity: totalNights,
                },
            ],
            mode: 'payment',
            return_url: `http://localhost:5173/user/complete/{CHECKOUT_SESSION_ID}`,
        });
        res.send({ clientSecret: session.client_secret });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const checkoutStatus = async (req, res, next) => {
    try {
        const { session_id } = req.params;
        const session = await stripe.checkout.sessions.retrieve(session_id);
        const bookingId = session.metadata?.bookingId;
        if (session.status !== 'complete' || !bookingId) {
            return renderError(
                400,
                'Something Wrong pleases re-recheck to merchant.',
            );
        }
        // Update booking payment status
        const result = await prisma.booking.update({
            where: {
                id: bookingId,
            },
            data: {
                paymentStatus: true,
            },
        });
        res.json({
            status: session.status,
            code: '200',
            message: 'Payment Complate',
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
