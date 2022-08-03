
import Auth from '../../../Middleware/auth';
import ModeView from '../../../View/Game/classification/mode';
import RouterConstructor from '../../RouterConstructor';

const gameModeRouter = RouterConstructor.getCRUD_middleware_GetFree(new ModeView(), [Auth.admin, Auth.user]);
export default gameModeRouter;