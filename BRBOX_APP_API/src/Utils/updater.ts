import { AppDataSource } from "../data-source"
import Game from "../Model/Game"
import GameTime from "../Model/Game/gameTime";
import User from "../Model/User";

const updateTagValuesWeights = async (userId: number, gameId: number) => {
    const tagValues = (await AppDataSource.getRepository(Game).findOneOrFail({where: {id: gameId}, relations: ["tagList", "tagList.tagValues"]})).tagList;
    const Weights = await AppDataSource.getRepository(GameTime).findOneOrFail(
        {
            where: 
            {
                user: 
                {
                    id: userId
                }
            }
        })
}

export {
    updateTagValuesWeights
}