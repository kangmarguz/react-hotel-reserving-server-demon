import express from 'express';
const router = express.Router();
import { createProfile, updateProfile } from '../controllers/profileController.js';
import { authCheck } from '../middlewares/auth.js';

router.post('/profile', authCheck, createProfile);
router.put('/profile/:id', updateProfile);


export default router;