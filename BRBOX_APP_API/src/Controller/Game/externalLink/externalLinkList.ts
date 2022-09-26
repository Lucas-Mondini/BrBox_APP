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

            if(!element.link)
            throw "invalid structure externalLinks.link"
            if(!platform) 
            throw "invalid platform id"
            
            externalLinkObj.link = element.link;
            externalLinkObj.imageURL = element.imageURL ? element.imageURL : "";
            externalLinkObj.promotion = element.promotion ? element.promotion : false;
            externalLinkObj.order = element.order ? element.order : 0;
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
        
        await AppDataSource.getRepository(ExternalLink).remove(externalLinkList.externalLinks);
        
        const Platforms = await AppDataSource.getRepository(Platform).find({});
        
        const externalLinksArray = new Array<ExternalLink>();
        for (let element of externalLinks) {
            const externalLinkObj = new ExternalLink();
            
            const platform = Platforms.find((item : Platform) => {
                return item.id == element.platform
            });

            if(!element.link)
            throw "invalid structure externalLinks.link"
            if(!platform) 
            throw "invalid platform id"
            
            externalLinkObj.link = element.link;
            externalLinkObj.imageURL = element.imageURL ? element.imageURL : "";
            externalLinkObj.promotion = element.promotion ? element.promotion : false;
            externalLinkObj.order = element.order ? element.order : 0;
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
        
        await AppDataSource.getRepository(ExternalLink).remove(externalLinkList.externalLinks);
        await AppDataSource.getRepository(ExternalLinkList).remove(externalLinkList);
        return await AppDataSource.getRepository(ExternalLinkList).find({where: {id: Number(id)}, relations: ["externalLinks"]});
        
    }
    
    AddLink = async(req: Request) => {
        const {externalLinkListId, externalLinks} = req.body
        const externalLinkList = await AppDataSource.getRepository(ExternalLinkList).findOneOrFail({where: {id: Number(externalLinkListId)}, relations: ["externalLinks", "externalLinks.platform"]});
        
        const Platforms = await AppDataSource.getRepository(Platform).find({});
        
        for (let element of externalLinks) {
            const externalLinkObj = new ExternalLink();
            
            const platform = Platforms.find((item : Platform) => {
                return item.id == element.platform
            });

            if(!element.link)
            throw "invalid structure externalLinks.link"
            if(!platform) 
            throw "invalid platform id"
            
            externalLinkObj.link = element.link;
            externalLinkObj.imageURL = element.imageURL ? element.imageURL : "";
            externalLinkObj.promotion = element.promotion ? element.promotion : false;
            externalLinkObj.order = element.order ? element.order : 0;
            externalLinkObj.platform = platform;
            
            externalLinkList.externalLinks.push(externalLinkObj);
        };
        
        await AppDataSource.getRepository(ExternalLinkList).save(externalLinkList);
        return externalLinkList;
        
    }
    
    RemoveLink = async (req: Request) => {
        const {externalLinkListId, externalLinkId} = req.body
        const externalLinkList = await AppDataSource.getRepository(ExternalLinkList).findOneOrFail({where: {id: Number(externalLinkListId)}, relations: ["externalLinks", "externalLinks.platform"]});
        
        const externalLink = externalLinkList.externalLinks.find((externalLink) => {
            return externalLink.id == externalLinkId;
        });
        if(!externalLink)
        throw "External Link not found"
        
        externalLinkList.externalLinks = externalLinkList.externalLinks.filter((i)=> {
            return i.id != externalLink.id;
        });
        
        await AppDataSource.getRepository(ExternalLinkList).save(externalLinkList);
        await AppDataSource.getRepository(ExternalLink).remove(externalLink);
        return externalLinkList;
    }
}