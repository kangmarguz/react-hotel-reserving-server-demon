export const createProfile = (req, res) => {
    try {
        console.log(res.body);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: '500',
            message: 'Internal Server Error.',
        });
    }
};

export const updateProfile = (req, res) => {
    try {
        console.log(res.body);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: '500',
            message: 'Internal Server Error.',
        });
    }
};
