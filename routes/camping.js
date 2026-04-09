import express from 'express';
const router = express.Router();
import { listCamping, readCamping } from '../controllers/campingCotroller.js';

// READ ALL
router.get('/camping', listCamping);

//READ ONE
router.get('/camping:id', readCamping);

router.post('/camping', (req, res) => {
    console.log(req.body);
    res.json({ message: 'hello post camping' });
});

router.put('/camping/:id', (req, res) => {
    console.log(req.body);
    res.json({ message: `hello put ${req.params.id}` });
});

router.delete('/camping/:id', (req, res) => {
    console.log(req.body);
    res.json({ message: `hello delete ${req.params.id}` });
});

export default router;
