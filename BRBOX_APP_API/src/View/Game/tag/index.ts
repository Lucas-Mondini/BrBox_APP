import { Request, Response } from "express";
import TagController from "../../../Controller/Game/tag";
import View from "../..";


export default class TagView extends View {
    
    constructor(){
        super();
        this.controllerObject = new TagController();
    }
}