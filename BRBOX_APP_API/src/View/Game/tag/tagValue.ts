import View from "../..";
import TagValueController from "../../../Controller/Game/tag/tagValue";


export default class TagValueView extends View{
    constructor(){
        super();
        this.controllerObject = new TagValueController();
    }
}