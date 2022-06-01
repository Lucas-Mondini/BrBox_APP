import RouterConstructor from '../RouterConstructor';
import GameView from '../../View/Game';

const gameRouter = RouterConstructor.getCRUD(new GameView());

export default gameRouter;