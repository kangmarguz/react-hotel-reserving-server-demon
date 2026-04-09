import express from 'express';
const router = express.Router();
import { createProfile, updateProfile } from '../controllers/profileController.js';

router.post('/profile', createProfile);
router.put('/profile/:id', updateProfile);


export default router;