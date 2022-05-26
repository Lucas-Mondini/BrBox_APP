import Router from 'express'
import AdminView from '../View/User/Admin';
import Auth from '../Middleware/auth';
const adminRouter = Router();

const view = new AdminView();

adminRouter.post('/setAdmin',    Auth.admin,      view.SetAdmin);
adminRouter.get('/:id',          Auth.admin,      view.Get);
adminRouter.get('/',             Auth.admin,      view.GetAll);
adminRouter.delete('/destroy',   Auth.admin,      view.Delete);



export default adminRouter;