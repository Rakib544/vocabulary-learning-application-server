import { Router } from 'express';

import auth from './auth/auth.route';
import lesson from './lessons/lessons.route';
import tutorial from './tutorials/tutorials.route';
import users from './users/users.route';

const router: Router = Router();

router.use('/users', users);
router.use('/auth', auth);
router.use('/lessons', lesson);
router.use('/tutorials', tutorial);

export default router;
