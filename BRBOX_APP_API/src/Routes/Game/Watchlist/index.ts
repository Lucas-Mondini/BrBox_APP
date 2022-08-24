import RouterConstructor from '../../RouterConstructor';
import PlatformView from '../../../View/Game/platform';
import WatchlistView from '../../../View/Game/watchlist';

const view = new WatchlistView()
const watchlistRouter = RouterConstructor.getCRUD(view);
watchlistRouter.post('/addGame', view.AddGame);
watchlistRouter.post('/removeGame', view.RemoveGame);
export default watchlistRouter;