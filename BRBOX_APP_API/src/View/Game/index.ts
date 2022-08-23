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

    AddBusinessModel = async (req: Request, res: Response) => {
        const object = await controller.AddBusinessModel(req);
        return res.status(object.status).json(object.value);
    }

    RemoveBusinessModel = async (req: Request, res: Response) => {
        const object = await controller.RemoveBusinessModel(req);
        return res.status(object.status).json(object.value);
    }

    AddGenre = async (req: Request, res: Response) => {
        const object = await controller.AddGenre(req);
        return res.status(object.status).json(object.value);
    }

    RemoveGenre = async (req: Request, res: Response) => {
        const object = await controller.RemoveGenre(req);
        return res.status(object.status).json(object.value);
    }

    AddMode = async (req: Request, res: Response) => {
        const object = await controller.AddMode(req);
        return res.status(object.status).json(object.value);
    }

    RemoveMode = async (req: Request, res: Response) => {
        const object = await controller.RemoveMode(req);
        return res.status(object.status).json(object.value);
    }

    UserTop3 = async (req: Request, res: Response) => {
        const object = await controller.UserTop3(req);
        return res.status(object.status).json(object.value);
    }

    UserRatings = async (req: Request, res: Response) => {
        const object = await controller.UserRatings(req);
        return res.status(object.status).json(object.value);
    }

    top5Voted = async (req: Request, res: Response) => {
        const object = await controller.top5Voted(req);
        return res.status(object.status).json(object.value);
    }

    Reccomended = async (req: Request, res: Response) => {
        const object = await controller.Reccomended(req);
        return res.status(object.status).json(object.value);
    }
}