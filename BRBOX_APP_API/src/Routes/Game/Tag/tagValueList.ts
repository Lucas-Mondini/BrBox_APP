import { Router } from 'express';
import TagValueListView from '../../../View/Game/tag/tagValueList';


const tagValueListRouter = Router();
const view = new TagValueListView();
tagValueListRouter.post("/add",     view.AddTagValue);
tagValueListRouter.post("/remove",  view.RemoveTagValue);
tagValueListRouter.get("/",        view.GetAll);
tagValueListRouter.get("/:id",     view.Get);

export default tagValueListRouter;