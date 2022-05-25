import Router from 'express'
import UserView from '../View/User';
import auth from '../Middleware/auth';
const userRouter = Router();

const view = new UserView();

userRouter.post('/login',               view.Login);
userRouter.post('/create',              view.Create);
userRouter.get('/:id',          auth,   view.Get);
userRouter.put('/update',       auth,   view.Update);
userRouter.delete('/destroy',   auth,   view.Delete);

userRouter.get('/',             auth,   view.GetAll);




export default userRouter;