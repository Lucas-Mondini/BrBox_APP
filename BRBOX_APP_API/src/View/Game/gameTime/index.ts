import View from "../..";
import GameTimeController from "../../../Controller/Game/gameTime";


export default class GameTimeView extends View {
    
    constructor(){
        super();
        this.controllerObject = new GameTimeController();
    }
}