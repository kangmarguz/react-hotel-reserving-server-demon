import renderError from '../utils/renderError.js';
//TODO: update handle error
export const listCamping = (req, res, next) => {
    try {
        res.json({ message: 'hello get camping from controller' });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const readCamping = (req, res, next) => {
    try {
        res.json({ message: 'hellow from readcamping controller.' });
    } catch (error) {
        console.log(error.message);
        next(error)
    }
};

export const createCamping = (req, res, next) => {
    try {
        console.log(req.body);
        res.json({ message: 'hello post camping' });
    } catch (error) {
        next(error);
    }
};

export const updateCamping = (req, res, next) => {
    try {
        console.log(req.body);
        res.json({ message: `hello put ${req.params.id}` });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

export const deleteCamping = (req, res, next) => {
    try {
        console.log(req.body);
        res.json({ message: `hello delete ${req.params.id}` });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};
