import { Router } from 'express';
import Auth from '../../../Middleware/auth';
import TagValueListView from '../../../View/Game/tag/tagValueList';


const tagValueListRouter = Router();
const view = new TagValueListView();
tagValueListRouter.post("/add",     Auth.user, view.AddTagValue);
tagValueListRouter.post("/remove",  Auth.user, view.RemoveTagValue);
tagValueListRouter.get("/",        Auth.admin, view.GetAll);
tagValueListRouter.get("/:id",     Auth.user, view.Get);

export default tagValueListRouter;