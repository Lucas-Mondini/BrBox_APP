import { Controller } from "../..";
import { Request } from "express";
import Genre from "../../../Model/Game/classification/genre";
import { AppDataSource } from "../../../data-source";

export default class GenreController extends Controller {
    constructor() {
        super(Genre, []);
    }

        //@ts-ignore
        Create = async (req: Request) => {
            try {
                const {name, description} = req.body;
                
                const genre = await new Genre();
                genre.name        = name;
                genre.description = description;
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
                const {id, new_name, new_description} = req.body
                const genre = await AppDataSource.getRepository(Genre).findOneBy({id: Number(id)});
    
                if(!genre)
                    return { status: 404, value: {message: "genre not found" }};
    
                genre.name = new_name || genre.name;
                genre.description = new_description || genre.description;

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