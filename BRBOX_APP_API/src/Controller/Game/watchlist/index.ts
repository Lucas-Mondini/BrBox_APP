import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import GameController from "..";
import {Controller} from "../..";

import { AppDataSource } from "../../../data-source";
import Game from "../../../Model/Game";
import Watchlist from "../../../Model/Game/watchlist";
import User from "../../../Model/User";

export default class WatchlistController extends Controller {

    constructor() {
        super(Watchlist, ["user", "games"]);
    }
    //@ts-ignore
    AddGame = async (req: Request) => {
        try {
            const {gameid} = req.body;
            
            let watchlist = (await AppDataSource.getRepository(Watchlist).findOne({where: {
                user: {
                    id: req.user.id
                }
            }, relations: this.relations}))
            if(!watchlist) {
                watchlist = new Watchlist();
                watchlist.user  = await AppDataSource.getRepository(User).findOneByOrFail({id: req.user.id});;
                watchlist.games = new Array();
            }
            const game = await AppDataSource.getRepository(Game).findOneByOrFail({id: gameid})
            if(watchlist.games.filter(g => g.id == game.id).length == 0)
                watchlist.games.push(game);
            await AppDataSource.getRepository(Watchlist).save(watchlist);
            
            return {status: 200, value: true};
        }
         catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
        }
    }

    //@ts-ignore
    RemoveGame = async (req: Request) => {
            try {
                const {gameid} = req.body;
                
                let watchlist = (await AppDataSource.getRepository(Watchlist).findOneOrFail({where: {
                    user: {
                        id: req.user.id
                    }
                }, relations: this.relations}))
                watchlist.games = watchlist.games.filter((i: any) => i.id != gameid)

                await AppDataSource.getRepository(Watchlist).save(watchlist);
                return {status: 200, value: false};
            }
             catch (e : any) {
                return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
            }
        }
    //@ts-ignore
    Index = async (req: Request) => { 
        try {
            var where = "1 = $1";
            let wherename = "1"
            let games = await GameController.getGamesFormatted(req, where, "", "1", 99999, 0, 0, "");
            let watchlist = await AppDataSource.getRepository(Watchlist).findOne({where: {
                user: {
                    id: req.user.id
                }
            }, relations: this.relations})

            if(!watchlist) {
                watchlist = new Watchlist();
                watchlist.user  = await AppDataSource.getRepository(User).findOneByOrFail({id: req.user.id});;
                watchlist.games = new Array();
                await AppDataSource.getRepository(Watchlist).save(watchlist);
            }

            const gamesInList = watchlist?.games.map((g: any) => g.id);
            games = games.filter((g: any) => gamesInList.includes(g.id))

            return {status: 200, value: {
                games: games
            }};
        } catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
        }
    }

    Delete = async (req: Request) => {
        return {status: 500, value: {
            message: "error, Method not implemented."
        } }
    }

    Get = async (req: Request) => {
        return {status: 500, value: {
            message: "error, Method not implemented."
        } }
    }
}