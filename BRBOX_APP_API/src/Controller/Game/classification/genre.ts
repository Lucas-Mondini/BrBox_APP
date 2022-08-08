import { Controller } from "../..";
import { Request } from "express";
import Genre from "../../../Model/Game/classification/genre";
import { AppDataSource } from "../../../data-source";
import Game from "../../../Model/Game";
import { In } from "typeorm";

export default class GenreController extends Controller {
    constructor() {
        super(Genre, [  "games",
                        "games.imageList",
                        "games.linkList",
                        "games.tagList",
                        "games.linkList.externalLinks",
                        "games.linkList.externalLinks.platform",
                        "games.imageList.images",
                        "games.tagList.tagValues",
                        "games.tagList.tagValues.tag",
                        "games.tagList.tagValues.value",
                        "games.businessModelList",
                        "games.businessModelList.businessModels"]);
    }

        //@ts-ignore
        Create = async (req: Request) => {
            try {
                const {name} = req.body;
                
                const genre = await new Genre();
                genre.name        = name;
                await AppDataSource.getRepository(Genre).save(genre);
                
                return {status: 200, value: {
                        ...genre
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
                const genre = await AppDataSource.getRepository(Genre).findOneBy({id: Number(id)});
    
                if(!genre)
                    return { status: 404, value: {message: "genre not found" }};
    
                genre.name = new_name || genre.name;

                await AppDataSource.getRepository(Genre).save(genre);
                
                return {status: 200, value: {
                        ...genre
                }};
            }
             catch (e : any) {
                return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
            }
        }
}