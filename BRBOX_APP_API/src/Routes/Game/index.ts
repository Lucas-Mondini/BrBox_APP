import Router from 'express'
import GameView from '../../View/Game';
import tagRouter from './Tag';
const gameRouter = Router();

const view = new GameView();

gameRouter.post('/create',              view.Create);
gameRouter.get('/:id',                  view.Get);
gameRouter.put('/update',               view.Update);
gameRouter.delete('/destroy/:id',       view.Delete);

gameRouter.get('/',                     view.GetAll);




export default gameRouter;