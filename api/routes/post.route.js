import express from 'express';
import { create, deletePost, getPosts, updatepost } from '../controllers/post.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.post('/create', verifyToken, create);
router.delete('/deletepost/:postId/:userId', verifyToken, deletePost);
router.put('/updatepost/:postId/:userId', verifyToken, updatepost);
router.get('/getPosts', getPosts);

export default router;