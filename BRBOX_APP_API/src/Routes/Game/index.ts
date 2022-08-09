import RouterConstructor from '../RouterConstructor';
import GameView from '../../View/Game';
import Auth from '../../Middleware/auth';

const view = new GameView();
const gameRouter = RouterConstructor.getCRUD_middleware_GetFree(view, [Auth.admin, Auth.user]);
gameRouter.post("/addLink",     view.AddLink)
gameRouter.post("/removeLink",  view.RemoveLink)
gameRouter.post("/addImage",     view.AddImage)
gameRouter.post("/removeImage",  view.RemoveImage)
gameRouter.post("/addBusinessModel",     view.AddBusinessModel)
gameRouter.post("/removeBusinessModel",  view.RemoveBusinessModel)
gameRouter.post("/addGenre",     view.AddGenre)
gameRouter.post("/removeGenre",  view.RemoveGenre)
gameRouter.post("/addMode",     view.AddMode)
gameRouter.post("/removeMode",  view.RemoveMode)

export default gameRouter;