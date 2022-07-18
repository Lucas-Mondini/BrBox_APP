import RouterConstructor from '../../RouterConstructor';
import BusinessModelView from '../../../View/Game/businessModel';
import Auth from '../../../Middleware/auth';

const businessModelRouter = RouterConstructor.getCRUD_middleware_GetFree(new BusinessModelView(), [Auth.admin, Auth.user]);
export default businessModelRouter;