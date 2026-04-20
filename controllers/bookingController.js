import prisma from '../config/prismaClient.js';
import renderError from '../utils/renderError.js';

export const createBooking = async (req, res, next) => {
    try {
        // const listCamp = await prisma.landmark.findMany();
        // res.json({ result: listCamp });
        console.log(req.body);
        res.json({code:"200", message:"booking success"})
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};
