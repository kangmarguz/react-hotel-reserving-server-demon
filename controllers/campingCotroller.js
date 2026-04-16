import prisma from '../config/prismaClient.js';
import renderError from '../utils/renderError.js';

//TODO: update handle error
export const listCamping = async (req, res, next) => {
    try {
        const listCamp = await prisma.landmark.findMany();
        res.json({ result: listCamp });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

export const readCamping = async (req, res, next) => {
    try {
        const { id } = req.params;
        const camp = await prisma.landmark.findFirst({
            where: {
                id: id,
            },
        });
        res.json({ result: camp });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

export const createCamping = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { title, description, lat, lng, price, category, images } =
            req.body;
        const { public_id, secure_url } = images;
        const camping = await prisma.landmark.create({
            data: {
                title: title,
                description: description,
                lat: lat,
                lng: lng,
                price: price,
                category: category,
                secure_url: secure_url,
                public_id: public_id,
                profileId: id,
                // ...req.body,
                // public_id: public_id,
                // secure_url: secure_url,
                // profileId: id,
            },
        });

        return res.json({
            result: camping,
            status: {
                code: '200',
                message: `Create ${req.body.title || 'Camping'} Success`,
            },
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
