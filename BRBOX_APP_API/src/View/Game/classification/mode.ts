import View from "../..";
import ModeController from "../../../Controller/Game/classification/mode";


export default class ModeView extends View{
    constructor(){
        super();
        this.controllerObject = new ModeController();
    }
}