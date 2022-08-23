import { Request } from "express";
import { json } from "stream/consumers";
import { In } from "typeorm";
import { FindOptionsOrder } from "typeorm/find-options/FindOptionsOrder";
import {Controller} from "../";
import { AppDataSource } from "../../data-source";

import Game from "../../Model/Game";
import Genre from "../../Model/Game/classification/genre";
import Mode from "../../Model/Game/classification/mode";
import GameTime from "../../Model/Game/gameTime";
import Score from "../../Model/Game/Score";
import TagValue from "../../Model/Game/tag/tagValue";
import TagValueList from "../../Model/Game/tag/tagValueList";
import Value from "../../Model/Game/tag/value";
import { reccomend } from "../../services/reccomendation";
import BusinessModelListController from "./businessModel/businessModelList";
import GenreController from "./classification/genre";
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
        "businessModelList", "businessModelList.businessModels",
        "genres",
        "modes"])
    }
    
    //@ts-ignore
    Create = async (req: Request) => {
        try {
            const {name, genres, modes} = req.body;
            
            const game = new Game();
            game.name = name;
            
            
            const linkList = await new ExternalLinkListController().Create(req);;
            const game_imageList = await new ImageListController().Create(req);
            const game_tagValueList = await new TagValueListController().Create(req);
            const game_businessModelList = await new BusinessModelListController().Create(req);
            
            
            game.linkList = linkList
            game.imageList = game_imageList;
            game.tagList = game_tagValueList;
            game.businessModelList = game_businessModelList;
            if(genres) {
                const game_genres = await AppDataSource.getRepository(Genre).find({where: {id: In(genres)}});
                game.genres = game_genres;
            }
            if(modes) {
                const game_modes = await AppDataSource.getRepository(Mode).find({where: {id: In(modes)}});
                game.modes = game_modes;
            }
            
            
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
            const {page = "1", ammount = "25", order = "name", AscDesc = "ASC", name: game_name = "", tagsIds = null, modesIds = null, genresIds = null} = req.query

            //reccomend(req.user.id);
            
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
                wherename = `%${game_name}%`;
            }
            
            const skip = Number(page) != 1 ? (Number(page) - 1)  * Number(ammount) : 0;
            
            let games;
            if (!tagsIds && !modesIds && !genresIds ) {
                games = await this.getGamesFormatted(req, where, orderBy, wherename, ammount, skip, 0, "");

                return {status: 200, value: {
                    games
                }};
            } else {
                const where = `1 = $1`;
                if(tagsIds)
                    games = await this.getGamesFormatted(req, where, "", "1", 99999, 0, 0, `(${tagsIds.toString()})`);
                else 
                    games = await this.getGamesFormatted(req, where, "", "1", 99999, 0, 0, "");

                if(modesIds) {
                    const modes = (<string>modesIds).split(',').map((item: any) => parseInt(item));
                    games = games.filter((g: any) => {
                        const gameModes = g.modes.map((mode: any) => mode.id);
                        return gameModes.filter((i: any) => modes.includes(i)) > 0
                    })
                }
                if(genresIds) {
                    const genres = (<string>genresIds).split(',').map((item: any) => parseInt(item));
                    games = games.filter((g: any) => {
                        const gameModes = g.genres.map((genre: any) => genre.id);
                        return gameModes.filter((i: any) => genres.includes(i)) > 0
                    })
                }
                return {status: 200, value: {
                    games
                }};
            }
        }
        catch (e : any) {
            //XGH axioma 2
            return {status: 200, value: {
                games: []
            }};
        }
    }
                
