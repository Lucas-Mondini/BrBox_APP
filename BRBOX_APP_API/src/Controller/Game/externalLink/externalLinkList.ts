import { Request } from "express";
import {Controller} from "../..";
import { AppDataSource } from "../../../data-source";
import ExternalLink from "../../../Model/Game/externalLink";
import ExternalLinkList from "../../../Model/Game/externalLink/externalLinkList";
import Platform from "../../../Model/Game/platform";

export default class ExternalLinkListController extends Controller {
    
    constructor() {
        super(ExternalLinkList, ["externalLinks"])
    }
    
    //@ts-ignore
    Create = async (req: Request) => {
        const {externalLinks} = req.body;
        
        const externalLinkList = new ExternalLinkList();
        
        const Platforms = await AppDataSource.getRepository(Platform).find({});
                        
        const externalLinksArray = new Array<ExternalLink>();
        for (let element of externalLinks) {
                const externalLinkObj = new ExternalLink();
                
                const platform = Platforms.find((item : Platform) => {
                    return item.id == element.platform
                });
                if(!platform) 
                    throw "invalid platform id"
                
                externalLinkObj.link = element.link;
                externalLinkObj.platform = platform;
                
                externalLinksArray.push(externalLinkObj);
        };
        

        externalLinkList.externalLinks = externalLinksArray;
        await AppDataSource.getRepository(ExternalLinkList).save(externalLinkList);
        
        return externalLinkList;
    }
    
    //@ts-ignore
    Update = async (req: Request, id: number) => {
        const {externalLinks} = req.body
        const externalLinkList = await AppDataSource.getRepository(ExternalLinkList).findOneOrFail({where: {id: Number(id)}, relations: ["externalLinks", "externalLinks.platform"]});
        
        if(!externalLinkList)
        throw "externalLinkList not found";
        
        if(!externalLinks) {
            return externalLinkList;
        }

        AppDataSource.getRepository(ExternalLink).remove(externalLinkList.externalLinks);
        
        const Platforms = await AppDataSource.getRepository(Platform).find({});
        
        const externalLinksArray = new Array<ExternalLink>();
        for (let element of externalLinks) {
            const externalLinkObj = new ExternalLink();
            
            const platform = Platforms.find((item : Platform) => {
                return item.id == element.platform
            });
            if(!platform) 
            throw "invalid platform id"
            
            externalLinkObj.link = element.link;
            externalLinkObj.platform = platform;
            
            externalLinksArray.push(externalLinkObj);
            
        };
        externalLinkList.externalLinks = externalLinksArray;
        await AppDataSource.getRepository(ExternalLinkList).save(externalLinkList);
        
        return externalLinkList;
    }

    //@ts-ignore
    Delete = async (req: Request) => {
        const id = req.params.id;
        const externalLinkList = await AppDataSource.getRepository(ExternalLinkList).findOneOrFail({where: {id: Number(id)}, relations: ["externalLinks"]});

        if(!externalLinkList)
        throw "externalLinkList not found"

        AppDataSource.getRepository(ExternalLink).remove(externalLinkList.externalLinks);
        AppDataSource.getRepository(ExternalLinkList).remove(externalLinkList);
        return AppDataSource.getRepository(ExternalLinkList).find({where: {id: Number(id)}, relations: ["externalLinks"]});

    }
}