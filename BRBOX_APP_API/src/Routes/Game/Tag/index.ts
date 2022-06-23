import RouterConstructor from '../../RouterConstructor';
import TagView from '../../../View/Game/tag';
import Auth from '../../../Middleware/auth';

const tagRouter = RouterConstructor.getCRUD_middleware_GetFree(new TagView(), [Auth.admin, Auth.user]);
export default tagRouter;