import { Controller } from "../..";
import { Request } from "express";
import Mode from "../../../Model/Game/classification/mode";
import { AppDataSource } from "../../../data-source";
import Game from "../../../Model/Game";
import { FindOperator, In } from "typeorm";

export default class ModeController extends Controller {
    constructor() {
        super(Mode, []);
    }

        //@ts-ignore
        Create = async (req: Request) => {
            try {
                const {name} = req.body;
                
                const mode = await new Mode();
                mode.name        = name;
                await AppDataSource.getRepository(Mode).save(mode);
                
                return {status: 200, value: {
                        ...mode
                }};
            }
             catch (e : any) {
                return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
            }
        }
        //@ts-ignore
        Update = async (req: Request) => {
            try {
                const {id, new_name} = req.body
                const mode = await AppDataSource.getRepository(Mode).findOneBy({id: Number(id)});
    
                if(!mode)
                    return { status: 404, value: {message: "mode not found" }};
    
                mode.name = new_name || mode.name;
                
                await AppDataSource.getRepository(Mode).save(mode);
                
                return {status: 200, value: {
                        ...mode
                }};
            }
             catch (e : any) {
                return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
            }
        }
}