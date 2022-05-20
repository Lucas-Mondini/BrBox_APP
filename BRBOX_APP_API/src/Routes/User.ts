import Router from 'express'
import UserView from '../View/User';
import auth from '../Middleware/auth';
const userRouter = Router();

const view = new UserView();

userRouter.post('/login',               view.Login);
userRouter.post('/create',              view.CreateUser);
userRouter.get('/:id',          auth,   view.GetUser);
userRouter.put('/update',       auth,   view.UpdateUser);
userRouter.delete('/destroy',   auth,   view.DeleteUser);

userRouter.get('/',             auth,   view.GetAllUsers);




export default userRouter;