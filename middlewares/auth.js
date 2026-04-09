export const authCheck = (req, res, next) => {
    try {
        console.log('middleware active');
        next();
    } catch (error) {
        console.log(error.message);
    }
};
