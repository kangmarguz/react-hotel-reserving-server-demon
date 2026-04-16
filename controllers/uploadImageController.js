// import prisma from '../config/prismaClient.js';
import renderError from '../utils/renderError.js';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

export const createImages = async (req, res, next) => {
    try {
        console.log('START.. UPLOAD IMAGE...');

        const { images } = req.body;
        const uploadResult = await cloudinary.uploader
            .upload(images, {
                public_id: `${Date.now()}`,
                resource_type: 'auto',
                folder: 'Landmark',
            })
            .catch((error) => {
                console.log(error);
            });

        res.json({ result: uploadResult });
    } catch (error) {
        next(error);
    }
};
