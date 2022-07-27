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

        await AppDataSource.getRepository(Image).remove(imageList.images);
        
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

        await AppDataSource.getRepository(Image).remove(imageList.images);
        await AppDataSource.getRepository(ImageList).remove(imageList);

        return await AppDataSource.getRepository(ImageList).find({where: {id: Number(id)}, relations: ["images"]});
    }

    AddImages = async(req: Request) => {
        const {imageListId, images} = req.body
        const imageList = await AppDataSource.getRepository(ImageList).findOneOrFail({where: {id: Number(imageListId)}, relations: ["images"]});
        
        for (let element of images) {
                const imageObj = new Image();
                
                imageObj.link = element.link;
                imageObj.name = element.name;
                
                imageList.images.push(imageObj);
        };
        
        await AppDataSource.getRepository(ImageList).save(imageList);
        return imageList;
    }
    
    RemoveImage = async (req: Request) => {
        const {imageListId, imageId} = req.body
        const imageList = await AppDataSource.getRepository(ImageList).findOneOrFail({where: {id: Number(imageListId)}, relations: ["images"]});
        
        const image = imageList.images.find((image) => {
            return image.id == imageId;
        });
        if(!image)
        throw "Image not found"
        
        imageList.images = imageList.images.filter((im)=> {
            return im.id != image.id;
        });

        await AppDataSource.getRepository(ImageList).save(imageList);
        await AppDataSource.getRepository(Image).remove(image);
        return imageList;
    }
}