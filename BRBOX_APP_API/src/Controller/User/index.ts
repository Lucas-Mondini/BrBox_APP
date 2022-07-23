import { Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config';

import {IController} from "..";

import User from "../../Model/User";
import Admin from "../../Model/User/Admin";
import { AppDataSource } from "../../data-source";

import Mailer from "../../services/mailer";
import Code from "../../Model/User/code";

export default class UserController implements IController {
    
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
            
            const usedEmail = await AppDataSource.getRepository(User).findOneBy({email: email});
            
            if(usedEmail)
            return { status: 400, value: {message: "this e-mail is already in use"}};
            
            if (password != confirm_password)
            return {status: 401, value: {message: "password and password confirmation do not match"}};
            
            hash = await bcrypt.hash(password, 10);
            
            if(!hash) {
                return {status: 500, value: {message: "an unexpected error ocurred"}};
            }
            const newUser = await new User();
            newUser.username    = username;
            newUser.Password    = hash;
            newUser.email       = email;
            await AppDataSource.getRepository(User).save(newUser);
            const jwt = await this.generateJwt(newUser)
            
            return {status: 200, value: {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                    auth_token: jwt.token
            }};
        
        }
         catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
        }
    }
    /**
    * 
    * @param req 
    * @returns 
    */
    Index = async (req: Request) => {
        try {
            const users = await AppDataSource.getRepository(User).find();
            const usersToReturn = new Array();
            for (let user of users) {
                usersToReturn.push(await this.getUserAttributes(req.user.admin, user))
            }
            return  {
                        status: 200, 
                        value: [...usersToReturn]
                    };
        }  catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
        }
    }
    /**
    * 
    * @param req req.params.id
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
            
            
            const userToReturn = await this.getUserAttributes(req.user.admin || (user.id == req.user.id), user);
            
            
            return  {
                status: 200, 
                value: {...userToReturn}
            };
        }  catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
        }
    }
    /**
    * 
    * @param req body {id, username, email, new_password, confirm_new_password, password}
    * @returns 
    */
    Update = async (req: Request) => {
        try {
            const {id, username, email, new_password, confirm_new_password, password} = req.body;

            const _id = req.user.admin? (id || req.user.id) : req.user.id;
            let hash = null;
            const userRef = await AppDataSource.getRepository(User).findOneBy({
                id:  _id,
            });

            if(!req.user.admin) {
                const login = await this.Login(req.user.email, password);
                if(login.status != 200)
                    return {status: 401, value: {message: "authentication failed"}}
            }


            if(!userRef)
                return { status: 404, value: {message: "User not found" }};
            
            const usedEmail = await AppDataSource.getRepository(User).findOneBy({email: email});
            
            if(email && usedEmail && usedEmail.id != userRef.id)
                return {status: 400, value: {message: "his e-mail is already in use"}};
            
            if (new_password && confirm_new_password != new_password)
                return {status: 400, value: {message: "new_password and confirm_new_password confirmation do not match"}};
            
            
            
            hash = await bcrypt.hash(new_password || password, 10);
            const adm = AppDataSource.getRepository(Admin).findOneBy({user: userRef});
            
            if(hash) {
                if(userRef) {
                    userRef.username    = username  || userRef.username;
                    userRef.Password    = hash      || userRef.Password;
                    userRef.email       = email     || userRef.email;
                    AppDataSource.getRepository(User).save(userRef);

                    const jwt = await this.generateJwt(userRef)
                    
                    return {status: 200, value: {
                            id: userRef.id,
                            username: username      || userRef.username,
                            email: email            || userRef.email,
                            admin: await adm? true  : false,
                            auth_token: jwt.token
                    }};
                }
            }
        }
         catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
        }
        return {status: 500, value: {message: "an unexpected error ocurred"}};
    }
    
    /**
    * 
    * @request POST [React não suporta body em request de DELETE]
    * @param req 
    * @returns 
    */
    
    Delete = async(req: Request) => { 
        try {
            const {id, password} = req.body
            
            const user = await AppDataSource.getRepository(User).findOneBy({
                id: req.user.admin? id : req.user.id,
            });

            if(!user)
                return { status: 404, value: {message: "User not found" }};
            

            if(!req.user.admin) {
                const login = await this.Login((<User>user).email, password);
                if(login.status != 200)
                    return {status: 401, value: {message: "authentication failed"}}
            }
            
            
            const dead = await AppDataSource.getRepository(User).delete({
                id: req.user.admin? id : req.user.id,
            });



            if(dead.affected)
                return {
                    status: 200,
                    value: {message: "deleted " + dead.affected + " users"}
                }   
            return {status: 400, value: {message: "user not found"}}
        }  catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
        }
    }
    
    Login = async (email: string, password: string) => {
        try {
            const user = await AppDataSource.getRepository(User).findOne( {where: {
                email: email
            }, select: ["id", "username", "email", "Password"]});
            
            if(!user) {
                return {status: 404, value: {message: "User not found"}};
            }
            
            
            const foundPassword: string = user.Password;
            if(!await bcrypt.compare(password, foundPassword)) {
                return {status: 401, value: {message: "authentication failure"}};
            }
            
            const jwt = await this.generateJwt(user);
            
            return {
                status: 200,
                    value: {
                        ...jwt.TokenStruct,
                        auth_token: jwt.token
                }
            };
        }  catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
        }
    }

    ForgetPassword = async (email: string) => {
        try {
        const user = await AppDataSource.getRepository(User).findOneOrFail({where: {email: email}, select: ["id", "username", "Password", "email", "createdDate"]});
        
        var code = await AppDataSource.getRepository(Code).findOneBy({user: {id: user.id}});
        if(!code) {
            code = new Code();
            code.user = user;
        }
        const _code = Math.floor(Math.random() * (9999 - 1) + 1).toString().padStart(4, "0")
        code.code = await bcrypt.hash(_code, 10);
        await AppDataSource.getRepository(Code).save(code);
        
        Mailer.getInstance().Send(email, 'Forgot the Password', 'forgotPass', {name: user.username, code: _code})
        return {status: 200, value: {
            message: "Mail sent to the email"}
        };
        } catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
        }
    }

    retrievePassword = async (email: string, new_password: string, confirm_new_password: string, code: string) => {
        try {
            if (new_password != confirm_new_password)
                return {status: 401, value: {message: "password and password confirmation do not match"}};
            
            const hash = await bcrypt.hash(new_password, 10);
            
            if(!hash) {
                return {status: 500, value: {message: "an unexpected error ocurred"}};
            }

            const user = await AppDataSource.getRepository(User).findOneByOrFail({email: email});
            const _code = await AppDataSource.getRepository(Code).findOneByOrFail({user: user});

            if(!await bcrypt.compare(code, _code.code)) {
                return {status: 401, value: {message: "Invalid code"}};
            }

            user.Password = hash;
            AppDataSource.getRepository(User).save(user);
            const adm = await  AppDataSource.getRepository(Admin).findOneBy({user: {id: user.id}});

            const jwt = await this.generateJwt(user)

            AppDataSource.getRepository(Code).delete(_code);
            return {status: 200, value: {
                    id:         user.id,
                    username:   user.username,
                    email:      user.email,
                    admin:      adm? true  : false,
                    auth_token: jwt.token
            }};

        } catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
        }
    }

    generateJwt = async (user: User) => {
        const tokenSecret: string = process.env.TOKEN_SECRET!;
        if(!tokenSecret)
            throw "cannot load token secret from env"
        const admin = await AppDataSource.getRepository(Admin)
        .createQueryBuilder("adm")
        .innerJoin(User, "user", "user.id = adm.userId")
        .where("user.id = :id", { id: user.id})
        .getOne();

        const TokenStruct = {
            id: user.id,
            username: user.username,
            email: user.email,
            admin: admin? true : false
        };
        const token = jwt.sign(TokenStruct, tokenSecret);
        return {
            TokenStruct: TokenStruct,
            token: token
        }
    }
    
    async getUserAttributes(admin: boolean, user: User) {

        const adm = await AppDataSource.getRepository(Admin).findOneBy({user: user});
        if (admin)
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            admin: adm? true : false
        }
        else
        return {
            id: user.id,
            username: user.username,
            admin: adm? true : false
        }
    }
}