import renderError from '../utils/renderError.js';

export const createProfile = (req, res, next) => {
    try {
        const { firstName, lastName, clerkID } = req.body;
        // if(err) {
        //     return renderError(500, "Invalid request")
        // }
        res.json({
            code: '200',
            message: 'create success',
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
