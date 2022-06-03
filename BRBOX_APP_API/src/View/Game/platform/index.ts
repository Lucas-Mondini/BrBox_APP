import View from "../..";
import PlatformController from "../../../Controller/Game/platform";


export default class PlatformView extends View{
    constructor(){
        super();
        this.controllerObject = new PlatformController();
    }
}