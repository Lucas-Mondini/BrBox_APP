import {Request} from 'express'
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { EntityTarget } from 'typeorm';
import { Type } from 'typescript';
import { AppDataSource } from '../data-source';

interface IController {
    Create  (req: Request): Promise<Object> | never;
    Index   (req: Request): Promise<Object> | never;
    Get     (req: Request): Promise<Object> | never;
    Update  (req: Request): Promise<Object> | never;
    Delete  (req: Request): Promise<Object> | never;
}

class Controller implements IController {
    private model: any;
    public relations: any = null;
    constructor(customModel: any, relations: any[]) {
        this.model = customModel
        this.relations = relations
    }


    Create = async (req: Request) => {
        return {status: 500, value: {
            message: "error, Method not implemented."
        } }
    }

    Index = async (req: Request) => {
        try {
            var values: any;
            if(this.relations) {
                values = await AppDataSource.getRepository(this.model).find({relations: this.relations});
                for (let value of values) {
                    if(this.relations.includes("user")) {
                        value.user = {
                            id: value.user.id,
                            username: value.user.username,
                            email: value.user.email
                        };
                    }
                };
            }
            else {
                values = await AppDataSource.getRepository(this.model).find({});
            }

            return {status: 200, value: values};
        }
         catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
        }
    }

    Get = async (req: Request) => {
        try {
            const id = req.params.id
            var value: any;
            if(this.relations) {
                value = await AppDataSource.getRepository(this.model).findOneOrFail({where: {id: Number(id)}, relations: this.relations});
                if(this.relations.includes("user")) {
                    value.user = {
                        id: value.user.id,
                        username: value.user.username,
                        email: value.user.email
                    };
                }
            }
            else
                value = await AppDataSource.getRepository(this.model).findOneByOrFail({id: Number(id)});

            if(!value)
                return { status: 404, value: {message: "value not found" }};
            
            return {status: 200, value};
        }
         catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
        }
    }

    Update = async (req: Request) => {
        return {status: 500, value: {
            message: "error, Method not implemented."
        } }
    }
    
    Delete = async (req: Request) => {
        try {
            const id = req.params.id
            const value = await AppDataSource.getRepository(this.model).findOneBy({id: Number(id)});

            if(!value)
                return { status: 404, value: {message: "value not found" }};
            
            
            const dead = await AppDataSource.getRepository(this.model).delete(Object(value));
    
    
    
            if(dead.affected)
                return {
                    status: 200,
                    value: {message: "deleted " + dead.affected + " value"}
                }
            return {
                status: 501,
                value: {message: "unhandled error"}
                }
        }
         catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
        }
    }

}


export {IController, Controller}