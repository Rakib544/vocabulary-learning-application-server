import { Router } from 'express';

import auth from './auth/auth.route';
import users from './users/users.route';

const router: Router = Router();

router.use('/users', users);
router.use('/auth', auth);

export default router;
