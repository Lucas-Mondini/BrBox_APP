import { Request } from "express";
import {Controller} from "../..";

import { AppDataSource } from "../../../data-source";
import Tag from "../../../Model/Game/tag";
import TagValue from "../../../Model/Game/tag/tagValue";
import Value from "../../../Model/Game/tag/value";
import User from "../../../Model/User";

export default class TagValueController extends Controller {
    constructor() {
        super(TagValue, ["user", "value", "tag"]);
    }
    //NOT IMPLEMENTED, JUST CREATED IN THE  TAGVALUELIST CONTROLLER, SINCE ONLY THE USER CAN CREATE IT IN ASSOCIATION WITH AN GAME
    // Create = async (req: Request) => {
    //     try {
    //         const {tag, value} = req.body;
            
    //         const tagValue = await new TagValue();

    //         const _user =   AppDataSource.getRepository(User).findOneByOrFail({id: Number(req.user.id)})
    //         const _tag =    AppDataSource.getRepository(Tag).findOneByOrFail({id: Number(tag)})
    //         const _value =  AppDataSource.getRepository(Value).findOneByOrFail({id: Number(value)})


    //         tagValue.user = await _user;
    //         tagValue.tag = await _tag;
    //         tagValue.value = await _value;


    //         await AppDataSource.getRepository(TagValue).save(tagValue);
    //         return {status: 200, value: {
    //                 ...tagValue
    //         }};
    //     }
    //     catch (e) {
    //         return {status: 500, value: {message: {"something went wrong" : e}}};
    //     }
    // }
    //@ts-ignore
    Update = async (req: Request) => {
        try {
            const {id, tag, value} = req.body;
            
            const _user =   await AppDataSource.getRepository(User).findOneByOrFail({id: Number(req.user.id)})
            const tagValue = await AppDataSource.getRepository(TagValue).findOneByOrFail({id: Number(id), user: _user});

            const _tag =    AppDataSource.getRepository(Tag).findOneBy({id: Number(tag)})
            const _value =  AppDataSource.getRepository(Value).findOneBy({id: Number(value)})

            tagValue.tag    = await _tag  || tagValue.tag ;
            tagValue.value  = await _value || tagValue.value;

            
            await AppDataSource.getRepository(TagValue).save(tagValue);
            
            return {status: 200, value: {
                    ...tagValue
            }};
        }
        catch (e) {
            return {status: 500, value: {message: {"something went wrong" : e}}};
        }
    }
}