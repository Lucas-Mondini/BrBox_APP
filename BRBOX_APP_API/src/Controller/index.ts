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
    constructor(customModel: any) {
        this.model = customModel
    }


    Create(req: Request): Promise<Object> {
        throw new Error('Method not implemented.');
    }
    Index = async (req: Request) => {
        try {
            const tags = await AppDataSource.getRepository(this.model).find({});
            
            return {status: 200, value: {
                    tags
            }};
        }
        catch (e) {
            return {status: 500, value: {message: "something went wrong: " + e}};
        }
    }
    Get = async (req: Request) => {
        try {
            const id = req.params.id
            const value = await AppDataSource.getRepository(this.model).findOneBy({id: Number(id)});

            if(!value)
                return { status: 404, value: {message: "value not found" }};
            
            return {status: 200, value: {
                    value
            }};
        }
        catch (e) {
            return {status: 500, value: {message: "something went wrong: " + e}};
        }
    }
    Update(req: Request): Promise<Object> {
        throw new Error('Method not implemented.');
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
        catch (e) {
            return {status: 500, value: {message: "something went wrong: " + e}};
        }
    }

}


export {IController, Controller}