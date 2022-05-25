import Router from 'express'
import AdminView from '../View/Admin';
import auth from '../Middleware/auth';
const adminRouter = Router();

const view = new AdminView();

adminRouter.post('/setAdmin',    auth,      view.SetAdmin);
adminRouter.get('/:id',          auth,      view.Get);
adminRouter.get('/',             auth,      view.GetAll);
adminRouter.delete('/destroy',   auth,      view.Delete);



export default adminRouter;