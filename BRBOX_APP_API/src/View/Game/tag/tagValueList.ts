import { Request, Response } from "express";
import TagValueListController from "../../../Controller/Game/tag/tagValueList";

export default class TagValueListView {

    GetAll = async(req: Request, res: Response) => {
        const object = await new TagValueListController().Index(req);
        return res.status(object.status).json(object.value);
    }
    
    Get = async(req: Request, res: Response) => {
        const object = await new TagValueListController().Get(req);
        return res.status(object.status).json(object.value);
    }
    

    AddTagValue = async(req: Request, res: Response) => {
        const object = await new TagValueListController().AddTagValue(req);
        return res.status(object.status).json(object.value);
    }

    RemoveTagValue = async(req: Request, res: Response) => {
        const object = await new TagValueListController().RemoveTagValue(req);
        return res.status(object.status).json(object.value);
    }
}