import { Request } from "express";
import {Controller} from "../..";

import { AppDataSource } from "../../../data-source";
import Value from "../../../Model/Game/tag/value";

export default class ValueController extends Controller {
    constructor() {
        super(Value);
    }

    
    Create = async (req: Request) => {
        try {
            const {name} = req.body;
            
            const value = await new Value();
            value.name        = name;
            await AppDataSource.getRepository(Value).save(value);
            
            return {status: 200, value: {
                    name:           value.name,
            }};
        }
        catch (e) {
            return {status: 500, value: {message: "something went wrong: " + e}};
        }
    }
    Update = async (req: Request) => {
        try {
            const {name, new_name} = req.body
            const value = await AppDataSource.getRepository(Value).findOneBy({name: name});

            if(!value)
                return { status: 404, value: {message: "value not found" }};

            value.name = new_name || value.name;
            
            AppDataSource.getRepository(Value).save(value);
            
            return {status: 200, value: {
                    value
            }};
        }
        catch (e) {
            return {status: 500, value: {message: "something went wrong: " + e}};
        }
    }
}