import View from "../..";
import BusinessModelController from "../../../Controller/Game/businessModel";


export default class BusinessModelView extends View{
    constructor(){
        super();
        this.controllerObject = new BusinessModelController();
    }
}