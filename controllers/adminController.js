import prisma from '../config/prismaClient.js';
import renderError from '../utils/renderError.js';

export const getListStats = async (req, res, next) => {
    try {
        const userCount = await prisma.profile.count();
        const bookingCount = await prisma.booking.count();
        const landmarkCount = await prisma.landmark.count();

        res.json({
            status: {
                code: '200',
                message: 'Get List Stats Success',
            },
            result: {
                userCount,
                bookingCount,
                landmarkCount,
            },
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
