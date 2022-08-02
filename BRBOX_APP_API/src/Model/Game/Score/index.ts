import { Entity, CreateDateColumn, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from "typeorm";
import Game from "..";
import { AppDataSource } from "../../../data-source";

@Entity()
export default class Score {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({nullable: false, default: "NA"})
    value: string;
    
    @OneToOne(() => Game, {nullable: false})
    @JoinColumn({referencedColumnName: "id"})
    game: Game;
    
    static UpdateAll = async () => {
        
        const cur = await AppDataSource.query(`   select 
        g.id gameId, g."name" gameName, tv.*  
        from 
        game g
        inner join 
        tag_value_list_tag_values_tag_value tvl on tvl."tagValueListId" = g."tagListId" 
        inner join 
        tag_value tv on tv.id = tvl."tagValueId" `)
        
        if(cur.length > 0) {            
            const curAggroupedByGame = cur.reduce(function (lists: any, element: any) {
                lists[element.gameid] = lists[element.gameid] || [];
                lists[element.gameid].push(element);
                return lists;
            }, Object.create(null));
            
            for (const i in curAggroupedByGame) {
                let allVotes = 0;
                let positiveVotes = 0;
                let negativeVotes = 0;
                let neutralVotes = 0;
                for (const j of curAggroupedByGame[i]) {
                allVotes+= 1 * j.weight;
                if(j.valueId == 1)
                    positiveVotes += 1 * j.weight;
                if(j.valueId == 2)
                    neutralVotes+= 1 * j.weight;
                if(j.valueId == 3)
                    negativeVotes+= 1 * j.weight;
                }

                negativeVotes += Math.floor(neutralVotes / 2)
                positiveVotes += Math.floor(neutralVotes / 2) + (neutralVotes % 2)

                let percentagePositive = positiveVotes / allVotes * 100

                let choosenValue = 0;
                choosenValue = percentagePositive;

                const groupedTags = curAggroupedByGame[i].reduce(function (lists: any, element: any) {
                    lists[element.tagId] = lists[element.tagId] || [];
                    lists[element.tagId].push(element);
                    return lists;
                }, Object.create(null));

                for (const key in groupedTags) {
                    const countUp       = groupedTags[key].reduce((acc: any, j:any) => acc + (j.valueId == 1 ? 1 : 0), 0)
                    const countNeutral  = groupedTags[key].reduce((acc: any, j:any) => acc + (j.valueId == 2 ? 1 : 0), 0)
                    const countDown     = groupedTags[key].reduce((acc: any, j:any) => acc + (j.valueId == 3 ? 1 : 0), 0)
                    if (countUp > countDown && countUp > countNeutral) {
                        choosenValue += 2;
                    } else if (countDown > countUp && countDown > countNeutral) {
                        choosenValue -= 1;
                    } else {
                        choosenValue += 1;
                    }
                }
                const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);
                
                choosenValue = Math.floor(clamp(choosenValue/10, 0, 10));
                const score = await AppDataSource.getRepository(Score).findOneByOrFail({game: {
                    id: curAggroupedByGame[i][0].gameid
                }});
                score.value = String(choosenValue);
                await AppDataSource.getRepository(Score).save(score)
            }  
        }
    }
}