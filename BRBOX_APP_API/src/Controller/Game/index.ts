import asyncBatch from "async-batch";
import { Request } from "express";
import {Controller} from "../";
import { AppDataSource } from "../../data-source";

import Game from "../../Model/Game";
import ExternalLink from "../../Model/Game/externalLink";
import ExternalLinkList from "../../Model/Game/externalLink/externalLinkList";
import Platform from "../../Model/Game/platform";
import ExternalLinkListController from "./externalLink/externalLinkList";
import ImageListController from "./image/imageList";
import TagValueListController from "./tag/tagValueList";


export default class GameController extends Controller {
    
    constructor() {
        super(Game, ["imageList", "linkList", "tagList",
                    "linkList.externalLinks",
                    "linkList.externalLinks.platform",
                    "imageList.images",
                    "tagList.tagValues",
                    "tagList.tagValues.tag", "tagList.tagValues.value"])
    }
    
    //@ts-ignore
    Create = async (req: Request) => {
        try {
            const {name} = req.body;
            
            const game = new Game();
            game.name = name;
            
            
            const linkList = new ExternalLinkListController().Create(req);;
            const game_imageList = new ImageListController().Create(req);
            const game_tagValueList = new TagValueListController().Create(req);
            
            
            game.linkList = await linkList
            game.imageList = await game_imageList;
            game.tagList = await game_tagValueList;
            
            
            await AppDataSource.getRepository(Game).save(game);
            
            return {status: 200, value: {
                ...game
            }};
        }
        catch (e) {
            return {status: 500, value: {message: {"something went wrong" : e}}};
        }
    }
    //@ts-ignore
    Update = async (req: Request) => {
        try {
            const {id, new_name} = req.body
            const game = await AppDataSource.getRepository(Game).findOneBy({id: Number(id)});
            
            if(!game)
            return { status: 404, value: {message: "game not found" }};


            const externalLinkList = new ExternalLinkListController().Update(req, game.linkList.id);
            const imageList = new ImageListController().Update(req, game.imageList.id);

            game.name = new_name || game.name;
            game.linkList = await externalLinkList;
            game.imageList = await imageList;
            
            AppDataSource.getRepository(Game).save(game);
            
            return {status: 200, value: {
                ...game
            }};
        }
        catch (e) {
            return {status: 500, value: {message: {"something went wrong" : e}}};
        }
    }
    
    Delete = async (req: Request) => {
        try {
            const id = req.params.id
            const game = await AppDataSource.getRepository(Game).findOneOrFail({where: {id: Number(id)}, relations: ["tagList", "imageList", "linkList"]});
            
            if(!game)
            return { status: 404, value: {message: "value not found" }};

            const reqExternalLinkList = req;
            const reqImageList = req;
            const reqTagValueList = req;
            reqExternalLinkList.params.id   = game.linkList.id.toString();
            reqImageList.params._id         = game.imageList.id.toString();
            reqTagValueList.params._id      = game.tagList.id.toString();
            
            
            await new ExternalLinkListController().Delete(reqExternalLinkList);
            await new ImageListController().Delete(reqImageList);
            await new TagValueListController().Delete(reqTagValueList);

            

        
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
            return {status: 500, value: {message: {"something went wrong" : e}}};
        }
    }

  
    AddLink = async(req: Request) => {
        try {
            const {gameId} = req.body
            var game = await AppDataSource.getRepository(Game).findOneOrFail({where: {id: gameId}, relations: ["linkList"]});

            const ELLReq = req;
            ELLReq.body.externalLinkListId = game.linkList.id

            game.linkList = await new ExternalLinkListController().AddLink(ELLReq);

            return {status: 200, value: {
                ...game
            }};
        }catch(e) {
            return {status: 500, value: {message: {"something went wrong" : e}}};
        }
        
    }

    RemoveLink = async (req: Request) => {
        try {
            const {gameId} = req.body
            var game = await AppDataSource.getRepository(Game).findOneOrFail({where: {id: gameId}, relations: ["linkList"]});

            const ELLReq = req;
            ELLReq.body.externalLinkListId = game.linkList.id

            game.linkList = await new ExternalLinkListController().RemoveLink(ELLReq);

            return {status: 200, value: {
                ...game
            }};

        }catch(e) {
            return {status: 500, value: {message: {"something went wrong" : e}}};
        }
    }

    AddImage = async(req: Request) => {
        try {
            const {gameId} = req.body
            var game = await AppDataSource.getRepository(Game).findOneOrFail({where: {id: gameId}, relations: ["imageList"]});

            const ILReq = req;
            ILReq.body.imageListId = game.imageList.id

            game.imageList = await new ImageListController().AddImages(ILReq);

            return {status: 200, value: {
                ...game
            }};
        }catch(e) {
            return {status: 500, value: {message: {"something went wrong" : e}}};
        }
        
    }

    RemoveImage = async (req: Request) => {
        try {
            const {gameId} = req.body
            var game = await AppDataSource.getRepository(Game).findOneOrFail({where: {id: gameId}, relations: ["imageList"]});

            const ILReq = req;
            ILReq.body.imageListId = game.imageList.id

            game.imageList = await new ImageListController().RemoveImage(ILReq);

            return {status: 200, value: {
                ...game
            }};

        }catch(e) {
            return {status: 500, value: {message: {"something went wrong" : e}}};
        }
    }
    
}