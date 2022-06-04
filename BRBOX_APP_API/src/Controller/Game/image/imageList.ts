import { Request } from "express";
import {Controller} from "../..";

import { AppDataSource } from "../../../data-source";
import Image from "../../../Model/Game/image";
import ImageList from "../../../Model/Game/image/imageList";

export default class ImageListController extends Controller {
    constructor() {
        super(ImageList, ["images"])
    }
    
    //@ts-ignore
    Create = async (req: Request) => {
        const {images} = req.body;
        
        const imageList = new ImageList();
                        
        const imagesArray = new Array<Image>();
        for (let element of images) {
                const imageObj = new Image();
                
                imageObj.link = element.link;
                imageObj.name = element.name;
                
                imagesArray.push(imageObj);
        };
        
        imageList.images = imagesArray;
        await AppDataSource.getRepository(ImageList).save(imageList);
        
        return imageList;
    }
    
    //@ts-ignore
    Update = async (req: Request, id: number) => {
        const {images} = req.body
        const imageList = await AppDataSource.getRepository(ImageList).findOneOrFail({where: {id: Number(id)}, relations: ["images"]});
        
        if(!imageList)
        throw "imageList not found";
        
        if(!images) {
            return imageList;
        }

        AppDataSource.getRepository(Image).remove(imageList.images);
        
        const imagesArray = new Array<Image>();
        for (let element of images) {
                const imageObj = new Image();
                
                imageObj.link = element.link;
                imageObj.name = element.name;
                
                imagesArray.push(imageObj);
        };
        
        imageList.images = imagesArray;
        await AppDataSource.getRepository(ImageList).save(imageList);
        
        return imageList;
    }

    //@ts-ignore
    Delete = async (req: Request) => {
        const id = req.params.id;
        const imageList = await AppDataSource.getRepository(ImageList).findOneOrFail({where: {id: Number(id)}, relations: ["images"]});

        if(!imageList)
        throw "imageList not found"

        AppDataSource.getRepository(Image).remove(imageList.images);
        AppDataSource.getRepository(ImageList).remove(imageList);

        return AppDataSource.getRepository(ImageList).find({where: {id: Number(id)}, relations: ["images"]});
    }
}