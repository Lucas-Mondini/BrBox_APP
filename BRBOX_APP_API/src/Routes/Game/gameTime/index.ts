import RouterConstructor from '../../RouterConstructor';
import Auth from '../../../Middleware/auth';
import GameTimeView from '../../../View/Game/gameTime';

const gameTimeRouter = RouterConstructor.getCRUD(new GameTimeView());
export default gameTimeRouter;