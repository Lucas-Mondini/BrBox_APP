import { Request, Response } from "express";

import AdminController from "../../Controller/User/Admin";


export default class AdminView {
    private adminController: AdminController;
    
    constructor(){
        this.adminController = new AdminController();
    }
    
    SetAdmin = async(req: Request, res: Response) => {
        const response = await this.adminController.Create(req);
        return res.status(response.status).json(response.value);
    }
    
    GetAll = async(req: Request, res: Response) => {
        const response = await this.adminController.Index(req);
        return res.status(response.status).json(response.value);
    }
    
    Get = async(req: Request, res: Response) => {
        const response = await this.adminController.Get(req);
        return res.status(response.status).json(response.value);
    }

    Delete = async(req: Request, res: Response)=> {
        const response = await this.adminController.Delete(req);
        return res.status(response.status).json(response.value)
    }
    
} 