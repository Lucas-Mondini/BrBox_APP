import { AppDataSource } from '../../data-source';
import axios from 'axios';
import Platform from '../../Model/Game/platform';
import Game from '../../Model/Game';
import Image from '../../Model/Game/image';
import ImageList from '../../Model/Game/image/imageList';
import ExternalLink from '../../Model/Game/externalLink';
import TagValueList from '../../Model/Game/tag/tagValueList';
import BusinessModelList from '../../Model/Game/businessModel/businessModelList';
import Genre from '../../Model/Game/classification/genre';
import Mode from '../../Model/Game/classification/mode';
import ExternalLinkList from '../../Model/Game/externalLink/externalLinkList';
import GameITAD_IDs from '../../Model/Game/gameITAD_IDs/gameITAD_IDs';

const getAllStoresFindAllGames = async () => {
    //todas as lojas cadasstradas
    const response = await axios.get("https://api.isthereanydeal.com/v01/web/stores/all/");
    const storesList = response.data.data;

    let stores = await AppDataSource.getRepository(Platform).find()
    const promises = new Array<Promise<any>>();
    const platforms = new Array<Platform>();

    try {
        for (const store of storesList as any) {

            let data = new Platform();
            const storeId = store.id;
            const storeName = store.title;
            const existingStore = stores.find(r => r.ITADId === storeId);
            if (existingStore) {
                data = existingStore;
            }
            // cadastrar um platform
            data.name = storeName;
            data.ITADId = storeId.toString();
            platforms.push(data);

            //lista de jogos de cada loja
            //fazer a relção
            
            //gerar o id pra cada jogo gerar uma lista
            //apos isso buscar as infos de cada jogo
        }
        await AppDataSource.getRepository(Platform).save(platforms);

        stores = await AppDataSource.getRepository(Platform).find()
        const allGames = await AppDataSource.getRepository(Game).find({relations: ["imageList", "linkList", "tagList",
        "linkList.externalLinks",
        "linkList.externalLinks.platform",
        "imageList.images",
        "tagList.tagValues",
        "tagList.tagValues.tag", "tagList.tagValues.value",
        "businessModelList", "businessModelList.businessModels",
        "genres",
        "modes", "GameITAD_IDs"]});

        for (const store of stores) {
            const responseAllGames = await axios.get(`https://api.isthereanydeal.com/v01/game/plain/list/?key=f564a5b303fe89f61a284b527155ceb937899ad0&shops=${store.ITADId}`);
            const gamesListStore = responseAllGames.data.data;
            const allITADIds = await AppDataSource.getRepository(GameITAD_IDs).find()
    
                for (const [gameId, plain] of Object.entries(gamesListStore[store.ITADId])) {
                    let gameITAD_IDs = new GameITAD_IDs();
                    let existingGameITAD_ID = allITADIds.find(r => r.ITADId === gameId);
                    if(existingGameITAD_ID) { 
                        gameITAD_IDs = existingGameITAD_ID;
                    }
                    gameITAD_IDs.ITADId = gameId;
                    gameITAD_IDs.ITADIdStoreID = store.ITADId;


                    try {

                        const responseGameDetails = await axios.get(`https://api.isthereanydeal.com/v01/game/info/?key=f564a5b303fe89f61a284b527155ceb937899ad0&plains=${plain}`);
                        const gameDetails = responseGameDetails.data.data[(<string>plain)];
    
                        let gameModel = allGames.find((g: Game) => {
                            const itad = g.GameITAD_IDs.find(gitid => gitid.ITADId == gameId)
                            if (itad) {
                                return true;
                            }
                            return false;
                        })
    
                        //game
                        if(gameModel == null) {
                            gameModel = new Game();
                            const imageArray = new Array<Image>();
                            const linkArray = new Array<ExternalLink>();
                            const externalLinkList = new ExternalLinkList();
                            externalLinkList.externalLinks = linkArray;
                            
                            let imageList = new ImageList()
                            imageList.images = imageArray;
                            gameModel.tagList = new TagValueList()
                            gameModel.businessModelList = new BusinessModelList();
                            gameModel.genres = new Array<Genre>();
                            gameModel.modes = new Array<Mode>();
                            gameModel.GameITAD_IDs = new Array<GameITAD_IDs>();
                            gameModel.imageList = imageList;
                            gameModel.linkList = externalLinkList;
                        }
                        const gameITADIdInGame = gameModel.GameITAD_IDs.find(gitadid => gitadid.ITADId === gameId)
                        if(!gameITADIdInGame) {
                            gameModel.GameITAD_IDs.push(gameITAD_IDs);
                        }
        
    
    
        
                        gameModel.name = gameDetails.title;
                        gameModel.DLC = gameDetails.is_dlc;
        
                        let imgCounter = 0;
                        const img = gameDetails.image
                        if(img) {
                            const image = new Image();
                            image.name = gameDetails.title + "_image_" + imgCounter++;
                            image.link = img;
                            const imageExists = gameModel.imageList.images.find(image => image.link === img);
                            if(!imageExists) {
                                gameModel.imageList.images.push(image);
                            }
                        }
    
                        // await AppDataSource.getRepository(Game).save(gameModel)
                        promises.push(AppDataSource.getRepository(Game).save(gameModel)); 
                    } catch(e) {
                        console.error('deu um erro');
                    }
                }
        }
    } catch (error) {
        console.error('Erro ao fazer chamada à API');
    }
        
    
    await Promise.all(promises);
}

export {
    getAllStoresFindAllGames
}