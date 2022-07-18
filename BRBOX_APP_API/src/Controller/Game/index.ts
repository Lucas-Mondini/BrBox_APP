import { Request } from "express";
import { FindOptionsOrder } from "typeorm/find-options/FindOptionsOrder";
import {Controller} from "../";
import { AppDataSource } from "../../data-source";

import Game from "../../Model/Game";
import TagValue from "../../Model/Game/tag/tagValue";
import Value from "../../Model/Game/tag/value";
import BusinessModelListController from "./businessModel/businessModelList";
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
        "tagList.tagValues.tag", "tagList.tagValues.value",
        "businessModelList", "businessModelList.businessModels"])
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
            const game_businessModelList = new BusinessModelListController().Create(req);
            
            
            game.linkList = await linkList
            game.imageList = await game_imageList;
            game.tagList = await game_tagValueList;
            game.businessModelList = await game_businessModelList;
            
            
            await AppDataSource.getRepository(Game).save(game);
            
            return {status: 200, value: {
                ...this.linkFormatter(game)
            }};
        }
        catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
        }
    }
    
    Index = async (req: Request) => {
        try {
            const {page = "1", ammount = "25", order = "name", AscDesc = "ASC", name: game_name = ""} = req.query
            
            var where = "1 = $1";
            let wherename = "1"
            var orderBy = "";
            var OrderASCOrDESC = "asc"
            if((<string>AscDesc).toLowerCase() == "asc" || (<string>AscDesc).toLowerCase() == "desc")
                OrderASCOrDESC = (<string>AscDesc)

            
            if(order == "id" || order == "name") {
                orderBy = `order by game.${order} ${OrderASCOrDESC}`
            } else if (order == "tag") {
                orderBy = `order by tag DESC`
            }
            
            if(game_name) {
                where = `lower(game.name) like lower($1)`;
                wherename = `%${game_name}%`
            }
            
            const skip = Number(page) != 1 ? (Number(page) - 1)  * Number(ammount) : 0
                      
            let games = await AppDataSource.query(` 
            select
                game.id as gameId,
                game.name gameName,
                image.id as imageId,
                image.link as imageLink,
                tag_data.name tagname,
                tag_data.icon tagicon,
                COALESCE(SUM(tag_data.qty_tot), 0) as qty_total,
                COALESCE(SUM(tag_data.qty_up), 0) as qty_up,
                COALESCE(SUM(tag_data.qty_neut), 0) as qty_neutral,
                COALESCE(SUM(tag_data.qty_down), 0) as qty_down
            from 
                game
            left join 
                        (
                            select
                                tvltvtv."tagValueListId",
                                tag.id,
                                tag."name",
                                tag.icon,
                                value."name" as value_name,
                                value.id as value_id,
                                count(tag_value."valueId") as qty_tot,
                                count(CASE when value.id = 1 then 1 end) as qty_up,
                                count(CASE when value.id = 2 then 1 end) as qty_neut,
                                count(CASE when value.id = 3 then 1 end) as qty_down
                            from
                                tag_value_list
                            inner join 
                                tag_value_list_tag_values_tag_value tvltvtv on tvltvtv."tagValueListId" = tag_value_list.id
                            inner join 
                                tag_value on tag_value.id = tvltvtv."tagValueId"
                            inner join 
                                tag on  tag.id = tag_value."tagId"
                            inner join 
                                value on value.id = tag_value."valueId" 
                            group by 
                                tvltvtv."tagValueListId", tag.id, tag."name", value.id, value."name"
                ) tag_data on (game."tagListId" = tag_data."tagValueListId")
                INNER join (
                			select image.id, image.link, ilii."imageListId" listId
                			from image_list_images_image ilii
         					inner join image on image.id = ilii."imageId"
							) image on (image.listId = game."imageListId")
                where (
                        game.id in (
                                    select game.id from game 
                                    where ${where}
                                    ${orderBy}
                                    limit $2
                                    offset $3
                                    )
                    )
                group by
                    game.id,
                    game."name",
                    image.id,
                    image.link,
                    tag_data."name",
                    tag_data.icon
                order by 
                    game.id
                                `,
                                [   
                                    wherename,
                                    ammount,
                                    skip
                                ]);
                            
                            games = games.map((i : any) => {
                                const game =  {
                                    id: i.gameid,
                                    name: i.gamename,
                                    image: i.imagelink,
                                    tags: games .filter((j : any) => j.gameid == i.gameid)
                                                .map((j: any) => {
                                                    if(j.tagname)
                                                        return {
                                                            tag: j.tagname,
                                                            icon: j.tagicon,
                                                            total: j.qty_total,
                                                            upVotes: j.qty_up,
                                                            neutralVotes: j.qty_neutral,
                                                            downVotes: j.qty_down
                                                        }
                                                    return 
                                    })
                                }
                                return game;
                            }).filter((value : any, index: any) => 
                            games.findIndex((v: any) => v.gameid === value.id ) == index
                          ).map((game: any) => {

                            game.tags = game.tags.filter( (i:any) => i != undefined)
                            if(game.tags) {

                                game.tags = game.tags.filter(
                                    (value: any, index: any, self: any) => index === self.findIndex(
                                        (t : any) => (t.tag == value.tag)
                                        ))
                                const sortedUp = [...game.tags.sort((a: any, b: any) => b.upVotes - a.upVotes)]
                                const sortedDown = [...game.tags.sort((a: any, b: any) => b.downVotes - a.downVotes)]

                                game.tags = []
                                if(sortedUp[0])
                                    game.tags.push({
                                        value: "up",
                                        ...sortedUp[0]
                                    })
                                if(sortedUp[1])
                                    game.tags.push({
                                        value: "up",
                                        ...sortedUp[1]
                                    })


                                if(sortedDown[0] && sortedDown[0] != sortedUp[0] && sortedUp[1] && sortedDown[0] != sortedUp[1])
                                    game.tags.push({
                                        value: "down",
                                        ...sortedDown[0]
                                    })
                                }

                                return game
                          });

                        return {status: 200, value: {
                            games
                        }};
                    }
                    catch (e : any) {
                        return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e) || e.message}}};
                    }
                }
                
                //@ts-ignore
                Get = async (req: Request) => {
                    try {
                        const id = req.params.id
                        const game = await AppDataSource.getRepository(Game).findOneOrFail({where: {id: Number(id)}, relations: this.relations});
                        
                        if(!game)
                        return { status: 404, game: {message: "game not found" }};
                        
                        return {status: 200, value: {
                            ...this.linkFormatter(game)
                        }};
                    }  catch (e : any) {
                        return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
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
                        const businessModelList = new BusinessModelListController().Update(req, game.businessModelList.id);
                        
                        game.name = new_name || game.name;
                        game.linkList = await externalLinkList;
                        game.imageList = await imageList;
                        game.businessModelList = await businessModelList;
                        
                        AppDataSource.getRepository(Game).save(game);
                        
                        return {status: 200, value: {
                            ...this.linkFormatter(game)
                        }};
                    }
                    catch (e : any) {
                        return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
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
                        const reqBusinessModelList = req;

                        reqExternalLinkList.params.id           = game.linkList.id.toString();
                        reqImageList.params._id                 = game.imageList.id.toString();
                        reqTagValueList.params._id              = game.tagList.id.toString();
                        reqBusinessModelList.params._id         = game.businessModelList.id.toString();
                        
                        
                        await new ExternalLinkListController().Delete(reqExternalLinkList);
                        await new ImageListController().Delete(reqImageList);
                        await new TagValueListController().Delete(reqTagValueList);
                        await new BusinessModelListController().Delete(reqBusinessModelList);
                        
                        
                        
                        
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
                    catch (e : any) {
                        return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
                    }
                }
                
                
                AddLink = async(req: Request) => {
                    try {
                        const {gameId} = req.body
                        var game = await AppDataSource.getRepository(Game).findOneOrFail({where: {id: gameId}, relations: this.relations});
                        
                        const ELLReq = req;
                        ELLReq.body.externalLinkListId = game.linkList.id
                        
                        game.linkList = await new ExternalLinkListController().AddLink(ELLReq);
                        
                        return {status: 200, value: {
                            ...this.linkFormatter(game)
                        }};
                    } catch (e : any) {
                        return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
                    }
                    
                }
                
                RemoveLink = async (req: Request) => {
                    try {
                        const {gameId} = req.body
                        var game = await AppDataSource.getRepository(Game).findOneOrFail({where: {id: gameId}, relations: this.relations});
                        
                        const ELLReq = req;
                        ELLReq.body.externalLinkListId = game.linkList.id
                        
                        game.linkList = await new ExternalLinkListController().RemoveLink(ELLReq);
                        
                        return {status: 200, value: {
                            ...this.linkFormatter(game)
                        }};
                        
                    } catch (e : any) {
                        return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
                    }
                }
                
                AddImage = async(req: Request) => {
                    try {
                        const {gameId} = req.body
                        var game = await AppDataSource.getRepository(Game).findOneOrFail({where: {id: gameId}, relations: this.relations});
                        
                        const ILReq = req;
                        ILReq.body.imageListId = game.imageList.id
                        
                        game.imageList = await new ImageListController().AddImages(ILReq);
                        
                        return {status: 200, value: {
                            ...this.linkFormatter(game)
                        }};
                    } catch (e : any) {
                        return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
                    }
                    
                }
                
                RemoveImage = async (req: Request) => {
                    try {
                        const {gameId} = req.body
                        var game = await AppDataSource.getRepository(Game).findOneOrFail({where: {id: gameId}, relations: this.relations});
                        
                        const ILReq = req;
                        ILReq.body.imageListId = game.imageList.id
                        
                        game.imageList = await new ImageListController().RemoveImage(ILReq);
                        
                        return {status: 200, value: {
                            ...this.linkFormatter(game)
                        }};
                        
                    } catch (e : any) {
                        return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
                    }
                }

                AddBusinessModel = async(req: Request) => {
                    try {
                        const {gameId} = req.body
                        var game = await AppDataSource.getRepository(Game).findOneOrFail({where: {id: gameId}, relations: this.relations});
                        
                        const BMReq = req;
                        BMReq.body.businessModelListId = game.businessModelList.id
                        
                        game.businessModelList = await new BusinessModelListController().AddBusinessModels(BMReq);
                        
                        return {status: 200, value: {
                            ...this.linkFormatter(game)
                        }};
                    } catch (e : any) {
                        return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
                    }
                    
                }
                
                RemoveBusinessModel = async (req: Request) => {
                    try {
                        const {gameId} = req.body
                        var game = await AppDataSource.getRepository(Game).findOneOrFail({where: {id: gameId}, relations: this.relations});
                        
                        const BMReq = req;
                        BMReq.body.businessModelListId = game.businessModelList.id
                        
                        game.businessModelList = await new BusinessModelListController().RemoveBusinessModel(BMReq);
                        
                        return {status: 200, value: {
                            ...this.linkFormatter(game)
                        }};
                        
                    } catch (e : any) {
                        return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
                    }
                }
                
                
                linkFormatter = (game: Game) => {
                    (<any>game.linkList.externalLinks) = game.linkList.externalLinks.map(item => {
                        return (<any>item) = {  
                            id: item.id,
                            platform: item.platform.id,
                            platformName: item.platform.name,
                            link: item.link
                        }
                    })
                    return game;
                }
                
                
            }