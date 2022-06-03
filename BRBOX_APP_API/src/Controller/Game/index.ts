import { Request } from "express";
import {Controller} from "../";
import { AppDataSource } from "../../data-source";

import Game from "../../Model/Game";
import ExternalLink from "../../Model/Game/externalLink";
import ExternalLinkList from "../../Model/Game/externalLink/externalLinkList";
import Platform from "../../Model/Game/platform";
import ExternalLinkListController from "./externalLink/externalLinkList";


export default class GameController extends Controller {
    
    constructor() {
        super(Game, ["tagList", "imageList", "linkList", "linkList.externalLinks"])
    }
    
    //@ts-ignore
    Create = async (req: Request) => {
        try {
            const {name} = req.body;
            
            const game = new Game();
            game.name = name;
            
            
            const linkList = await new ExternalLinkListController().Create(req);;
            game.linkList = linkList
            
            
            //Cria tabela de associação de Imagem e jogo
            //const game_imageList = new ImageList();
            
            //Cria tabela de associação de Tags e jogo (essa começa vazia, ja que é o usuario que vai associar)
            //const game_tagValueList = new TagValueList();
            
            
            await AppDataSource.getRepository(Game).save(game);
            
            return {status: 200, value: {
                ...game
            }};
        }
        catch (e) {
            return {status: 500, value: {message: "something went wrong: " + e}};
        }
    }
    //@ts-ignore
    Update = async (req: Request) => {
        try {
            const {id, new_name} = req.body
            const game = await AppDataSource.getRepository(Game).findOneBy({id: Number(id)});
            
            if(!game)
            return { status: 404, value: {message: "game not found" }};



            game.name = new_name || game.name;
            game.linkList = await new ExternalLinkListController().Update(req, game.linkList.id);
            
            AppDataSource.getRepository(Game).save(game);
            
            return {status: 200, value: {
                ...game
            }};
        }
        catch (e) {
            return {status: 500, value: {message: "something went wrong: " + e}};
        }
    }
    
    Delete = async (req: Request) => {
        try {
            const id = req.params.id
            const game = await AppDataSource.getRepository(Game).findOneOrFail({where: {id: Number(id)}, relations: ["tagList", "imageList", "linkList", "linkList.externalLinks"]});
            
            if(!game)
            return { status: 404, value: {message: "value not found" }};
            
            AppDataSource.getRepository(ExternalLink).remove(game.linkList.externalLinks);
            AppDataSource.getRepository(ExternalLinkList).remove(game.linkList);
            await AppDataSource.getRepository(Game).remove(game);
            const dead = await AppDataSource.getRepository(Game).findOneBy({id: Number(id)});
            
            if(!dead)
            return {
                status: 200,
                value: {message: "deleted 1 value"}
            }
            return {
                status: 501,
                value: {message: "unhandled error"}
            }
        }
        catch (e) {
            return {status: 500, value: {message: "something went wrong: " + e}};
        }
    }



    
    
    AddLink = async(req: Request) => {
        try {
            const {id, externalLinks} = req.body
            const game = await AppDataSource.getRepository(Game).findOneOrFail({where: {id: Number(id)}, relations: ["tagList", "linkList.externalLinks"]});
            
            const Platforms = await AppDataSource.getRepository(Platform).find({});
            
            for (let element of externalLinks) {
                const externalLinkObj = new ExternalLink();
                
                const platform = Platforms.find((item : Platform) => {
                    return item.id == element.platform
                });
                if(!platform) 
                throw "invalid platform id"
                
                externalLinkObj.link = element.link;
                externalLinkObj.platform = platform;
                
                game.linkList.externalLinks.push(externalLinkObj);
            };
            
            await AppDataSource.getRepository(Game).save(game);
            return {status: 200, value: {
                ...game
            }};
        }catch(e) {
            return {status: 500, value: {message: "something went wrong: " + e}};
        }
        
    }

    RemoveLink = async (req: Request) => {
        try {
            const {id, externalLinks} = req.body
            const game = await AppDataSource.getRepository(Game).findOneOrFail({where: {id: Number(id)}, relations: ["tagList", "linkList.externalLinks"]});

            game.linkList.externalLinks.filter((i)=> {
                return externalLinks.find(i) < 0;
            });

            await AppDataSource.getRepository(Game).save(game);
            return {status: 200, value: {
                ...game
            }};

        }catch(e) {
            return {status: 500, value: {message: "something went wrong: " + e}};
        }
    }
    
}