import { Request } from "express";

import 'dotenv/config';

import Controller from "..";
import Admin from "../../Model/User/Admin";
import User from "../../Model/User";
import { AppDataSource } from "../../data-source";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export default class AdminController implements Controller {
    /**
     * 
     * @param req {id: number}
     */
    Create = async (req: Request) => {
        try {
            const {id} = req.body;
            
            const user = await AppDataSource.getRepository(User).findOneBy({id: id});
            
            if(!user)
                return { status: 404, value: {message: "user not found"}};
            
            const admin = await new Admin();
            admin.user    = user;
            AppDataSource.getRepository(Admin).save(admin);
            
            return {status: 200, value: {
                    username: user.username,
                    email: user.Email,
                    admin: true
            }};
        }
        catch (e) {
            return {status: 500, value: {message: "something went wrong: " + e}};
        }
    }
    /**
     * 
     * @param req 
     */
    Index = async (req: Request) => {
        try {
            const users = await AppDataSource.getRepository(User)
                                            .createQueryBuilder("usr")
                                            .innerJoin(Admin, "adm", "adm.userId = usr.id")
                                            .getMany();

            return {
                status: 200, 
                value: users
            };
        } catch (e) {
            return {status: 500, value: {message: "something went wrong: " + e}};
        }
    }
    /**
     * 
     * @param req 
     */
    Get = async (req: Request) => {
        try {
            const id = req.params.id;
            if(!id) 
                return {status: 500, value: {message: "id not sent"}}
            
            const user = await AppDataSource.getRepository(User)
                                            .createQueryBuilder("usr")
                                            .innerJoin(Admin, "adm", "adm.userId = usr.id")
                                            .where("usr.id = " + id)
                                            .getOne();
            
            if(!user) 
                return { status: 404, value: {message: "user is not admin" }};
            
            
            
            return {
                status: 200, 
                value: user
            };
        } catch (e) {
            return {status: 500, value: {message: "something went wrong: " + e}};
        }
    }
    /**
     * 
     * @param req 
     */
    Update = async (req: Request) => {
        throw new Error("Method not implemented.");
    }
    /**
     * 
     * @param req 
     */
    Delete = async (req: Request) => {
        try {
            const _id = req.params.id
            
            const admin = await await AppDataSource.getRepository(Admin)
                                                    .createQueryBuilder("admin")
                                                    .innerJoin(User, "user", "user.id = admin.userId")
                                                    .where("user.id = :id", { id: _id || req.user.id})
                                                    .getOne();

            if(!admin)
                return { status: 404, value: {message: "Admin not found" }};
            
            
            const dead = await AppDataSource.getRepository(Admin).delete(admin);


            if(dead.affected)
                return {
                    status: 200, 
                    value: {message:  "removed admin from " + dead.affected + " users"}
                }   
            return {status: 400, value: {message: "user not found"}}
        } catch (e) {
            return {status: 500, value: {message: "something went wrong: " + e}};
        }
    }

}