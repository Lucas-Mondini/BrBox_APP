import Router from 'express'
import UserView from '../../View/User';
const gameRouter = Router();

const view = new UserView();

gameRouter.post('/create',      view.Create);
gameRouter.get('/:id',          view.Get);
gameRouter.put('/update',       view.Update);
gameRouter.post('/destroy',     view.Delete);

gameRouter.get('/',             view.GetAll);




export default gameRouter;