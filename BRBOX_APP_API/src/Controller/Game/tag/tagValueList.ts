import { Request } from "express";
import {Controller} from "../..";
import TagValue from "../../../Model/Game/tag/tagValue";
import TagValueList from "../../../Model/Game/tag/tagValueList";
import { AppDataSource } from "../../../data-source";
import User from "../../../Model/User";
import Tag from "../../../Model/Game/tag";
import Value from "../../../Model/Game/tag/value";

export default class TagValueListController extends Controller {
    constructor() {
        super(TagValueList, ["tagValues", "tagValues.tag", "tagValues.user", "tagValues.value"])
    }
    
    //@ts-ignore
    Create = async (req:Request) => {
        const tagValueList = new TagValueList();
        AppDataSource.getRepository(TagValueList).save(tagValueList);
        
        return tagValueList;
    }
    
    //@ts-ignore
    Delete = async (req: Request) => {
        const id = req.params.id;
        const tagValueList = await AppDataSource.getRepository(TagValueList).findOneOrFail({where: {id: Number(id)}, relations: ["tagValues"]});
        
        if(!tagValueList)
        throw "tagValueList not found"
        
        AppDataSource.getRepository(TagValue).remove(tagValueList.tagValues);
        AppDataSource.getRepository(TagValueList).remove(tagValueList);
        
        return AppDataSource.getRepository(TagValueList).find({where: {id: Number(id)}, relations: ["tagValues"]});
    }
    
    AddTagValue =async (req: Request) => {
        try {
            const {tagValueListId, tag, value} = req.body
            
            const tagValue = await new TagValue();

            const tagValueList = await AppDataSource.getRepository(TagValueList).findOne({where: {id: tagValueListId}, relations: ["tagValues", "tagValues.tag", "tagValues.value", "tagValues.user"]});
            if(!tagValueList)
                return {status: 400, value: {message: "error: tagValueList not found"}}

            const _user =   AppDataSource.getRepository(User).findOneByOrFail({id: req.user.id})
            const _tag =    AppDataSource.getRepository(Tag).findOneByOrFail({id: tag})
            const _value =  AppDataSource.getRepository(Value).findOneByOrFail({id: value})
            
            for (let tg of tagValueList.tagValues) {
                if(tg.tag.id == tag && tg.user.id == req.user.id) {
                    tg.value = await _value;
                    return {status: 200, value: await AppDataSource.getRepository(TagValueList).save(tagValueList)}
                }
            }
            

            tagValue.user = await _user;
            tagValue.tag = await _tag;
            tagValue.value = await _value;
            
            
            
            tagValueList.tagValues.push(tagValue);
            return {status: 200, value: await AppDataSource.getRepository(TagValueList).save(tagValueList)}
        }
         catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : e.detail}}};
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
            AppDataSource.getRepository(TagValue).delete(tagValue);
            return {status: 200, value: await AppDataSource.getRepository(TagValueList).save(tagValueList)}
        }        
         catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : e.detail}}};
        }
    }
}