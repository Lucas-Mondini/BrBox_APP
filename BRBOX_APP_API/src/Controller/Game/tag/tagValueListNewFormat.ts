import { Request } from "express";
import {Controller} from "../..";
import TagValue from "../../../Model/Game/tag/tagValue";
import TagValueList from "../../../Model/Game/tag/tagValueList";
import { AppDataSource } from "../../../data-source";
import User from "../../../Model/User";
import Tag from "../../../Model/Game/tag";
import Value from "../../../Model/Game/tag/value";
import GameTime from "../../../Model/Game/gameTime";
import { weightCalculator } from "../../../Utils/calculator";


/**
   * Receive a list of evaluated tags and returns a list of tags grouped by tag
   * @param list
   * @return Tag[]
   */
 function groupEvaluatedTags(list: any[]): any[]
 {
   const finalValues: any[] = [];

   for (let item1 of list) {
     const countTags = list.filter((item) => item.tag.id === item1.tag.id);
     const countUpVotes = list.filter((item) => item.value.id === 1 && item.tag.id === item1.tag.id).length;
     const countDownVotes = list.filter((item) => item.value.id === 3 && item.tag.id === item1.tag.id).length;
     const countNeutralVotes = list.filter((item) => item.value.id === 2 && item.tag.id === item1.tag.id).length;

     finalValues.push({
       id: countTags[0].tag.id,
       icon: countTags[0].tag.icon,
       count: countTags.length,
       upVotes: countUpVotes,
       neutralVotes: countNeutralVotes,
       downVotes: countDownVotes,
       evalId: countTags[0].id,
       name: countTags[0].tag.name,
       value: countTags[0].value.id,
       description_positive: countTags[0].tag.description_positive,
       description_neutral: countTags[0].tag.description_neutral,
       description_negative: countTags[0].tag.description_negative,
       userVote: item1.userVote,
       userVoteValue: item1.userVoteValue,
       userVoteId: item1.userVoteId
     });
   }

   return [
     ...new Map(finalValues.map((item) => [item["id"], item])).values(),
   ];
 }
 function groupTagsOnReturnObjectFormat(list: any[]): any[]
 {
   const finalValues: any[] = [];

   for (let item1 of list) {
     finalValues.push({
       id: item1.id,
       icon: item1.icon,
       count: 0,
       upVotes: 0,
       neutralVotes: 0,
       downVotes: 0,
       evalId: null,
       name: item1.name,
       value: 0,
       description_positive: item1.description_positive,
       description_neutral: item1.description_neutral,
       description_negative: item1.description_negative,
       userVote: false
     });
   }

   return [
     ...new Map(finalValues.map((item) => [item["id"], item])).values(),
   ];
 }
export default class TagValueListControllerNewFormat extends Controller {
    constructor() {
        super(TagValueList, ["tagValues", "tagValues.tag", "tagValues.user", "tagValues.value"])
    }

    //@ts-ignore
    Get = async (req: Request) => {
        try {
            const id = req.params.id
            const tagValue = await AppDataSource.getRepository(TagValueList).findOneOrFail({where: {id: Number(id)}, relations: this.relations});
            let tags = await AppDataSource.getRepository(Tag).find();

            const tagValues = tagValue.tagValues.map((i: any) => 
            {
                if(i.user.id == req.user.id) {
                    i.userVote = true;
                    i.userVoteValue = i.value.id;
                    i.userVoteId = i.id;
                }
                else
                    i.userVote = false;
                return i;
            })
            let retObj = groupEvaluatedTags(tagValues);
            tags = groupTagsOnReturnObjectFormat(tags.filter(i => {
                for (const j of retObj) {
                    if(j.id == i.id)
                        return false;
                }
                return true;
            } ))
            retObj.push(...tags);

            
            return {status: 200, value: {tagValue: retObj}};
        }
         catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
        }
    }
    
}