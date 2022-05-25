import { Request } from "express";
import bcrypt from "bcrypt";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import 'dotenv/config';

import Controller from "./";

import User from "../Model/User";
import Admin from "../Model/Admin";
import { AppDataSource } from "../data-source";
import { FindOptionsUtils, Timestamp } from "typeorm";
import { Console } from "console";

export default class UserController implements Controller {
    
    constructor(){
        
    }
    
    /**
    * 
    * @param req = {username, password, confirm_password, email}
    * @returns 
    */
    Create = async (req: Request) => {
        try {
            const {username, email, password, confirm_password} = req.body;
            let hash = null;
            
            const usedEmail = await AppDataSource.getRepository(User).findOneBy({Email: email});
            
            if(usedEmail)
            return { status: 400, value: {message: "this e-mail is already in use"}};
            
            if (password != confirm_password)
            return {status: 401, value: {message: "password and password confirmation do not match"}};
            
            hash = await bcrypt.hash(password, 10);
            
            if(hash) {
                const newUser = await new User();
                newUser.username    = username;
                newUser.Password    = hash;
                newUser.Email       = email;
                AppDataSource.getRepository(User).save(newUser);
                
                return {status: 200, value: {
                    Success: "user created successfully :",
                    user: {
                        username: username,
                        email: email
                    }
                }};
            }
        }
        catch (e) {
            return {status: 500, value: {message: "something went wrong: " + e}};
        }
        return {status: 500, value: {message: "an unexpected error ocurred"}};
    }
    /**
    * 
    * @param req 
    * @returns 
    */
    Index = async (req: Request) => {
        if(!req.user.admin)
            return {status: 401, value: {message: "Unauthorized"}};
        try {
            const users = await AppDataSource.getRepository(User).find();
            const usersToReturn = new Array();
            users.forEach((user) => {
                usersToReturn.push(this.getUserAttributes(req.user.admin, user))
            })
            return {status: 200, value: usersToReturn};
        } catch (e) {
            return {status: 500, value: {message: "something went wrong: " + e}};
        }
    }
    /**
    * 
    * @param req 
    * @returns 
    */
    Get = async (req: Request) => {
        try {
            const id = req.params.id;
            if(!id) 
            return {status: 500, value: {message: "id not sent"}}
            const user = await AppDataSource.getRepository(User).findOneBy({
                id: Number(id)
            });
            
            if(!user) 
                return { status: 404, value: {message: "User not found" }};
            
            
            const userToReturn = this.getUserAttributes(req.user.admin, user);
            
            
            return {status: 200, value: userToReturn};
        } catch (e) {
            return {status: 500, value: {message: "something went wrong: " + e}};
        }
    }
    /**
    * 
    * @param req 
    * @returns 
    */
    Update = async (req: Request) => {
        try {
            const {_id, username, email, password, confirm_password} = req.body;

            const id = req.user.admin? _id || req.user._id : req.user._id;
            let hash = null;
            const userRef = await AppDataSource.getRepository(User).findOneBy({
                id:  id,
            });


            if(!userRef)
                return { status: 404, value: {message: "User not found" }};
            
            const usedEmail = await AppDataSource.getRepository(User).findOneBy({Email: email});
            
            if(email && usedEmail && usedEmail.id != userRef?.id)
                return {status: 400, value: {message: "his e-mail is already in use"}};
            
            if (password && confirm_password != password)
                return {status: 400, value: {message: "password and password confirmation do not match"}};
            
            
            
            hash = await bcrypt.hash(password, 10);
            
            if(hash) {
                if(userRef) {
                    userRef.username    = username  || userRef.username;
                    userRef.Password    = hash      || userRef.Password;
                    userRef.Email       = email     || userRef.Email;
                    AppDataSource.getRepository(User).save(userRef);
                    
                    return {status: 200, value: {
                        Success: "user updated successfully",
                        user: {
                            username: username  || userRef.username,
                            email: email        || userRef.Email
                        }
                    }};
                }
            }
        }
        catch (e) {
            return {status: 500, value: {message: "something went wrong: " + e}};
        }
        return {status: 500, value: {message: "an unexpected error ocurred"}};
    }
    
    /**
    * 
    * @param req 
    * @returns 
    */
    
    Delete = async(req: Request) => { 
        try {
            const {_id, password} = req.body
            
            const user = await AppDataSource.getRepository(User).findOneBy({
                id: req.user.admin? _id : req.user._id,
            });

            if(!user)
                return { status: 404, value: {message: "User not found" }};
            
            const login = await this.Login((<User>user).Email, password);
            if(login.status != 200)
                return {status: 401, value: {message: "authentication failed"}}
            
            
            const dead = await AppDataSource.getRepository(User).delete({
                id: req.user.admin? _id : req.user._id,
            });



            if(dead.affected)
                return {
                    status: 200, value: {
                        Success: "user deleted successfully",
                        message: "deleted " + dead.affected + " users"
                    }
                }   
            return {status: 400, value: {message: "user not found"}}
        } catch (e) {
            return {status: 500, value: {message: "something went wrong: " + e}};
        }
    }
    
    Login = async (email: string, password: string) => {
        const tokenSecret: string = process.env.TOKEN_SECRET!;
        if(!tokenSecret)
        throw "cannot load token secret from env"
        try {
            const user = await AppDataSource.getRepository(User).findOneBy({
                Email: email
            });
            
            if(!user) {
                return {status: 404, value: {message: "User not found"}};
            }
            
            
            const foundPassword: string = user.Password;
            if(!await bcrypt.compare(password, foundPassword)) {
                return {status: 401, value: {message: "authentication failure"}};
            }

            const admin = await AppDataSource.getRepository(Admin)
                                            .createQueryBuilder("adm")
                                            .innerJoin(User, "user", "user.id = adm.userId")
                                            .where("user.id = :id", { id: user.id})
                                            .getOne();
            
            const TokenStruct = {
                _id: user.id,
                name: user.username,
                email: user.Email,
                admin: admin? true : false
            };
            const token = jwt.sign(TokenStruct, tokenSecret);
            
            return {
                status: 200,
                value: {
                    ...TokenStruct,
                    auth_token: token
                }
            };
        } catch (e) {
            return {status: 500, value: {message: "something went wrong: " + e}};
        }
    }
    
    getUserAttributes(admin: boolean, user: User) {
        if (admin)
        return {
            id: user.id,
            username: user.username,
            Email: user.Email,
            Password: user.Password
        }
        else
        return {
            id: user.id,
            username: user.username,
        }
        
    }
}