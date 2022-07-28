import { AppDataSource } from "../data-source"
import Game from "../Model/Game"
import GameTime from "../Model/Game/gameTime";
import TagValueList from "../Model/Game/tag/tagValueList";
import { weightCalculator } from "./calculator";

const updateTagValuesWeights = async (userId: number, gameId: number) => {
    const tagList = (await AppDataSource.getRepository(Game).findOneOrFail({where: {
        id: gameId
    }, relations: ["tagList", "tagList.tagValues", "tagList.tagValues.user"]})).tagList;
    

    let gametime = (await AppDataSource.getRepository(GameTime).findOne({where: {
        game: {
            id: gameId
        },
        user: {
            id: userId
        },
    }
    }))
    tagList.tagValues.map(i => {
        if(i.user.id == userId)
            i.weight = weightCalculator(gametime? gametime.time : 1)
        return i;
    })
    await AppDataSource.getRepository(TagValueList).save(tagList);
}

export {
    updateTagValuesWeights
}