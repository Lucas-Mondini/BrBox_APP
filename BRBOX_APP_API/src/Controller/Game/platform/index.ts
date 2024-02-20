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
            const {name, ITADId, imageURL} = req.body;
            
            const platform = await new Platform();
            platform.ITADId = ITADId;
            platform.name        = name;
            platform.imageURL    = imageURL;
            await AppDataSource.getRepository(Platform).save(platform);
            
            return {status: 200, value: {
                    ...platform
            }};
        }
         catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
        }
    }
    //@ts-ignore
    Update = async (req: Request) => {
        try {
            const {id, new_name, new_ITADId, new_imageURL} = req.body
            const platform = await AppDataSource.getRepository(Platform).findOneBy({id: Number(id)});

            if(!platform)
                return { status: 404, value: {message: "platform not found" }};

            platform.ITADId = new_ITADId || platform.ITADId;
            platform.name = new_name || platform.name;
            platform.imageURL = new_imageURL || platform.imageURL;
            
            await AppDataSource.getRepository(Platform).save(platform);
            
            return {status: 200, value: {
                    ...platform
            }};
        }
         catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
        }
    }
}