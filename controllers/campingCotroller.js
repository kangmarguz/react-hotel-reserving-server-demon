import prisma from '../config/prismaClient.js';
import renderError from '../utils/renderError.js';

//TODO: update handle error
export const listCamping = async (req, res, next) => {
    try {
        const { id } = req.params;
        const listCamp = await prisma.landmark.findMany({
            include: {
                favorites: {
                    where: {
                        profileId: id,
                    },
                    select: {
                        id: true,
                    },
                },
            },
        });

        const campFavorte = listCamp.map((item, index) => {
            return { ...item, isFavorite: item.favorites.length > 0 };
        });
        res.json({ result: campFavorte });
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

export const actionFavorite = async (req, res, next) => {
    try {
        const { campingId, isFavorite } = req.body;
        const { id } = req.user;

        let result;
        //ADD OR REMOVE FAVORITE
        if (isFavorite) {
            result = await prisma.favorite.deleteMany({
                where: {
                    profileId: id,
                    landmarkId: campingId,
                },
            });
        } else {
            result = await prisma.favorite.create({
                data: {
                    landmarkId: campingId,
                    profileId: id,
                },
            });
        }

        res.json({
            status: {
                code: '200',
                message: isFavorite
                    ? 'Remove Favorite Success'
                    : 'Add Favorite Success',
                success: true,
            },
            result,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const getAllFavorites = async (req, res, next) => {
    try {
        const { id } = req.user;
        const favorites = await prisma.favorite.findMany({
            where: {
                profileId: id,
            },
            include: {
                landmark: true,
            },
        });

        const favoritSelected = favorites?.map((item) => {
            return {
                ...item,
                landmark: { ...item.landmark, isFavorite: true },
            };
        });

        res.json({
            status: {
                code: '200',
                success: true,
            },
            result: favoritSelected,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const searchAndFilter = async (req, res, next) => {
    try {
        const { category, search } = req.query;
        const filter = [];
        if (category) filter.push({ category: category });
        if (search) filter.push({ title: { contains: search } });

        const result = await prisma.landmark.findMany({
            where: {
                OR: filter,
            },
            include: {
                favorites: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        const campFavorte = result.map((item) => {
            return { ...item, isFavorite: item.favorites.length > 0 };
        });

        res.json({ result: campFavorte });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
