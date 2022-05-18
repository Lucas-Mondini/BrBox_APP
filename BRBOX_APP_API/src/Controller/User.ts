import { Request } from "express";
import bcrypt from "bcrypt";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import 'dotenv/config';

import Controller from "./";
import User from "../Model/User";
import { AppDataSource } from "../data-source";
import { Timestamp } from "typeorm";

export default class UserController implements Controller {

    constructor(){

    }

    /**
     * 
     * @param req = {username, password, confirm_password, email}
     * @param res 
     * @returns 
     */
    Create = async (req: Request) => {
        try {
            const {username, email, password, confirm_password} = req.body;
            let hash = null;

            const usedEmail = await AppDataSource.getRepository(User).findOneBy({Email: email});
            console.log(usedEmail);

            if(usedEmail)
                return { status: 400, value: "this e-mail is already in use"};

            if (password != confirm_password)
                return {status: 401, value: "password and password confirmation do not match"};

            hash = await bcrypt.hash(password, 10);

            if(hash) {
                const newUser = await new User();
                newUser.username    = username;
                newUser.Password    = hash;
                newUser.Email       = email;
                AppDataSource.getRepository(User).save(newUser);

                return {status: 200, Successful: "user created successfully :", value: {
                    username: username,
                    email: email
                }};
            }
        }
        catch (e) {
            return {status: 500, value: "something went wrong: " + e};
        }
        return {status: 500, value: "an unexpected error ocurred"};
    }
    /**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    Index = async () => {
        try {
            const users = await AppDataSource.getRepository(User).find();
            const usersToReturn = new Array();
            users.forEach((user) => {
                usersToReturn.push({
                    id: user.id,
                    username: user.username,
                    Email: user.Email
                })
            })
            return {status: 200, value: usersToReturn};
        } catch (e) {
            return {status: 500, value: "something went wrong: " + e};
        }
    }
    /**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    Get = async (req: Request) => {
        try {
            const id = req.params.id;
            if(!id) 
                return {status: 500, value: "id not sent"}
            const user = await AppDataSource.getRepository(User).findOneBy({
                id: Number(id)
            });

            if(!user) 
                return { status: 404, value: "User not found" };
        
            const userToReturn = {
                id: user.id,
                username: user.username,
                Email: user.Email
            }
            return {status: 200, value: userToReturn};
        } catch (e) {
            return {status: 500, value: "something went wrong: " + e};
        }
    }
    /**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    Update = async (req: Request) => {
        try {
            let {username, email, password, new_username, new_email, new_password, confirm_new_password} = req.body;
            let hash = null;
            const userRef = await AppDataSource.getRepository(User).findOneBy({Email: email});

            const isValidUser = await this.Login(email, password);

            if (isValidUser.status != 200) {
                return isValidUser;
            }

            const usedEmail = await AppDataSource.getRepository(User).findOneBy({Email: new_email});

            if(new_email && usedEmail && usedEmail.id != userRef?.id)
                return {status: 400, value: "his e-mail is already in use"};

            if (new_password && confirm_new_password != new_password)
                return {status: 400, value: "password and password confirmation do not match"};



            hash = await bcrypt.hash(new_password, 10);

            if(hash) {
                if(userRef) {
                    userRef.username    = new_username || username;
                    userRef.Password    = hash         || password;
                    userRef.Email       = new_email    || email;
                    AppDataSource.getRepository(User).save(userRef);

                    return {status: 200, Successful: "user updated successfully", value: {
                        username: new_username || username,
                        email: new_email    || email
                    }};
                }
            }
        }
        catch (e) {
            return {status: 500, value: "something went wrong: " + e};
        }
        return {status: 500, value: "an unexpected error ocurred"};
    }
    /**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    Delete = async (req: Request) => {
        let {email, password} = req.body;

        const isValidUser = await this.Login(email, password);

        if (isValidUser.status != 200) {
            return isValidUser;
        }
        AppDataSource.getRepository(User).delete({
            Email: email
        });
        return {status: 200, value: "Success! user with email: " + email + " was deleted successfully"}

    }

    Login = async (email: string, password: string) => {
        try {
            const user = await AppDataSource.getRepository(User).findOneBy({
                Email: email
            });

            if(!user) {
                return {status: 404, value: "User not found"};
            }

            
            const foundPassword: string = user.Password;
            if(!await bcrypt.compare(password, foundPassword)) {
                return {status: 401, value: "authentication failure"};
            }

            const token = this.GenerateJWT(user.id, user.Email);

            return {
                status: 200,
                value: {
                    _id: user.id,
                    name: user.username,
                    email: user.Email,
                    auth_token: token
                }
              };
        } catch (e) {
            return {status: 500, value: "something went wrong: " + e};
        }
    }

    GenerateJWT(id :number, email :string) {
        const tokenSecret: string = process.env.TOKEN_SECRET!;
        if(!tokenSecret)
            throw "cannot load token secret from env"
        return jwt.sign({
            _id: id, email
        }, tokenSecret);
    }
}