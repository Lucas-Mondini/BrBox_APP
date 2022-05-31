import Router from 'express'
import Auth from '../Middleware/auth';
import userRouter from './User';
import adminRouter from './User/Admin';
import gameRouter from './Game';

const mainRouter = Router();

mainRouter.use('/user', userRouter);
mainRouter.use('/admin', Auth.admin, adminRouter);
mainRouter.use('/game', Auth.admin, adminRouter);

export default mainRouter;