import { Request } from "express";
import {Controller} from "../..";
import GameTime from "../../../Model/Game/gameTime";
import { AppDataSource } from "../../../data-source";
import Game from "../../../Model/Game";
import User from "../../../Model/User";

export default class GameTimeController extends Controller {
    constructor() {
        super(GameTime, ["game", "user"]);
    }

    Index = async (req: Request) => {
        try {
            var values: any;
            if(req.user.admin) {
                values = await AppDataSource.getRepository(GameTime).find({relations: ["game", "user"]});                
            } else {
                values = await AppDataSource.getRepository(GameTime).find({where: {
                    user: {
                        id: req.user.id
                    }
                },relations: ["game"]});
            }

            return {status: 200, value: values};
        }
         catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
        }
    }


    //@ts-ignore
    Create = async (req: Request) => {
        try {
            const {gameId, time} = req.body;
            const gametime = new GameTime();

            const game = AppDataSource.getRepository(Game).findOneByOrFail({id: gameId});
            const user = AppDataSource.getRepository(User).findOneByOrFail({id: req.user.id});

            gametime.game = (await game);
            gametime.user = (await user);
            gametime.time = Number(time);

            await AppDataSource.getRepository(GameTime).save(gametime);

            
            return {status: 200, value: {
                    ...gametime
            }};
        }
            catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
        }
    }

    //@ts-ignore
    Update = async (req: Request) => {
        try {
            const {id, time} = req.body
            
            var gametime;
            if(req.user.admin) {
                gametime = await AppDataSource.getRepository(GameTime).findOneByOrFail({id: id});
            } else {
                gametime = await AppDataSource.getRepository(GameTime).findOneByOrFail({id: id, user: {id: req.user.id}});
            }

            gametime.time = time;

            await AppDataSource.getRepository(GameTime).save(gametime);
            
            return {status: 200, value: {
                    ...gametime
            }};
        }
            catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
        }
    }

Delete = async (req: Request) => {
    try {
        const id = req.params.id
        var gametime;

        if(req.user.admin) {
            gametime = await AppDataSource.getRepository(GameTime).findOneByOrFail({id: Number(id)});
        } else {
            gametime = await AppDataSource.getRepository(GameTime).findOneByOrFail({id: Number(id), user: {id: req.user.id}});
        }
        
        const dead = await AppDataSource.getRepository(GameTime).delete(Object(gametime));


        if(dead.affected)
            return {
                status: 200,
                value: {message: "deleted " + dead.affected + " value"}
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
}