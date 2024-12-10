import express from 'express';
import { addComment, getComments, updateComment, deleteComment } from '../controllers/commentController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/:videoId', authMiddleware, addComment);

router.get('/:videoId', getComments);

router.put('/:commentId', authMiddleware, updateComment);

router.delete('/:commentId', authMiddleware, deleteComment);

export default router;