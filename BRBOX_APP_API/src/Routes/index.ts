import Router from 'express'
import userRouter from './User';
import adminRouter from './Admin';


const mainRouter = Router();

mainRouter.use('/user', userRouter);
mainRouter.use('/admin', adminRouter);

export default mainRouter;