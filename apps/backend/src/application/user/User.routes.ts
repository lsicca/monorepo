import { Router } from 'express';
import { checkBodySchema } from '@app/validation';
import { getProfile, isFirstUser, login, register } from './User.controllers';
import { userLoginValidator, userRegisterValidator } from './User.validators';

const router = Router();

router.get('/1.0/users/isFirst', isFirstUser);

router.post('/1.0/auth/register', checkBodySchema(userRegisterValidator), register);
router.post('/1.0/auth/login', checkBodySchema(userLoginValidator), login);

router.get('/1.0/users/profile', getProfile);

export default router;
