import express from 'express';
import { createChannel } from '../controllers/channelController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();
router.post('/', authMiddleware, createChannel);

export default router;