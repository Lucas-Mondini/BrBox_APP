import {Request} from 'express'
import {Controller} from "../..";
import { AppDataSource } from '../../../data-source';
import BusinessModel from "../../../Model/Game/businessModel";

export default class BusinessModelController extends Controller {
    constructor() {
        super(BusinessModel, []);
    }
    
    //@ts-ignore
    Create = async (req: Request) => {
        try {
            const {name, description} = req.body;
            
            const businessModel = await new BusinessModel();
            businessModel.name        = name;
            businessModel.description = description;
            await AppDataSource.getRepository(BusinessModel).save(businessModel);
            
            return {status: 200, value: {
                ...businessModel
            }};
        }
        catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
        }
    }
    //@ts-ignore
    Update = async (req: Request) => {
        try {
            const {id, new_name, new_description} = req.body
            const businessModel = await AppDataSource.getRepository(BusinessModel).findOneBy({id: Number(id)});
            
            if(!businessModel)
            return { status: 404, value: {message: "businessModel not found" }};
            
            businessModel.name = new_name               || businessModel.name;
            businessModel.description = new_description || businessModel.description;
            
            await AppDataSource.getRepository(BusinessModel).save(businessModel);
            
            return {status: 200, value: {
                ...businessModel
            }};
        }
        catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
        }
    }
}