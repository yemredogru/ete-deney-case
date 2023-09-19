import express from 'express';
import { Login,Register } from '../controllers/authController';

const authRouter = express.Router();

import { verifyToken } from '../middleware/authMiddleware';

authRouter.post('/login',Login)
authRouter.get('/check-user',verifyToken)
authRouter.post('/register',Register)

export default authRouter;