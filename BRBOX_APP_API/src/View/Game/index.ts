import View from "..";
import GameController from "../../Controller/Game";


export default class GameView extends View {
   
    constructor(){
        super();
        this.controllerObject = new GameController();
    }
}