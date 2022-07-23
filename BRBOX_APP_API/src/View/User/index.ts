import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

import UserController from "../../Controller/User";


export default class UserView {
    private userController: UserController;
    
    constructor(){
        this.userController = new UserController();
    }
    
    Create = async(req: Request, res: Response) => {
        const user = await this.userController.Create(req);
        return res.status(user.status).json(user.value);
    }
    
    GetAll = async(req: Request, res: Response) => {
        const users = await this.userController.Index(req);
        return res.status(users.status).json(users.value);
    }
    
    Get = async(req: Request, res: Response) => {
        const user = await this.userController.Get(req);
        return res.status(user.status).json(user.value);
    }
    
    Update = async(req: Request, res: Response) => {
        const user = await this.userController.Update(req);
        return res.status(user.status).json(user.value);
    }

    Delete = async(req: Request, res: Response)=> {
        const user = await this.userController.Delete(req);
        return res.status(user.status).json(user.value)
    }
    
    Login = async(req: Request, res: Response) => {
        const {email, password} = req.body;
        const Login = await this.userController.Login(email, password);
        return res.status(Login.status).json(Login.value);
    }

    ForgotPassword = async(req: Request, res: Response) => {
        const {email, password} = req.body;
        const response = await this.userController.ForgetPassword(email);
        return res.status(response.status).json(response.value);
    }

    RetrievePassword = async(req: Request, res: Response) => {
        const {email, new_password, confirm_new_password, code} = req.body;
        const response = await this.userController.retrievePassword(email, new_password, confirm_new_password, code);
        return res.status(response.status).json(response.value);
    }
    
} 