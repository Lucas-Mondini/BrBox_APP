import Router from 'express'
import TagView from '../../../View/Game/tag';
const tagRouter = Router();

const view = new TagView();

tagRouter.post('/create',               view.Create);
tagRouter.get('/:id',                   view.Get);
tagRouter.put('/update',                view.Update);
tagRouter.delete('/destroy/:id',        view.Delete);

tagRouter.get('/',                      view.GetAll);




export default tagRouter;