import View from "../..";
import GenreController from "../../../Controller/Game/classification/genre";


export default class GenreView extends View{
    constructor(){
        super();
        this.controllerObject = new GenreController();
    }
}