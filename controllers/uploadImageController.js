import prisma from '../config/prismaClient.js';
import renderError from '../utils/renderError.js';

export const createImages = (req, res, next) => {
    try {
        console.log(req.body.images);
        res.json({ code: 200, message: ' upload image success' });
    } catch (error) {
        next(error);
    }
};
