import Router from 'express'
import Auth from '../Middleware/auth';

import userRouter from './User';
import adminRouter from './User/Admin';


import gameRouter from './Game';
import tagRouter from './Game/Tag';

const mainRouter = Router();

mainRouter.use('/user', userRouter);
mainRouter.use('/admin', Auth.admin, adminRouter);
mainRouter.use('/game', Auth.admin, gameRouter);

mainRouter.use('/tag', Auth.admin,  tagRouter);

export default mainRouter;