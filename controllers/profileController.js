import prisma from '../config/prismaClient.js';
import renderError from '../utils/renderError.js';

export const createProfile = async (req, res, next) => {
    try {
        const { firstName, lastName } = req.body;
        const { id } = req.user;
        const email = req.user.emailAddresses[0]?.emailAddress || '';

        const profile = await prisma.profile.create({
            data: {
                firstName,
                lastName,
                clerkId : id,
                email
            }
        });

        return res.json({
            result: profile,
            status: { code: '200', message: 'Create Profile Success' },
        });

    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

export const updateProfile = (req, res, next) => {
    try {
        console.log(res.body);
        if (err) {
            return renderError(500, ' Invalid request pokemon');
        }
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};
