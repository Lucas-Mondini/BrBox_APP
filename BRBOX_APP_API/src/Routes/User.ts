import Router from 'express'
import UserController from '../Controller/User';
const userRouter = Router();

const controller = new UserController();

userRouter.use('/', controller.Create);
userRouter.use('/', controller.Index);
userRouter.use('/:id', controller.Get);
userRouter.use('/:id', controller.Update);
userRouter.use('/', controller.Delete);

export default userRouter;