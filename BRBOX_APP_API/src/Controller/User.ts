import { Request, Response } from "express";
import bcrypt from "bcrypt";

import Controller from "./";
import User from "../Model/User";
import { AppDataSource } from "../data-source";
import { Timestamp } from "typeorm";

export default class UserController implements Controller {


    /**
     * 
     * @param req = {username, password, confirm_password, email}
     * @param res 
     * @returns 
     */
    async Create(req: Request, res: Response) {
        try {
            const {username, password, confirm_password, email} = req.body;
            let hash = null;

            const usedEmail = await AppDataSource.getRepository(User).findBy({Email: email});
            console.log(usedEmail);

            if(usedEmail)
                return res.json(400).json({error: "this e-mail is already in user"});

            if (password != confirm_password)
                return res.json(401).json({error: "password and password confirmation do not match"});

            hash = await bcrypt.hash(password, 10);

            if(hash) {
                const newUser = new User();
                newUser.username    = username;
                newUser.Password    = hash;
                newUser.Email       = email;
                AppDataSource.getRepository(User).save(newUser);

                return res.status(200).json({Successful: "user created successfully :" + {
                    username: username,
                    email: email
                }});
            }
        }
        catch (e) {
            return res.status(500).json("somethin went wrong: " + e);
        }
        return res.status(500).json("an unexpected error ocurred");
    }
    /**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    async Index(req: Request, res: Response) {
        try {
            const users = await AppDataSource.getRepository(User).find();
            return res.status(200).json(users);
        } catch (e) {
            return res.status(500).json("somethin went wrong: " + e);
        }
    }
    /**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    async Get(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const users = await AppDataSource.getRepository(User).findOneBy({
                id: Number(id)
            });
            return res.status(200).json(users);
        } catch (e) {
            return res.status(500).json("somethin went wrong: " + e);
        }
    }
    /**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    async Update(req: Request, res: Response) {
        return res.status(200).json({teste: "funcionou :D "});
    }
    /**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    async Delete(req: Request, res: Response) {
        return res.status(200).json({teste: "funcionou :D "});
    }
}