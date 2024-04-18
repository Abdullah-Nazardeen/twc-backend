import express, { Router } from 'express';
import { signup, signin } from '../controllers/auth';

const router: Router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);

export default router;
