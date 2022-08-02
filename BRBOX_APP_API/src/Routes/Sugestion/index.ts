import Router from 'express'
import sugestionView from '../../View/Sugestion';
const suggestionRouter = Router();
suggestionRouter.post('/', sugestionView)

export default suggestionRouter;