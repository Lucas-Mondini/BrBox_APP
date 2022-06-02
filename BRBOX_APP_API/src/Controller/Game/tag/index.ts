import { Request } from "express";
import {Controller} from "../..";

import { AppDataSource } from "../../../data-source";
import Tag from "../../../Model/Game/tag";

export default class TagController extends Controller {

    constructor() {
        super(Tag, []);
    }

    Create = async (req: Request) => {
        try {
            const {name, description} = req.body;
            
            const tag = await new Tag();
            tag.name        = name;
            tag.description = description;
            await AppDataSource.getRepository(Tag).save(tag);
            
            return {status: 200, value: {
                    ...tag
            }};
        }
        catch (e) {
            return {status: 500, value: {message: "something went wrong: " + e}};
        }
    }

    Update = async (req: Request) => {
        try {
            const {id, new_name, new_description } = req.body
            const tag = await AppDataSource.getRepository(Tag).findOneBy({id: Number(id)});

            if(!tag)
                return { status: 404, value: {message: "tag not found" }};

            tag.name = new_name || tag.name;
            tag.description = new_description || tag.description;
            
            await AppDataSource.getRepository(Tag).save(tag);
            
            return {status: 200, value: {
                    ...tag
            }};
        }
        catch (e) {
            return {status: 500, value: {message: "something went wrong: " + e}};
        }
    }
}