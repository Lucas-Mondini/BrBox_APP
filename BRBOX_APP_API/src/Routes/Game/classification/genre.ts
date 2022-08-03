import Auth from '../../../Middleware/auth';
import GenreView from '../../../View/Game/classification/genre';
import RouterConstructor from '../../RouterConstructor';

const gameGenreRouter = RouterConstructor.getCRUD_middleware_GetFree(new GenreView(), [Auth.admin, Auth.user]);
export default gameGenreRouter;