import express from 'express';
import { create, deletePost, getPosts } from '../controllers/post.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.post('/create', verifyToken, create);
router.delete('/deletepost/:postId/:userId', verifyToken, deletePost);
router.get('/getPosts', getPosts);

export default router;