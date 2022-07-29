import 'reflect-metadata'
import { DataSource } from "typeorm"

//from user
import User from './Model/User';
import Admin from './Model/User/Admin';

//Game imports
import Game from './Model/Game/'

    //External Links
    import ExternalLink from './Model/Game/externalLink';
    import ExternalLinkList from './Model/Game/externalLink/externalLinkList';

    //Images
    import Image from './Model/Game/image';
    import ImageList from './Model/Game/image/imageList';

    //Tags
    import Tag from './Model/Game/tag';
    import Value from './Model/Game/tag/value';
    import TagValue from './Model/Game/tag/tagValue';
    import TagValueList from './Model/Game/tag/tagValueList';




import 'dotenv/config';
import Platform from './Model/Game/platform';
import BusinessModel from './Model/Game/businessModel';
import BusinessModelList from './Model/Game/businessModel/businessModelList';
import Code from './Model/User/code';
import GameTime from './Model/Game/gameTime';
import ContentRecommendation from './Model/Game/recommendation/content';
import CustomRecommendation from './Model/Game/recommendation/custom';
import SimilaritiesRecommendation from './Model/Game/recommendation/similarities';

const host = process.env.DATABASE_HOST;
const port = Number(process.env.DATABASE_PORT);
const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;
const database = process.env.DATABASE_DATABASE;

export const AppDataSource = new DataSource({
    type:   'postgres',
    host:   host,
    port:   port,
    username:   username,
    password:   password,
    database:   database,
    synchronize:    true,
    logging:        false,
    entities: [
        User, 
        Admin, 
        Game, 
        ExternalLink, 
        ExternalLinkList, 
        Image, 
        ImageList, 
        Tag, 
        Value, 
        TagValue, 
        TagValueList, 
        Platform,
        BusinessModel,
        BusinessModelList,
        Code,
        GameTime,
        ContentRecommendation,
        CustomRecommendation,
        SimilaritiesRecommendation
    ],
    subscribers: [],
    migrations: [],
});