import express from 'express';
const router = express.Router();
import {
    listCamping,
    readCamping,
    createCamping,
    updateCamping,
    deleteCamping,
    actionFavorite,
    getAllFavorites,
    searchAndFilter,
} from '../controllers/campingCotroller.js';

import { authCheck } from '../middlewares/auth.js';

// READ ALL
router.get('/camping', listCamping);
router.get('/listcamp/:id', listCamping);

//READ ONE
router.get('/camping/:id', readCamping);

router.post('/camping', authCheck, createCamping);

router.put('/camping/:id', updateCamping);

router.delete('/camping/:id', deleteCamping);

router.post('/favorite', authCheck, actionFavorite);

router.get('/favorite', authCheck, getAllFavorites);

router.get('/filter-camp', searchAndFilter);

export default router;
