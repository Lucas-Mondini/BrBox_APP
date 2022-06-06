import RouterConstructor from '../RouterConstructor';
import GameView from '../../View/Game';

const view = new GameView();
const gameRouter = RouterConstructor.getCRUD(view);
gameRouter.post("/addLink",     view.AddLink)
gameRouter.post("/removeLink",  view.RemoveLink)
gameRouter.post("/addImage",     view.AddImage)
gameRouter.post("/removeImage",  view.RemoveImage)

export default gameRouter;