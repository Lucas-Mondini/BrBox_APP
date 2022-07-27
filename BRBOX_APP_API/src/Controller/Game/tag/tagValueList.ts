import { Request } from "express";
import {Controller} from "../..";
import TagValue from "../../../Model/Game/tag/tagValue";
import TagValueList from "../../../Model/Game/tag/tagValueList";
import { AppDataSource } from "../../../data-source";
import User from "../../../Model/User";
import Tag from "../../../Model/Game/tag";
import Value from "../../../Model/Game/tag/value";
import GameTime from "../../../Model/Game/gameTime";
import { weightCalculator } from "../../../Utils/Calculator";

export default class TagValueListController extends Controller {
    constructor() {
        super(TagValueList, ["tagValues", "tagValues.tag", "tagValues.user", "tagValues.value"])
    }

    //@ts-ignore
    Get = async (req: Request) => {
        try {
            const id = req.params.id
            const tagValue = await AppDataSource.getRepository(TagValueList).findOneOrFail({where: {id: Number(id)}, relations: this.relations});

            const tagValueFromUser = tagValue.tagValues.filter(i => i.user.id == req.user.id)
            
            return {status: 200, value: {tagValueFromUser: tagValueFromUser, tagValue: tagValue}};
        }
         catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
        }
    }
    
    //@ts-ignore
    Create = async (req:Request) => {
        const tagValueList = new TagValueList();
        await AppDataSource.getRepository(TagValueList).save(tagValueList);
        
        return tagValueList;
    }
    
    //@ts-ignore
    Delete = async (req: Request) => {
        const id = req.params.id;
        const tagValueList = await AppDataSource.getRepository(TagValueList).findOneOrFail({where: {id: Number(id)}, relations: ["tagValues"]});
        
        if(!tagValueList)
        throw "tagValueList not found"
        
        await AppDataSource.getRepository(TagValue).remove(tagValueList.tagValues);
        await AppDataSource.getRepository(TagValueList).remove(tagValueList);
        
        return await AppDataSource.getRepository(TagValueList).find({where: {id: Number(id)}, relations: ["tagValues"]});
    }
    
    AddTagValue =async (req: Request) => {
        try {
            const {tagValueListId, tag, value} = req.body
            
            const tagValue = await new TagValue();

            const tagValueList = await AppDataSource.getRepository(TagValueList).findOne({where: {id: tagValueListId}, relations: ["tagValues", "tagValues.tag", "tagValues.value", "tagValues.user"]});
            if(!tagValueList)
                return {status: 400, value: {message: "error: tagValueList not found"}}

            const _user =   await AppDataSource.getRepository(User).findOneByOrFail({id: req.user.id});
            const _tag =    await AppDataSource.getRepository(Tag).findOneByOrFail({id: tag});
            const _value =  await AppDataSource.getRepository(Value).findOneByOrFail({id: value});

            const _weight = weightCalculator(
                (await AppDataSource.getRepository(GameTime).findOneBy
                    ({
                        user: {
                            id: req.user.id
                        }, 
                        game: {
                            tagList: tagValueList
                        }
                    })
                )?.time)
            
            for (let tg of tagValueList.tagValues) {
                if(tg.tag.id == tag && tg.user.id == req.user.id) {
                    tg.value = await _value;
                    tg.weight = _weight
                    await AppDataSource.getRepository(TagValueList).save(tagValueList)
                    return {status: 200, value: {...req.body, tagValueId: tg.id}}
                }
            }
            

            tagValue.user = _user;
            tagValue.tag = _tag;
            tagValue.value = _value;
            tagValue.weight = _weight;
            
            
            
            tagValueList.tagValues.push(tagValue);
            await AppDataSource.getRepository(TagValueList).save(tagValueList)
            return {status: 200, value: {...req.body, tagValueId: tagValue.id}}
        }
         catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
        }
    }
    
    RemoveTagValue = async (req: Request) => {
        try {
            const {tagValueListId, tagValueId} = req.body
            const tagValueList = await AppDataSource.getRepository(TagValueList).findOneOrFail({where: {id: tagValueListId}, relations: ["tagValues", "tagValues.tag", "tagValues.value", "tagValues.user"]});

            const tagValue = tagValueList.tagValues.find((tag) => {
                return tag.id == tagValueId;
            });
            if(!tagValue)
                return {status: 400, value: {message: "tagValue not in list"}};

            tagValueList.tagValues = tagValueList.tagValues.filter((tag) => {
                return tag.id != tagValueId;
            })
            await AppDataSource.getRepository(TagValue).delete(tagValue);
            return {status: 200, value: await AppDataSource.getRepository(TagValueList).save(tagValueList)}
        }        
         catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
        }
    }
}