import express from "express";
const router = express.Router();
import { authCheck } from '../middlewares/auth.js';
import { createImages } from "../controllers/uploadImageController.js";

router.post('/images', authCheck, createImages);

export default router;