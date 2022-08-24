import View from "../..";
import WatchlistController from "../../../Controller/Game/watchlist";
import { Request, Response } from "express";


export default class WatchlistView extends View{
    constructor(){
        super();
        this.controllerObject = new WatchlistController();
    }

    AddGame = async (req: Request, res: Response) => {
        const object = await this.controllerObject.AddGame(req);
        return res.status(object.status).json(object.value);
    }
    RemoveGame = async (req: Request, res: Response) => {
        const object = await this.controllerObject.RemoveGame(req);
        return res.status(object.status).json(object.value);
    }
}