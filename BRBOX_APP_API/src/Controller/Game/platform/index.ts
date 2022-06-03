import { Request } from "express";
import {Controller} from "../..";

import { AppDataSource } from "../../../data-source";
import Platform from "../../../Model/Game/platform";

export default class PlatformController extends Controller {

    constructor() {
        super(Platform, []);
    }
    //@ts-ignore
    Create = async (req: Request) => {
        try {
            const {name} = req.body;
            
            const platform = await new Platform();
            platform.name        = name;
            await AppDataSource.getRepository(Platform).save(platform);
            
            return {status: 200, value: {
                    ...platform
            }};
        }
        catch (e) {
            return {status: 500, value: {message: "something went wrong: " + e}};
        }
    }
    //@ts-ignore
    Update = async (req: Request) => {
        try {
            const {id, new_name} = req.body
            const platform = await AppDataSource.getRepository(Platform).findOneBy({id: Number(id)});

            if(!platform)
                return { status: 404, value: {message: "platform not found" }};

            platform.name = new_name || platform.name;
            
            await AppDataSource.getRepository(Platform).save(platform);
            
            return {status: 200, value: {
                    ...platform
            }};
        }
        catch (e) {
            return {status: 500, value: {message: "something went wrong: " + e}};
        }
    }
}