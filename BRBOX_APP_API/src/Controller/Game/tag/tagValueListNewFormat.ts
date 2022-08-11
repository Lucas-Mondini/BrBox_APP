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
 function groupEvaluatedTags(list: any[], userId: any): any[]
 {
   const finalValues: any[] = [];

   const userdata = list.filter((item) => (item.user.id === userId))
   for (let item1 of list) {
     const uservote = userdata.filter(item => item.tag.id === item1.tag.id);
     const countTags = list.filter((item) => item.tag.id === item1.tag.id);
     const countUpVotes = list.filter((item) => item.value.id === 1 && item.tag.id === item1.tag.id).length;
     const countDownVotes = list.filter((item) => item.value.id === 3 && item.tag.id === item1.tag.id).length;
     const countNeutralVotes = list.filter((item) => item.value.id === 2 && item.tag.id === item1.tag.id).length;
     item1.userVoteValue = uservote.length > 0? uservote[0].value.id : null;
     item1.userVoteId = uservote.length > 0? uservote[0].id : null;

     finalValues.push({
       id: countTags[0].tag.id,
       icon: countTags[0].tag.icon,
       count: countTags.length,
       upVotes: countUpVotes * item1.weight,
       neutralVotes: countNeutralVotes * item1.weight,
       downVotes: countDownVotes * item1.weight,
       evalId: countTags[0].id,
       name: countTags[0].tag.name,
       value: countTags[0].value.id,
       description_positive: countTags[0].tag.description_positive,
       description_neutral: countTags[0].tag.description_neutral,
       description_negative: countTags[0].tag.description_negative,
       userVote: item1.userVote,
       userVoteValue: item1.userVoteValue,
       userVoteId: item1.userVoteId,
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
          
          return {status: 200, value: {tagValue: groupEvaluatedTags(tagValue.tagValues, req.user.id)}};
      }
       catch (e : any) {
          return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
      }
  }
    
}