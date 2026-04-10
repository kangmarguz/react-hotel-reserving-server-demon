import express from 'express';
const router = express.Router();
import {
    listCamping,
    readCamping,
    createCamping,
    updateCamping,
    deleteCamping,
} from '../controllers/campingCotroller.js';

import { authCheck } from '../middlewares/auth.js';

// READ ALL
router.get('/camping', authCheck, listCamping);

//READ ONE
router.get('/camping:id', readCamping);

router.post('/camping', authCheck, createCamping);

router.put('/camping/:id', updateCamping);

router.delete('/camping/:id', deleteCamping);

export default router;
