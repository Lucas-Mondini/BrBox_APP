import { Request } from "express";
import {Controller} from "../..";
import GameTime from "../../../Model/Game/gameTime";
import { AppDataSource } from "../../../data-source";
import Game from "../../../Model/Game";
import User from "../../../Model/User";
import { updateTagValuesWeights } from "../../../Utils/updater";

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
            
            const game = await AppDataSource.getRepository(Game).findOneByOrFail({id: gameId});
            const user = await AppDataSource.getRepository(User).findOneByOrFail({id: req.user.id});
            
            let gametime = await AppDataSource.getRepository(GameTime).findOne({where: {
                game: {
                    id: game.id
                },
                user: {
                    id: user.id
                },
            }, relations: this.relations});

            if(!gametime) {
                gametime = new GameTime()
                gametime.game = game;
                gametime.user = user;
            }
            gametime.time = Number(time);

            await AppDataSource.getRepository(GameTime).save(gametime);
            await updateTagValuesWeights(req.user.id, gameId);


            
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
                gametime = await AppDataSource.getRepository(GameTime).findOneOrFail({where:{id: id}, relations: this.relations});
            } else {
                gametime = await AppDataSource.getRepository(GameTime).findOneOrFail({where:{id: id, user: {id: req.user.id}}, relations: this.relations});
            }

            gametime.time = time;

            await AppDataSource.getRepository(GameTime).save(gametime);

            await updateTagValuesWeights(gametime.user.id, gametime.game.id);
            
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
                gametime = await AppDataSource.getRepository(GameTime).findOneOrFail({where:{id: Number(id)}, relations: this.relations});
            } else {
                gametime = await AppDataSource.getRepository(GameTime).findOneOrFail({where:{id: Number(id), user: {id: req.user.id}}, relations: this.relations});
            }
            
            const dead = await AppDataSource.getRepository(GameTime).delete(Object(gametime));
            await updateTagValuesWeights(gametime.user.id, gametime.game.id);


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