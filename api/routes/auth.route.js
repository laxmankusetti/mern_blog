import express from 'express';
import { google, signin, signout, signup } from '../controllers/auth.controller.js';

const router = express.Router();
router.post('/signin', signin);
router.post('/signup', signup);
router.post('/google', google);
router.post('/signout', signout);

export default router;