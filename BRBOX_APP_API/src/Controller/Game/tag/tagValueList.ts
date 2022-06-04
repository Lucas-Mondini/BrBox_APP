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
        super(TagValueList, ["tagValues"])
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
    
    AddTagValue =async (id: number, tag: number, value: number, userId: number) => {


        const tagValue = await new TagValue();
        
        const _user =   AppDataSource.getRepository(User).findOneByOrFail({id: userId})
        const _tag =    AppDataSource.getRepository(Tag).findOneByOrFail({id: tag})
        const _value =  AppDataSource.getRepository(Value).findOneByOrFail({id: value})
        
        
        tagValue.user = await _user;
        tagValue.tag = await _tag;
        tagValue.value = await _value;
        

        const tagValueList = await AppDataSource.getRepository(TagValueList).findOneOrFail({where: {id: id}, relations: ["tagValues"]});
        tagValueList.tagValues.push(tagValue);
        AppDataSource.getRepository(TagValueList).save(tagValueList);


    }
}