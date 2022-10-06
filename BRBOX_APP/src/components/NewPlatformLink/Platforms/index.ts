export default class PlatformImage {
    public static steam = require('./0_steam.png');
    public static battlenet = require('./10_battlenet.png');
    public static itchIO = require('./11_itchIO.png');
    public static nuuvem = require('./12_nuuvem.png');
    public static indieGala = require('./13_indieGala.png');
    public static gameJolt = require('./14_gameJolt.png');
    public static xbox = require('./15_xbox.png');
    public static playstation = require('./16_playstation.png');
    public static switch = require('./17_switch.png');
    public static squareEnix = require('./18_squareEnix.png');
    public static googlePlay = require('./19_googlePlay.png');
    public static epic = require('./1_epic.png');
    public static ios = require('./20_ios.png');
    public static huawei = require('./21_huawei.png');
    public static gameStop = require('./22_gameStop.png');
    public static samsung = require('./22_samsung.png');
    public static sony = require('./23_sony.png');
    public static greenManGaming = require('./24_greenManGaming.png');
    public static twogame = require('./25_2game.png');
    public static allYouPlay = require('./26_allYouPlay.png');
    public static direct2Drive = require('./27_direct2Drive.png');
    public static dlGamer = require('./28_dlGamer.png');
    public static dreamGame = require('./29_dreamGame.png');
    public static gameBillet = require('./30_gameBillet.png');
    public static gamersGate = require('./31_gamersGate.png');
    public static fireFlower = require('./32_fireFlower.png');
    public static joyBuggy = require('./33_joyBuggy.png');
    public static gamesLoad = require('./34_gamesLoad.png');
    public static gamesPlanet = require('./35_gamesPlanet.png');
    public static macGameStore = require('./36_macGameStore.png');
    public static newEgg = require('./37_newEgg.png');
    public static voidu = require('./38_voidu.png');
    public static winGameStore = require('./39_winGameStore.png');
    public static gog = require('./3_gog.png');
    public static etailMarket = require('./40_etailMarket.png');
    public static eaOrigins = require('./4_eaOrigins.png');
    public static ubisoft = require('./5_ubisoft.png');
    public static humbleStore = require('./6_humbleStore.png');
    public static fanatical = require('./7_fanatical.png');
    public static windowsStore = require('./8_windowsStore.png');
    public static amazon = require('./9_amazon.png');
    public static discount = require('./discount.png');

    public static getImage(url: string) {
        switch (true) {
            default:
                return url;
            case url == "0_steam":
                return PlatformImage.steam;
            case url == "10_battlenet":
                return PlatformImage.battlenet;
            case url == "11_itchIO":
                return PlatformImage.itchIO;
            case url == "12_nuuvem":
                return PlatformImage.nuuvem;
            case url == "13_indieGala":
                return PlatformImage.indieGala;
            case url == "14_gameJolt":
                return PlatformImage.gameJolt;
            case url == "15_xbox":
                return PlatformImage.xbox;
            case url == "16_playstation":
                return PlatformImage.playstation;
            case url == "17_switch":
                return PlatformImage.switch;
            case url == "18_squareEnix":
                return PlatformImage.squareEnix;
            case url == "19_googlePlay":
                return PlatformImage.googlePlay;
            case url == "1_epic":
                return PlatformImage.epic;
            case url == "20_ios":
                return PlatformImage.ios;
            case url == "21_huawei":
                return PlatformImage.huawei;
            case url == "22_gameStop":
                return PlatformImage.gameStop;
            case url == "22_samsung":
                return PlatformImage.samsung;
            case url == "23_sony":
                return PlatformImage.sony;
            case url == "24_greenManGaming":
                return PlatformImage.greenManGaming;
            case url == "25_2game":
                return PlatformImage.twogame;
            case url == "26_allYouPlay":
                return PlatformImage.allYouPlay;
            case url == "27_direct2Drive":
                return PlatformImage.direct2Drive;
            case url == "28_dlGamer":
                return PlatformImage.dlGamer;
            case url == "29_dreamGame":
                return PlatformImage.dreamGame;
            case url == "30_gameBillet":
                return PlatformImage.gameBillet;
            case url == "31_gamersGate":
                return PlatformImage.gamersGate;
            case url == "32_fireFlower":
                return PlatformImage.fireFlower;
            case url == "33_joyBuggy":
                return PlatformImage.joyBuggy;
            case url == "34_gamesLoad":
                return PlatformImage.gamesLoad;
            case url == "35_gamesPlanet":
                return PlatformImage.gamesPlanet;
            case url == "36_macGameStore":
                return PlatformImage.macGameStore;
            case url == "37_newEgg":
                return PlatformImage.newEgg;
            case url == "38_voidu":
                return PlatformImage.voidu;
            case url == "39_winGameStore":
                return PlatformImage.winGameStore;
            case url == "3_gog":
                return PlatformImage.gog;
            case url == "40_etailMarket":
                return PlatformImage.etailMarket;
            case url == "4_eaOrigins":
                return PlatformImage.eaOrigins;
            case url == "5_ubisoft":
                return PlatformImage.ubisoft;
            case url == "6_humbleStore":
                return PlatformImage.humbleStore;
            case url == "7_fanatical":
                return PlatformImage.fanatical;
            case url == "8_windowsStore":
                return PlatformImage.windowsStore;
            case url == "9_amazon":
                return PlatformImage.amazon;
            case url == "discount":
                return PlatformImage.discount;
          }
    }

    public static IsInternalImage(url: any) {
        switch (true) {
            default:
                return false;
            case url == "0_steam":
            case url == "10_battlenet":
            case url == "11_itchIO":
            case url == "12_nuuvem":
            case url == "13_indieGala":
            case url == "14_gameJolt":
            case url == "15_xbox":
            case url == "16_playstation":
            case url == "17_switch":
            case url == "18_squareEnix":
            case url == "19_googlePlay":
            case url == "1_epic":
            case url == "20_ios":
            case url == "21_huawei":
            case url == "22_gameStop":
            case url == "22_samsung":
            case url == "23_sony":
            case url == "24_greenManGaming":
            case url == "25_2game":
            case url == "26_allYouPlay":
            case url == "27_direct2Drive":
            case url == "28_dlGamer":
            case url == "29_dreamGame":
            case url == "30_gameBillet":
            case url == "31_gamersGate":
            case url == "32_fireFlower":
            case url == "33_joyBuggy":
            case url == "34_gamesLoad":
            case url == "35_gamesPlanet":
            case url == "36_macGameStore":
            case url == "37_newEgg":
            case url == "38_voidu":
            case url == "39_winGameStore":
            case url == "3_gog":
            case url == "40_etailMarket":
            case url == "4_eaOrigins":
            case url == "5_ubisoft":
            case url == "6_humbleStore":
            case url == "7_fanatical":
            case url == "8_windowsStore":
            case url == "9_amazon":
            case url == "discount":
                return true;
          }
    }
}