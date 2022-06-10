import axios from 'axios'
import { finished } from 'stream';
import { AppDataSource } from '../../../data-source';
import Game from '../../../Model/Game';
import ExternalLink from '../../../Model/Game/externalLink';
import ExternalLinkList from '../../../Model/Game/externalLink/externalLinkList';
import Image from '../../../Model/Game/image';
import ImageList from '../../../Model/Game/image/imageList';
import Platform from '../../../Model/Game/platform';
import TagValueList from '../../../Model/Game/tag/tagValueList';

export default class SteamLoader {
    dataList = new Array();
    games : any
    
    constructor() {
        this.games = require('./games.json')
    }
    loadFromJSON = async () => {
        let counter = 0
        var totalGames;
        const platforms = await AppDataSource.getRepository(Platform).find({});
        const gamesArray = new Array<Game>();
        console.log(typeof this.games)
        for (const i in this.games) {
            const g = this.games[i];
            const game = new Game();
            const imageArray = new Array<Image>();
            const linkArray = new Array<ExternalLink>();
            
            
            let imgCounter = 0;
            for (const img of g.images) {
                const image = new Image();
                image.name = g.name + "_image_" + imgCounter++;
                image.link = img;
                imageArray.push(image);
            }
            
            for (const link in g.links) {
                const externalLink = new ExternalLink();
                const platform = (await platforms).find(i => i.id == Number(link));
                if (!platform)
                throw "error na platform"
                externalLink.platform = platform;
                externalLink.link = g.links[link];
                linkArray.push(externalLink)
            }
            
            const externalLinkList = new ExternalLinkList();
            externalLinkList.externalLinks = linkArray;
            
            const imageList = new ImageList()
            imageList.images = imageArray;
            
            
            game.name = g.name;
            game.imageList = imageList;
            game.linkList = externalLinkList;
            game.tagList = new TagValueList()
            gamesArray.push(game);
            counter++;
        }
        console.log(counter + " games found")
        totalGames = counter;
        counter = 1;
        var batchToSave = new Array<Game>();
        for (const g of gamesArray) {
            batchToSave.push(g)
            if(counter%200 == 0 || counter >= 59800) {
                await this.saveIndividually(batchToSave, counter);
                batchToSave = new Array<Game>();
            }
            counter++;
        }
        
    }
    
    saveIndividually = async (games: Game[], id: Number) =>{
        await AppDataSource.getRepository(Game).save(games);
        console.log("saved game till id: " + id);
    }
    
    Run = async () => {
        const allGames = await AppDataSource.getRepository(Game).find()
        if(allGames.length == 0)
        await this.loadFromJSON();
        
        
        
    }
}