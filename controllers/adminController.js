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

export const getListReservations = async (req, res, next) => {
    try {
        const { id } = req.user;
        const campings = await prisma.landmark.count({
            where: {
                profileId: id,
            },
        });

        const total = await prisma.booking.aggregate({
            where: {
                profileId: id,
            },
            _sum: {
                totalNights: true,
                totalPrice: true,
            },
        });

        res.json({
            status: {
                code: '200',
                message: 'Get List Stats Success',
            },
            result: {
                count: campings,
                totalNights: total._sum.totalNights,
                totalPrice: total._sum.totalPrice,
            },
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const getAllListReservations = async (req, res, next) => {
    console.log("get own list reservation... !");
    
    try {
        const { id } = req.user;
        const reservation = await prisma.booking.findMany({
            where: {
                paymentStatus: true,
                landmark: {
                    profileId: id,
                }
            },
            include: {
                landmark: {
                    select: {
                        id:true,
                        title: true,
                        price: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc',
            }
        });

        res.json({ result: reservation });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
