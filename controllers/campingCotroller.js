import prisma from '../config/prismaClient.js';
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
        next(error);
    }
};

export const createCamping = async (req, res, next) => {
    try {
        const { id } = req.user;
        console.log(req.body);
        console.log(id);

        const camping = await prisma.landmark.create({
            data: {
                ...req.body,
                profileId: id,
            },
        });

        return res.json({
            result: camping,
            status: { code: '200', message: `Create ${req.body.title || "Camping"} Success` },
        });
    } catch (error) {
        console.log(error.message);

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
