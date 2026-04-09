export const listCamping = (req, res) => {
    try {
        res.json({ message: 'hello get camping from controller' });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: '500',
            message: 'Internal Server Error.',
        });
    }
};

export const readCamping = (req, res) => {
    try {
        res.json({ message: 'hellow from readcamping controller.' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: '500',
            message: error.message || 'Internal Server Error.',
        });
    }
};

export const createCamping = (req, res) => {
    try {
        console.log(req.body);
        res.json({ message: 'hello post camping' });
    } catch (error) {
        res.status(500).json({
            code: '500',
            message: error.message || 'Internal Server Error.',
        });
    }
};

export const updateCamping = (req, res) => {
    try {
        console.log(req.body);
        res.json({ message: `hello put ${req.params.id}` });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: '500',
            message: error.message || 'Internal Server Error.',
        });
    }
};

export const deleteCamping = (req, res) => {
    try {
        console.log(req.body);
        res.json({ message: `hello delete ${req.params.id}` });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: '500',
            message: error.message || 'Internal Server Error.',
        });
    }
};
