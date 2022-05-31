import Router from 'express'
import AdminView from '../../View/User/Admin';
const adminRouter = Router();

const view = new AdminView();

adminRouter.post('/setAdmin',   view.SetAdmin);
adminRouter.get('/:id',         view.Get);
adminRouter.get('/',            view.GetAll);
adminRouter.delete('/destroy',  view.Delete);



export default adminRouter;