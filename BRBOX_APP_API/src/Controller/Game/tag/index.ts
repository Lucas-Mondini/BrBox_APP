import { Request } from "express";
import Controller from "../..";

import { AppDataSource } from "../../../data-source";
import Tag from "../../../Model/Game/tag";

export default class TagController implements Controller {
    Create = async (req: Request) => {
        try {
            const {name, description} = req.body;
            
            const tag = await new Tag();
            tag.name        = name;
            tag.description = description;
            await AppDataSource.getRepository(Tag).save(tag);
            
            return {status: 200, value: {
                    name:           tag.name,
                    description:    tag.description
            }};
        }
        catch (e) {
            return {status: 500, value: {message: "something went wrong: " + e}};
        }
    }
    Index = async (req: Request) => {
        try {
            const tags = await AppDataSource.getRepository(Tag).find({});
            
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
            const tag = await AppDataSource.getRepository(Tag).findOneBy({id: Number(id)});

            if(!tag)
                return { status: 404, value: {message: "tag not found" }};
            
            return {status: 200, value: {
                    tag
            }};
        }
        catch (e) {
            return {status: 500, value: {message: "something went wrong: " + e}};
        }
    }
    Update = async (req: Request) => {
        try {
            const {name, new_name, new_description } = req.body
            const tag = await AppDataSource.getRepository(Tag).findOneBy({name: name});

            if(!tag)
                return { status: 404, value: {message: "tag not found" }};

            tag.name = new_name || tag.name;
            tag.description = new_description || tag.description;
            
            AppDataSource.getRepository(Tag).save(tag);
            
            return {status: 200, value: {
                    tag
            }};
        }
        catch (e) {
            return {status: 500, value: {message: "something went wrong: " + e}};
        }
    }
    
    Delete = async (req: Request) => {
        try {
            const id = req.params.id
            const tag = await AppDataSource.getRepository(Tag).findOneBy({id: Number(id)});

            if(!tag)
                return { status: 404, value: {message: "tag not found" }};
            
            
            const dead = await AppDataSource.getRepository(Tag).delete(tag);
    
    
    
            if(dead.affected)
                return {
                    status: 200,
                    value: {message: "deleted " + dead.affected + " tag"}
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