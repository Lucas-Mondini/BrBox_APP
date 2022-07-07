import { Request } from "express";
import {Controller} from "../..";

import { AppDataSource } from "../../../data-source";
import Tag from "../../../Model/Game/tag";
import TagValue from "../../../Model/Game/tag/tagValue";

export default class TagController extends Controller {

    constructor() {
        super(Tag, []);
    }

    //@ts-ignore
    Index = async (req: Request) => {
        try {
            const {game = null, name = "", order = 'ASC'} = req.query

            const orderBy = ((<string>order).toUpperCase() == 'ASC' || (<string>order).toUpperCase() == 'DESC')? order : 'ASC'

            var whereName = "1 = 1";
            var whereGame = "1 = 1";
            if(name) {
                const names = (<string>name).split(',');
                whereName += ` AND (${names.map(i=> `lower(t.name) = lower('${i}')`).join(" OR ")})`
            }

            if(game) {
                const ids = (<string>game).split(',');
                whereGame += ` AND (${ids.map(i=> "g.id = " + i).join(" OR ")})`
            }
            

            var tagsEvaluated: any = [];
            if(game)
                tagsEvaluated = await AppDataSource.query(` select * from tag
                                                            where 
                                                                id in (
                                                                select 
                                                                    tv."tagId" as id from tag_value tv 
                                                                inner join 
                                                                    tag_value_list_tag_values_tag_value tvltvtv on tvltvtv."tagValueId" = tv.id
                                                                inner join 
                                                                    game g on g."tagListId" = tvltvtv."tagValueListId"
                                                                where 
                                                                    ${whereGame} and tv."userId"  = ${req.user.id}
                                                                            )
                                                            order by id ASC`
                                                        )
            
            let tags = await AppDataSource.query(`  select * from tag t
                                                    where ${whereName}
                                                    order by t.name ${orderBy}
            `)
            if(tagsEvaluated) {
                tagsEvaluated.map((i: any) => {
                    tags = tags.filter((j: any) => j.id != i.id)
                })
            }

            return {status: 200, value: tags};
        }
         catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : e.detail}}};
        }
    }


    //@ts-ignore
    Create = async (req: Request) => {
        try {
            const {name, description, icon} = req.body;
            
            const tag = await new Tag();
            tag.name        = name;
            tag.description = description;
            tag.icon        = icon;
            await AppDataSource.getRepository(Tag).save(tag);
            
            return {status: 200, value: {
                    ...tag
            }};
        }
         catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : e.detail}}};
        }
    }

    //@ts-ignore
    Update = async (req: Request) => {
        try {
            const {id, new_name, new_description, new_icon} = req.body
            const tag = await AppDataSource.getRepository(Tag).findOneBy({id: Number(id)});

            if(!tag)
                return { status: 404, value: {message: "tag not found" }};

            tag.name = new_name || tag.name;
            tag.description = new_description || tag.description;
            tag.icon        = new_icon || tag.icon;
            
            await AppDataSource.getRepository(Tag).save(tag);
            
            return {status: 200, value: {
                    ...tag
            }};
        }
         catch (e : any) {
            return {status: 500, value: {message: {"something went wrong" : e.detail}}};
        }
    }
}