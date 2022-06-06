import View from "..";
import GameController from "../../Controller/Game";
import {Request, Response} from "express"


const controller = new GameController();

export default class GameView extends View {
   
    constructor(){
        super();
        this.controllerObject = controller;
    }

    AddLink = async (req: Request, res: Response) => {
        const object = await controller.AddLink(req);
        return res.status(object.status).json(object.value);
    }

    RemoveLink = async (req: Request, res: Response) => {
        const object = await controller.RemoveLink(req);
        return res.status(object.status).json(object.value);
    }

    AddImage = async (req: Request, res: Response) => {
        const object = await controller.AddImage(req);
        return res.status(object.status).json(object.value);
    }

    RemoveImage = async (req: Request, res: Response) => {
        const object = await controller.RemoveImage(req);
        return res.status(object.status).json(object.value);
    }
}