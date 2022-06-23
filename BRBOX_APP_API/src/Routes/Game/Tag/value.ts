import RouterConstructor from '../../RouterConstructor';
import ValueView from '../../../View/Game/tag/value';
import Auth from '../../../Middleware/auth';

const valueRouter = RouterConstructor.getCRUD_middleware_GetFree(new ValueView(), [Auth.admin, Auth.user]);
export default valueRouter;