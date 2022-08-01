import { Request, Response } from "express"
import 'dotenv'
import sugestionService from "../../services/suggestion";

const sugestionView = async(req: Request, res: Response) => {
    const object = await sugestionService(req);
    return res.status(object.status).json(object.value);
}

export default sugestionView;