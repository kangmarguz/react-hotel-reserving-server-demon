import renderError from '../utils/renderError.js';
import { clerkClient, getAuth } from '@clerk/express';

export const authCheck = async (req, res, next) => {
    try {
        const { isAuthenticated, userId } = getAuth(req);
        if (!isAuthenticated) {
            return renderError(401, 'User not authenticated');
        }
        const user = await clerkClient.users.getUser(userId);
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};
