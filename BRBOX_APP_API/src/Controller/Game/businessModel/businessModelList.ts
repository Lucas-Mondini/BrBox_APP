import { Request } from "express";
import {Controller} from "../..";

import { AppDataSource } from "../../../data-source";
import BusinessModel from "../../../Model/Game/businessModel";
import BusinessModelList from "../../../Model/Game/businessModel/businessModelList";

export default class BusinessModelListController extends Controller {
    constructor() {
        super(BusinessModelList, ["businessModels"])
    }
    
    //@ts-ignore
    Create = async (req: Request) => {
        const {businessModel} = req.body;
        
        const businessModelList = new BusinessModelList();
                        
        if (businessModel) {
            const businessModelArray = new Array<BusinessModel>();
            for (let element of businessModel) {
                    const businessModelObj = AppDataSource.getRepository(BusinessModel).findOneByOrFail({id: element});
                    
                    businessModelArray.push(await businessModelObj);
            };
            
            businessModelList.businessModels = businessModelArray;
        }
        await AppDataSource.getRepository(BusinessModelList).save(businessModelList);
        
        return businessModelList;
    }
    
    //@ts-ignore
    Update = async (req: Request, id: number) => {
        const {businessModel} = req.body
        const businessModelList = await AppDataSource.getRepository(BusinessModelList).findOneOrFail({where: {id: Number(id)}, relations: ["businessModels"]});
        
        if(!businessModelList)
        throw "businessModelList not found";
        
        if(!businessModel) {
            return businessModelList;
        }

        AppDataSource.getRepository(BusinessModel).remove(businessModelList.businessModels);
        
        const businessModelArray = new Array<BusinessModel>();
        for (let element of businessModel) {
                const businessModelObj = AppDataSource.getRepository(BusinessModel).findOneByOrFail({id: element});
                
                businessModelArray.push(await businessModelObj);
        };
        
        businessModelList.businessModels = businessModelArray;
        await AppDataSource.getRepository(BusinessModelList).save(businessModelList);
        
        return businessModelList;
    }

    //@ts-ignore
    Delete = async (req: Request) => {
        const id = req.params.id;
        const businessModelList = await AppDataSource.getRepository(BusinessModelList).findOneOrFail({where: {id: Number(id)}, relations: ["businessModels"]});

        if(!businessModelList)
        throw "businessModelList not found"

        AppDataSource.getRepository(BusinessModelList).remove(businessModelList);

        return AppDataSource.getRepository(BusinessModelList).find({where: {id: Number(id)}, relations: ["businessModels"]});
    }

    AddBusinessModels = async(req: Request) => {
        const {businessModelListId, businessModels} = req.body
        const businessModelList = await AppDataSource.getRepository(BusinessModelList).findOneOrFail({where: {id: Number(businessModelListId)}, relations: ["businessModels"]});
        
        for (let element of businessModels) {
            const businessModelObj = await AppDataSource.getRepository(BusinessModel).findOneByOrFail({id: element});

            if (businessModelList.businessModels.filter(i => i.id == businessModelObj.id).length == 0)
                businessModelList.businessModels.push(businessModelObj);
        };
        
        await AppDataSource.getRepository(BusinessModelList).save(businessModelList);
        return businessModelList;
    }
    
    RemoveBusinessModel = async (req: Request) => {
        const {businessModelListId, businessModelId} = req.body
        const businessModelList = await AppDataSource.getRepository(BusinessModelList).findOneOrFail({where: {id: Number(businessModelListId)}, relations: ["businessModels"]});
        
        const businessModel = businessModelList.businessModels.find((businessModel) => {
            return businessModel.id == businessModelId;
        });
        if(!businessModel)
        throw "BusinessModel not found"
        
        businessModelList.businessModels = businessModelList.businessModels.filter((im)=> {
            return im.id != businessModel.id;
        });

        await AppDataSource.getRepository(BusinessModelList).save(businessModelList);
        return businessModelList;
    }
}