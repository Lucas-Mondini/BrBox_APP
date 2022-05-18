import Router from 'express'
import UserView from '../View/User';
const userRouter = Router();

const view = new UserView();

userRouter.post('/create',      view.CreateUser);
userRouter.get('/',             view.GetAllUsers);
userRouter.get('/:id',          view.GetUser);
userRouter.put('/update',       view.UpdateUser);
userRouter.delete('/destroy',   view.DeleteUser);
userRouter.post('/login',        view.Login);



export default userRouter;