UserTop3 = async (req: Request) => {
    try {
        var where = "1 = $1";
        let wherename = "1"
        let games = await this.getGamesFromUserFormated(req, where, wherename);
        let top3 = games.slice(0, 3)
                   
        return {status: 200, value: {
            games: top3
        }};
    } catch (e : any) {
        return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
    }
}

    UserRatings = async (req: Request) => {
        try {
            var where = "1 = $1";
            let wherename = "1"
            let games = await this.getGamesFromUserFormated(req, where, wherename);
                       
            return {status: 200, value: {
                games
            }};
        } catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
        }
    }

    top5Voted = async (req: Request) => {
        try {
            const gameIds = await AppDataSource.query(`
            select game.id gameid, count(tv.id) voteCount from game
            left join tag_value_list_tag_values_tag_value tvl on tvl."tagValueListId"  = game."tagListId" 
            left join tag_value tv on tv.id  = tvl."tagValueId" 
            group by game.id
            order by voteCount desc, gameid asc
            limit 5`)
            const top5 = gameIds.map((i: any) => i.gameid)
            
            const where = `game.id in (${top5.toString()}) OR game.id = $1`;
            
            
            let games = await this.getGamesFormatted(req, where, "", "-1", 5, 0, 0, "")
            games.sort((i: any, j: any) => j.votecount - i.votecount)
                       
            return {status: 200, value: {
                games
            }};
        } catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
        }
    }
                
    //@ts-ignore
    Get = async (req: Request) => {
        try {
            const id = req.params.id
            const game = await AppDataSource.getRepository(Game).findOneOrFail({where: {id: Number(id)}, relations: this.relations});
            
            if(!game)
            return { status: 404, game: {message: "game not found" }};
            
            const gameTime = await AppDataSource.getRepository(GameTime).findOne({where: {
                game: {
                    id: game.id
                },
                user: {
                    id: req.user.id
                },
            }})

            const score = await AppDataSource.getRepository(Score).findOne({
                where: {
                    game: {
                        id: game.id
                    }
                }
            })

            const returnObj = {
                ...this.linkFormatter(game),
                score: score?.value,
                gameTime: gameTime? gameTime.time : null
            }
            
            return {status: 200, value: {
                ...returnObj
            }};
        }  catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
        }
        
    }
    
    //@ts-ignore
    Update = async (req: Request) => {
        try {
            const {id, new_name, genres, modes} = req.body
            const game = await AppDataSource.getRepository(Game).findOneBy({id: Number(id)});
            
            if(!game)
            return { status: 404, value: {message: "game not found" }};
            
            
            const externalLinkList = await new ExternalLinkListController().Update(req, game.linkList.id);
            const imageList = await new ImageListController().Update(req, game.imageList.id);
            const businessModelList = await new BusinessModelListController().Update(req, game.businessModelList.id);
            
            game.name = new_name || game.name;
            game.linkList = externalLinkList;
            game.imageList = imageList;
            game.businessModelList = businessModelList;

            if(genres) {
                const game_genres = await AppDataSource.getRepository(Genre).find({where: {id: In(genres)}});
                game.genres = game_genres;
            }
            if(modes) {
                const game_modes = await AppDataSource.getRepository(Mode).find({where: {id: In(modes)}});
                game.modes = game_modes;
            }
            
            await AppDataSource.getRepository(Game).save(game);
            
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
            const gameTime = await AppDataSource.getRepository(GameTime).find({where: {
                game: {
                    id: Number(id)
                }
            }})
            if(gameTime)
                AppDataSource.getRepository(GameTime).remove(gameTime);
            const gameScore = await AppDataSource.getRepository(Score).findOneOrFail({where: {
                game: {
                    id: Number(id)
                }
            }})
            AppDataSource.getRepository(Score).delete(gameScore);
            
            
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
    AddGenre = async(req: Request) => {
        try {
            const {gameId, GenreIds} = req.body
            var game = await AppDataSource.getRepository(Game).findOneOrFail({where: {id: gameId}, relations: this.relations});
            var genres = await AppDataSource.getRepository(Genre).find({where: {id: In(GenreIds)}})
            if(genres)
                for (const g of genres) {
                    if(!game.genres.some(i => {return JSON.stringify(g) === JSON.stringify(i)}))
                        game.genres.push(g)
                }
            await AppDataSource.getRepository(Game).save(game);
            
            
            return {status: 200, value: {
                ...this.linkFormatter(game)
            }};
        } catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
        }
        
    }
    
    RemoveGenre = async (req: Request) => {
        try {
            const {gameId, genreId} = req.body
            var game = await AppDataSource.getRepository(Game).findOneOrFail({where: {id: gameId}, relations: this.relations});

            game.genres = game.genres.filter(i=> i.id != genreId)
            await AppDataSource.getRepository(Game).save(game);

            
            return {status: 200, value: {
                ...this.linkFormatter(game)
            }};
            
        } catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
        }
    }
    AddMode = async(req: Request) => {
        try {
            const {gameId, ModeIds} = req.body
            var game = await AppDataSource.getRepository(Game).findOneOrFail({where: {id: gameId}, relations: this.relations});
            var modes = await AppDataSource.getRepository(Mode).find({where: {id: In(ModeIds)}})
            if(modes)
                for (const m of modes) {
                    if(!game.modes.some(i => {return JSON.stringify(m) === JSON.stringify(i)}))
                        game.modes.push(m)
                }
            await AppDataSource.getRepository(Game).save(game);
            
            
            return {status: 200, value: {
                ...this.linkFormatter(game)
            }};
        } catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
        }
        
    }
    
    RemoveMode = async (req: Request) => {
        try {
            const {gameId, modeId} = req.body
            var game = await AppDataSource.getRepository(Game).findOneOrFail({where: {id: gameId}, relations: this.relations});

            game.modes = game.modes.filter(i=> i.id != modeId)
            await AppDataSource.getRepository(Game).save(game);

            
            return {status: 200, value: {
                ...this.linkFormatter(game)
            }};
            
        } catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
        }
    }

    Reccomended = async (req: Request) => {
        try {
            const {roll} = req.body
            
            const where = `1 = $1`;
            let games = await this.getGamesFormatted(req, where, "", "1", 9999, 0, 0, "")
            const rec = await reccomend(req.user.id);
            games = games.map((i: any) => {
                let est = rec.filter((j: any) => j.game == i.id)[0];
                i.est = est? est.est : 0;
                return i;
            });
            games.sort((i : any, j: any) => j.est - i.est);
            games = games.slice((Number(roll) || 0) * 10, ((Number(roll) || 0) * 10) + 10)
            
            return {status: 200, value: {
                games
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

    getGamesFromUserFormated = async (req: any, where: any, wherename: any) => {
        let games = await this.getGamesFromUser(req, where, "", wherename);
        return games.map((game: any) => {

            game.tags = game.tags.filter( (i:any) => i != undefined)
            if(game.tags) {

                game.tags = game.tags.filter(
                    (value: any, index: any, self: any) => index === self.findIndex(
                        (t : any) => (t.tag == value.tag)
                        ))
                const sortedUp      = [...game.tags.sort((a: any, b: any) => b.upVotes - a.upVotes)]
                const sortedNeutral = [...game.tags.sort((a: any, b: any) => b.neutralVotes - a.neutralVotes)]
                const sortedDown    = [...game.tags.sort((a: any, b: any) => b.downVotes - a.downVotes)]

                game.tags = [];
                if(sortedUp[0] && Number(sortedUp[0].upVotes) > 0) {
                    game.tags.push({
                        value: "up",
                        ...sortedUp[0]
                    })
                }
                if(sortedNeutral) {
                    for (const sort of sortedNeutral) {
                        let breakValue = false
                        if (game.tags.length > 0) {
                            for (const tagsInGames of game.tags) {
                                if(sort.id != tagsInGames.id && Number(sort.neutralVotes) > 0) {
                                    game.tags.push({
                                        value: "neutral",
                                        ...sort
                                    })
                                    breakValue = true;
                                    break;
                                }
                            }
                        } else {
                            if(sort && Number(sort.neutralVotes) > 0) {
                                game.tags.push({
                                    value: "neutral",
                                    ...sort
                                })
                            }
                            breakValue = true;
                        }
                        if(breakValue)
                            break;
                    }
                }

                if(sortedDown) {
                    for (const sort of sortedDown) {
                        let breakValue = false
                        if (game.tags.length > 0) {
                            for (const tagsInGames of game.tags) {
                                if(sort.id != tagsInGames.id && Number(sort.downVotes) > 0) {
                                    game.tags.push({
                                        value: "down",
                                        ...sort
                                    })
                                    breakValue = true;
                                    break;
                                }
                            }
                        } else {
                            if(sort && Number(sort.downVotes) > 0) {
                                game.tags.push({
                                    value: "down",
                                    ...sort
                                })
                            }
                            breakValue = true;
                        }
                        if(breakValue)
                            break;
                    }
                }
            }
                return game
            });
    }
    getGamesFromUser =async (req: any, where: any, orderBy: any, wherename: any) => {
        let games = await AppDataSource.query(this.getIndexQuery(req, where, orderBy, 1, ""),
                    [   
                        wherename,
                        9999999,
                        0
                    ])

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
                                            id: j.tagid,
                                            icon: j.tagicon,
                                            total: Number(j.qty_up) + Number(j.qty_neutral) + Number(j.qty_down),
                                            upVotes: j.qty_up,
                                            neutralVotes: j.qty_neutral,
                                            downVotes: j.qty_down
                                        }
                                    return 
                    })
                }
                return game;
                //limpa os repetidos
            }).filter((value : any, index: any) => 
            games.findIndex((v: any) => v.gameid === value.id ) == index
            //adiciona os valores principais encontrados nos top votados de maneira unica
            ).map((value : any) =>  {
                    value.tags = value.tags.filter((value: any, index: any, self: any) =>
                        index === self.findIndex((t: any) => (
                    t.id === value.id
                    ))
                )
                return value;
            });
            
            games = games.sort((i: any, j: any) => j.tags.length - i.tags.length)
            return games;
    }
    getGamesFormatted = async (req: any, where: string, orderBy: string, wherename: string, ammount: any, skip: any, mode: number, TagsFilter: string) => {
        let games = await AppDataSource.query(this.getIndexQuery(req, where, orderBy, mode, TagsFilter),
                    [   
                        wherename,
                        ammount,
                        skip
                    ]);
                //transforma o retorno da query em objeto para ser exibido na tela
                games = games.map((i : any) => {
                    const game =  {
                        id: i.gameid,
                        name: i.gamename,
                        isDlc: i.isdlc,
                        image: i.imagelink,
                        tags: games .filter((j : any) => j.gameid == i.gameid)
                                    .map((j: any) => {
                                        if(j.tagname)
                                            return {
                                                tag: j.tagname,
                                                id: j.tagid,
                                                icon: j.tagicon,
                                                total: Number(j.qty_up) + Number(j.qty_neutral) + Number(j.qty_down),
                                                upVotes: j.qty_up,
                                                neutralVotes: j.qty_neutral,
                                                downVotes: j.qty_down
                                            }
                                        return 
                        })
                    }
                    return game;
                    //limpa os repetidos
                }).filter((value : any, index: any) => 
                games.findIndex((v: any) => v.gameid === value.id ) == index
                //adiciona os valores principais encontrados nos top votados de maneira unica
                ).map((game: any) => {

                game.tags = game.tags.filter( (i:any) => i != undefined)
                if(game.tags) {

                    game.tags = game.tags.filter(
                        (value: any, index: any, self: any) => index === self.findIndex(
                            (t : any) => (t.tag == value.tag)
                            ))
                    const sortedUp      = [...game.tags.sort((a: any, b: any) => b.upVotes - a.upVotes)]
                    const sortedNeutral = [...game.tags.sort((a: any, b: any) => b.neutralVotes - a.neutralVotes)]
                    const sortedDown    = [...game.tags.sort((a: any, b: any) => b.downVotes - a.downVotes)]

                    game.tags = [];
                    if(sortedUp[0] && Number(sortedUp[0].upVotes) > 0) {
                        game.tags.push({
                            value: "up",
                            ...sortedUp[0]
                        })
                    }
                    if(sortedNeutral) {
                        for (const sort of sortedNeutral) {
                            let breakValue = false
                            if (game.tags.length > 0) {
                                for (const tagsInGames of game.tags) {
                                    if(sort.id != tagsInGames.id && Number(sort.neutralVotes) > 0) {
                                        game.tags.push({
                                            value: "neutral",
                                            ...sort
                                        })
                                        breakValue = true;
                                        break;
                                    }
                                }
                            } else {
                                if(sort && Number(sort.neutralVotes) > 0) {
                                    game.tags.push({
                                        value: "neutral",
                                        ...sort
                                    })
                                }
                                breakValue = true;
                            }
                            if(breakValue)
                                break;
                        }
                    }

                    if(sortedDown) {
                        for (const sort of sortedDown) {
                            let breakValue = false
                            if (game.tags.length > 0) {
                                for (const tagsInGames of game.tags) {
                                    if(sort.id != tagsInGames.id && Number(sort.downVotes) > 0) {
                                        game.tags.push({
                                            value: "down",
                                            ...sort
                                        })
                                        breakValue = true;
                                        break;
                                    }
                                }
                            } else {
                                if(sort && Number(sort.downVotes) > 0) {
                                    game.tags.push({
                                        value: "down",
                                        ...sort
                                    })
                                }
                                breakValue = true;
                            }
                            if(breakValue)
                                break;
                        }
                    }
                }

                    return game
                });
                //busca o tempo de jogo do usuario em cada jogo retornado pela query anterior
                const gametime = await AppDataSource.query(`
                select * 
                from 
                    game_time gt 
                where 
                    "userId" = ${req.user.id} and "gameId" in (${games.map((i: any) => i.id).toString()})
                `);

                //adiciona o gametime no objeto a ser retornado
                games.map((i : any) => {
                for (const j of gametime) {
                    if(j.gameId == i.id) {
                        i.gameTime = j.time
                        return i
                    } else {
                        i.gameTime = 0
                    }
                }
                return i
            });
            const votecount = await AppDataSource.query(`
                select game.id gameid, count(tv."userId") voteCount from game
	            left join tag_value_list_tag_values_tag_value tvl on tvl."tagValueListId"  = game."tagListId" 
	            left join tag_value tv on tv.id  = tvl."tagValueId" 
                where game.id in (${games.map((i: any) => i.id).toString()})
	            group by game.id
	            order by voteCount desc, gameid asc
                `)
            const uservotedcount = await AppDataSource.query(`
                select game.id gameid, count(distinct tv."userId") userVotedCount from game
	            left join tag_value_list_tag_values_tag_value tvl on tvl."tagValueListId"  = game."tagListId" 
	            left join tag_value tv on tv.id  = tvl."tagValueId" 
                where game.id in (${games.map((i: any) => i.id).toString()})
	            group by game.id
	            order by userVotedCount desc, gameid asc
                `)
            const score = await AppDataSource.query(`
                select * from score s 
                where s."gameId" in (${games.map((i: any) => i.id).toString()})`
                )
            const genres = await AppDataSource.query(`
                    select g2.id as gameid, g.id as genreid, g.name from genre g 
                    inner join game_genres_genre ggg on ggg."genreId" = g.id 
                    inner join game g2 on g2.id = ggg."gameId"
                    where g2.id in (${games.map((i: any) => i.id).toString()})`
            )
            const modes = await AppDataSource.query(`
                    select g.id as gameid, m.id as modeid, m.name from "mode" m 
                    inner join game_modes_mode gmm on gmm."modeId" = m.id 
                    inner join game g on g.id = gmm."gameId" 
                    where g.id in (${games.map((i: any) => i.id).toString()})`
            )

            games.map((i: any)=> {
                i.votecount = Number(votecount.filter((j:any) => j.gameid == i.id)[0].votecount)
                i.uservotedcount = Number(uservotedcount.filter((j:any) => j.gameid == i.id)[0].uservotedcount)
                i.score = score.filter((j:any) => j.gameId == i.id)[0].value
                i.genres = genres.filter((j: any) => j.gameid == i.id).map((j: any) => {
                    j = {
                        id: j.genreid,
                        name: j.name
                    }
                    return j;
                })
                i.modes = modes.filter((j: any) => j.gameid == i.id).map((j: any) => {
                    j = {
                        id: j.modeid,
                        name: j.name
                    }
                    return j
                })
            });
                return games;
    }

    getIndexQuery = (req: any, where: string, orderBy: string, Mode: number, TagsFilter: string) => {
        /**
         * 
         * modes : 
         *      0 default
         *      1 user only
         * 
         */

        //Query magica, não toque nela, sujeito a mão cair
        //horas gastas nessa query: 25h
        return ` 
        select
            game.id as gameId,
            game.name gameName,
            game."DLC" as isDlc,
            image.id as imageId,
            image.link as imageLink,
            tag_data.name tagname,
            tag_data.id tagid,
            tag_data.icon tagicon,
            ${(Mode == 1? 
                "tag_data.userId," : 
                "")}
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
                            ${(Mode == 1? 
                                `tag_value."userId" as userId,` : 
                                "")}
                            coalesce(sum(tag_value."valueId"), 0) as qty_tot,
                            coalesce(sum(CASE when value.id = 1 then 1 * tag_value.weight end), 0) as qty_up,
                            coalesce(sum(CASE when value.id = 2 then 1 * tag_value.weight end), 0) as qty_neut,
                            coalesce(sum(CASE when value.id = 3 then 1 * tag_value.weight end), 0) as qty_down
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
                            tvltvtv."tagValueListId", tag.id, tag."name", value.id, value."name" ${(Mode == 1 ?
                                    `, tag_value."userId"` 
                                    : "")}
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
                                )   ${(Mode == 1 ?
                                        `and userId = ${req.user.id}` :
                                        "")}
                                    ${(TagsFilter?
                                        `and tag_data.id in ${TagsFilter}` : "")}
                )
            group by
                game.id,
                game."name",
                image.id,
                image.link,
                tag_data."name",
                tag_data."id",
                tag_data.icon
                ${(Mode == 1 ? `,
                                tag_data.userid` 
                                : "")}
            order by 
                game.id
                            `
    }              
                
            }