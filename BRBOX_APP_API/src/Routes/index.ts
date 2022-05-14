import Router from 'express'
import userRouter from './User';
const mainRouter = Router();

mainRouter.get('/user', userRouter);

export default mainRouter;