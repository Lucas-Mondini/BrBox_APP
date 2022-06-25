import { Router } from 'express';
import Auth from '../../../Middleware/auth';
import TagValueListView from '../../../View/Game/tag/tagValueList';


const tagValueListRouter = Router();
const view = new TagValueListView();
tagValueListRouter.post("/add",     view.AddTagValue);
tagValueListRouter.post("/remove",  view.RemoveTagValue);
tagValueListRouter.get("/",        Auth.admin ,view.GetAll);
tagValueListRouter.get("/:id",     view.Get);

export default tagValueListRouter;