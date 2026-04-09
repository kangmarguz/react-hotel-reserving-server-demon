import renderError from '../utils/renderError.js';
import { clerkClient, getAuth } from '@clerk/express';

export const authCheck = async (req, res, next) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return renderError(401, 'Unauthorized');
        }
        const user = await clerkClient.users.getUser(userId);
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};
