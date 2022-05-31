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
            const tags = await AppDataSource.getRepository(Tag).findOneBy({id: Number(id)});
            
            return {status: 200, value: {
                    tags
            }};
        }
        catch (e) {
            return {status: 500, value: {message: "something went wrong: " + e}};
        }
    }
    Update = async (req: Request) => {
        throw new Error("Method not implemented.");
    }
    Delete = async (req: Request) => {
        throw new Error("Method not implemented.");
    }
}