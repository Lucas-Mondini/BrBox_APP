import Router from 'express'
import userRouter from './User';
const mainRouter = Router();

mainRouter.use('/user', userRouter);

export default mainRouter;