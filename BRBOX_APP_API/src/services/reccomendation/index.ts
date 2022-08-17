import axios from "axios";
import { AppDataSource } from "../../data-source"

const reccomend = async (userId: number) => {
    try {
    const values = await AppDataSource.query(`
        select 
            u.id 					userId,
            g.id 					gameId,
            t.id 					tagId,
            t."name"				tag,
            v.id					score,
            vote.countV 			vote_count,
            t.description_positive 	overview
    from 
            game g
    inner join
            tag_value_list_tag_values_tag_value tvltvtv on tvltvtv."tagValueListId" = g."tagListId" 
    inner join 
            tag_value tv on tv.id = tvltvtv."tagValueId"
    inner join 
            tag t on t.id = tv."tagId"
    inner join 
            value v on v.id = tv."valueId"
    inner join 
            "user" u on u.id = tv."userId"
    inner join (
            select count(tv2."tagId") as countv, game.id gameId from game
            inner join tag_value_list_tag_values_tag_value tvltvtv2 on tvltvtv2."tagValueListId" = game."tagListId"
            inner join tag_value tv2 on tv2.id = tvltvtv2."tagValueId"
            group by game.id
		) vote on vote.gameId = g.id
    `);
    const games = (await AppDataSource.query(`select count(*) from game`))[0]['count'];

    const data = {
        user: userId,
        games: Number(games),
        values: values
    }
    const ret = await axios({
        url: process.env.RECCOMENDER || "http://127.0.0.1:9000/",
        data: data,
        method: 'post',
        proxy: false
    })
    console.log(ret.data)
    } catch(e) {
        console.log(e);
    }
}

export {
    reccomend
}