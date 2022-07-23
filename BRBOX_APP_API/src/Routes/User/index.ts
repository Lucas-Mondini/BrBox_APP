import Router from 'express'
import UserView from '../../View/User';
import Auth from '../../Middleware/auth';
const userRouter = Router();

const view = new UserView();

userRouter.post('/login',                   view.Login);
userRouter.post('/create',                  view.Create);
userRouter.post('/forgotPassword',          view.ForgotPassword);
userRouter.post('/retrievePassword',         view.RetrievePassword);
userRouter.get('/:id',          Auth.user,  view.Get);
userRouter.put('/update',       Auth.user,  view.Update);
userRouter.post('/destroy',     Auth.user,  view.Delete);

userRouter.get('/',             Auth.admin,  view.GetAll);




export default userRouter;