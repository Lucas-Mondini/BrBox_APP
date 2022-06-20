import RouterConstructor from '../RouterConstructor';
import GameView from '../../View/Game';
import Auth from '../../Middleware/auth';
import Router from 'express';

const view = new GameView();
const gameRouter = Router();

gameRouter.get("/", view.GetAll);
gameRouter.get("/:id", view.Get);

gameRouter.post('/create',          Auth.admin,         view.Create);
gameRouter.put('/update',           Auth.admin,         view.Update);
gameRouter.delete('/destroy/:id',   Auth.admin,        view.Delete);

gameRouter.post("/addLink",     Auth.admin,     view.AddLink)
gameRouter.post("/removeLink",      Auth.admin,  view.RemoveLink)
gameRouter.post("/addImage",        Auth.admin,     view.AddImage)
gameRouter.post("/removeImage",     Auth.admin,  view.RemoveImage)

export default gameRouter;