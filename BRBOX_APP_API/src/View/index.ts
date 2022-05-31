import { Request, Response } from "express";
import jwt from 'jsonwebtoken';



export default class View {
    protected controllerObject: any;
    
    constructor(){
        
    }
    
    Create = async(req: Request, res: Response) => {
        const object = await this.controllerObject.Create(req);
        return res.status(object.status).json(object.value);
    }
    
    GetAll = async(req: Request, res: Response) => {
        const object = await this.controllerObject.Index(req);
        return res.status(object.status).json(object.value);
    }
    
    Get = async(req: Request, res: Response) => {
        const object = await this.controllerObject.Get(req);
        return res.status(object.status).json(object.value);
    }
    
    Update = async(req: Request, res: Response) => {
        const object = await this.controllerObject.Update(req);
        return res.status(object.status).json(object.value);
    }

    Delete = async(req: Request, res: Response)=> {
        const object = await this.controllerObject.Delete(req);
        return res.status(object.status).json(object.value)
    }
    
} 