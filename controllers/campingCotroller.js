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
    res.json({ message: 'hellow from readcamping controller.' });
};

export const saveCamping = (req, res) => {
    console.log(req.body);
    res.json({ message: 'hello post camping' });
};
